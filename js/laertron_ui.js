function pag1Transitions(){

	$('#btnEntra').attr('disabled', 'disabled'); //Disable

	setTimeout(function(){

		$('#bem-vindo').addClass('open_height');
		
		$('#pag1_fundo_B_verde').addClass("bkg-fadein");
		$('#pag1_fundo_B_verde').removeClass("transparent");

		setTimeout(function(){
			$('#pag1_fundo_B_verde').addClass("transparent");
			$('#pag1_fundo_B_verde').removeClass("bkg-fadein");
			$('#pag1_fundo_A_rosa').removeClass("transparent");

			setTimeout(function(){
				$('#pag1_fundo_A_rosa').addClass("transparent");
				$('#pag1_fundo_B_verde').removeClass("transparent");

				setTimeout(function(){
					$('#pag1_fundo_B_verde').addClass("transparent");
					$('#laertron_pag1_fundo_todo').removeClass("transparent");

					setTimeout(function(){
					
						$('#pag1_titulo_A_azul_tras').addClass("rotate_popin");
						$('#pag1_titulo_A_azul_tras').removeClass("transparent");
						
						$('#pag1_titulo_B_rosa_frente').addClass("rotate_popin");
						$('#pag1_titulo_B_rosa_frente').removeClass("transparent");

						//$('#pag1_titulo').addClass("rotate_popin");
						//$('#pag1_titulo').removeClass("transparent");

						setTimeout(function(){
							$('#pag1_botao_B_rosa_tras').addClass("enter-right-slow");
							$('#pag1_botao_B_rosa_tras').removeClass("transparent");
							
							setTimeout(function(){
								$('#pag1_botao_A_azul_frente').addClass("enter-bottom");
								$('#pag1_botao_A_azul_frente').removeClass("transparent");

								setTimeout(function(){
									$('#pag1_botao_C_texto_entre').removeClass("transparent");
									$('#pag1_botao_C_texto_entre').addClass("pisca-rapido");
									$('#btnEntra').removeAttr('disabled');
									//alert("Hello")
								},800);
							},950);
						},2400);
					},800);
				},800);
			},800);
		},2800);
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

function pag1piscafundo(){

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
				$('#pag2_texto_minotauro').addClass('enter-right');
				$('#pag2_texto_minotauro').removeClass("transparent");
			}, tS+dT);

			setTimeout(function(){
				$('#pag2_texto_espelho').addClass('enter-right');
				$('#pag2_texto_espelho').removeClass("transparent");
			}, tS+2*dT);

			setTimeout(function(){
				$('#pag2_texto_totens').addClass('enter-right');
				$('#pag2_texto_totens').removeClass("transparent");
			}, tS+3*dT);

			setTimeout(function(){
				$('#pag2_texto_jogo').addClass('enter-right');
				$('#pag2_texto_jogo').removeClass("transparent");
			}, tS+4*dT);


			setTimeout(function(){
				$('#pag2_texto_roda').addClass('enter-right');
				$('#pag2_texto_roda').removeClass("transparent");
			}, tS+5*dT);

			setTimeout(function(){
				$('#pag2_botoes_cores').addClass("title-fadein");
				$('#pag2_botoes_cores').removeClass("transparent");
				
				$('#mostraCores #seletor-cores input').removeAttr('disabled');;
				$('#mostraCores #seletor-cores input').addClass('title-fadein');
			$('#mostraCores #seletor-cores input').removeClass('transparent');

			pag2_seletor_cores();
				
			}, 4000);

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

function pag2_mostra_botao_criar(){
		
	$('#pag2_botao_B_branco_frente').addClass("enter-left");
	$('#pag2_botao_B_branco_frente').removeClass("transparent");

	setTimeout(function(){
		$('#pag2_botao_A_preto_tras').addClass("enter-left");
		$('#pag2_botao_A_preto_tras').removeClass("transparent");
	},250);

	setTimeout(function(){
		$('#pag2_botao_C_texto_criar').removeClass("transparent");
		$('#pag2_botao_C_texto_criar').addClass("pisca-rapido");
		$('#btnCriar').removeAttr('disabled');
		//alert("Hello")
	},2100);
}


var row0Selected = false;
var row1Selected = false;
var row2Selected = false;
var row3Selected = false;
var row4Selected = false;

function unsetSelVars(){
row0Selected = false;
row1Selected = false;
row2Selected = false;
row3Selected = false;
row4Selected = false;
}

function pag2_seletor_cores(){

	$('#mostraCores #seletor-cores').change(function(){pag2_mostra_botao_criar();});
			
				$('#row_minotautro input').click(function() {
					$('#row_minotautro input').removeClass('selected');
					$(this).toggleClass('selected');
					row0Selected=true;
					if(row0Selected && row1Selected && row2Selected && row3Selected && row4Selected ){
						unsetSelVars();
						$('#mostraCores #seletor-cores').trigger( "change" );
						
					}
					//alert("woo");
				});

				$('#row_espelho input').click(function() {
					$('#row_espelho input').removeClass('selected');
					$(this).toggleClass('selected');

					row1Selected=true;
					if(row0Selected && row1Selected && row2Selected && row3Selected && row4Selected ){
						unsetSelVars();
						$('#mostraCores #seletor-cores').trigger( "change" );
					}
					//alert("woo");
				});

				$('#row_totens input').click(function() {
					$('#row_totens input').removeClass('selected');
					$(this).toggleClass('selected');

					row2Selected=true;
					if(row0Selected && row1Selected && row2Selected && row3Selected && row4Selected ){
						unsetSelVars();
						$('#mostraCores #seletor-cores').trigger( "change" );
					}
					//alert("woo");
				});

				$('#row_jogo input').click(function() {
					$('#row_jogo input').removeClass('selected');
					$(this).toggleClass('selected');

					row3Selected=true;
					if(row0Selected && row1Selected && row2Selected && row3Selected && row4Selected ){
						unsetSelVars();
						$('#mostraCores #seletor-cores').trigger( "change" );
					}
					//alert("woo");
				});

				$('#row_roda input').click(function() {
					$('#row_roda input').removeClass('selected');
					$(this).toggleClass('selected');

					row4Selected=true;
					if(row0Selected && row1Selected && row2Selected && row3Selected && row4Selected ){
						unsetSelVars();
						$('#mostraCores #seletor-cores').trigger( "change" );
					}
					//alert("woo");
				});
}

function pag3Transitions(){

	$('#btnFb').attr('disabled', 'disabled');
	$('#btnRestart').attr('disabled', 'disabled');
	$('#pag3_fundo').removeClass("transparent");
	mostra_nova_tira();
	setTimeout(function(){sorteio_animado();},1000);
	
	setTimeout(function(){
		$('#pag3_titulo').addClass("enter-top");
		$('#pag3_titulo').removeClass("transparent");
	}, 4000);

	setTimeout(function(){
		$('#pag3_compartilhe').addClass("bkg-fadein");
		$('#pag3_compartilhe').removeClass("transparent");
	}, 5000);
	

	setTimeout(function(){
		$('#pag3_fb').addClass("bkg-fadein");
		$('#pag3_fb').removeClass("transparent");
		$('#btnFb').removeAttr('disabled');
	}, 6000);

	$( "#btnRestart" ).click(function() {
		location.reload();
	}); 

}