import { PaymentsModel } from "@api/payments/infrastructure/model/payments.model";
import { IPaymentsRepository } from "@api/payments/domain/payments.entity";

export class PaymentsRepository implements IPaymentsRepository {
    async sendPayment(payData: Partial<PaymentsModel>): Promise<PaymentsModel>{
        return await PaymentsModel.create(payData);
    }

    async findPayment(params: Partial<PaymentsModel>): Promise<PaymentsModel | null>{
        try {
            const payment =  await PaymentsModel.findOne({
                where: {...params},
            });
            if (!payment) {
                return null
            };
            return payment
        } catch (error) {
            return Promise.reject(
                new Error(error instanceof Error ? error.message : "Unknown error")
            );
        }
    };

    async updatePayment(id: number, paymentData: Partial<PaymentsModel>): Promise<PaymentsModel | null> {
        const payment = await PaymentsModel.findByPk(id);
        if (!payment) throw new Error ('pago no encontrado');
        return await payment.update(paymentData);
    }
}