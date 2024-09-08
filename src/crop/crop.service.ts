import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCropDto } from './dto/create-crop.dto';

import { Crop } from './entities/crop.entity';
import { UpdateCropStatusDto } from './dto/update-crop.dto';

@Injectable()
export class CropService {
  constructor(
    @InjectModel(Crop.name) private readonly cropModel: Model<Crop>,
  ) {}

  async createCrop(createCropDto: CreateCropDto): Promise<Crop> {
    const crop = new this.cropModel(createCropDto);
    return crop.save();
  }

  async getCropsForReview(): Promise<Crop[]> {
    return this.cropModel.find({ status: 'pendiente' }).exec();
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
}
