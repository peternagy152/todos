import { Schema , Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Todo{

	@Prop({required:true , unique:true})
	slug: string; 

	@Prop({required:true})
	title: string; 

	@Prop({required:false})
	content?: string;

	@Prop({required:false})
	status?: string; 

	@Prop({required:false})
	priority?: string;

	
}

export const  TodoSchema = SchemaFactory.createForClass(Todo);