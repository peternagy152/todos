import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignUpDto{

	@IsNotEmpty()
	@IsEmail()
	email: string; 

	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string; 

}