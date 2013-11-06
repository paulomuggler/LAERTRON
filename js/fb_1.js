
var FACEBOOK_APP_ID = "542549515821319";

var is_uploading = false;

var savedData = new Image();

function save(){
    // get the data
	var canvas = document.getElementById("processing-canvas");
    savedData.src = canvas.toDataURL("image/png");
}

function restore(){
    // restore the old canvas
	var canvas = document.getElementById("processing-canvas"),
	    ctx = canvas.getContext("2d");
    ctx.drawImage(savedData,0,0)
}


window.upload_photo = function() {


	$.post(
		"upload.php?",
		{
			img: $("canvas")[0].toDataURL("image/png;base64"),
			uid: FB.getUserID()
		}, 
		function(data_str){
			var data = JSON.parse(data_str);
			console.log("retorno upload", data);
			if (!data["ok"]) {
				alert("Ocorreu um erro ao salvar sua imagem.\nTente novamente mais tarde.");
				is_uploading = false;
				return;
			}

			var imgURL = "http://muta.to/wechange/" + data.file;
			FB.api("/me/photos", "post", {
				message: '...',
				url: imgURL
			}, function(response){
				is_uploading = false;

				if (!response || response.error) {
					alert("Ocorreu um erro ao postar a foto no Facebook.\nTente novamente mais tarde.");
				} else {
					//alert('Post ID: ' + response.id);
					alert("Sua foto foi salva com sucesso no Facebook!");
				}

			});
		}
	);

};

window.init_canvas = function(){

	console.log("jquery ready");

	//TODO: verificar aqui pq Processing nao foi carregado.
	//Processing.getInstanceById("processing-canvas").frameRate(frameRate);
	//processingInstance.frameRate(frameRate);

	$("#processing-canvas").toggle(function(){
		//processingON(false);
	}, function(){
		//processingON(true);
	});

	$("#btn_print").click(function(e){
		e.preventDefault();
		window.open($("canvas")[0].toDataURL("image/png;base64"));
	});

	$("#btn_save").click(function(e){
		e.preventDefault();
		if (is_uploading)
			return;

		is_uploading = true;
		//verificar permissoes

		FB.api("/me/permissions", function(response){ 
			var data_length = response.data && response.data.length ? response.data.length : 0;
			var permissions = data_length > 0 ? response.data[0] : {};

			if (!permissions["publish_stream"]) {
				alert("VocÃª nÃ£o possui permissÃ£o para publicar no seu mural.\nVocÃª deve autorizar agora o aplicativo.\n\nVerifique se nÃ£o estÃ¡ com bloqueador de popup ativo.");
				FB.login(function(response) {

					FB.api("/me/permissions", function(response){ 
						var data_length = response.data && response.data.length ? response.data.length : 0;
						var permissions = data_length > 0 ? response.data[0] : {};

						if (permissions["publish_stream"]) {
							//alert("PermissÃ£o definida com sucesso!\nAgora vocÃª jÃ¡ pode fazer o upload da foto.");
							upload_photo();
						} else {
							is_uploading = false;
						}
					});

					//refazer click
					//alert("novo login!");
					//$("#btn_save").click();
				}, {scope: 'read_stream,publish_stream'});
				return;
			}
			upload_photo();
		});

		//window.open($("canvas")[0].toDataURL("image/png;base64"));
	});

	$("#btn_replay").click(function(e){
		e.preventDefault();
		getUserData();
	});


	
};

//https://www.facebook.com/dialog/pagetab?app_id=APP_ID&display=popup&next=http://facebook.com/


var showON = function(callback){
	$(".facebook.on").fadeIn("slow", callback);
};
var showOFF = function(callback){
	$(".facebook.off").fadeIn("slow", callback);
};

var hideON = function(callback){
	if(!$(".facebook.on").is(":visible") && callback) {
		callback();
		return;
	}
	$(".facebook.on").fadeOut("slow", callback);
};
var hideOFF = function(callback){
	if(!$(".facebook.off").is(":visible") && callback) {
		callback();
		return;
	}
	$(".facebook.off").fadeOut("slow", callback);
};





var getHour = function(isodate) {
	var timezone = new Date().getTimezoneOffset() * -1;
	var datetime = new Date(isodate);
	return datetime.getHours();
}

var generateVisualization = function(users_data) {

};

var getUserData = function() {

	//TODO: zerar dados
	//TODO: zerar background
	if (is_running)
		return;

	is_running = true;

	$("#dataok").hide();
	$("#waiting").fadeIn();
	$("#generating").hide();

	FB.api("/me", function(response){
		$(".user_first_name").text(response.first_name);

		//TODO: verificar permissÃµes e reexibir login caso falte alguma
		processingInstance = Processing.getInstanceById("processing-canvas");
		processingInstance.background(0);
		processingInstance.getCelules().clear();
		processingInstance.loop();
		processingInstance.getPrimary().setInitRadius(50);
		processingInstance.getPrimary().setColor(processingInstance.color(255, 50, 0, 10));


		branco = processingInstance.color(255, 255, 255, 10); //255, 48, 105, 10
		bege = processingInstance.color(208, 217, 177, 10);
		bege_claro = processingInstance.color(239, 224, 178, 10);
		azul_claro = processingInstance.color(97, 185, 169, 10);


		users = {};
		printed_stats = false;
		stats_posts = 0;
		stats_likes = 0;
		stats_shares = 0;
		stats_comments = 0;
		frame = 0;
		current_posts = 0;
		engaged_index = 0;

		max_comments = 0;
		max_engagement = 0;
		max_commentandshare = 0;


		$("#timeline_data").empty();


		if ($("#stats").is(":visible"))
			$("#stats").fadeOut();

		if ($("#action").is(":visible"))
			$("#action").fadeOut();

		if ($("#datacomplete").is(":visible"))
			$("#datacomplete").fadeOut();


		///me/feed?limit=300
		FB.api("me/posts?fields=type,story,message,likes,comments,shares&limit=300&date_format=U", function(response){
			posts = response.data.reverse();

			//TODO: verificar os 10+

			topN = _.first(
				_.sortBy(posts, function(p){ 
					//var total = 0 + p.likes ? p.likes.count : 0 + p.comments ? p.comments.count : 0 + p.shares ? p.shares.count : 0; 
					var total = 0 + p.comments ? p.comments.count : 0 + p.shares ? p.shares.count : 0; 
					return -total; //orde decrescente
				}),
				TOP_TOTAL);

			topNids = _.map(topN, function(p) { return p.id; });



			if (!$("#dataok").is(":visible"))
				$("#dataok").fadeIn();

			max_comments = 0;
			$(posts).each(function(index, p){
				var engagement = p.likes ? p.likes.count : 0 + p.comments ? p.comments.count : 0 + p.shares ? p.shares.count : 0;
				var commentandshare = p.comments ? p.comments.count : 0 + p.shares ? p.shares.count : 0;

				var comments = p.comments ? p.comments.count : 0;
				max_comments = Math.max(max_comments, comments);
				max_engagement = Math.max(max_engagement, engagement);
				max_commentandshare = Math.max(max_commentandshare, commentandshare);

			});



			$("#waiting").hide(function(){

				window.setTimeout(function(){
					//$("#welcome").fadeOut();
					$("#dataok").hide("slow");
					$("#stats").fadeIn("slow");
					$("#generating").fadeIn();


					// inicializar timer e ativar animacoes
					$("#timeline").empty();
					var mindate = parseDate(posts[0].created_time).getTime();
					var maxdate = parseDate(posts[posts.length - 1].created_time).getTime();
					var frames = posts.length * 2; // * frameRate;
					var datedelta = (maxdate - mindate) / frames;

					console.log("mindate", "maxdate", "frames", "datedelta");
					console.log(mindate, maxdate, frames, datedelta);


					window.interval = window.setInterval(function(){
						frame++;
						var d = mindate + frame * datedelta;
						if (d > maxdate) {

							//acabou

							is_running = false;
							processingON(false);

							clearInterval(window.interval);

							$("#generating").hide();
							$("#datacomplete").fadeIn();


							if (printed_stats)
								return;


							window.setTimeout(function(){
								if (!$("#action").is(":visible"))
									$("#action").fadeIn();

								printed_stats = true;

								//TODO: escrever estatÃ­sticas

								var estatisticas = "";

								$("#stats span").each(function(idx, content) { 
									if (estatisticas.length > 0)
										estatisticas += " â€¢ ";
									estatisticas += $(content).text();
								});

								processingInstance.drawMut();

								//processingInstance.smooth();
								processingInstance.textFont(processingInstance.createFont("fonts/NovecentoWide-DemiBold.otf", 20));
								//processingInstance.fill(0, 0, 0, 100);
								//processingInstance.text(estatisticas, 298, 302); //$("#stats span").text()

								processingInstance.fill(255, 255, 255);
								processingInstance.text(estatisticas, 300, 575); //$("#stats span").text()


								$("#timeline").fadeOut("slow");

								var primary = processingInstance.getPrimary();
								primary.setPaused(true);
								save();

								if ($("#stats").is(":visible"))
									$("#stats").fadeOut();

								
								$("#timeline_data li.engaged").click(function(e){
									var p_id = $(this).attr("id").split("__")[1];
									e.preventDefault();
									window.open("https://www.facebook.com/"+FB.getUserID()+"/posts/"+p_id.split("_")[1]);
								});

								//habilitar estatistica de dados
								$("#timeline_data li.engaged").hover(function(){

									if (window.tmrHover) {
										clearTimeout(window.tmrHover);
									}

									var p_id = $(this).attr("id").split("__")[1];
									var post = posts_original[p_id];

									processingInstance = Processing.getInstanceById("processing-canvas");
									//processingInstance.fill(0, 10);
									//processingInstance.rect(0, 0, processingInstance.width, processingInstance.height);


									$(processingInstance.getCelules().toArray()).each(function(idx, celule) { 
										celule.setPaused(idx != post.engaged_index);
									});
									processingInstance.loop();

									var texto = translate[post.type] + " - " + formatDate(parseDate(post.created_time)) + " - " + formatTime(parseDate(post.created_time));


									$("#timeline_day").text(texto);



								}, function() {
									$("#timeline_day").empty();

									processingInstance = Processing.getInstanceById("processing-canvas");
									processingInstance.noLoop();
									
									if (window.tmrHover)
										clearTimeout(window.tmrHover);

									window.tmrHover = setTimeout(function(){
										restore();

									}, 1000);

								});

							}, 3000);

						}
						while (posts.length > 0 && parseDate(posts[0].created_time).getTime() <= d) {
							var p = posts.shift();
							p.index = current_posts;
							posts_original[p.id] = p;

							current_posts++;
							var primary = processingInstance.getPrimary();
							primary.setPaused(false);
							primary.setInitRadius(50 + current_posts*.25);
							primary.setColor(processingInstance.color(50 + (200 * current_posts/300), 0, 0, 10));


							stats_posts++;
							if (p.likes) {
								stats_likes += p.likes.count;

								primary.setStepSize(primary.getStepSize() + 5);
								
								window.setTimeout(function() {
									var primary = processingInstance.getPrimary();
									primary.setStepSize(primary.getStepSize() - 5);
								}, 1000);
							}

							if (p.comments)
								stats_comments += p.comments.count;

							if (p.shares)
								stats_shares += p.shares.count;


							$("#stats .posts").text(stats_posts + " posts ");
							$("#stats .likes").text(stats_likes + " likes ");
							$("#stats .shares").text(stats_shares + " shares ");
							$("#stats .comments").text(stats_comments + " comments ");

							var o = [p.id, p.type, p.story? p.story : "", p.likes ? p.likes.count : 0, p.comments ? p.comments.count : 0, p.shares ? p.shares.count : 0];

							//$("#content").text(p.type + " " + p.created_time);

							var stat_like = p.likes ? p.likes.count : 0;
							var stat_comment = p.comments ? p.comments.count : 0;
							var stat_share = p.shares ? p.shares.count : 0;

							var engagement = p.likes ? p.likes.count : 0 + p.comments ? p.comments.count : 0 + p.shares ? p.shares.count : 0;
							//var engagement_size = stat_like > 0 ? 1 : 0 + stat_comment > 0 ? 1 : 0 + stat_share > 0 ? 1 : 0;
							var engagement_size = stat_comment > 0 ? 1 : 0 + stat_share > 0 ? 1 : 0;


							if (engagement_size > 0) {

								p.engaged_index = engaged_index;
								engaged_index++;

								var cor;

								//cor = processingInstance.color(
								//	parseInt(processingInstance.random(255)), 
								//	parseInt(processingInstance.random(255)), 
								//	parseInt(processingInstance.random(255)), 
								//	20);

								var vertices = 3;
								switch(p.type) {
									case "video":
									case "swf":
										cor = bege_claro; break;
										vertices = 3;
										break;
									case "photo":
										cor = branco; break;
										vertices = 4;
										break;
									case "status":
										cor = azul_claro; break;
										vertices = 5
										break;
									case "link":
										cor = bege; break;
										vertices = 8
										break;
								}



								var raio = 10 + current_posts; //*.75;
								var x = 300 + raio * processingInstance.cos(processingInstance.radians(current_posts));
								var y = 300 + raio * processingInstance.sin(processingInstance.radians(current_posts));
								var position = new processingInstance.PVector(x, y);

								var new_cell = new processingInstance.Celule(
										vertices, 
										10 * engagement_size, //processingInstance.random(10, 100), 
										position,  
										cor
									);

								new_cell.setStepSize(stat_comment + stat_share); 

								processingInstance = Processing.getInstanceById("processing-canvas");
								var cels = processingInstance.getCelules();
								cels.add(new_cell);


								//gera objeto apenas se tiver engajamento e estiver no topN
								if (_.contains(topNids, p.id)) { //&& engagement_size > 0

									console.log("novo item", p.type, cor);


									//<li class="photo"><div style="height: 20px;"></div></li>
									var elemento = $("<li><div></div></li>");
									elemento.attr("id", "post__" + p.id);
									elemento.addClass(p.type);
									elemento.children("div").width(0);
									elemento.attr("engagement", engagement);
									$("#timeline_data").append(elemento);


									//elemento.children("div").height(engagement_size > 0 ? "30%" : "0px");
									var commentandshare = stat_comment + stat_share;

									if (engagement_size > 0) {
										post = $("#post__" + p.id);

										if (p.story)
											post.attr("title", p.story);

										if (p.message)
											post.attr("title", p.story);

										post.addClass("engaged");
										post.children("div").width((commentandshare / max_commentandshare * 100) + "%");
									}

								}

							}



						}

						if (frame % 5 == 0)
							$("#timeline").html(formatDate(new Date(d)) + " - " + formatTime(new Date(d)));
						
					}, 1000/frameRate);


					//console.log("mindate", mindate);
					//console.log("maxdate", maxdate);
					//console.log("datedelta", datedelta);
					processingON(true);

				}, 3000);
			});






		});

	});


}



function parseDate(input) {
	// data precisa ser Unix timestamp
	return new Date(input * 1000);
	
	//var parts = input.match(/(\d+)/g);
	//return new Date(parts[0], parts[1]-1, parts[2]);
}

/*
function parseDate(isoDateString) {
	var d = isoDateString.split(/[: -]/);
	return new Date(Date.UTC(d[0], d[1] - 1, d[2], d[3], d[4], d[5]));
}
*/

function formatDateSmall(date) {
	var d = date.getDate();
	d = "" + (d < 10 ? "0" : "") + d + "/";
	d += (date.getMonth()+1 < 10 ? "0" : "") + (date.getMonth()+1) + "/";
	d += date.getFullYear();
	d = "D S T Q Q S S".split(/ /)[date.getDay()] + " " + d;
	return d;
}

function formatDate(date) {
	var d = date.getDate();
	d = "" + (d < 10 ? "0" : "") + d + " de ";
	d += "Janeiro Fevereiro MarÃ§o Abril Maio Junho Julho Agosto Setembro Outubro Novembro Dezembro".split(/ /)[date.getMonth()] + " de ";
	d += date.getFullYear();
	//d = "D S T Q Q S S".split(/ /)[date.getDay()] + ", " + d;
	d = "Domingo Segunda TerÃ§a Quarta Quinta Sexta SÃ¡bado".split(/ /)[date.getDay()] + ", " + d;
	return d;
}

function formatTime(date) {
	var h = date.getHours();
	var ampm = h >= 12 ? "PM" : "AM";
	var t = (h < 10 ? "0" : "") + h + ":"; // + (h == 0 ? 12 : (h > 12 ? h - 12 : h)) + ":";
	var m = date.getMinutes();
	t += "" + (m < 10 ? "0" : "") + m; // + " " + ampm;
	return t;
}





var is_logged = false;




function addToPage(appId) {
	var redirect_uri = 'http://www.facebook.com/connect/login_success.html';
	window.open("https://www.facebook.com/dialog/pagetab?app_id="+FACEBOOK_APP_ID+"&display=popup&next=" + redirect_uri, "PageTab","width=500,height=200");
	
}



window.fbAsyncInit = function() {
	FB.init({
		appId      : FACEBOOK_APP_ID,
		status     : true, 
		cookie     : true,
		xfbml      : true,
		oauth      : true,
	});
	
	
	FB.Event.subscribe("auth.login", function(response) {
		verifyUI(response);
		//if (response.status == "connected") {
		//	getUserData();
		//}
	});
	

	FB.Event.subscribe('auth.authResponseChange', function(response) {
		verifyUI(response);
	});
	
	
	// se o usuario ja tiver autorizado o aplicativo, necessario logar novamente
	FB.getLoginStatus(function(response){
		verifyUI(response);
	});

	//console.log("FB INIT!");



	// JQUERY INIT
	$(function(){

		window.changeView = function(view) {

			switch(location.hash.substring(1).toLowerCase()) {
				case "home":
				case "mutatogram":

					// verificar se esta logado
					FB.getLoginStatus(function(response){
						verifyUI(response);

						if (location.hash.substring(1).toLowerCase() == "mutatogram") {

							if (response.status == "connected") {
								//iniciar consulta dos dados			
								getUserData();
							} else {
								location.hash = "#home";
							}
									
						}

					});

			}


			$("section.current").css("opacity", 0).removeClass("current");
			$("." + view).css("opacity", 1).addClass("current");

		};

		window.verifyUI = function(response) {
			if (response.status == "connected") {
				hideOFF(showON);
			} else {
				hideON(showOFF);
			}
		}

		var start = location.hash ? location.hash.substr(1) : "home";
		changeView(start);


		window.onhashchange = function(){
			changeView(location.hash.substring(1));
		}

		init_canvas();


	});


	
};
(function(d){
	var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	d.getElementsByTagName('head')[0].appendChild(js);
}(document));