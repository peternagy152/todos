import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/auth/user.model";
import mongoose from "mongoose";

@Schema()
export class Todo{
	
	@Prop({required:true})
	title: string; 

	@Prop({required:false})
	content?: string;

	@Prop({required:false})
	status?: string; 

	@Prop({required:false})
	priority?: string;

	@Prop({type:mongoose.Schema.Types.ObjectId , ref:'User'})
	user:User
}

export const  TodoSchema = SchemaFactory.createForClass(Todo);