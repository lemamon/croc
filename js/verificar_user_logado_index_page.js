$(function(){

	$(".modal-trigger").leanModal();

	$.get("scripts/verificar_user_logado.php", function(data){
		if(data.length == 0){
			$(".cadastrar-link").show();
			$(".login-link").show();
			$(".userarea-link").hide();
			$(".logout-link").hide();
		}else{
			$(".cadastrar-link").hide();
			$(".login-link").hide();
			$(".userarea-link").show();
			$(".logout-link").show();

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