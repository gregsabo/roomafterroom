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
    if (score <= 0 && nextRoom) {
      window.location = nextRoom;
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

$(RoomAfterRoom.initialize);
window.RoomAfterRoom = RoomAfterRoom;
