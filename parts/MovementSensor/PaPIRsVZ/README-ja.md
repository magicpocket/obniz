# PaPIRsVZ

パナソニックの PIR センサーです。人や動物が近くにいるかを検出できます。
フィルター回路内臓なので、ノイズに強いのが特徴です。

![](./papirsvzwire.jpg)


## wired(obniz, [signal [,vcc, gnd]])

３つのピンがあります。直接obnizに接続して下さい。

![](./papirsvzpins.jpg)

```Javascript
// Javascript Example
var sensor = obniz.wired("PaPIRsVZ", {gnd:0, signal:1, vcc:2});
sensor.onchange = function(val){
  console.log(val ? 'Moving Something!' : 'Nothing moving');
}
```

## onchange = function(value)

何かが変化した時に呼ばれる関数を設定します。
人が近づいてきたときに関数が呼ばれ、値`true`が引数に入っています。
もし、人がいなくなったり、人の動きが止まると再度呼ばれ`false`が引数に入ります。
フィルターが有効ですので、trueのあと、基本的にはすぐにfalseになります。

```Javascript
// Javascript Example
var sensor = obniz.wired("PaPIRsVZ", {gnd:0, signal:1, vcc:2});
sensor.onchange = function(val){
  console.log(val ? 'Moving Something!' : 'Nothing moving');
}
```