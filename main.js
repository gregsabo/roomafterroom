function main() {
  var $why = $('.why');
  _.range(100, function() {
    $('body').append($why.clone());
  }
};

$(main);
