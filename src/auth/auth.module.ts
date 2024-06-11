import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User , UserSchema } from './user.model';
import { Passport } from 'passport';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'; 
import { ConfigService } from '@nestjs/config';
import { config } from 'process';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }), 
    JwtModule.register({
      secret: 'todosappsecret',
      // signOptions: { expiresIn: '36000s' },
    }),
    MongooseModule.forFeature([
      {
        name: User.name, 
        schema:UserSchema 
      }
    ]) 
  ] , 
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports:[JwtStrategy , PassportModule]
})
export class AuthModule {}
