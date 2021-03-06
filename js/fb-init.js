window.fbAsyncInit = function() {
	    // init the FB JS SDK
	    FB.init({
	      appId      : '542549515821319',                     // App ID from the app dashboard
	      status     : false,                                 // Check Facebook Login status
	      cookie     : false,								// enable cookies to allow the server to access the session
	      xfbml      : false                                  // Look for social plugins on the page
	    });

	    // Additional initialization code such as adding Event Listeners goes here
	  };

	  // Load the SDK asynchronously
	  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "http://connect.facebook.net/pt_BR/all.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));