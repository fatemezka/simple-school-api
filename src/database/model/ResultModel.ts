import { BaseSequelizeModel } from "namira.node";
import { ResultScore } from "../../ResultScore";

export class ResultModel extends BaseSequelizeModel
{
	id!: number;
	student_id!: number;
	course_id!: number;
	score!: ResultScore;
}