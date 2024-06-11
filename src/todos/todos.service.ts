import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Todo } from "./todo.model";
import { CreateTodoDto } from "./dto/CreateTodo.dto";
import { UpdateTodoDto } from "./dto/UpdateTodo.dto";
import { User } from "src/auth/user.model";

@Injectable()
export class TodosService{ 

	constructor(
		@InjectModel(Todo.name) private todoModel: Model<Todo> ,
	) { } 

	
	async createTodo(createTodoDto: CreateTodoDto, user: User) { 
		const data = Object.assign(createTodoDto, { user: user._id });
		const todoObject = await this.todoModel.create(data);
		return todoObject; 
		
	}

	getMyTodos(userId:string) {
		return this.todoModel.find({ user: userId });
	}

  async	getMyTodoById(todoId: string, userObject) {

		//Check if object is is valid 
		const isValid = mongoose.Types.ObjectId.isValid(todoId);
		if (!isValid) throw new HttpException("Given ID is bot compatible", 404);

		//Check existance of todo object 
		const todoObject = await  this.todoModel.findById(todoId);
		if (!todoObject) throw new HttpException("Todo not found", 404);


		
		if (todoObject.user.equals(userObject._id)) {return todoObject; } else {
			throw new HttpException("Unauthorized Access ! ", 404);
		} 

		
	}

	async deleteMyTodo(todoId: string, userObject: any)
	{
		//Check if object is is valid 
		const isValid = mongoose.Types.ObjectId.isValid(todoId);
		if (!isValid) throw new HttpException("Given ID is bot compatible", 404);

		//Check existance of todo object 
		const todoObject = await  this.todoModel.findById(todoId);
		if (!todoObject) throw new HttpException("Todo not found", 404);


		if (todoObject.user.equals(userObject._id)) {
			return  this.todoModel.findByIdAndDelete(todoId);
		} else {

			throw new HttpException("Unauthorized Access ! ", 404);

		} 
	
		
	}

	async updateMyTodo(todoId: string, updateTodoDto: UpdateTodoDto, userObject: any) {
		//Check if object is is valid 
		const isValid = mongoose.Types.ObjectId.isValid(todoId);
		if (!isValid) throw new HttpException("Given ID is bot compatible", 404);

		//Check existance of todo object 
		const todoObject = await  this.todoModel.findById(todoId);
		if (!todoObject) throw new HttpException("Todo not found", 404);


		if (todoObject.user.equals(userObject._id)) {
			return this.todoModel.findByIdAndUpdate(todoId, updateTodoDto, { new: true });

		} else {
			throw new HttpException("Unauthorized Access ! ", 404);
		} 
		
	}


	getAllTodos() {
		return this.todoModel.find();
	}

	getTodoById(id: string) {
		return this.todoModel.findById(id);
		
	}

	updateTodo(id: string, updateTodoDto: UpdateTodoDto) {
		return this.todoModel.findByIdAndUpdate(id, updateTodoDto, { new: true });
	}

	deleteTodo(id) {
		return this.todoModel.findByIdAndDelete(id);
		
	}

 }