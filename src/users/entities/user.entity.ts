import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document,Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document{
    @Prop({
        required: true, 
        trim: true
    })
    fullName:string;

    @Prop({
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true 
    })
    email:string;

    @Prop({
        required: true, 
        unique: true 
    })
    wallet: string

    @Prop({
        required: true, 
        enum: ['inversor', 'agricultor', 'comprador', 'agronomo', 'proveedor'],
        default: 'comprador'
    })
    role:string

    @Prop()
    otp?: string;

    @Prop()
    otpExpiration?: number;

    @Prop()
    tempToken?: string;

    @Prop()
    tempTokenExpiration?: Date;


    @Prop()
    experiencia?: string; 
 
    @Prop()
    areaTotalCultivable?: number; 

    @Prop()
    ubicacionesTierras?: string[]; 

    @Prop()
    historialCultivos?: { 
        cultivoId: string; 
        tipoCultivo: string; 
        fechaInicio: Date; 
        fechaFin: Date;
        resumen: string; 
        rendimiento: number; 
    }[];

    @Prop()
  capitalDisponible?: number;

  @Prop()
  areasInteres?: string[];

  @Prop()
  inversionesPrevias?: { proyecto: string; monto: number }[];
}

export const UserSchema = SchemaFactory.createForClass(User)
