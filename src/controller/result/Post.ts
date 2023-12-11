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
			student_id: Joi.number().required(),
			course_id: Joi.number().required(),
			score: Joi.string().valid("A", "B", "C", "D", "E", "F").required(),
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
		let { student_id, course_id, score } = req.body;

		return await database.result.create(student_id, course_id, score, null);
	}
	override async postHandle()
	{ }
}