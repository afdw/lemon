var lemonDatabase = require("lemon_database");

module.exports = function(server)
{
	var planetsController = new (require("./controllers/planets.js"))();
	server.get("/", function(request, response, params)
	{
		var DBConfig = require("./configs/db.js");
		var connection = new lemonDatabase.Connection(DBConfig, function(error)
		{
			if(error)
			{
				throw error;
			}
			planetsController.listPlanets(response, connection);
		});
	});
	server.get("/static/(.*)", server.generateStaticCallback(process.cwd() + "/static/"));
};