export interface ServiceProviderI {
    mobileNumber: number;
    serviceProviderName: string;
    pinCode: string;
    address: string;
    deliveryService: boolean;
    serviceProviderId?: number;
    serviceProviderIconURL?: string;
    businessId?: string;
    registredDate?: string | Date;
}

export interface AddServiceProviderResponseI {
    status: string;
    serviceProviderId: number;
    businessCode: string;
}
