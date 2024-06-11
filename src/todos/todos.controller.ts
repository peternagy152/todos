import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { CreateTodoDto } from "./dto/CreateTodo.dto";
import { TodosService } from "./todos.service";
import mongoose from "mongoose";
import { UpdateTodoDto } from "./dto/UpdateTodo.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('todos')
export class TodosController{

	constructor(private todosService: TodosService) { }

	@Get()
	@UseGuards(AuthGuard())
	getMytodos(@Req() req) {
		 return this.todosService.getMyTodos(req.user._id);
		}

	@Get(":id")
	@UseGuards(AuthGuard())
	getMyTodoById(@Param('id') todoId: string, @Req() req) {
		return this.todosService.getMyTodoById(todoId, req.user);
	}

	@Post()
	@UseGuards(AuthGuard())
	async createTodo(@Body() createTodoDto: CreateTodoDto, @Req() req) {
			return this.todosService.createTodo(createTodoDto , req.user);
	}

	@Patch(':id')
	@UseGuards(AuthGuard())
	updateMyTodo(@Param('id') todoId: string, @Body() updateTodoDto: UpdateTodoDto, @Req() req) {
		return this.todosService.updateMyTodo(todoId, updateTodoDto, req.user);
	}
	
	

	@Delete(":id")
	@UseGuards(AuthGuard())
	deleteMyTodo(@Param("id")todoId:string , @Req() req) {
		return this.todosService.deleteMyTodo(todoId, req.user);
	}


}