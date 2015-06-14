var lemonTemplater = require("lemon_templater");

new lemonTemplater("templater/items.html", {items: ["123", "456", "789"]}).render(function(resultText)
{
	console.log(resultText);
});