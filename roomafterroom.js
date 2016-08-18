'use strict';

var $ = window.jQuery;
var score = 100;
var scoreEl;
var isReady = false;
var onReadyFuncs = [];
var nextRoom;

var RoomAfterRoom = {
  removePoints: function(numPoints) {
    score -= numPoints;
    RoomAfterRoom.updateScoreDisplay();
    if (score <= 0) {
      if (nextRoom) {
        window.location = nextRoom;
      } else {
        $('body').empty();
        alert("you win.");
      }
    }
  },

  updateScoreDisplay: function() {
    scoreEl.text(score);
  },

  initialize: function() {
    scoreEl = $('<div class="room-after-room-score"></div>');
    $('body').append(scoreEl);
    RoomAfterRoom.updateScoreDisplay();
    isReady = true;
    RoomAfterRoom.invokeReadyFuncs();
  },

  invokeReadyFuncs: function() {
    onReadyFuncs.forEach(function(func) {
      func();
    });
  },

  onReady: function(callback) {
    onReadyFuncs.push(callback);
    if (isReady) {
      RoomAfterRoom.invokeReadyFuncs();
    }
  },

  setNextRoom: function(str) {
    nextRoom = str;
  }
};

window.Random = {
  choose: function(inArray) {
    return inArray[Math.floor(Math.random() * inArray.length)];
  }
};

window.Colors = "#000000 #1D2B53 #7E2553 #008751 #AB5236 #5F574F #C2C3C7 #FFF1E8 #FF004D #FFA300 #FFEC27 #00E436 #29ADFF #83769C #FF77A8 #FFCCAA".split(' ');

$(RoomAfterRoom.initialize);
window.RoomAfterRoom = RoomAfterRoom;
