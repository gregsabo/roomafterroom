'use strict';
var $ = window.jQuery;
var _ = window._;

function choose(inArray) {
  return inArray[Math.floor(Math.random() * inArray.length)];
}

function shiftOne() {
  $(choose($('.why'))).css({
    'margin-left': Math.random() * 5,
    'margin-right': Math.random() * 5
  });
}

var lastHide;
function showHandOnMove() {
  $('body').on('mousemove', function() {
    if (lastHide) {
      clearTimeout(lastHide);
    }
    $('.hand').addClass('showing');
    lastHide = setTimeout(function() {
      $('.hand').removeClass('showing');
    }, 1000);
  });

}

function main() {
  var $why = $('.why');
  _.range(150).forEach(function() {
    $why.clone().appendTo($('body'));
  });
  showHandOnMove();
  setInterval(shiftOne, 10);
}


$(main);
