import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy , ExtractJwt } from "passport-jwt";
import { User } from "./user.model";
import { Model } from "mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	constructor(@InjectModel(User.name) private userModel: Model<User>) {
	super({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'todosappsecret',
});
	}

	async validate(payload) {
		const userObject = await this.userModel.findById(payload.id);
		if (!userObject) {
			throw new UnauthorizedException("Unauthorized User");
		}

		return userObject;
	}
}