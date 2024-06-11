import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/SignUp.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/Login.dto';

@Injectable()
export class AuthService {

	constructor(@InjectModel(User.name) private userModel: Model<User> , private jwtService:JwtService) { }
	

	async register(signUpDto:SignUpDto):Promise<{token:string}> {
		const { name, email, password } = signUpDto; 
		const hashedPassword = await bcrypt.hash(password, 10); 

		const userObject = await this.userModel.create({
			name,
			email, 
			password : hashedPassword
		})

		const token = this.jwtService.sign({ id: userObject._id });
		return { token };
	}

	async login(loginDto:LoginDto): Promise<{ token: string }> {


		const userObject = await this.userModel.findOne({ email: loginDto.email });
		if (userObject) {

			//Check Password 
			const isMatch = await bcrypt.compare(loginDto.password , userObject.password); 

			if (isMatch) {
					const token = await this.jwtService.sign({id:userObject._id}); 
					return {token};
				
			} else {
				throw new HttpException("Email Or Password is InCorrect", 404);
			}
			
		} else {
			throw new HttpException("Email Or Password is InCorrect", 404);
		}

	
	}

}
