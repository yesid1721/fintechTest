import { CustomerService } from "@api/customers/infrastructure/soap/customers.soapService";
import { CustomersModel } from "@api/customers/infrastructure/model/customers.model";

export class CustomerUseCase {
    constructor (private readonly customerServiceSoap: CustomerService) { }

    async registerCustomer(customerData: Partial<CustomersModel>): Promise<CustomersModel> {
        try {
            const result = await this.customerServiceSoap.registerCustomer(customerData);
            return result;
        } catch (error) {
            console.error('Error registrando el cliente:', error);
            throw error;
        }
    };

    async findCustomer(parmas: Partial<CustomersModel>): Promise<CustomersModel | null> {
        try {
            return await this.customerServiceSoap.findCustomer(parmas);
        } catch (error) {
            console.error('Error buscando el cliente:', error);
            throw error;
        }
    }
}