import { AnomalyDetector, BaseController } from "namira.node";
import { Database } from "../../database/Database";
import Joi, { SchemaLike } from "joi";
import { Request, Response } from "express";
import { MiddlewareProps } from "../../middleware/MiddlewareProps";
import { MiddlewareState } from "../../middleware/MiddlewareState";

export class Post extends BaseController<Database, MiddlewareState, MiddlewareProps>
{
	override getAnomaly(): AnomalyDetector | null
	{
		return null;
	}
	override getBodySchema(): SchemaLike
	{
		return Joi.object({
			name: Joi.string().required(),
		});
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
		let { name } = req.body;

		return await database.course.create(name, null);
	}
	override async postHandle()
	{ }
}