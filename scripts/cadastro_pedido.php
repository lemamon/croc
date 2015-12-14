<?php
	include_once("conexao.php");
	session_start();
	$id_cliente = $_SESSION["id"];

	$total_order  = $_POST['totalOrder'];
	
	$query = "INSERT INTO tb_order (total_price, user_id) VALUES ('".$total_order."', '".$id_cliente."')";
	echo $query;
	mysqli_query($conexao, $query) or die("Erro ao inserir pedido pai. <br>".mysqli_error($conexao));
?>