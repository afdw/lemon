module.exports = function(connection, callback)
{
	connection.exec("DROP SCHEMA public CASCADE", [], function(error, result)
	{
		if(error)
		{
			throw error;
		}
		connection.exec("CREATE SCHEMA public", [], function(error, result)
		{
			if(error)
			{
				throw error;
			}
			connection.exec("CREATE EXTENSION \"uuid-ossp\"", [], function(error, result)
			{
				if(error)
				{
					throw error;
				}
				callback();
			});
		});
	});
};