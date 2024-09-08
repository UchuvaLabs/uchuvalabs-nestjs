import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { HashService } from './hash.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { CreateAgronomistDto } from './dto/create-agronomist.dto';

@Injectable()
export class UsersService {
  private otpStore: Map<string, { otp: string, expiresAt: Date }> = new Map();
  constructor(
    @InjectModel(User.name) private userModel:Model<User>,
    private hashService: HashService
  ){}
  
  async getUserByEmail(email:string){
    return this.userModel.findOne({email}).exec()
  }
  async getUserByWallet(wallet: string) {
    return this.userModel.findOne({ wallet }).exec();
  }
  async getUserByToken(token: string): Promise<User> {
    return this.userModel.findOne({ tempToken: token }).exec();
  }
  async register(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = await this.getUserByEmail(email)
    if(user){
      throw new BadRequestException('User already exists')
    }
  
    
    const newUser = new this.userModel({
      ...createUserDto
    });

    return newUser.save();

  }
  async registerFarmer(createFarmerDto: CreateFarmerDto) {
    const { email } = createFarmerDto;
    const user = await this.getUserByEmail(email)
    if(user){
      throw new BadRequestException('User already exists')
    }
    
    
    const newUser = {
      ...createFarmerDto
    };

    return this.userModel.create(newUser)

  }
  async registerInversor(createInvestorDto: CreateInvestorDto) {
    const { email } = createInvestorDto;
    const user = await this.getUserByEmail(email)
    if(user){
      throw new BadRequestException('User already exists')
    }
   
    
    const newUser = new this.userModel({
      ...createInvestorDto
    });

    return newUser.save();

  }
  async registerAgronomist(createAgronomistDto: CreateAgronomistDto) {
    const { email } = createAgronomistDto;
    const user = await this.getUserByEmail(email)
    if(user){
      throw new BadRequestException('User already exists')
    }
   
    
    const newUser = new this.userModel({
      ...createAgronomistDto
    });

    return newUser.save()

  }
  async generateToken(wallet: string): Promise<object> {
    const token = crypto.randomBytes(16).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);
    const user = await this.userModel.findOneAndUpdate(
      { wallet },
      { tempToken: token, tempTokenExpiration: expiresAt },
      { new: true }
    ).exec();
    if (!user) {
      throw new Error('User not found');
    }
    return {
      token: token,
      expiresAt: expiresAt,
      role: user.role 
    };
  }
  async validateToken( token: string): Promise<boolean> {
    const user = await this.getUserByToken(token);
    if (!user) return false;
    return user.tempToken === token && user.tempTokenExpiration > new Date();
  }

  async deleteToken(wallet: string): Promise<void> {
    await this.userModel.updateOne({ wallet }, { $unset: { tempToken: "", tempTokenExpiration: "" } }).exec();
  }

  async generateOtp(wallet: string): Promise<string> {
    const otp = crypto.randomBytes(3).toString('hex').toUpperCase();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 
    this.otpStore.set(wallet, { otp, expiresAt });
    return otp;
  }

  async validateOtp(wallet: string, otp: string): Promise<boolean> {
    const otpData = this.otpStore.get(wallet);
    if (!otpData) {
      return false;
    }
    const { otp: storedOtp, expiresAt } = otpData;
    const now = new Date();

    
    return storedOtp === otp && now < expiresAt;
  }

  async deleteOtp(wallet: string): Promise<void> {
    this.otpStore.delete(wallet);
  }
}
