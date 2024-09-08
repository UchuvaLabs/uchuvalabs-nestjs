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

  @Prop({ required: true })
  fechaSiembra: Date;

  @Prop({ required: true })
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

  
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  agronomo: Types.ObjectId;

  
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  inversores: Types.ObjectId[];

  @Prop({
    type: {
      cantidadSembrada: { type: Number, required: true }, 
      tiempoCrecimiento: { type: String, required: true }, 
      devolucionEstimacion: { type: String, required: true }, 
      requerimientos: { type: String }, 
      plagasComunes: { type: [String] } 
    },
    required: true
  })
  detallesCultivo: {
    cantidadSembrada: number;
    tiempoCrecimiento: string;
    devolucionEstimacion: string;
    requerimientos: string;
    plagasComunes: string[];
  };
}

export const CropSchema = SchemaFactory.createForClass(Crop);
