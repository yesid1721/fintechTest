import { ICustomersRepository, Customers } from "@api/customers/domain/customers.entity";

export class CustomerSoapUseCase {
    constructor (private readonly CustomerSoapRepository: ICustomersRepository) { }

    async registerCustomer(customerData: Partial<Customers>): Promise<Customers> {
        return await this.CustomerSoapRepository.registerCustomer(customerData);
    };

    async findCustomer(parmas: Partial<Customers>): Promise<Customers | null> {
        return await this.CustomerSoapRepository.findCustomer(parmas);
    }
}