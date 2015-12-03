<?php
	$conexao = mysqli_connect("localhost","root", "senha123"); 
	$db = mysqli_select_db($conexao, "dbfrangocroc");
	
	if (!$conexao) 
		die ("Sistema indisponível no momento,contacte nossa equipe e informe o seguinte erro ocorreu -> ".mysql_error());
?>