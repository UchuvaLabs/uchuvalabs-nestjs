import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, Role } from './dto/create-user.dto';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { HashService } from './hash.service';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { CreateFarmerDto } from './dto/create-farmer.dto';
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
    const { email,  password, role } = createUserDto;
    const user = await this.getUserByEmail(email)
    if(user){
      throw new BadRequestException('User already exists')
    }
    const hashedPassword = await this.hashService.hashPassword(password);
    
    let newUser;

    switch (role) {
      case Role.Agronomo:
        if (!this.validateAgronomistDto(createUserDto)) {
          throw new BadRequestException('Faltan campos requeridos para el rol de Agrónomo');
        }
        newUser = new this.userModel({
          ...createUserDto,
          password: hashedPassword
        } as CreateAgronomistDto);
        break;

      case Role.Agricultor:
        if (!this.validateFarmerDto(createUserDto)) {
          throw new BadRequestException('Faltan campos requeridos para el rol de Agricultor');
        }
        newUser = new this.userModel({
          ...createUserDto,
          password: hashedPassword
        } as CreateFarmerDto);
        break;

      case Role.Inversor:
        if (!this.validateInvestorDto(createUserDto)) {
          throw new BadRequestException('Faltan campos requeridos para el rol de Inversor');
        }
        newUser = new this.userModel({
          ...createUserDto,
          password: hashedPassword
        } as CreateInvestorDto);
        break;

      default:
        throw new BadRequestException('Rol no válido');
    }

    return newUser.save();
  }
  private validateAgronomistDto(dto: CreateUserDto): dto is CreateAgronomistDto {
    return 'tituloUniversitario' in dto && 'especializacion' in dto;
  }

  private validateFarmerDto(dto: CreateUserDto): dto is CreateFarmerDto {
    return 'experiencia' in dto && 'areaTotalCultivable' in dto;
  }

  private validateInvestorDto(dto: CreateUserDto): dto is CreateInvestorDto {
    return 'capitalDisponible' in dto && 'areasInteres' in dto;
  }
  async generateToken(wallet: string): Promise<string> {
    const token = crypto.randomBytes(16).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);
    await this.userModel.findOneAndUpdate(
      { wallet },
      { tempToken: token, tempTokenExpiration: expiresAt },
      { new: true }
    ).exec();

    return token;
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
