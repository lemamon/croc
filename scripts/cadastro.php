<?php
	
	include_once("conexao.php");

	$name = $_POST["name"];
	$cpf = $_POST["cpf"];
	$adress = $_POST["adress"];
	$mail = $_POST["mail"];
	$phone = $_POST["phone"];
	$senha = $_POST["senha"];
	
	$query = "INSERT INTO `tb_user`(`cpf`, `name`, `address`, `phone`, `mail`, `senha`)  VALUES ('$cpf', '$name', '$adress', '$phone', '$mail', '$senha')";
	
	mysqli_query($conexao, $query);
	
	echo "<script>Alert('Cadastro Realizado com sucesso');</script>";
?>