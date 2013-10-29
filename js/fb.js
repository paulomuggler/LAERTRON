var FACEBOOK_APP_ID = "542549515821319";

function fb_strip_share(e) {
	e.preventDefault();
	if (is_uploading)
		return;

	is_uploading = true;
	//verificar permissoes

	FB.api("/me/permissions", function(response){ 
		var data_length = response.data && response.data.length ? response.data.length : 0;
		var permissions = data_length > 0 ? response.data[0] : {};

		if (!permissions["publish_stream"]) {
			alert("VocÃª nÃ£o possui permissÃ£o para publicar no seu mural.\nVocÃª deve autorizar agora o aplicativo.");
			FB.login(function(response) {

				FB.api("/me/permissions", function(response){ 
					var data_length = response.data && response.data.length ? response.data.length : 0;
					var permissions = data_length > 0 ? response.data[0] : {};

					if (permissions["publish_stream"]) {
						log("woohoo")
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
}