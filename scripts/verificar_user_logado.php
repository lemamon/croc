<?php
	session_start();
	$arr = [];
	if(isset($_SESSION["cpf"])){
		$arr = array("cpf"=>$_SESSION["cpf"],
					 "name"=>$_SESSION["name"],
					 "mail"=>$_SESSION["mail"],
					 "phone"=>$_SESSION["phone"]
					);
	}
	echo json_encode($arr, true);	
?>