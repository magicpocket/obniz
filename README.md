# obniz SDK for javascript

This is [obniz](https://obniz.io/) javascript SDK.

See details at [Document](https://obniz.io/doc)

## Build
index.js is what we called obniz.js.  
and this is build result.  
index.js is made from two js below
```
  obniz/index.js  
  parts/*/index.js  
```
So you should edit these js files. Not index.js on root directory.
You can build index.js by using _tools/server.js.

## Development
You can clone this and use this from your HTML.
After cloning. You are able to launch local server

```shell
 cd ./
 node _tools/server.js
```
Then, http://localhost:3100/obniz.js is avaiable.
So, You can include this from your HTML.
Put this on top of the program
```html
<div id="online-status"></div>
<h1>obniz instant html</h1>

<script src="http://localhost:3100/obniz.js" crossorigin="anonymous"></script>
<script>
  var obniz = new Obniz("00000000");
  obniz.onconnect = async function () {
  }
</script>
```
It will OVERWRITE //parts.obniz.io/obniz.js

When you make something changed, server.js will generate index.js automatically.


## Lisence

All rights reserved.
