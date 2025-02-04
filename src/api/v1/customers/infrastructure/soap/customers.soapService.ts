import {listen} from "soap";
import express from "express";
import { readFileSync, existsSync } from "fs";
import { CustomerSoapUseCase } from "@api/customers/infrastructure/soap/customers.soapUseCase";
import { CustomersModel } from "@api/customers/infrastructure/model/customers.model";
import { customerServiceSoap } from "@api/customers/infrastructure/services/customers.services";


const wsdlPath = 'src/api/v1/customers/infrastructure/soap/customerService.wsdl';
if (!existsSync(wsdlPath)) {
    console.error(`File not found: ${wsdlPath}`);
    process.exit(1);
};

const xml = readFileSync(wsdlPath, 'utf8');

export class CustomerService {

    constructor(private readonly customerSoapUseCase: CustomerSoapUseCase) { }

    async registerCustomer(customerData: Partial<CustomersModel>): Promise<any> {
        try {
            const result = await this.customerSoapUseCase.registerCustomer(customerData);
            return result;
        } catch (error) {
            return error;
        }
    };

    async findCustomer(parmas: Partial<CustomersModel>): Promise<any | null> {
        try {
            return await this.customerSoapUseCase.findCustomer(parmas);
        } catch (error) {
            return error;
        }
    }
}

const app = express();

export const CustomerServiceSoap = {
    CustomerService: {
        CustomerServicePort: {
            registerCustomer: async (customerData: Partial<CustomersModel>): Promise<any> => {
                return await customerServiceSoap.registerCustomer(customerData);
            }
        }
    }
};

app.listen(8001, () => {
    listen(app, '/wsdl', CustomerServiceSoap, xml, () => {
        console.log('SOAP service listening on port 8001');
    });
});