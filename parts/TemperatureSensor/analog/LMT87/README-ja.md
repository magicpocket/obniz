# Temperature Sensor - LMT87
温度センサLMT87です。センサで取得した温度を知ることができます。





![photo of AnalogTempratureSensor](./wired.png)



## wired(obniz, {vcc, output, gnd})
Obnizに温度センサをつなぎます。
```javascript
// Javascript Example
var tempsens = obniz.wired("LMT87",  { gnd:0 , output:1, vcc:2});
```

## onchange
温度センサの値に変化があった場合にcallback関数を呼び出します。
温度は摂氏で返されます。
```javascript
// Javascript Example
var tempsens = obniz.wired("LMT87",  { gnd:0 , output:1, vcc:2});
tempsens.onchange = function(temp){
  console.log(temp);
};
```
 