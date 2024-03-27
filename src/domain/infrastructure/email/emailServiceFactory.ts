
import { EmailService } from './email.service';

export function createEmailService(mailerService: string, mailerEmail: string, senderEmailPassword: string): EmailService {
    return new EmailService(mailerService, mailerEmail, senderEmailPassword);
}
