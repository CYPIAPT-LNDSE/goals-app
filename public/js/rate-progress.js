function updateSliderValue (value) {
  var valueContainer = $("#slider-current-value");
  valueContainer.html(value);

  var pos = Math.min(-90 + 18 * value, 0);

  $('#stem-full').show();
  $('#stem-full').animate({
    bottom: pos
  }, 100)

  $('#leaf3').animate({
    bottom: pos + 30
  }, 100);

  if(value >= 6) {
    $('#leaf3').show(500);
  } else {
    $('#leaf3').hide();
  }

  if(value >= 7) {
    $('#leaf1').show(300);
  } else {
    $('#leaf1').hide();
  }

  if(value >= 8) {
    $('#leaf2').show(500);
  } else {
    $('#leaf2').hide();
  }

  if(value >= 6) {
    $('#flower-head').animate({
      bottom: 82,
      marginLeft: -68,
      width: 30 + (value - 6) * 7,
      height: 30 + (value - 6) * 7
    }, 100, 'swing', function() {
      $('#flower-head').show(500);
    })
  } else {
    $('#flower-head').hide();
  }
}
