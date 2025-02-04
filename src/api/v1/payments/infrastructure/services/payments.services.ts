import { PaymentsRepository } from "@api/payments/infrastructure/repository/payments.repository";
import { PaymentSoapUseCase } from "@api/payments/infrastructure/soap/payments.soapUseCase";
import { PaymentsService } from "@api/payments/infrastructure/soap/payments.soapService";
import { PaymentsUseCase } from "@api/payments/application/payments.usecase";
import { PaymentsController } from "@api/payments/infrastructure/controllers/payments.controller";

export const paymentsRepository = new PaymentsRepository;
export const paymentSoapUseCase = new PaymentSoapUseCase(paymentsRepository);
export const paymentsServiceSoap = new PaymentsService(paymentSoapUseCase);
export const paymentsUseCase = new PaymentsUseCase(paymentsServiceSoap)
export const paymentsController = new PaymentsController(paymentsUseCase);