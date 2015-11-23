<?php

	$name = $_POST["name"];
	$cpf = $_POST["cpf"];
	$adress = $_POST["adress"];
	$mail = $_POST["mail"];
	$phone = $_POST["phone"];
	$senha = $_POST["senha"];
	
	$conexao = mysql_connect("localhost","root"); 
	$db = mysql_select_db("dbfrangocroc", $conexao);
	
	if (!$conexao) 
		die ("Sistema indisponível no momento,contacte nossa equipe e informe o seguinte erro ocorreu -> ".mysql_error());
		
	$query = "INSERT INTO `tb_user`(`cpf`, `name`, `adress`, `phone`, `mail`, `senha`)  VALUES ('$cpf', '$name', '$adress', '$phone', '$mail', '$senha')";
	
	
	mysql_query($query, $conexao);
	
	echo "<script>Alert('Cadastro Realizado com sucesso');</script>";
?>