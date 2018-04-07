const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const sinon = require('sinon');
const path = require('path');
const fs = require('fs');

module.exports = async function(config) {

  const obnizA = config.obnizA;
  const obnizB = config.obnizB;

  describe(path.basename(__filename), function () {

    this.timeout(10000);

    it("short string tx rx", async function () {
      const receiver = obnizB.getFreeUart();
      receiver.start({tx:1, rx:0});
      await obnizB.pingWait();
      const sender = obnizA.getFreeUart();
      sender.start({tx:0, rx:1});

      const text = "HelloWorld";
      let received = "";
      sender.send(text);
      while(1){
        if(receiver.isDataExists()){
            received += receiver.readText();
            if (received.indexOf(text) >= 0) {
              break;
            }
        }
        await obnizA.wait(1);  //wait for 10ms
      }
      receiver.end();
      sender.end();
    });

    it("short utf8 tx rx", async function () {
      const receiver = obnizB.getFreeUart();
      receiver.start({tx:1, rx:0});
      await obnizB.pingWait();
      const sender = obnizA.getFreeUart();
      sender.start({tx:0, rx:1});

      const text = "こんにちは";
      let received = "";
      sender.send(text);
      while(1){
        if(receiver.isDataExists()){
            received += receiver.readText();
            if (received.indexOf(text) >= 0) {
              break;
            }
        }
        await obnizA.wait(1);  //wait for 10ms
      }
      receiver.end();
      sender.end();
    });

    it("long string tx rx 9600", async function () {
      const receiver = obnizB.getFreeUart();
      receiver.start({tx:1, rx:0, baud:9600});
      await obnizB.pingWait();
      const sender = obnizA.getFreeUart();
      sender.start({tx:0, rx:1, baud:9600});

      let text = "";
      for (var i=0;i<4096; i++){
        text += "a";
      }
      let received = "";
      sender.send(text);
      while(1){
        if(receiver.isDataExists()){
            received += receiver.readText();
            if (received.indexOf(text) >= 0) {
              break;
            }
        }
        await obnizA.wait(1);  //wait for 10ms
      }

      receiver.end();
      sender.end();
    });

    it("long string tx rx 115200", async function () {
      const receiver = obnizB.getFreeUart();
      receiver.start({tx:1, rx:0, baud:115200});
      await obnizB.pingWait();
      const sender = obnizA.getFreeUart();
      sender.start({tx:0, rx:1, baud:115200});

      let text = "";
      for (var i=0;i<4096; i++){
        text += "a";
      }
      let received = "";
      sender.send(text);
      while(1){
        if(receiver.isDataExists()){
            received += receiver.readText();
            if (received.indexOf(text) >= 0) {
              break;
            }
        }
        await obnizA.wait(1);  //wait for 10ms
      }

      receiver.end();
      sender.end();
    });

    it("long binary tx rx 115200", async function () {
      const receiver = obnizB.getFreeUart();
      receiver.start({tx:1, rx:0, baud:115200});
      await obnizB.pingWait();
      const sender = obnizA.getFreeUart();
      sender.start({tx:0, rx:1, baud:115200});

      let data = [];
      for (var i=0;i<4096; i++){
        data.push(i%256);
      }
      let received = [];
      sender.send(data);
      while(1){
        if(receiver.isDataExists()){
            received.push(... receiver.readBytes());
            if (received.toString().indexOf(data.toString()) >= 0) {
              break;
            }
        }
        await obnizA.wait(1);  //wait for 10ms
      }

      receiver.end();
      sender.end();
    });

    it("two port at same time", async function () {
      const receiver0 = obnizB.getFreeUart();
      receiver0.start({tx:1, rx:0, baud:9600});
      const receiver1 = obnizB.getFreeUart();
      receiver1.start({tx:11, rx:10, baud:115200});
      await obnizB.pingWait();
      const sender0 = obnizA.getFreeUart();
      sender0.start({tx:0, rx:1, baud:9600});
      const sender1 = obnizA.getFreeUart();
      sender1.start({tx:10, rx:11, baud:115200});

      let text0 = "";
      let text1 = "";
      for (var i=0;i<1024; i++){ text0 += "0"; }
      for (var i=0;i<1024; i++){ text1 += "1"; }

      let received0 = "";
      let received1 = "";
      sender0.send(text0);
      sender1.send(text1);
      let found = 0;
      while(1){
        if(receiver0.isDataExists()){
          received0 += receiver0.readText();
          if (received0.indexOf(text0) >= 0) {
            found++;
            received0 = "";
          }
        }
        if(receiver1.isDataExists()){
          received1 += receiver1.readText();
          if (received1.indexOf(text1) >= 0) {
            found++;
            received1 = "";
          }
        }
        if(found == 2) {
          break;
        }
        await obnizA.wait(1);  //wait for 10ms
      }

      receiver0.end();
      receiver1.end();
      sender0.end();
      sender1.end();
    });
    
  });
  
  async function ioBisInRange(io, range) {
    await obnizA.pingWait();
    var voltage = await obnizB.getAD(io).getWait();
    expect(voltage).to.be.within(range[0], range[1]);
  }

}