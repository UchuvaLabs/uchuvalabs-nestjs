import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema({ timestamps: true })
export class Crop extends Document {

  @Prop({ required: true, trim: true })
  nombreCultivo: string;

  @Prop({ required: true, trim: true })
  tipoCultivo: string;

  @Prop({ trim: true })
  descripcion: string;

  @Prop()
  fechaSiembra: Date;

  @Prop()
  fechaCosecha: Date;

  @Prop({ required: true })
  area: number; // Área en hectáreas

  @Prop({ required: true })
  rendimientoEstimado: number; // Rendimiento estimado en kg

  @Prop({ required: true, trim: true })
  ubicacion: string;

  @Prop({ required: true })
  inversionNecesaria: number; // Inversión necesaria en USD

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  agricultor: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  agronomo: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  inversores: Types.ObjectId[];

  @Prop({
    type: {
      cantidadSembrada: { type: Number }, 
      tiempoCrecimiento: { type: String }, 
      devolucionEstimacion: { type: String }, 
      requerimientos: { type: String }, 
      plagasComunes: { type: [String] } 
    }
  })
  detallesCultivo: {
    cantidadSembrada: number;
    tiempoCrecimiento: string;
    devolucionEstimacion: string;
    requerimientos: string;
    plagasComunes: string[];
  };


  @Prop({ default: false })
  isPublished: boolean; 

  @Prop({ default: false })
  isViable: boolean; 

  @Prop({ required: true, enum: ['pendiente', 'aceptado'], default: 'pendiente' })
  status: string;
}

export const CropSchema = SchemaFactory.createForClass(Crop);
