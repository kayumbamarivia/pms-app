import * as nodemailer from 'nodemailer';

/**
 * Service for sending email notifications.
 */
export class EmailService {
  private readonly transporter: nodemailer.Transporter;
  private readonly fromEmail: string;
  private readonly logger = {
    log: console.log,
    error: console.error,
  };

  constructor() {
    this.fromEmail = process.env.MAIL_FROM || '';

    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  /**
   * Generates a common email signature with support contact and copyright.
   */
  private getCommonSignature(): string {
    const year = new Date().getFullYear();
    return `<br><br>If you need help, contact us at: <a href='mailto:kayumbaj88@gmail.com'>Kayumbaj88@gmail.com</a><br>© ${year}`;
  }



  async sendNotification(email: string): Promise<void> {
    this.logger.log(`Sending notification to: ${email}`);
    const subject = 'Email notification';

    const message = `<p>Dear Customer ${email}, Welcome to our fortress PMS, feel at ease💪🙏</p>
      ${this.getCommonSignature()}`;

    await Promise.all([
      this.sendEmail(email, subject, message)
    ]);
  }

  /**
   * Sends an HTML email to the specified recipient.
   */
  private async sendEmail(to: string, subject: string, htmlContent: string): Promise<void> {
    if (!to || to.trim() === '') {
      this.logger.error('Cannot send email: recipient address is null or empty');
      throw new Error('Recipient email address is required');
    }

    try {
      await this.transporter.sendMail({
        from: this.fromEmail,
        to,
        subject,
        html: htmlContent,
      });
      this.logger.log(`Successfully sent email to: ${to}`);
    } catch (error: any) {
      this.logger.error(`Failed to send email to ${to}: ${error.message}`, error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}