<?php
	include_once("conexao.php");
	session_start();
	$id = $_SESSION["id"];
	$query = "SELECT * FROM tb_order";	
	$result = mysqli_query($conexao, $query) or die ("Erro ao buscar pedidos. <br>".mysqli_error($conexao));

	$data = array();
	while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

		$query2 = "SELECT count(*) AS 'qtde' FROM tb_items WHERE order_id = ".$row['id'];
		$result2 = mysqli_query($conexao, $query2) or die ("Erro ao trazer quantidade de itens por pedido.".mysqli_error($conexao));
		$qtde_itens = mysqli_fetch_array($result2);

    	$data[] = array(
        	"id" => $row['id'], 
        	"date_time" => $row['date_time'], 
        	"total_price" => $row['total_price'],
        	"user_id" => $row['user_id'],
        	"total_itens" => $qtde_itens['qtde']
    	);
	}
	echo json_encode($data);
?>

