import { AnomalyDetector, BaseController } from "namira.node";
import { ErrorOperation } from "namira.core";
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
			family: Joi.string().required(),
			birth_date: Joi.date().required(),
			email: Joi.string().email().required(),
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
		let { name, family, birth_date, email } = req.body;

		if (!isNaN(Date.parse(birth_date)))
		{
			const birthDate = new Date(birth_date);
			const today = new Date();
			const age = today.getFullYear() - birthDate.getFullYear();

			// Check if the student is at least 10 years old
			if (age < 10)
				ErrorOperation.throwHTTP(403, 'The student must be at least 10 years old.');
		}
		return await database.student.create(name, family, birth_date, email, null);
	}
	override async postHandle()
	{ }
}