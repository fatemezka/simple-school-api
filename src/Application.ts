import { BaseApplication, EnvService } from 'namira.node';
import { Logger } from 'namira.log';
import { Database } from './database/Database';
import router from './route/route';

export class Application extends BaseApplication<Database>
{
	override getDatabase()
	{
		return new Database();
	}
	override getRouter()
	{
		return router;
	}
	override getPort()
	{
		return new EnvService("SERVER_PORT").getInt();
	}
	override getLogger()
	{
		return new Logger();
	}
};