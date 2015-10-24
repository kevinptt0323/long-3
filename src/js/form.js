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
		form.gender=$("input[name=gender]").val();
		form.loc=$( "#loc" ).val();
		form.smoke=$("input[name=smoke]").val();
		form.wine=$("input[name=wine]").val();
		form.sleep=$("input[name=sleep]").val();
		form.vegetable=$("input[name=vegetable]").val();
		form.exercise=$("input[name=exercise]").val();
		form.exercise_hour=$("input[name=exercise_hour]").val();
		form.Bvac=$("input[name=Bvac]").val();
		$.ajax({
			type: "POST",
			url: "api/dataHandler.php",
			data: form,
			dataType: "json",
			timeout: 10000,
			success: function(res) {
				document.location = "result.html"
			}
		})
	});


})
