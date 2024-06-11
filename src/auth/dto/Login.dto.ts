import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto{


	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({example:"peter.nagy@mitchdesigns.com"})
	email: string;


	@IsNotEmpty()
	@MinLength(6)
	@ApiProperty({example:"peter1234"})
	password: string; 


}