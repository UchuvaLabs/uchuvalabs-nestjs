import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CropService } from './crop.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropStatusDto } from './dto/update-crop.dto';
import { Crop } from './entities/crop.entity';

@Controller('crops')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Post('create')
  async createCrop(@Body() createCropDto: CreateCropDto): Promise<Crop> {
    try {
      return await this.cropService.createCrop(createCropDto);
    } catch (error) {
      console.error(error);
    }
  }

 
  @Get('review')
  async getCropsForReview(): Promise<Crop[]> {
    return await this.cropService.getCropsForReview();
  }

 
  @Patch('status')
  async updateCropStatus(@Body() updateCropStatusDto: UpdateCropStatusDto): Promise<Crop> {
    try {
      return await this.cropService.updateCropStatus(updateCropStatusDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Proyecto no encontrado');
      }
      throw new BadRequestException('Error al actualizar el estado del proyecto');
    }
  }


  @Get('accepted')
  async getAcceptedCrops(): Promise<Crop[]> {
    return await this.cropService.getAcceptedCrops();
  }
}
