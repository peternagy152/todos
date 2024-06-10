import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTodoDto{



	@ApiProperty({
		description : "Unique Slug for the todo " , 
		example: "install-nest"
	})
	@IsString()
	@IsNotEmpty()
	slug: string;


	@ApiProperty({example : "install nest js project with basic structure"})
	@IsString()
	@IsNotEmpty()
	title: string; 
	
	
	@ApiProperty({ example: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy t" })
	@IsString()
	@IsOptional()
	content: string;

}	
