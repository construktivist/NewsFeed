var express = require("express");
var router = express.Router();

router.get("/", function(request, response){
	// request("http://www.npr.org/", function(error, response, html){
	// 	var $ = cheerio.load(html);

	// 	$("div.story-wrap").each(function(i, element){
	// 		var result = {};

	// 		result.title = $(this).children("h1").text();
	// 		result.link = $(this).children("a").attr("href");
	// 		console.log(result.title);
	// 		console.log(result.link);
	// 	})
	// 	res.send("Scrape Complete");
	// });








	response.render("index");
});

module.exports = router;