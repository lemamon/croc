$(function(){

	$("#not-found").hide();
	if (typeof(Storage) !== "undefined") {
	    // Store
		if(sessionStorage.getItem("name") != null){
			location="../userarea.html";	
		}
	}

	$("#btEntrar").click(function(){
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