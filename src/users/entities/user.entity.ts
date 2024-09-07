import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


export type UserDocument = User & Document

@Schema()
export class User{
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
        minlength: 8 
    })
    password:string;

    @Prop({
        required: true, 
        unique: true 
    })
    wallet: string

    @Prop({
        required: true, 
        enum: ['inversor', 'minicultivador', 'comprador', 'agronomo', 'proveedor'],
        default: 'comprador'
    })
    role:string

    @Prop({
        enum: ['active', 'suspended', 'pending', 'inactive'],
        default: 'pending'
    })
    status: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
