function generate() {

  var canvas = document.getElementById('stripCanvas');
  var context = canvas.getContext('2d');
  var qA = new Image();
  var qB = new Image();
  var qC = new Image();
  var qD = new Image();

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

  qAidx = Math.floor((Math.random()*31)+1);
  qBidx = Math.floor((Math.random()*31)+1);
  qCidx = Math.floor((Math.random()*31)+1);
  qDidx = Math.floor((Math.random()*31)+1);

  qA.src = './img/quadrinhos/A/A'.concat(qAidx,'.png');
  qB.src = './img/quadrinhos/B/B'.concat(qBidx,'.png');
  qC.src = './img/quadrinhos/C/C'.concat(qCidx,'.png');
  qD.src = './img/quadrinhos/D/D'.concat(qDidx,'.png');
}

function canvas_draw_strip(qIdx){
  
}

var upload_timeout_func;

function fb_post_callback(response) {

  clearTimeout(upload_timeout_func);
	
	res = JSON.parse(response.responseText);
	
	$('#modal_loading').modal('hide')

	if (res.post_id) {
	  $('#modal_upload_ok').modal('show')
  } else {
  	$('#modal_upload_failed').modal('show')
  }
  FB.logout();
}

function show_error_dialog(e){
  $('#modal_upload_failed').modal('show');
  //cancelar request ajax
}