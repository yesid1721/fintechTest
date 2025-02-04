import { CustomersRepository } from "@api/customers/infrastructure/repository/customers.repository";
import { CustomerSoapUseCase } from "@api/customers/infrastructure/soap/customers.soapUseCase";
import { CustomerService } from "@api/customers/infrastructure/soap/customers.soapService";
import { CustomerUseCase } from "@api/customers/application/customers.usecase";
import { CustomersController } from "@api/customers/infrastructure/controllers/customers.controller";

export const customersRepository = new CustomersRepository();
export const customerSoapUseCase = new CustomerSoapUseCase(customersRepository);
export const customerServiceSoap = new CustomerService(customerSoapUseCase);
export const customerUseCase = new CustomerUseCase(customerServiceSoap);
export const customersController = new CustomersController(customerUseCase);

