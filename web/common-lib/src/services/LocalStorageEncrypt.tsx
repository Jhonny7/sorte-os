import * as CryptoJS from "crypto-js";

export class LocalStorageEncryptService {
  private static secretKey: string = "d3l1v3r141d4m4";

  private static CryptoJSAesJson = {
    stringify: function (cipherParams: any) {
      const j: any = {
        ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64),
      };
      if (cipherParams.iv) j.iv = cipherParams.iv.toString();
      if (cipherParams.salt) j.s = cipherParams.salt.toString();
      return JSON.stringify(j);
    },
    parse: function (jsonStr: any) {
      const j: any = JSON.parse(jsonStr);
      let cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(j.ct),
      });
      if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
      if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
      return cipherParams;
    },
  };

  static encryptBack(data: any) {
    let encryptedData: any = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      this.secretKey,
      { format: this.CryptoJSAesJson }
    ).toString();
    return encryptedData;
  }

  static decryptBack(data: any) {
    //let encryptedData: any = CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
    return JSON.parse(
      CryptoJS.AES.decrypt(data, this.secretKey, {
        format: this.CryptoJSAesJson,
      }).toString(CryptoJS.enc.Utf8)
    );
  }

  /**
   * Almacena encriptado los datos necesarios en el localstorage
   * @param key Llave a almacenar
   * @param data Dato a almacenar
   */
  static setToLocalStorage(key: string, data: any, isSession:boolean = false) {
    let encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      this.secretKey
    ).toString();

    let encryptedKey = CryptoJS.SHA256(key).toString();

    encryptedData = JSON.stringify(data);
    encryptedKey = key;
    (isSession ? sessionStorage : localStorage).setItem(encryptedKey, encryptedData);
  }

  static yayirobe(data: any) {
    return CryptoJS.AES.decrypt(data, this.secretKey).toString(
      CryptoJS.enc.Utf8
    );
  }

  /**
   * Recupera valores del localstorage por medio de la llave
   * @param key Llave a obtener
   */
  static getFromLocalStorage(key: string, isSession:boolean = false): any {
    let encryptedKey = CryptoJS.SHA256(key).toString();
    encryptedKey = key;
    const item = (isSession ? sessionStorage : localStorage).getItem(encryptedKey);
    if (item === undefined || item === null) {
      return null;
    }
    let dencryptedData: any; // = CryptoJS.AES.decrypt(item, this.secretKey).toString(CryptoJS.enc.Utf8);
    dencryptedData = 1;

    if (this.isJson(item)) {
      return JSON.parse(item);
    } else {
      return item;
    }
  }

  /**
   * Limpia todo el localstorage
   */
  static clear() {
    localStorage.clear();
  }

  /**
   * Remueve una propiedad especifica del local storage
   * @param property Propiedad a eliminar
   */
  static clearProperty(property: string, isSession:boolean = false) {
    const encryptedKey = CryptoJS.SHA256(property).toString();
    //localStorage.removeItem(encryptedKey);
    (isSession ? sessionStorage : localStorage).removeItem(property);
  }

  /**
   * Valida si una cadena cumple el formato JSON
   * @param str Cadena a validar
   * @returns True si cumple el formato False no cumple el formato
   */
  private static isJson(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  static setCookie(name:any, value:any, days:any) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
      name + "=" + (JSON.stringify(value) || "") + expires + "; path=/";
  }

  static getCookie(name:any) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca?.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c?.length);
      if (c.indexOf(nameEQ) == 0)
        return JSON.parse(c.substring(nameEQ?.length, c?.length));
    }
    return null;
  }
}
export default LocalStorageEncryptService;