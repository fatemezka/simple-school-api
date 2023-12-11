import { AnomalyDetector, BaseController } from "namira.node";
import { Database } from "../../database/Database";
import Joi, { SchemaLike } from "joi";
import { Request, Response } from "express";
import { MiddlewareProps } from "../../middleware/MiddlewareProps";
import { MiddlewareState } from "../../middleware/MiddlewareState";

export class GetAll extends BaseController<Database, MiddlewareState, MiddlewareProps>
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
	override async handle(_: Request, __: Response, database: Database, ___: MiddlewareProps)
	{
		return await database.student.getAll(null);
	}
	override async postHandle()
	{ }
}