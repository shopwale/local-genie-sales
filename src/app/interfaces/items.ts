export interface ItemsResponseI {
    categoryName: string;
    itemIconURL: string;
    itemId: number;
    itemName: string;
    price: number;
    backPrice?: number;
    subCategoryId: number;
    categoryId: number;
    measurement?: any;
    subCategoryName: string;
    subItems: SubItemsI[];
    unitOfMeasure: string;
}

export interface SubItemsI {
    itemName: string;
}

export interface ItemsI {
    itemId: number;
    itemName: string;
    categoryId: number;
    subCategoryId: number;
    measurementId: number;
    itemIconUrl?: string;
}

export interface MeasurementI {
    measurementId: number;
    unitOfMeasure: string;
}
