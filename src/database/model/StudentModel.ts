import { BaseSequelizeModel } from "namira.node";

export class StudentModel extends BaseSequelizeModel
{
	id!: number;
	name!: string;
	family!: string;
	birth_date!: Date;
	email!: string;
}