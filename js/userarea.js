$(function(){
	$.get("scripts/verificar_user_logado.php", function(data){
		if(data.length == 0){
			location = "forms/login.html";
		}else{
			var username = data.name;
			username = username.split(" ");
			if(username.length > 1){
				username = username[0] + " " + username[username.length-1];
			}else{
				username = username[0];
			}

			
			$(".user-name").text(username + "!");

			if(data.admin == 1){
				$(".centro-user").hide();
				$(".centro-admin").show();
				$(".userarea-link").text("Área do Administrador");
			}else{
				$(".centro-user").show();
				$(".centro-admin").hide();
			}
		}
	}, 'json');
});