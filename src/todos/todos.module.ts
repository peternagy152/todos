import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Todo ,TodoSchema } from "src/schemas/Todo.schema";
import { TodosService } from "./todos.service";
import { TodosController } from "./todos.controller";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Todo.name, 
				schema: TodoSchema
			}
		])
	], 
	providers: [TodosService],
	controllers : [TodosController]
})
export class TodosModule{ }