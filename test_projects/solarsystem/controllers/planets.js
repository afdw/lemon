var lemonTemplater = require("lemon_templater");

var PlanetsController = function()
{
};
PlanetsController.prototype.listPlanets = function(response, connection)
{
	connection.exec("SELECT * FROM planets", [], function(error, result)
	{
		if(error)
		{
			throw error;
		}
		connection.close();
		(new lemonTemplater("views/planets.html", {planets: result})).renderToResponse(response);
	});
};
module.exports = PlanetsController;