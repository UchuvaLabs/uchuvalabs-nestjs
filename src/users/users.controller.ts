import { Controller, Get, Post, Body, Request, UseGuards, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';
import { TokenAuthGuard } from 'src/Guard/authenticated.guard';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { CreateAgronomistDto } from './dto/create-agronomist.dto';




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
  @Post('register/farmer')
  async registerFarmer(@Body() createFarmerDto: CreateFarmerDto) {
    return this.userService.registerFarmer(createFarmerDto);
  }
  @Post('register/investor')
  async registerInversor(@Body() createInvestorDto: CreateInvestorDto) {
    return this.userService.registerInversor(createInvestorDto);
  }
  @Post('register/agronomist')
  async registerAgronomist(@Body() createAgronomistDto: CreateAgronomistDto) {
    return this.userService.registerAgronomist(createAgronomistDto);
  }

  
  @Post('generate-otp')
  async generateOtp(@Body('wallet') wallet: string) {
    const user = await this.userService.getUserByWallet(wallet);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const otp = await this.userService.generateOtp(wallet);

    await this.mailService.sendOtp(user.email, otp);

    return {otp: otp};
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
