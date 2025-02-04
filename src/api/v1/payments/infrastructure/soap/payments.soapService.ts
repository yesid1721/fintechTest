import {listen} from "soap";
import express from "express";
import { readFileSync, existsSync } from "fs";

import { PaymentSoapUseCase } from "@api/payments/infrastructure/soap/payments.soapUseCase";
import { PaymentsModel } from "@api/payments/infrastructure/model/payments.model";
import { paymentsServiceSoap } from "@api/payments/infrastructure/services/payments.services";

const wsdlPath = 'src/api/v1/payments/infrastructure/soap/paymentService.wsdl';
if (!existsSync(wsdlPath)) {
    console.error(`File not found: ${wsdlPath}`);
    process.exit(1);
};
const xml = readFileSync(wsdlPath, 'utf8');

export class PaymentsService {
    constructor(private readonly paymentSoapUseCase: PaymentSoapUseCase) { }

     async sendPayment(payData: Partial<PaymentsModel>): Promise<any> {
        try {
            return await this.paymentSoapUseCase.sendPayment(payData);
        } catch (error) {
            return error;
        }             
    };
    
    async findPayment(params: Partial<PaymentsModel>): Promise<any | null> {
        try {
            return await this.paymentSoapUseCase.findPayment(params);
        } catch (error) {
            return error;
        }
    };

    async updatePayment (id: number, paymentData: Partial<PaymentsModel>): Promise<any | null> {
        try {
            return await this.paymentSoapUseCase.updatePayment(id,paymentData);
        } catch (error) {
            return error;
        }
    }
}; 

const app = express();

export const PaymentsServiceSoap = {
    PaymentsService: {
        PaymentsServicePort: {
            sendPayment: async (payData: Partial<PaymentsModel>): Promise<any> => {
                return await paymentsServiceSoap.sendPayment(payData)
            },
            findPayment: async (params: Partial<PaymentsModel>): Promise<any | null> => {
                return await paymentsServiceSoap.findPayment(params);
            }
        }
    }
};

app.listen(8002, () => {
    listen(app, '/wsdl', PaymentsServiceSoap, xml, () => {
        console.log('SOAP service listening on port 8002');
    });
});