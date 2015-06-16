var lemonDatabase = require("lemon_database");

module.exports = function(server)
{
	server.get("/static/(.*)", server.generateStaticCallback(process.cwd() + "/static/"));
};