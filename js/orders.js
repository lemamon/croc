$(function(){
	// carregando todos os produtos ativos do $(".qtde").hide();
	// cardápio
	var totalOrder = 0.0;
	$.get("../croc/scripts/listar_cardapio_ativos.php", function(data){
		var content  = $("#items_cardapio").html();
    	for(var i = 0; i < data.length; i++){
			var id = data[i].id;
    		var img = data[i].photo_address;
    		var product_name = data[i].product_name;
			var price = data[i].price;
			price = parseFloat(price);
			price = price.toFixed(2);
			price = price.toString();
			price = price.replace(".",",");

			var description = data[i].description;
			if(img != ""){
				img = "img/"+img;
			}
			
			content  += "<div class='col s6 m7'><div class='card small'><div class='card-image'><img src='"+img+"'>";
			content  += "<span class='card-title red'><span class='product-name'>"+product_name+"</span><br><span id='price"+id+"'>R$ "+price+"</span></span>";
            content  += "</div><div class='card-content'>"+description+"</div>";
            content	 +=	"<div class='card-action'>";
            content  += "<input placeholder='Quantidade' id='qtde"+id+"' type='text' style='width:17%'>";
            content  += "<a href='#' class='modal-trigger geo-trigger' id='addToOrder"+id+"'>Adicionar ao pedido</a>";
            content  += "<span id='result"+id+"'></span>";
            content  += "</div></div></div>";
			$("#items_cardapio").html(content);
			$(".geo-trigger").click(function(){
				var id = $(this).attr("id");
				id = id.toString();
				id = id.replace("addToOrder","");

				var qtdeValue = $("#qtde"+id).val();
				qtdeValue = parseInt(qtdeValue);
				var itemPrice = $("#price"+id).text();
				itemPrice = itemPrice.replace("R$ ", "");
				itemPrice = itemPrice.replace(",", ".");
				itemPrice = parseFloat(itemPrice);
				totalOrder += (itemPrice * qtdeValue);

				var totalPedidoMostrar = totalOrder.toFixed(2);
				totalPedidoMostrar = totalPedidoMostrar.toString();
				totalPedidoMostrar = totalPedidoMostrar.replace(".",",");

				$(".total-order-price").text("Total do pedido: R$ " + totalPedidoMostrar);
			});
		}
	}, 'json');

	$(".cancel-order").click(function(){
		$("#modal_fazer_pedido input[type='text']").val("");
		totalOrder = 0.0;
		$(".total-order-price").text("");
	});

	$(".bt-order").click(function(){

		// Cadastrando o pedido
		$.post("../croc/scripts/cadastro_pedido.php", {totalOrder:totalOrder}, function(data){
			console.log(data);
		},'text');


		$("#modal_fazer_pedido input[type='text']").each(function(i, e){
			var qtde = $(this).val();
			qtde = parseInt(qtde);

			if(qtde > 0){
				var id = $(this).attr("id");
				id = id.toString();
				id = id.replace("qtde","");	

				// Cadastrando os itens pedido
				$.post("../croc/scripts/cadastro_itens_pedido.php", {id:id, qtde:qtde}, function(data){
					console.log(data);
				},'text');
			}
		});

		$("#modal_fazer_pedido input[type='text']").val("");
		totalOrder = 0.0;
		$(".total-order-price").text("");
		location.reload();
	});
	console.log("sdfasfasfafas manaus");

	$.get("../croc/scripts/listar_pedidos.php", function(data){
		if(data.length >= 1){
			$(".zero-pedidos").hide();
			$(".pedidos").show();

			var dados_pedidos = $(".dados-pedidos").html();
			var dados_pedidos_content = "";
			for(var i = 0; i < data.length; i++){
				console.log(data[i].id);
				console.log(data[i].total_itens);
				dados_pedidos_content  +=  "<div class='col s12 m6' style='width:25%'>";
	            dados_pedidos_content  +=  "<div class='card blue-grey darken-1'>";
	            dados_pedidos_content  +=  "<div class='card-content white-text'>";
	            dados_pedidos_content  +=  "<span class='card-title'>Pedido Novo <br/> "+data[i].total_itens+" item(ns). </span>";
	            dados_pedidos_content  +=  "</div>";
	            dados_pedidos_content  +=  "<div class='card-action'>";
				dados_pedidos_content  +=  "<a href='#'>Mais detalhes</a>";
	            dados_pedidos_content  +=  "</div>";
	            dados_pedidos_content  +=  "</div>";
	            dados_pedidos_content  +=  "</div>";
			}
			$(".dados-pedidos").html(dados_pedidos_content);

		}else{
			$(".zero-pedidos").show();
			$(".pedidos").hide();
		}
	},'json');


	$.get("../croc/scripts/listar_pedidos_preparar.php", function(data){
		console.log(data);
		console.log(data.length);
		if(data.length >= 1){
			$(".zero-pedidos").hide();
			$(".pedidos").show();

			var dados_pedidos = $(".dados-pedidos").html();
			var dados_pedidos_content = "";
			for(var i = 0; i < data.length; i++){
				dados_pedidos_content  +=  "<div class='col s12 m6' style='width:25%'>";
	            dados_pedidos_content  +=  "<div class='card blue-grey darken-1'>";
	            dados_pedidos_content  +=  "<div class='card-content white-text'>";
	            dados_pedidos_content  +=  "<span class='card-title'>Pedido para Preparar <br/> "+data[i].total_itens+" item(ns). </span>";
	            dados_pedidos_content  +=  "</div>";
	            dados_pedidos_content  +=  "<div class='card-action'>";
				dados_pedidos_content  +=  "<a href='#detalhes_pedido' class='modal-trigger detalhes-trigger' data-id='"+data[i].id+"'>Mais detalhes</a>";
	            dados_pedidos_content  +=  "</div>";
	            dados_pedidos_content  +=  "</div>";
	            dados_pedidos_content  +=  "</div>";
			}
			$(".dados-pedidos").html(dados_pedidos_content);
			$(".modal-trigger").leanModal();

			$(".detalhes-trigger").click(function(){
				var orderId = $(this).attr('data-id');
				$.get("../croc/scripts/listar_itens_pedidos_preparar.php", {orderId, orderId}, function(data){
					var content = "";

					for(var i = 0; i < data.length; i++){
						var img = data[i].photo_address;
						var product_name = data[i].description;
						if(img != ""){
							img = "img/"+img;
						}
						content  += "<div class='col s6 m7'><div class='card small'><div class='card-image'><img src='"+img+"'>";
						content  += "<span class='card-title red'><span class='product-name'>"+product_name+"</span></span>";
			            content  += "</div><div class='card-content'>Quantidade:"+data[i].qtde+"</div>";
			            content	 +=	"</div></div>";
					}

					$(".lst-itens").html(content);
				},'json');
			});

		}else{
			$(".zero-pedidos").show();
			$(".pedidos").hide();
		}
	},'json');
});