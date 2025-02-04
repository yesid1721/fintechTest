import soap from 'soap';
import { SOAP_URL } from './soapConfig';

export default class SoapClient {
  private static instance: soap.Client | null = null;

  static async getClient(): Promise<soap.Client> {
    if (!this.instance) {
      this.instance = await soap.createClientAsync(SOAP_URL);
    }
    return this.instance;
  }
}