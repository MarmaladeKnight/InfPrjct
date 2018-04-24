'use strict'
/*
var loader = new PIXI.Application(
    window.innerWidth,
    window.innerHeight, {
        backgroundColor: 0x307672,
        antialias: true,
        transparent: false,
        resolution: 1
    }
);

document.getElementById('loader').appendChild(loader.view);

document.getElementById('loader').style.opacity = "0";

loader.renderer.autoResize = true;
loader.renderer.view.style.position = "absolute";
loader.renderer.view.style.display = "block";

var sticker = PIXI.Sprite.fromImage('../img/doge.png')

loader.stage.addChild(sticker);
sticker.anchor.set(0.5);

loader.ticker.add(function(delta) {
    sticker.rotation += 0.05 * delta;
});

loader.ticker.add(function(delta) {
    loader.renderer.resize(window.innerWidth, window.innerHeight);
    sticker.x = loader.screen.width / 2;
    sticker.y = loader.screen.height / 2;
});

setTimeout("loaderVanishing()", 1500);
setTimeout("loader.destroy()", 2000);

function loaderVanishing() {
    document.getElementById('loader').style.transition = "all 0.5s";
    document.getElementById('loader').style.opacity = "0";
}
*/