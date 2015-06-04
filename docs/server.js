var express = require("express");
var fs = require("fs");
var marked = require("marked");

marked.setOptions({
	highlight: function(code, lang, callback)
	{
		if(lang != "plain")
		{
			require('pygmentize-bundled')({lang: lang, format: 'html'}, code, function(err, result)
			{
				callback(err, result.toString().substr("<div class=\"highlight\"><pre>".length, result.toString().length - "</pre></div>".length));
			});
		}
		else
		{
			callback(null, code);
		}
	}
});

var app = express();
app.get("/docs/*.md", function(req, res)
{
	fs.readFile(__dirname + "/www" + req.url, {encoding: "utf-8"}, function(err, data)
	{
		if(err)
		{
			throw err;
		}
		marked(data, function(err, content)
		{
			if(err)
			{
				throw err;
			}
			res.send(content);
		});
	});
});
app.use(express.static(__dirname + "/www"));
app.listen(8065);