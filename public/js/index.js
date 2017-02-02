
function showAddGoalPage(){
  $(".landing-page").fadeOut(300,function(){
    $(".add-goal-page").show().attr('style', 'display: flex');
  });
}

function showhide(showpage, hidepage){
  console.log("show:",showpage);
  $("."+hidepage).fadeOut(300, function(){
    $("."+showpage).show().attr('style','display:flex');
  });
  // $("."+hidepage).attr('style','display:none'));
}
