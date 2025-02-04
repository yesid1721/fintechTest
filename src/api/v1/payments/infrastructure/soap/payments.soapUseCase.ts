import { IPaymentsRepository, Payments } from "@api/payments/domain/payments.entity";

export class PaymentSoapUseCase {
    constructor(private readonly PaymentSoapRepository: IPaymentsRepository) { }

    async sendPayment(payData: Partial<Payments>): Promise<Payments> {
        return await this.PaymentSoapRepository.sendPayment(payData);
    };

    async findPayment(params: Partial<Payments>): Promise<Payments | null> {
        return await this.PaymentSoapRepository.findPayment(params);
    };

    async updatePayment(id: number, paymentData: Partial<Payments>): Promise<Payments | null> {
        return await this.PaymentSoapRepository.updatePayment(id,paymentData);
    }
}