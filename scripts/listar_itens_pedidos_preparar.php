<?php
	include_once("conexao.php");
	session_start();
	$orderId = $_GET["orderId"];
	$query =  "SELECT i.quantity AS 'QTDE', m.description AS 'DESCRIPTION', ";
	$query .= "m.photo_address AS 'PHOTO_ADDRESS' FROM tb_items i, tb_menu m  WHERE i.order_id=".$orderId." AND m.id=i.menu_id";
	$result = mysqli_query($conexao, $query);

	$data = array();
	while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    	$data[] = array(
        	"qtde" => $row['QTDE'], 
        	"description" => $row['DESCRIPTION'], 
        	"photo_address" => $row['PHOTO_ADDRESS'],
    	);
	}
	echo json_encode($data);
?>

