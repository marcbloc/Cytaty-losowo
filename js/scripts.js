$(function() {
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://api.forismatic.com/api/1.0/?method=getQuote&key=867576&format=jsonp&lang=en&jsonp=?";

function getQuote() {
	$.getJSON(quoteUrl, createTweet);
}

function createTweet(input) {
	 var data = input[0];
	 var quoteText = $(data.content).text().trim();
	 var quoteAuthor = data.title; 
	 
	 if (!quoteAuthor.length) { 
	 	quoteAuthor = "Unknown author";
	}
	var tweetText = "Quote of the day - " + quoteText + " Author:" + quoteAuthor;
	if (tweetText.length > 140) {
		getQuote();
	} else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		$('.quote').text(quoteText);
		$('.author').text("Author: " + quoteAuthor);
		$('.tweet').attr('href', tweet);
	}
}

$(document).ready(function() {
	getQuote();
	$('.trigger').click(function() {
		getQuote();
	})
});

});