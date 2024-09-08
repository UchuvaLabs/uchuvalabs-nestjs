import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MailService {
  private readonly apiUrl = 'https://api-email.fireysoft.co/api/v1/uchuvalabs-mail-sender';
  private readonly securityKey = '26c98b755b36ca7b6e8f2aa437b726e673c8bdc8f01d5554976c7419576c9083';

  async sendOtp(to: string, otp: string): Promise<void> {
    const payload = {
      to,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
      html: `<p>Your OTP code is <strong>${otp}</strong>. It is valid for 5 minutes.</p>`,
      securityKey: this.securityKey
    };

    try {
      await axios.post(this.apiUrl, payload);
    } catch (error) {
      throw new BadRequestException('Failed to send OTP email');
    }
  }
}
