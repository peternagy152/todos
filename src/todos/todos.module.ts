import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Todo , TodoSchema } from "./todo.model"; 
import { TodosService } from "./todos.service";
import { TodosController } from "./todos.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
	imports: [ 
		AuthModule,
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