# Temperature Sensor - LM60
Temperature sensor LM60BIZ/LM60CIM



![photo of AnalogTempratureSensor](./wired.png)




## wired(obniz, {vcc, gnd, output})
```javascript
// Javascript Example
var tempsens = obniz.wired("LM60", { gnd:0 , output:1, vcc:2});
```

## onchange
callback function for temperature change.
Unit of temp is Celsius

```javascript
// Javascript Example
var tempsens = obniz.wired("LM60",   { gnd:0 , output:1, vcc:2});
tempsens.onchange = function(temp){
console.log(temp)
};
```

## getWait
get temperature change.
Unit of temp is Celsius

```javascript
// Javascript Example
var tempsens = obniz.wired("LM60",   { gnd:0 , output:1, vcc:2});
var temp = tempsens.getWait();
console.log(temp);
```
 

