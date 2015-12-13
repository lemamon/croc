<?php
	include_once("conexao.php");

	$query = "SELECT * FROM tb_menu ORDER BY product_name ASC";

	$result = mysqli_query($conexao, $query) or die ("Falha ao consultar.");

	$data = array();
	while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    	$data[] = array(
        	"id" => $row['id'], 
        	"product_name" => $row['product_name'], 
        	"price" => $row['price'],
        	"description" => $row['description'],
        	"photo_address" => $row['photo_address']
    	);
	}

	echo json_encode($data);
	//print_r($data);
	
?>