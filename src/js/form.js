$(document).ready( function(){
	$(".start.button").click(function(){
		$.fn.fullpage.moveSectionDown();
	});
	$(".next-page.button").click(function() {
		$.fn.fullpage.moveSlideRight();
	});
	$(".submit.button").click(function() {
		$(".ui.form").submit();
	});
	$(".ui.radio.checkbox").checkbox();


})
