import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  Query,
  Put,
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

  @Put(':cropId/assign')
  async assignProjectToAgronomist(
    @Param('cropId') cropId: string,
    @Body('wallet') wallet: string
  ): Promise<Crop> {
    try {
      return await this.cropService.assignProjectToAgronomist(cropId, wallet);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
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
async getAcceptedCrops(
  @Query('page') page: number = 1,
  @Query('limit') limit: number = 10,
): Promise<Crop[]> {
  return await this.cropService.getAcceptedCrops(page, limit);
}
@Get('farmer/:farmerId')
  async getCropsByFarmer(
    @Param('farmerId') farmerId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Crop[]> {
    return this.cropService.getCropsByFarmer(farmerId, page, limit);
  }
  @Get('investments/:investorId')
  async getInvestmentsByInvestor(
    @Param('investorId') investorId: string,
  ): Promise<{ proyecto: string; monto: number }[]> {
    return this.cropService.getInvestmentsByInvestor(investorId);
  }

  @Get('agronomist/:wallet')
  async getProjectsByAgronomist(
    @Param('wallet') wallet: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<Crop[]> {
    if (page < 1) {
      page = 1;
    }
    if (limit < 1) {
      limit = 10;
    }
    const crops = await this.cropService.getProjectsByAgronomist(wallet, page, limit);
    if (!crops || crops.length === 0) {
      throw new NotFoundException('No se encontraron proyectos para el agrónomo especificado.');
    }
    return crops;
  }
}
