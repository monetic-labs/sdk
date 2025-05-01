import axios from 'axios';
import type {
  MerchantDisbursementCreateInput,
  MerchantDisbursementCreateOutput,
  MerchantDisbursementUpdateInput,
  MerchantDisbursementUpdateOutput,
  MerchantDisbursementEventsInput,
  MerchantDisbursementEventsOutput,
  MerchantDisbursementContactGetAllInput,
  MerchantDisbursementContactGetOutput,
} from './_types/disbursement';

class Disbursement {
  protected apiUrl: string;

  constructor(baseUrl: string) {
    this.apiUrl = `${baseUrl}/v1/disbursement`;
  }

  async initiateNewDisbursement(data: MerchantDisbursementCreateInput) {
    const response = await axios.post<{
      data: MerchantDisbursementCreateOutput;
    }>(`${this.apiUrl}/`, data, { withCredentials: true });
    return response.data.data;
  }

  async initiateExistingDisbursement(
    disbursementId: string,
    data: MerchantDisbursementUpdateInput
  ) {
    const response = await axios.put<{
      data: MerchantDisbursementUpdateOutput;
    }>(`${this.apiUrl}/${disbursementId}`, data, {
      withCredentials: true,
    });
    return response.data.data;
  }

  async getDisbursementEvents(queryParams: MerchantDisbursementEventsInput) {
    const response = await axios.get<{
      data: MerchantDisbursementEventsOutput;
    }>(`${this.apiUrl}/events`, {
      params: queryParams,
      withCredentials: true,
    });
    return response.data.data;
  }

  async getDisbursementContacts(
    queryParams: MerchantDisbursementContactGetAllInput
  ) {
    const response = await axios.get<{
      data: MerchantDisbursementContactGetOutput;
    }>(`${this.apiUrl}/contacts`, {
      params: queryParams,
      withCredentials: true,
    });
    return response.data.data;
  }
}

export default Disbursement;
