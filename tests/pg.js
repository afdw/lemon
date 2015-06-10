var lemonDatabase = require("lemon_database");

var connection = new lemonDatabase.Connection({
	"engine": "pg",
	"database": "booktown"
}, function(error)
{
	console.log(error);
	connection.exec(connection.builder().table("books").where(connection.predicate("id", "between", [100, 1000])).get(), [], function(error, result)
	{
		console.log(error, result);
		connection.close();
	});
});