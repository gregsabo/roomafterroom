'use strict';

var Random = window.Random;
var COMMON_WORDS = window.COMMON_WORDS;
var $ = window.jQuery;
var currentPrompt;

function displayResponse(inText) {
  $('.response').text(inText).show();
  $('.answer-input').text('')
  $('.answer').hide();
  setTimeout(displayPrompt, 500);
}

function gradeAnswer() {
  var given = $('.answer-input').text().trim();
  if (given === currentPrompt) {
    displayResponse('correct.');
    RoomAfterRoom.removePoints(10);
  } else {
    displayResponse('no.');
  }
}

function showInput() {
  $('.wait').hide();
  $('.answer').show();
  $('.answer-input').focus();
}

function hidePrompt() {
  $('.prompt').hide();
  $('.wait').show();
  setTimeout(showInput, 1000);
}

function displayPrompt() {
  currentPrompt = Random.choose(COMMON_WORDS) + ' ' + Random.choose(COMMON_WORDS);
  $('.response').hide();
  $('.prompt-text').text(currentPrompt);
  $('.prompt').show();
  setTimeout(hidePrompt, 3000);
}

function bindAnswerSubmission() {
  $('.answer-input').on('keypress', function(e) {
    if (e.which === 13) {
      gradeAnswer();
    }
  });
}


function main() {
  displayPrompt();
  bindAnswerSubmission();
}


window.RoomAfterRoom.onReady(main);
window.RoomAfterRoom.setNextRoom('../');
