import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor (private mailerService: MailerService) {}
    
    async sendUserConfirmation(userORadmin: string, activation_link: string, mail: string, firstName: string) : Promise<void> {
        const url = `http://localhost:${process.env.API_PORT}/api/${userORadmin}/activate/${activation_link}`;
        await this.mailerService.sendMail({
            to: mail,
            subject: "Добро пожаловать! Подтвердите ваш адрес электронной почты!",
            template: "./confirmation",
            context: {
                name: firstName,
                url
            }
        })
    }
}