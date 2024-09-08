import { Controller, Get, Post, Body, Request, UseGuards, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { TokenAuthGuard } from 'src/Guard/authenticated.guard';




@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    
  ) {}


  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  
  @Post('generate-otp')
  async generateOtp(@Body('wallet') wallet: string) {
    const user = await this.userService.getUserByWallet(wallet);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const otp = await this.userService.generateOtp(wallet);

    await this.mailService.sendOtp(user.email, otp);

    return 'El codigo fue enviado a tu correo, verifica tu bandeja de entrada!';
  }

  
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const { wallet, otp } = loginUserDto;
    const isValid = await this.userService.validateOtp(wallet, otp);

    if (isValid) {
      const token = await this.userService.generateToken(wallet);
      await this.userService.deleteOtp(wallet); 
      return { token };
    } else {
      return { msg: 'Invalid wallet or OTP' };
    }
  }

  @UseGuards(TokenAuthGuard)
  @Get('info')
  getUsers(@Request() req) {
    return {
      data: req.user
    }
  }
  
  
  @Post('logout')
  logout(@Request() req) {
    req.logout(() => {
      return;
    });
  }

}
