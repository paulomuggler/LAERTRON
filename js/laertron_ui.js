function pag1Transitions(){

	$('#btnEntra').attr('disabled', 'disabled'); //Disable

	setTimeout(function(){

	  $('#laertron_pag1_fundo_todo').addClass("bkg-fadein");
	  $('#laertron_pag1_fundo_todo').removeClass("transparent");

	  /*
	  $('#pag1_fundo_A_rosa').addClass("bkg-fadein");
	  $('#pag1_fundo_B_verde').addClass("bkg-fadein");
	  $('#pag1_fundo_A_rosa').removeClass("transparent");
	  $('#pag1_fundo_B_verde').removeClass("transparent");
	  */

	  setTimeout(function(){
	    
	    $('#pag1_titulo_B_rosa_frente').addClass("title-fadein");
	    $('#pag1_titulo_A_azul_tras').addClass("title-fadein");
	    $('#pag1_titulo_B_rosa_frente').removeClass("transparent");
	    $('#pag1_titulo_A_azul_tras').removeClass("transparent");
	   
	  },1333);


	  setTimeout(function(){
	    $('#pag1_botao_A_rosa_tras').addClass("enter-left");
	    $('#pag1_botao_B_azul_frente').addClass("enter-bottom");
	    $('#btnEntra').addClass("enter-bottom");
	    $('#pag1_botao_A_rosa_tras').removeClass("transparent");
	    $('#pag1_botao_B_azul_frente').removeClass("transparent");
	  }, 2666);

	  setTimeout(function(){
	    $('#pag1_botao_C_texto_entre').removeClass("transparent");
	    $('#pag1_botao_C_texto_entre').addClass("pisca-rapido");
	    $('#btnEntra').removeAttr('disabled');
	    //alert("Hello")
	    },4000);

	},100);


	$( "#btnEntra" ).click(function() {
	$('#bem-vindo').addClass("exit-top");
	setTimeout(function(){
	  $('#bem-vindo').addClass("transparent");
	  pag2Transitions(); 
	}, 500);
	//alert("Hello");
	});        

}

function pag2Transitions(){

	$('#btnCriar').attr('disabled', 'disabled'); //Disable

	$('#mostraCores #seletor-cores input').attr('disabled', 'disabled');
	$('#mostraCores #seletor-cores input').addClass('transparent');

	setTimeout(function(){

	    //$('#pag2_fundo_todo').addClass("bkg-fadein");
	    $('#pag2_fundo_todo').removeClass("transparent");

	    setTimeout(function(){
	    	$('#pag2_texto_selecione').addClass('enter-top');
	    	$('#pag2_texto_selecione').removeClass("transparent");
	    }, 900);

	    tS=1800;
	    dT=225;
	    setTimeout(function(){
	    	$('#pag2_texto_minotauro').addClass('enter-left');
	    	$('#pag2_texto_minotauro').removeClass("transparent");
	    }, tS+dT);

	    setTimeout(function(){
	    	$('#pag2_texto_espelho').addClass('enter-left');
	    	$('#pag2_texto_espelho').removeClass("transparent");
	    }, tS+2*dT);

	    setTimeout(function(){
	    	$('#pag2_texto_totens').addClass('enter-left');
	    	$('#pag2_texto_totens').removeClass("transparent");
	    }, tS+3*dT);

	    setTimeout(function(){
	    	$('#pag2_texto_jogo').addClass('enter-left');
	    	$('#pag2_texto_jogo').removeClass("transparent");
	    }, tS+4*dT);


	    setTimeout(function(){
	    	$('#pag2_texto_roda').addClass('enter-left');
	    	$('#pag2_texto_roda').removeClass("transparent");
	    }, tS+5*dT);

	    setTimeout(function(){
	    	$('#pag2_botoes_cores').addClass("title-fadein");
	    	$('#pag2_botoes_cores').removeClass("transparent");
	    	
    		$('#mostraCores #seletor-cores input').removeAttr('disabled');;
    		$('#mostraCores #seletor-cores input').addClass('title-fadein');
			$('#mostraCores #seletor-cores input').removeClass('transparent');
	    	
	    }, 4000);

	    /*
	    $('#pag1_fundo_A_rosa').addClass("bkg-fadein");
	    $('#pag1_fundo_B_verde').addClass("bkg-fadein");
	    $('#pag1_fundo_A_rosa').removeClass("transparent");
	    $('#pag1_fundo_B_verde').removeClass("transparent");
	    */
/*
	    setTimeout(function(){
	      
	      $('#pag2_titulo_B_rosa_frente').addClass("title-fadein");
	      $('#pag2_titulo_A_azul_tras').addClass("title-fadein");
	      $('#pag2_titulo_B_rosa_frente').removeClass("transparent");
	      $('#pag2_titulo_A_azul_tras').removeClass("transparent");
	      
	    },1333);
*/
	    //alert("Hello")

	    setTimeout(function(){
	      $('#pag2_botao_A_preto_tras').addClass("enter-left");
	      $('#pag2_botao_B_branco_frente').addClass("enter-bottom");
	      $('#btnEntra').addClass("enter-bottom");
	      $('#pag2_botao_A_preto_tras').removeClass("transparent");
	      $('#pag2_botao_B_branco_frente').removeClass("transparent");
	    }, 4000);

	    setTimeout(function(){
	      $('#pag2_botao_C_texto_criar').removeClass("transparent");
	      $('#pag2_botao_C_texto_criar').addClass("pisca-rapido");
	      $('#btnCriar').removeAttr('disabled');
	      //alert("Hello")
	      },6000);

	  },333);


	$( "#btnCriar" ).click(function() {
	  $('#mostraCores').addClass("exit-top");
	  setTimeout(function(){
	   $('#mostraCores').addClass("transparent");
	   pag3Transitions();
	  }, 500);
	  //alert("Hello");
	});        

}

function pag3Transitions(){

	$('#pag3_fundo').removeClass("transparent");
	mostra_nova_tira();
	sorteio_animado();

	setTimeout(function(){
		$('#pag3_titulo').addClass("enter-top");
		$('#pag3_titulo').removeClass("transparent");
	}, 6500);

	setTimeout(function(){
		$('#pag3_compartilhe').addClass("bkg-fadein");
		$('#pag3_compartilhe').removeClass("transparent");
	}, 7000);
	

	setTimeout(function(){
		$('#pag3_fb').addClass("bkg-fadein");
		$('#pag3_fb').removeClass("transparent");
	}, 7500);

}