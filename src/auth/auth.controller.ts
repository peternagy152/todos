import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/SignUp.dto';
import { LoginDto } from './dto/Login.dto';

@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) { }
	
	@Post('/register')
	register(@Body() signUpDto: SignUpDto) : Promise<{token:string}> {
		return this.authService.register(signUpDto);
	}

	@Post('/login')
	login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
		return this.authService.login(loginDto);
		
	}
}
