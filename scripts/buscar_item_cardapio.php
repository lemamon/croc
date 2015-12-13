<?php
	include_once("conexao.php");

	$id = $_GET["id"];

	$query = "SELECT * FROM tb_menu WHERE id = ". $id;

	$result = mysqli_query($conexao, $query) or die ("Falha ao consultar.");
	$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
	echo json_encode($row);	
?>