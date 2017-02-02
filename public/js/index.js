function selectNewIcon (elem) {
  var selectedIcon = $('#' + elem);
  $('.goal-icon-container').removeClass('selected');
  selectedIcon.addClass('selected');
}
