export const themes = {
  light: {
    primary: "#bf2900",
    textColor: "#333",
    textColorSecundary: "#fff",
    logo: '/logo2.png'
  },
  dark: {
  },
};

export const basePath = "https://olamsys.com/delivery_aldama_api";
export const basePathUtilsState = "https://olam-systems.com.mx/olam/utils/getStates?countryCode=mex"
export const basePathUtilsCities = "https://olam-systems.com.mx/olam/utils/getFromZipCode2?zipCode=[[]]"
export const basePathUtilsCitiesByState = "https://olam-systems.com.mx/olam/utils/getCities?countryCode=mex&stateName=[[]]"
export const basePathUtilsPostalCode = `https://olam-systems.com.mx/olam/utils/getFromZipCode?countryCode=mx&zipCode=`
export const geoapi = `https://api.zippopotam.us/mx/[[]]`;

export const environment = {
  tokenPath: `/auth/token`,
  updateToken: `/auth/updateToken`,
  login: `/user/login`,
  getCatalogsByPagination: `/catalog/paginated`
};
