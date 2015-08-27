if (Meteor.isClient) {

//register template events
Template.signup.onRendered(function(){

    var validator = $('form.signup').validate({
        submitHandler: function(event){
            var email = $('[name=newemail]').val();
            var password = $('[name=newpassword]').val();
            var username = $('[name=username]').val();
            var fname = $('[name=fname]').val();
            var lname = $('[name=lname]').val();
            Accounts.createUser({
                email: email,
                password: password,
                profile: {
                  username: username,
                  fname: fname,
                  lname: lname,
                  posts: [],
                  friends: []
                }
            }, function(error){

                if(error){
                  console.log(error);
                    if(error.reason == "Email already exists."){
                        validator.showErrors({
                            email: "That email already belongs to a registered user."
                        });

                } else if(error.reason == "Username already exists."){
                    validator.showErrors({
                            username: "That username already belongs to a registered user."
                    });
                  }

                } else {
                    Router.go('home');
                }

            });
        }
    });
});

  Template.navigation.onRendered(function(){
	var validator = $('form.login').validate({
		submitHandler: function(event){
			    var email = $('[name=email]').val();
	        var password = $('[name=password]').val();
	        Meteor.loginWithPassword(email, password, function(error){
	        	if(error) {
              console.log(error)
	        		if(error.reason == "Email not found"){
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

	        			Router.go('home');

	        	}
	        });
		}
	})
});

Template.navigation.events({
	'click .logout': function(e){
		e.preventDefault();
		Meteor.logout();
		Router.go('home');
	}
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
		},
    username: {
      maxlength: 18,
      required: true
    },
    fname: {
      maxlength: 18,
      required: true
    },
    lname: {
      maxlength: 18,
      required: true
    }
	}
});

Template.navigation.helpers({
	'user': function(){
		var currentUser = Meteor.userId();
		return Meteor.users.findOne({_id: currentUser});
	}
});

Template.profile.helpers({
	'user': function(){
		var currentUser = Meteor.userId();
		return Meteor.users.findOne({_id: currentUser});
	},
  'email': function(){
    var currentUser = Meteor.userId();
    return Meteor.users.findOne({_id: currentUser}).emails[0].address;
  }
});

Template.profile.helpers({
	'post': function(){
		return Meteor.user().profile.posts;
	}
});

Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

// Meteor.users.update(Meteor.userId(),{$push: {"profile.posts": {option1: "movies", option2: "dinner"}}})
