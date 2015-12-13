<?php
	include_once("conexao.php");

	$uploaddir = "../img/";
	$uploadfile = $uploaddir . basename($_FILES['photo']['name']);
	move_uploaded_file($_FILES['photo']['tmp_name'], $uploadfile);

	$product_name = $_POST["product_name"];
	$price        = $_POST["price"];
	$price = str_replace(",", ".", $price);

	$description  = $_POST["description"];
	$photoname    = $_FILES['photo']['name'];

	$query = "INSERT INTO tb_menu(product_name, price, description, photo_address) VALUES ('".$product_name."',".$price.",'".$description."', '".$photoname."')";

	mysqli_query($conexao, $query) or die ("Erro ao inserir.");
	
?>