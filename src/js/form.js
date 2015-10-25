$(document).ready( function(){
	$('.ui.dropdown')
			.dropdown()
			;
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

	$(".submit").click(function(){
		var form={};
		form.age=$("input[name=age]").val();
		form.height=$("input[name=height]").val();
		form.weight=$("input[name=weight]").val();
		form.gender=$("input[name=gender]:checked").val();
		form.loc=$( "#loc" ).val();
		form.smoke=$("input[name=smoke]:checked").val();
		form.wine=$("input[name=wine]:checked").val();
		form.sleep=$("input[name=sleep]:checked").val();
		form.vegetable=$("input[name=vegetable]:checked").val();
		form.exercise=$("input[name=exercise]:checked").val();
		form.exercise_hour=$("input[name=exercise_hour]:checked").val();
		form.Bvac=$("input[name=Bvac]:checked").val();
		$.ajax({
			type: "POST",
			url: "api/dataHandler.php",
			data: JSON.stringify(form),
			dataType: "json",
			timeout: 1000,
			error: function(res) {
                document.location="result.html";
			}
		})
	});


})
