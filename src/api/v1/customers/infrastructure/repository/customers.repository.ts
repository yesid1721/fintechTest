import { CustomersModel } from "@api/customers/infrastructure/model/customers.model";
import { ICustomersRepository } from "@api/customers/domain/customers.entity";

export class CustomersRepository implements ICustomersRepository {
    async registerCustomer(customerData: Partial<CustomersModel>):Promise<CustomersModel> {
        return await CustomersModel.create(customerData);
    };

    async findCustomer(params: Partial<CustomersModel>): Promise<CustomersModel | null> {
        try {
            const customer =  await CustomersModel.findOne({
                where: {...params},
            });
            if (!customer) {
                return null
            };
            return customer
        } catch (error) {
            return Promise.reject(
                new Error(error instanceof Error ? error.message : "Unknown error")
            );
        }
    }
};