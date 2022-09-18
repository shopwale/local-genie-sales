import { environment } from "src/environments/environment";

const CUSTOMER_API_URL = environment.customerApiUrl;
const MANAGE_SERVICE_PROVIDER_API_URL = environment.manageServiceProviderApiUrl;
const ITEMS_API_URL = environment.itemsApiUrl;

export class ApiConst {
    public static GET_CATEGORIES = `${CUSTOMER_API_URL}getCategories`;

    public static ADD_SERVICE_PROVIDER = `${MANAGE_SERVICE_PROVIDER_API_URL}addServiceProvider`;

    public static MAP_SINGLE_ITEM_TO_SERVICE_PROVIDER = `${MANAGE_SERVICE_PROVIDER_API_URL}mapSingleItemToServiceProvider`;

    public static GET_ITEMS = `${CUSTOMER_API_URL}getItems`;
    public static GET_ITEMS_BY_CATEGORY_AND_SUBCATEGORY = `${ITEMS_API_URL}getItemsByCategoryAndSubcategory`;
    public static UPDATE_ITEM = `${ITEMS_API_URL}updateItem`;
    public static ADD_ITEM = `${ITEMS_API_URL}addItemWithMeasurementId`;
    public static GET_MEASUREMENTS = `${ITEMS_API_URL}getMeasurements`;
    
    

    public static ADD_SUB_CATEGORY = `${ITEMS_API_URL}addSubCategory`;
    public static GET_SUB_CATEGORY = `${ITEMS_API_URL}getSubCategories`;
    public static GET_SUB_CATEGORIES_WITH_CATEGORYID = `${ITEMS_API_URL}getSubCategoriesWithCategoryId`;
}