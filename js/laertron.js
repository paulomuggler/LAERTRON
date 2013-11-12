var qA, qB, qC, qD;
var indices;
var max_quadros = 31;
var initi = false;

function init() {

  initi = true;

  indices = [];

  qA = new Image();
  qB = new Image();
  qC = new Image();
  qD = new Image();


  var canvas = document.getElementById('stripCanvas');
  var context = canvas.getContext('2d');

  qA.onload = function() {
    context.drawImage(qA, 0, 0);
  };

  qB.onload = function() {
    context.drawImage(qB, 876, 0);
  };

  qC.onload = function() {
    context.drawImage(qC, 2*876, 0);
  };

  qD.onload = function() {
    context.drawImage(qD, 3*876, 0);
  };

}

function generate() {


  indices[0] = Math.floor((Math.random()*max_quadros)+1);  
  indices[1] = Math.floor((Math.random()*max_quadros)+1);  
  indices[2] = Math.floor((Math.random()*max_quadros)+1);  
  indices[3] = Math.floor((Math.random()*max_quadros)+1);
  

}

function display(idxes){

  qA.src = './img/quadrinhos/A/A'.concat(idxes[0],'.png');
  qB.src = './img/quadrinhos/B/B'.concat(idxes[1],'.png');
  qC.src = './img/quadrinhos/C/C'.concat(idxes[2],'.png');
  qD.src = './img/quadrinhos/D/D'.concat(idxes[3],'.png');

}

function gera_quadro(img, idx1){
  dice = Math.floor((Math.random()*max_quadros)+1);
  img.src = './img/quadrinhos/'.concat(idx1,'/'.concat(idx1,dice,'.png'));
}

function mostra_nova_tira(){
  if(!initi) init();
  gera_quadro(qA, 'A');
  gera_quadro(qB, 'B');
  gera_quadro(qC, 'C');
  gera_quadro(qD, 'D');
}

function sorteio_animado(){

  if(!initi) init();
  mostra_nova_tira();

  setTimeout(function(){

    tqA = setInterval(function(){
      gera_quadro(qA, 'A');
    },123);

    tqB = setInterval(function(){
      gera_quadro(qB, 'B');
    },78);

    tqC = setInterval(function(){
      gera_quadro(qC, 'C');
    },147);

    tqD = setInterval(function(){
      gera_quadro(qD, 'D');
    },97);

    setTimeout(function(){
      clearInterval(tqA);
      clearInterval(tqB);
      clearInterval(tqC);
      clearInterval(tqD);
    }, 7500);
  },1000);

}



function fb_post_callback(response) {

  clearTimeout(upload_timeout_func);

  console.log(response);

  res = JSON.parse(response.responseText);
	
	//$('#modal_loading').modal('hide')

	if (res.post_id) {
    /*
    var body = 'Mais uma tirinha aleatória criada no LAERTRON:';
    FB.api('/'+laertron_fb_page_id+'/feed', 'post', { message: body }, function(response) {
      if (!response || response.error) {
        alert('Error occured');
      } else {
        alert('Post ID: ' + response.id);
      }
    });
    */
    sucesso_fb();
  } else {
    erro_fb();
  }
  //FB.getLoginStatus(handleSessionResponse);
}

function erro_fb(){

  FB.getLoginStatus(logoutSessionIfAuthenticated);

  $('#pag3_fb').removeClass('pisca-rapido');
  $('#pag3_fb').addClass('transparent');

  $('#pag3_error').addClass('pisca-rapido');
  $('#pag3_error').removeClass('transparent');

  setTimeout(function(){
    $('#pag3_titulo').removeClass("bkg-fadeout");  
    $('#pag3_titulo').addClass("bkg-fadein");
    $('#pag3_titulo').removeClass("transparent");

    $('#pag3_compartilhe').removeClass("bkg-fadeout");
    $('#pag3_compartilhe').addClass("bkg-fadein");
    $('#pag3_compartilhe').removeClass("transparent");

    $('#pag3_error').removeClass('pisca-rapido');
    $('#pag3_error').addClass('transparent');

    $('#pag3_fb').addClass('bkg-fadein');
    $('#pag3_fb').removeClass('transparent');

    $('#btnFb').removeAttr('disabled');
    $('#btnFb').css('z-index',12);
    $('#btnRestart').css('z-index',10);

  },1333);
}

function sucesso_fb(){
  $('#pag3_fb').addClass('transparent');
  $('#pag3_fb').removeClass('pisca-rapido');

  $('#pag3_esuccess').addClass('bkg-fadein');
  $('#pag3_success').removeClass('transparent');

  $('#btnRestart').removeAttr('disabled');
  $('#btnRestart').css('z-index',12);
  $('#btnFb').css('z-index',10);

  FB.getLoginStatus(logoutSessionIfAuthenticated);

  setTimeout(function(){location.reload();},6666);
}

function timeout_error(e){
  erro_fb();
}

function logoutSessionIfAuthenticated(response) {
  if (response.status === 'connected') {
    // the user is logged in and has authenticated your
    // app, and response.authResponse supplies
    // the user's ID, a valid access token, a signed
    // request, and the time the access token 
    // and signed request each expire
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;
    FB.logout(function(response) {
      //alert("logged out.");
    });
  } else if (response.status === 'not_authorized') {
    // the user is logged in to Facebook, 
    // but has not authenticated your app
    //FB.logout(function(response) {
      //alert("logged out.");
    //});
    //$("#btnFb").click();
  } else {
    // the user isn't logged in to Facebook.
  }
 }

