import { AnomalyDetector, BaseController } from "namira.node";
import { ObjectService } from "namira.core";
import { Database } from "../../database/Database";
import Joi, { SchemaLike } from "joi";
import { Request, Response } from "express";
import { MiddlewareProps } from "../../middleware/MiddlewareProps";
import { MiddlewareState } from "../../middleware/MiddlewareState";

export class Delete extends BaseController<Database, MiddlewareState, MiddlewareProps>
{
	override getAnomaly(): AnomalyDetector | null
	{
		return null;
	}
	override getBodySchema(): SchemaLike
	{
		return null;
	}
	override getQuerySchema(): Joi.SchemaLike
	{
		return null;
	}
	override getState(): MiddlewareState
	{
		return {};
	}
	override async preHandle()
	{ }
	override async handle(req: Request, _: Response, database: Database, __: MiddlewareProps)
	{
		let id: number = new ObjectService(req.params.id).getInt();

		let result = await database.result.delete(id, null);
		if (result == 1)
			return { message: "Result deleted successfully" };
		else
			return { message: "Delete failed" };
	}
	override async postHandle()
	{ }
}