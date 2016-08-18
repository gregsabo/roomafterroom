'use strict';

// var Random = window.Random;
var $ = window.jQuery;
var targetX = 0;
var targetY = 0;
// var videoMap = {};

function setVideoPlayback(x, y) {
  $('.strand-a').get(0).playbackRate = Math.abs(targetX - x) / 1000;
  $('.strand-b').get(0).playbackRate = Math.abs(targetY - y) / 500;
}

function bindMouseMove() {
  $('body').mousemove(function(e) {
    console.log('mousemove');
    var x = e.clientX;
    var y = e.clientY;
    $('.strand-a').css({
      '-webkit-clip-path': 'inset(0 ' + (1600 - x) + 'px 0 ' + (x - 100) + 'px)'
    });
    $('.strand-b').css({
      '-webkit-clip-path': 'inset(' + (y - 50) + 'px 0 ' + (900 - y) + 'px 0)'
    });
    var xDist = x - targetX;
    var yDist = y - targetY;
    if ((xDist * xDist + yDist * yDist) < 10000) {
      alert('hi');
    }
    setVideoPlayback(x, y);
  });
}

function chooseNewTarget() {
  targetX = Math.random() * 1000;
  targetY = Math.random() * 500;
}

function main() {
  chooseNewTarget();
  bindMouseMove();
}

window.RoomAfterRoom.onReady(main);
