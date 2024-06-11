import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/auth/user.model";

export class CreateTodoDto{
 


	@ApiProperty({
		description : "Unique Slug for the todo " , 
		example: "install-nest"
	})

	@ApiProperty({example : "install nest js project with basic structure"})
	@IsString()
	@IsNotEmpty()
	title: string; 
	
	
	@ApiProperty({ example: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy t" })
	@IsString()
	@IsOptional()
	content: string;

	@IsEmpty()
	user:User

}	
