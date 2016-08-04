'use strict';
var $ = window.jQuery;
// var _ = window._;

// function choose(inArray) {
//   return inArray[Math.floor(Math.random() * inArray.length)];
// }

function randomPercent(max, min) {
  if (!min) {
    min = 0;
  }
  if (!max) {
    max = 100;
  }
  var num = (Math.random() * (max - min)) + min;

  return String(num) + '%';
}

function addTree() {
  $('<div class="tree"></div>')
    .css({
      'transform': 'rotate( ' + String(Math.random() * 180) + 'deg)',
      top: randomPercent(100, -20),
      left: randomPercent(100, -20)
    })
    .appendTo($('body'));
}

function decreaseCount() {
  var current = $('.count')
    .show()
    .text();
  current = parseInt(current, 10);
  $('.count').text(current - 1);
  if (current - 1 === 0) {
    $('body').empty();
  }
}

function addTreeOnClick() {
  $('body').click(function() {
    decreaseCount();
    addTree();
  });
}

function main() {
  addTreeOnClick();
}


$(main);
