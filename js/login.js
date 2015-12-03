$(function(){

	$("#not-found").hide();
	
	$.get("../scripts/verificar_user_logado.php", function(data){
		if(data.length == 0){
			//location = "login.html";	
		}else{
			location = "../userarea.html";	
		}
	}, 'json');


	$("#btEntrar").click(function(){
		verificarUsuario();
	});

	$( "#pass" ).on( "keydown", function(event) {
		if(event.which == 13){
     	 	verificarUsuario();
		}
         
    });

	$( "#user" ).on( "keydown", function(event) {
		if(event.which == 13) {
			verificarUsuario();
		}
    });

    function verificarUsuario(){
    	var pass = $("#pass").val();
		var user = $("#user").val();
		$.post("../scripts/login.php", {user:user, pass:pass}, function(data){

			if(data.length == 0){
				$("#pass").val("");
				$("#user").val("");
				$("#not-found").show().fadeOut(3000);
			}else{
				if (typeof(Storage) !== "undefined") {
				    // Store
					sessionStorage.setItem("name", data.name);
					sessionStorage.setItem("cpf", data.cpf);
					sessionStorage.setItem("phone", data.phone);
					sessionStorage.setItem("mail", data.mail);
					location="../userarea.html";
				}
			}
		}, 'json');
    }
});