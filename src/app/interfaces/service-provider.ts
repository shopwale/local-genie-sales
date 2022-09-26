export interface ServiceProviderI {
    mobileNumber: number;
    serviceProviderName: string;
    pinCode: string;
    qrCode?: string;
    address: string;
    deliveryService?: boolean;
    serviceProviderId?: number;
    serviceProviderIconURL?: string;
    businessId?: string;
    registredDate?: string | Date;
    businessCode?: string;
}

export interface AddServiceProviderResponseI {
    status: string;
    serviceProviderId: number;
    businessCode: string;
}
