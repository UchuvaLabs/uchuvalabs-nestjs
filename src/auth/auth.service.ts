import { UsersService } from 'src/users/users.service';
import { Injectable } from "@nestjs/common";
import { HashService } from 'src/users/hash.service';


@Injectable()
export class AuthService {
    constructor(
        private userService:UsersService,
    ){}

    async validateUser(wallet: string, otp: string): Promise<any> {
      const user = await this.userService.getUserByWallet(wallet);
      if (user) {
        const otpValid = await this.userService.validateOtp(wallet, otp);
        if (otpValid) {
          await this.userService.deleteOtp(wallet);
          return user;
        }
      }
      return null;
    }
}