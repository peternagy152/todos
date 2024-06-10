import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from "@nestjs/common";
import { CreateTodoDto } from "./dto/CreateTodo.dto";
import { TodosService } from "./todos.service";
import mongoose from "mongoose";
import { UpdateTodoDto } from "./dto/UpdateTodo.dto";
import { EMPTY } from "rxjs";

@Controller('todos')
export class TodosController{

	constructor(private todosService: TodosService) { }
	
	@Get()
	getAllTodos() {
		return this.todosService.getAllTodos();
		
	}

	@Get(":id")
	async getTodoById(@Param('id') id: string) {
		//Check if ID is Valid 
		const isValid = mongoose.Types.ObjectId.isValid(id);
		if (!isValid) throw new HttpException("Given ID is Not compatible", 404);
		const todoObject = await this.todosService.getTodoById(id);
		if(!todoObject) throw new HttpException("Todo not found", 404);
		return todoObject;
		
	}

	@Post()
	async createTodo(@Body() createTodoDto: CreateTodoDto) {

		const existingTodo = await this.todosService.getTodoBySlug(createTodoDto.slug);
		if (existingTodo) {
			throw new HttpException("Slug Exists", 404);
		} else {
			return this.todosService.createTodo(createTodoDto);
		} 
		
	}

	@Patch(':id')
	async updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
	const isValid = mongoose.Types.ObjectId.isValid(id);
	if (!isValid) throw new HttpException("Given ID is Not compatible", 404);

	const todoObject = await this.todosService.updateTodo(id, updateTodoDto);
	if(!todoObject) throw new HttpException("Todo not found", 404);
		return todoObject;
	}

	@Delete(":id")
	async deleteTodo(@Param("id") id: string) {
		const isValid = mongoose.Types.ObjectId.isValid(id);
	if (!isValid) throw new HttpException("Given ID is Not compatible", 404);

		const todoObject = await this.todosService.deleteTodo(id);
		if(!todoObject) throw new HttpException("Todo not found", 404);
		return todoObject;
		
		
	}



}