import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCropDto } from './dto/create-crop.dto';

import { Crop } from './entities/crop.entity';
import { UpdateCropStatusDto } from './dto/update-crop.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CropService {
  constructor(
    @InjectModel(Crop.name) private readonly cropModel: Model<Crop>,
    private readonly userService: UsersService,
  ) {}

  async createCrop(createCropDto: CreateCropDto): Promise<Crop> {
    const crop = new this.cropModel(createCropDto);
    return crop.save();
  }

  async getCropsForReview(): Promise<Crop[]> {
    return this.cropModel.find({ status: 'pendiente' }).exec();
  }
  async assignProjectToAgronomist(cropId: string, wallet: string): Promise<Crop> {
    const user = await this.userService.getUserByWallet(wallet);
    if (!user || user.role !== 'agronomo') {
      throw new NotFoundException('Agrónomo no encontrado o no es un agrónomo');
    }

    
    const agronomistId = user._id as Types.ObjectId;

    const updatedCrop = await this.cropModel.findByIdAndUpdate(
      cropId, 
      { agronomo: agronomistId }, 
      { new: true } 
    ).exec();

    if (!updatedCrop) {
      throw new NotFoundException('Cultivo no encontrado');
    }

    return updatedCrop;
  }

  async updateCropStatus(updateCropStatusDto: UpdateCropStatusDto): Promise<Crop> {
    const { cropId, status } = updateCropStatusDto;

    const crop = await this.cropModel.findById(cropId).exec();
    if (!crop) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    crop.status = status;
    if (status === 'aceptado') {
      crop.isPublished = true;
    }
    await crop.save();

    return crop;
  }
  
  async getAcceptedCrops(page: number = 1, limit: number = 10): Promise<Crop[]> {
    const skip = (page - 1) * limit;
    return this.cropModel
      .find({ status: 'aceptado' })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async getCropsByFarmer(agricultor: string, page: number = 1, limit: number = 10): Promise<Crop[]> {
    const skip = (page - 1) * limit;
    return this.cropModel
      .find({ agricultor })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async getInvestmentsByInvestor(investorId: string): Promise<{ proyecto: string; monto: number }[]> {
    const crops = await this.cropModel.find({ inversores: investorId }).exec();

    const investments = crops.map(crop => ({
      proyecto: crop._id.toString(), 
      monto: crop.inversionNecesaria 
    }));

    return investments;
  }
  async getProjectsByAgronomist(wallet: string, page: number = 1, limit: number = 10): Promise<Crop[]> {
    const user = await this.userService.getUserByWallet(wallet);
    if (!user || user.role !== 'agronomo') {
      throw new NotFoundException('Agrónomo no encontrado o no es un agrónomo');
    }

    const agronomistId = user._id;
    const skip = (page - 1) * limit;

    return this.cropModel
      .find({ agronomo: agronomistId })
      .skip(skip)
      .limit(limit)
      .exec();
  }
}
