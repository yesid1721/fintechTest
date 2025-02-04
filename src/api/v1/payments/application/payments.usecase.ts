import { PaymentsService } from "@api/payments/infrastructure/soap/payments.soapService";
import { PaymentsModel } from "@api/payments/infrastructure/model/payments.model";

export class PaymentsUseCase {
    constructor (private readonly paymentsServiceSoap: PaymentsService) { }

    async sendPayment(payData: Partial<PaymentsModel>): Promise<any> {
        try {
            return await this.paymentsServiceSoap.sendPayment(payData);
        } catch (error) {
            console.error('Error envindo el pago:', error);
            throw error;
        }             
    };
    
    async findPayment(params: Partial<PaymentsModel>): Promise<any | null> {
        try {
            return await this.paymentsServiceSoap.findPayment(params);
        } catch (error) {
            console.error('Error buscando el pago:', error);
            throw error;
        }
    };

    async updatePayment(id: number, paymentData: Partial<PaymentsModel>): Promise<any | null> {
        try {
            return await this.paymentsServiceSoap.updatePayment(id,paymentData);
        } catch (error) {
            console.error('Error actualizando el pago:', error);
            throw error;
        }
    }
};