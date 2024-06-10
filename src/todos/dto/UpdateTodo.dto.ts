import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export class UpdateTodoDto{


	@ApiProperty({example : "install nest js project with basic structure"})
	@IsString()
	@IsOptional()
	title: string; 

	@ApiProperty({example : " is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is t"})
	@IsString()
	@IsOptional()
	content: string;


	@ApiProperty({example : "in-progress"})
	@IsString()
	@IsOptional()
	status: string;


	@ApiProperty({example : "High"})
	@IsString()
	@IsOptional()
	priority: string;

}