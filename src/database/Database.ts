import { BaseMySqlDatabase, EnvService } from 'namira.node'

import { StudentAttributes } from './attributes/StudentAttributes';
import { CourseAttributes } from './attributes/CourseAttributes';
import { ResultAttributes } from './attributes/ResultAttributes';

import { StudentTable } from './tables/StudentTable';
import { CourseTable } from './tables/CourseTable';
import { ResultTable } from './tables/ResultTable';

export class Database extends BaseMySqlDatabase
{
	student: StudentTable;
	course: CourseTable;
	result: ResultTable;

	constructor()
	{
		let database_name: string = new EnvService('DATABASE_NAME').getString();
		let database_user: string = new EnvService('DATABASE_USER').getString();
		let database_pass: string = new EnvService('DATABASE_PASS').getString();
		let database_host: string = new EnvService('DATABASE_HOST').getString();
		let database_port: number = new EnvService('DATABASE_PORT').getInt();

		super(database_name, database_user, database_pass, database_host, database_port, false);

		this.student = new StudentTable(this);
		this.course = new CourseTable(this);
		this.result = new ResultTable(this);
	}

	//#region Basic Functions
	override async init()
	{
		// Tables
		this.student.model = this.define("student", StudentAttributes);
		this.course.model = this.define("course", CourseAttributes);
		this.result.model = this.define("result", ResultAttributes);

		// set foreignKeys
		this.result.model.belongsTo(this.student.model, {
			foreignKey: { name: "student_id", allowNull: false },
		});
		this.result.model.belongsTo(this.course.model, {
			foreignKey: { name: "course_id", allowNull: false },
		});
	}

	sync(force: boolean)
	{
		this.sequelize.sync({ force });
	}
	//#endregion

};