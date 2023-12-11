import { BaseTable } from "namira.node";
import { Database } from "../Database";
import { Transaction, ModelCtor } from 'sequelize';

import { StudentModel } from '../model/StudentModel';

export class StudentTable extends BaseTable<Database>
{
	model!: ModelCtor<StudentModel>;

	constructor(database: Database)
	{
		super(database)
	}
	async getAll(trx: Transaction | null): Promise<StudentModel[]>
	{
		return await this.model.findAll({ transaction: trx });
	}
	async create(name: string, family: string, birth_date: Date, email: string, trx: Transaction | null): Promise<StudentModel>
	{
		return await this.model.create(
			{
				name,
				family,
				birth_date,
				email
			},
			{ transaction: trx }
		);
	}
	async delete(id: number, trx: Transaction | null): Promise<number>
	{
		return await this.database.startTransaction<number>(async (trx) =>
		{
			let options = {
				where: { id },
				transaction: trx
			};
			let deleted_student = this.model.destroy(options);

			// delete results belong to this student
			await this.database.result.model.destroy({ where: { student_id: id }, transaction: trx });

			return deleted_student;
		}, trx);
	}
}