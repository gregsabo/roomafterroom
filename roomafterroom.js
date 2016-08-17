'use strict';

var $ = window.jQuery;
var score = 100;
var scoreEl;
var isReady = false;
var onReadyFuncs = [];

var RoomAfterRoom = {
  removePoints: function(numPoints) {
    score -= numPoints;
    RoomAfterRoom.updateScoreDisplay();
  },

  updateScoreDisplay: function() {
    scoreEl.text(score);
  },

  initialize: function() {
    scoreEl = $('<div class="room-after-room-score"></div>');
    $('body').append(scoreEl);
    console.log('appended', scoreEl);
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
  }
};

window.Random = {
  choose: function(inArray) {
    return inArray[Math.floor(Math.random() * inArray.length)];
  }
};

$(RoomAfterRoom.initialize);
window.RoomAfterRoom = RoomAfterRoom;
