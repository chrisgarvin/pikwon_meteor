//ROUTES
Router.configure({
  layoutTemplate: 'main',
  loadingTemplate: 'loading'
});

//home
Router.route('/', {
	template: 'home',
	name: 'home'
})
