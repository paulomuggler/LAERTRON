function pag1Transitions(){

	$('#btnEntra').attr('disabled', 'disabled'); //Disable

	setTimeout(function(){

		//$('#bem-vindo').addClass('scale_in');
		$('#bem-vindo').addClass('border');
		$('#bem-vindo').addClass('enter-bottom');
		
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
							},80);
						},2100);
					},600);
				},600);
			},600);
		},2800);
	},100);
	


	$( "#btnEntra" ).click(function() {
		$('#bem-vindo').addClass("exit-top");
		$('#bem-vindo').removeClass('border');
		pag2Transitions(); 
	});        

}

function pag2Transitions(){

	$('#mostraCores').addClass('border');

	$('#btnCriar').attr('disabled', 'disabled'); //Disable

	$('#mostraCores #seletor-cores input').attr('disabled', 'disabled');
	$('#mostraCores #seletor-cores input').addClass('transparent');

	$('#pag2_fundo_A').addClass("enter-bottom");
	$('#pag2_fundo_A').removeClass("transparent");
	setTimeout(function(){

		//$('#pag2_fundo_A').addClass("bkg-fadein");

		setTimeout(function(){
			
			$('#pag2_fundo_A').addClass("transparent");
			$('#pag2_fundo_C_azul').removeClass("transparent");

			setTimeout(function(){
				
				$('#pag2_fundo_C_azul').addClass("transparent");
				$('#pag2_fundo_B_verde').removeClass("transparent");

				setTimeout(function(){
					$('#pag2_fundo_B_verde').addClass("transparent");
					$('#pag2_fundo_C_azul').removeClass("transparent");

					setTimeout(function(){
						$('#pag2_fundo_C_azul').addClass("transparent");
						$('#pag2_fundo_B_verde').removeClass("transparent");


						setTimeout(function(){
						
							$('#pag2_fundo_D_overlay').addClass("bkg-fadein");
							$('#pag2_fundo_D_overlay').removeClass("transparent");
							//$('#pag2_fundo_B_verde').addClass("transparent");


							setTimeout(function(){
								$('#pag2_texto_selecione').addClass('enter-top');
								$('#pag2_texto_selecione').removeClass("transparent");
								
								dT=250;		
								setTimeout(function(){
									$('#pag2_texto_minotauro').addClass('enter-right');
									$('#pag2_texto_minotauro').removeClass("transparent");
									setTimeout(function(){
										$('#pag2_texto_espelho').addClass('enter-right');
										$('#pag2_texto_espelho').removeClass("transparent");
										setTimeout(function(){
											$('#pag2_texto_totens').addClass('enter-right');
											$('#pag2_texto_totens').removeClass("transparent");
											setTimeout(function(){
												$('#pag2_texto_jogo').addClass('enter-right');
												$('#pag2_texto_jogo').removeClass("transparent");
												setTimeout(function(){
													$('#pag2_texto_roda').addClass('enter-right');
													$('#pag2_texto_roda').removeClass("transparent");

													setTimeout(function(){
														$('#pag2_botoes_cores').addClass("title-fadein");
														$('#pag2_botoes_cores').removeClass("transparent");
														
														pag2_seletor_cores();

														$('#mostraCores #seletor-cores input').removeAttr('disabled');;
														$('#mostraCores #seletor-cores input').addClass('title-fadein');
														$('#mostraCores #seletor-cores input').removeClass('transparent');

													},750);
												},dT);
											},dT);
										}, dT);
									}, dT);
								},1300);
							},125);
						},1000);
					},500);
				},500);
			},1500);
		},1800);
	},100);

	$( "#btnCriar" ).click(function() {
		$('#mostraCores').addClass("exit-top");
		$('#mostraCores').removeClass('border');
		pag3Transitions();
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
	},1200);
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

	$('#aTira').addClass('border');

	$('#btnFb').attr('disabled', 'disabled');
	$('#btnRestart').attr('disabled', 'disabled');

	$('#pag3_fundo').addClass("enter-bottom");
	$('#pag3_fundo').removeClass("transparent");

	setTimeout(function(){

		//mostra_nova_tira();

		setTimeout(function(){

			sorteio_animado();
		
			setTimeout(function(){
				$('#pag3_titulo').addClass("enter-top");
				$('#pag3_titulo').removeClass("transparent");
				
				setTimeout(function(){
					$('#pag3_compartilhe').addClass("bkg-fadein");
					$('#pag3_compartilhe').removeClass("transparent");
					
					setTimeout(function(){
						//$('#pag3_compartilhe').addClass("bkg-fadein");
						//$('#pag3_compartilhe').removeClass("transparent");

						$('#pag3_fb').addClass("bkg-fadein");
						$('#pag3_fb').removeClass("transparent");
						$('#btnFb').removeAttr('disabled');
					}, 1000);
				}, 2000);
			},10000);
		},1000);
	},100);

	$( "#btnRestart" ).click(function() {
		location.reload();
	});

	setTimeout(function(){location.reload();},60*1000*3);

}

function disableTouchScrolling() {
    document.ontouchmove = function(e){
            e.preventDefault();
    }
}

$(function(){ 
	$("#btnFb" ).click(
		function( event ) {
        $('#btnFb').attr('disabled', 'disabled');

        $('#pag3_titulo').addClass('bkg-fadeout');
        $('#pag3_compartilhe').addClass('bkg-fadeout');
        $('#pag3_fb').removeClass("bkg-fadein");
        $('#pag3_fb').addClass('pisca-rapido');

        FB.login(function(response) {

          console.log(response);
          if(response.status && response.status === 'connected'){
	          //var uid = response.authResponse.userID;
	          //console.log(uid);
				    FB.api('/me', function(response) {
				      console.log(response);

				      if(response.name){
		    		  	fb_user_name = response.name;
		    		  	message = "LAERTRON! Uma tirinha exclusiva do Laerte pra você, "+fb_user_name+"!";
		    		  }else{
		    		  	fb_user_name = "";
		    		  	message = "LAERTRON! Uma tirinha exclusiva do Laerte pra você!";
		    		  }

	          	FB.api("/me/permissions", function(response){ 
	          		console.log(response);

	            	var data_length = response.data && response.data.length ? response.data.length : 0;
	            	var permissions = data_length > 0 ? response.data[0] : {};

		            if (permissions["publish_stream"]) {
		                            
		              postaNoFace(FB.getAccessToken(), "LAERTRON.png", "image/png", document.getElementById("stripCanvas"), message, fb_post_callback);
		              upload_timeout_func = setTimeout(timeout_error, 60000);

		            } else {
		              erro_fb();
		              /*
		              setTimeout(function(){
		                $("#btnFb").click();
		              },1500);
		              */
		            }
		          });

	          //refazer click
	          //alert("novo login!");
	          //$("#btn_save").click();
				    });
					}else{
						erro_fb();
					}
		    }, {scope: 'photo_upload, publish_stream, user_photos'});
          
      
      });
});

$(window).load(function() {
	// $('bem-vindo').webkitRequestFullScreen();
	disableTouchScrolling();
	FB.getLoginStatus(logoutSessionIfAuthenticated);
	pag1Transitions();
});