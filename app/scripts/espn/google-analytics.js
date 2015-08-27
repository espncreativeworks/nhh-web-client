'use strict';

$(document).ready(function() {

	/* GA Events */

	//header click events
	$('#home-header-container a.btn-vote').on('click',function() {
		ga('send', 'event', 'Header', 'Button', 'Vote');
	});

	$('#home-header-container a.disneyid-login.btn-enter').on('click',function() {
		ga('send', 'event', 'Header', 'Button', 'Enter');
	});

	$('#home-header-container a.loggedin-enter.btn-enter').on('click',function() {
		ga('send', 'event', 'Header', 'Button', 'Enter');
	});

	$('#home-header-container a.logged-in-not-eligible.btn-enter').on('click',function() {
		ga('send', 'event', 'Header', 'Button', 'Enter');
	});

	$('#home-header-container a.btn-discussion').on('click',function() {
		ga('send', 'event', 'Header', 'Button', 'Discussion');
	});

	//menu click events
	$('.menu .menu-wrap a.home-ga').on('click',function() {
		ga('send', 'event', 'Menu', 'Link', 'Home');
	});

	$('.menu .menu-wrap a.leaderboard-ga').on('click',function() {
		ga('send', 'event', 'Menu', 'Link', 'Leaderboard');
	});

	$('.menu .menu-wrap a.tour-ga').on('click',function() {
		ga('send', 'event', 'Menu', 'Link', 'Tour');
	});

	$('.menu .menu-wrap a.rules-ga').on('click',function() {
		ga('send', 'event', 'Menu', 'Link', 'Rules');
	});

	$('.menu .menu-wrap a.watch-ga').on('click',function() {
		ga('send', 'event', 'Menu', 'Link', 'Watch');
	});

});