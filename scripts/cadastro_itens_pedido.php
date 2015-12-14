<?php
	include_once("conexao.php");
	session_start();
	$id_cliente = $_SESSION["id"];
	$id_produto = $_POST["id"];
	$qtde = $_POST["qtde"];
	
	$query = "SELECT * FROM tb_order WHERE user_id = '".$id_cliente."' ORDER BY date_time DESC LIMIT 1";
	$result  = mysqli_query($conexao, $query) or die ("Erro ao buscar pedido. ".mysqli_error($conexao));
	$dados = mysqli_fetch_array($result);

	$query = "INSERT INTO tb_items (quantity, order_id, menu_id) VALUES ('".$qtde."', '".$dados['id']."', '".$id_produto."')";
	mysqli_query($conexao, $query) or die ("Erro ao inserir item. ".mysqli_error($conexao));
	
?>