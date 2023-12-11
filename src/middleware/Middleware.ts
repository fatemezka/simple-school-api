import { BaseMiddleware } from "namira.node";
import { Logger } from "namira.log";
import { Database } from "../database/Database";
import { Request, Response } from "express";
import { MiddlewareState } from "./MiddlewareState";
import { MiddlewareProps } from "./MiddlewareProps";

export class Middleware extends BaseMiddleware<Database, MiddlewareState, MiddlewareProps>
{
	override async getDatabase(): Promise<Database>
	{
		let database = new Database();
		await database.init();
		return database;
	}
	override async getProps(_: Request, __: Response, ___: Database, ____: MiddlewareState): Promise<MiddlewareProps>
	{
		let props: MiddlewareProps = {};
		return props;
	}
	override async preHandle()
	{
	}
	override async postHandle()
	{
	}
	override getLogger()
	{
		return new Logger();
	}
}