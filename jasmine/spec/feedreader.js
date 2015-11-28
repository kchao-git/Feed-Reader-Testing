/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
	* a related set of tests. This suite is all about the RSS
	* feeds definitions, the allFeeds variable in our application.
	*/
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined.', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		//Tests if all feeds have a URL property defined and is not empty
		it('have all URL links defined and not empty.', function() {
			allFeeds.forEach(function(feed){
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toBe('');
			});
		});

		//Tests if all feeds have a name property defined and is not empty
		it('have all names (article headers) defined and not empty.', function() {
			allFeeds.forEach(function(feed){
				expect(feed.name).toBeDefined();
				expect(feed.name).not.toBe('');
			});
		});
	});

	//Tests for the feed menu
	describe('The menu', function() {
		//DOM Elements
		var $htmlBody = $('body'),
			$menuIcon = $('.menu-icon-link');

		// Test that ensures the menu element is hidden by default.
		it('is hidden by default. Body has .menu-hidden class applied.', function() {
			expect($htmlBody.hasClass('menu-hidden')).toBeTruthy();
		});

		// Test that ensures the menu changes visibility when the menu icon is clicked. 
		it('toggles visibility when clicked.', function() {
			//open the menu
			$menuIcon.click();
			expect($htmlBody.hasClass('menu-hidden')).toBeFalsy();

			//close the menu
			$menuIcon.click();
			expect($htmlBody.hasClass('menu-hidden')).toBeTruthy();
		});
	});

	//Test for initial entries that are loaded to the feed.
	describe('Initial Entries', function() {
		
		//Call the async function loadFeed so that the test occurs after it's done.
		beforeEach(function(done) {
			loadFeed(0, done);
		});

		// Test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
		it('have at least a single .entry element within .feed container', function(done) {
			expect($('.feed .entry').length).not.toBe(0);
			done();
		});

	});

	//Tests for changing feeds
	describe('New Feed Selection', function() {
		
		var $feed = $('.feed'),
			initialContent = '';

		beforeEach(function(done) {
			//Store the html content of the feed of feed 0 (to compare later)
			loadFeed(0, function() {
				initialContent = $feed.html();
				done();
			});
		});

		// Test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.
		it('actually changes the feed content when a new feed is loaded.', function(done) {
			//Get the new content of the body after the new feed has loaded and compare it to the initial content. For the test to pass, they should not be the same.
			loadFeed(1, function() {
				var newContent = $feed.html();

				expect(initialContent).not.toBe(newContent);
				done();
			});
		});
	});
}());
