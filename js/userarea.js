$(function(){
	$.get("scripts/verificar_user_logado.php", function(data){
		if(data.length == 0){
			location = "forms/login.html";	
		}else{
			$(".user-name").text(data.name + "!");
		}
	}, 'json');

});