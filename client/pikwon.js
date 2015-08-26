if (Meteor.isClient) {
  // counter starts at 0
  Template.navigation.onRendered(function(){
	var validator = $('form.login').validate({
		submitHandler: function(event){
			var username = $('[name=username]').val();
	        var password = $('[name=password]').val();
	        Meteor.loginWithPassword(username, password, function(error){
	        	if(error) {
	        		if(error.reason == "User not found"){
        		        validator.showErrors({
        		            username: error.reason
        		        });
        		    }
        		    if(error.reason == "Incorrect password"){
        		        validator.showErrors({
        		            password: error.reason
        		        });
        		    }
	        	} else {
	        		var currentRoute = Router.current().route.getName();
	        		if(currentRoute == 'login') {
	        			Router.go('home');
	        		}
	        	}
	        });
		}
	});
});

//validator defaults
$.validator.setDefaults({
	rules: {
		password: {
			minlength: 8,
			required: true
		},
		email: {
			email: true,
			required: true
		}
	}
});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
