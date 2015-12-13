$(function(){
	$(".modal-trigger").leanModal();
	carregarCardapio();

	$("#btn-salvar").click(function(){
		salvar();
	});

    $("#btn-cancelar").click(function(){
        location.reload();
    });

	function salvar(){
		var form = document.getElementById('form_cadastro_produto');
		var formData = new FormData(form);

		var xhr = new XMLHttpRequest();
		xhr.open('POST', "../croc/scripts/cadastro_cardapio.php", true);
		xhr.send(formData);	

		 // notice that the event handler is on xhr and not xhr.upload
    	xhr.addEventListener('readystatechange', function(e) {
      		if( this.readyState === 4 ) {
        		// the transfer has completed and the server closed the connection.
        		location.reload();
      		}
    	});
	}

    function atualizar(){
        var form = document.getElementById('form_editar_produto');
        var formData = new FormData(form);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', "../croc/scripts/editar_cardapio.php", true);
        xhr.send(formData); 

         // notice that the event handler is on xhr and not xhr.upload
        xhr.addEventListener('readystatechange', function(e) {
            if( this.readyState === 4 ) {
                // the transfer has completed and the server closed the connection.
                //location.reload();
                console.log(xhr.responseText);
            }
        });
    }

	function carregarCardapio(){
		// carregando todos os produtos ativos do 
		// cardápio
		$.get("../croc/scripts/listar_cardapio.php", function(data){
			var content  = $(".lista-cardapio").html();
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
				content  +="<span class='card-title red'><span class='product-name'>"+product_name+"</span><br><span class='price'>R$ "+price+"</span></span>";
                content  +="</div><div class='card-content'>"+description+"</div>";
                content	 +=	"<div class='card-action'><a href='#modal_editar_produto' class='modal-trigger trigger' data-id='"+id+"'>Editar</a>";
                content  += "</div></div></div>";
				$(".lista-cardapio").html(content);
                $(".modal-trigger").leanModal();
                $("#btn-edit-salvar").click(function(){
                    $("#hidden_photo").val($(".file-path-edit").val());
                    atualizar();
                });

                $(".trigger").click(function(){
                    $("#modal_editar_produto h5.modal_header").html("Edição de produto no cardápio");
                    console.log("asdf");
                    preencherCampos($(this).attr('data-id'));
                });
    		}
		}, 'json');
	}

    

    function preencherCampos(id){
        $.get("../croc/scripts/buscar_item_cardapio.php", {id:id}, function(data){

            var price = data.price;
            price = parseFloat(price);
            price = price.toFixed(2);
            price = price.toString();
            price = price.replace(".",",");

            $("#product_name_edit").val(data.product_name);
            $("#id_edit").val(data.id);
            
            var img = data.photo_address;

            if(img != ""){
                img = "img/"+img;
            }
            
            $(".product_edit_img").attr("src", img);
            $("#price_edit").val(price);
            console.log(data.active);
            if(data.active == 1){
                $("#active").attr("checked","checked");
            }else{
                $("#active").removeAttr("checked");
            }
            $("#description_edit").val(data.description);
            $("#modal_editar_produto label").addClass("active");
            $("#file-path-edit").val(data.photo_address);

        }, 'json');
    }

});