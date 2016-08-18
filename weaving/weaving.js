'use strict';

// var Random = window.Random;
var $ = window.jQuery;
var targetX = 0;
var targetY = 0;
var xStrand = '.strand-a';
var yStrand = '.strand-b';
var flipX = false;
var flipY = false;
var STRANDS = ['.strand-a', '.strand-b', '.strand-c'];
// var videoMap = {};

function setBackgroundColor(x, y) {
  var xDist = Math.abs(x - targetX) / $(window).width();
  $(xStrand).css({'opacity': Math.min(xDist, 1.0)});

  var yDist = Math.abs(y - targetY) / $(window).width();
  $(yStrand).css({'opacity': Math.min(yDist, 1.0)});

  // $('.strand-a').get(0).playbackRate = Math.abs(targetX - x) / 1000;
  // $('.strand-b').get(0).playbackRate = Math.abs(targetY - y) / 500;
}

function clipStrand($el, axis, x, y) {
  var MARGIN = 50;
  if (axis === 'x') {
    if (flipX) {
      x = $(window).width() - x;
    }
    var width = $el.width();
    $el.css({
      '-webkit-clip-path': 'inset(0 ' + (width - x - 50) + 'px 0 ' + (x - 50) + 'px)'
    });
  } else {
    if (flipY) {
      y = $(window).height() - y;
    }
    var height = $el.height();
    var top = y - MARGIN;
    var bottom = height - y - MARGIN;
    $el.css({
      '-webkit-clip-path': 'inset(' + top + 'px 0 ' + bottom + 'px 0)'
    });
  }
}


function followMouse(e) {
  var x = e.pageX;
  var y = e.pageY;
  clipStrand($(xStrand), 'x', x, y);
  clipStrand($(yStrand), 'y', x, y);
  setBackgroundColor(x, y);
}

function randomRotation(selector) {
  var rotation = Random.choose([0, 180]);
  $(selector).css({
    'transform': 'rotate(' + String(rotation) + 'deg)',
  })

}

function flashBackground(color) {
  $('body').css({'background-color': color});
  setTimeout(function() {
    $('body').css({'background-color': 'black'});
  }, 200);
}

function chooseNewTarget(isFirst) {
  flashBackground("#5F574F");

  STRANDS.forEach(function(sel) {
    $(sel).css({
      '-webkit-clip-path': 'inset(1000px 10000px 100000px 10000px)'
    })
  });
  targetX = Math.random() * 1000;
  targetY = Math.random() * 500;
  xStrand = Random.choose(STRANDS);
  yStrand = Random.choose(STRANDS);
  while (yStrand === xStrand) {
    yStrand = Random.choose(STRANDS);
  }
  if (!isFirst) {
    RoomAfterRoom.removePoints(Math.floor(Math.random() * 10) + 5);
    // RoomAfterRoom.removePoints(10);
    flipX = Math.random() < 0.5;
    flipY = Math.random() < 0.5;
    $('#intro').fadeOut('slow');
  }
  $('.target').css({
    top: (Math.random() * 90).toString() + '%',
    left: (Math.random() * 90).toString() + '%'
  })
}

function bindTargetHover() {
  $('.target').on('mouseover', function() {
    RoomAfterRoom.removePoints(10);
    chooseNewTarget(false);
  })
}

function trySpot(e) {
  var x = e.pageX;
  var y = e.pageY;
  var xDist = Math.abs(x - targetX) / $(window).width();
  var yDist = Math.abs(y - targetY) / $(window).width();
  if (xDist < 0.1 && yDist < 0.1) {
    chooseNewTarget();
    followMouse(e);
  } else {
    $('#intro').text('Only click when they dissapear.').show();
    setTimeout(function() {
      $('#intro').fadeOut('slow');
    }, 2000)
    flashBackground("#FF004D");
    RoomAfterRoom.removePoints(-1);
  }
}


function main() {
  chooseNewTarget(true);
  bindTargetHover();
  $('body').mousemove(followMouse);
  $('body').click(trySpot);
}

window.RoomAfterRoom.onReady(main);
