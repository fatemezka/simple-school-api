import { BaseSequelizeModel } from "namira.node";

export class CourseModel extends BaseSequelizeModel
{
	id!: number;
	name!: string;
}