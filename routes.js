//ROUTES
Router.configure({
  layoutTemplate: 'main',
  loadingTemplate: 'loading'
});

//home
Router.route('/', {
	template: 'home',
	name: 'home'
});

//signup

Router.route('/signup', {
  tempate: 'signup',
  name: 'signup'
});

//profile

Router.route('/profile', {
  tempate: 'profile',
  name: 'profile'
});
