<?php
	include_once("conexao.php");

	$user = $_POST["user"];
	$pass = $_POST["pass"];

	$user = htmlspecialchars($user);
	$pass = htmlspecialchars($pass);

	$query = "SELECT * FROM tb_user WHERE (phone = '$user' OR mail = '$user') AND senha = '$pass'";
	$result = mysqli_query($conexao, $query);
	$num_rows = mysqli_num_rows($result);
	$dados = array();
	if($num_rows > 0){
		$dados = mysqli_fetch_array($result, MYSQLI_ASSOC);	

		session_start();
		$_SESSION["cpf"] = $dados["cpf"];
		$_SESSION["name"] = $dados["name"];
		$_SESSION["mail"] = $dados["mail"];
		$_SESSION["phone"] = $dados["phone"];
		$_SESSION["admin"] = $dados["admin"];
	}
	echo json_encode($dados);
?>