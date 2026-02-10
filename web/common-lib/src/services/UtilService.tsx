import moment from "moment";
export function getFileReader(): FileReader {
  const fileReader = new FileReader();
  const zoneOriginalInstance = (fileReader as any)[
    "__zone_symbol__originalInstance"
  ];
  return zoneOriginalInstance || fileReader;
}
/**Clase provider que se utiliza para generar mensajes de error, alerta o éxito
 * Se hizo de forma genérica para evitar repetir esta clase de código
 */
export class UtilService {
  public width: number = 0;

  static getRandomText(length:number) {
    let charset: any = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".match(/./g);
    let text = "";
    for (let i = 0; i < length; i++)
      text += charset[Math.floor(Math.random() * charset?.length)];
    return text;
  }

  static getRandomNumber(length:number) {
    let charset: any = "0123456789".match(/./g);
    let text = "";
    for (let i = 0; i < length; i++)
      text += charset[Math.floor(Math.random() * charset?.length)];
    return text;
  }

  static toBase64(file:any) {
    return new Promise((resolve, reject) => {
      //const reader = new FileReader();
      let reader = getFileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  static hexToRgbA(hex:any, transparentPercentage:any) {
    if (transparentPercentage > 100 || transparentPercentage < 0) {
      transparentPercentage = 1;
    }
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c?.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return (
        "rgba(" +
        [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
        `,${transparentPercentage / 100})`
      );
    }
    throw new Error("Bad Hex");
  }

  static randomHexadecimal() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  }

  static compress(
    file: any,
    returnBase64: boolean = true,
    factor: number = 5
  ): Promise<any> {
    file = file.target ? file.target.files[0] : file;
    const width = 500;
    const height = 500;
    const fileName = file.name;

    let reader = getFileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      (reader.onload = (event: any) => {
        const img = new Image();
        img.src = event.target.result;
        (img.onload = () => {
          let widthi = 0;
          let heighti = 0;
          if (file.size > 1000000) {
            widthi = img.width / factor;
            heighti = img.height / factor;
          } else {
            widthi = img.width;
            heighti = img.height;
          }
          const elem = document.createElement("canvas");
          elem.width = widthi;
          elem.height = heighti;
          const ctx: any = elem.getContext("2d");
          //ctx.globalAlpha = 0.2;
          // img.width and img.height will contain the original dimensions
          ctx.drawImage(img, 0, 0, widthi, heighti);
          ctx.canvas.toBlob(
            async (blob) => {
              let filet: any = new File([blob], fileName, {
                type: "image/png",
                lastModified: Date.now(),
              });
              let resultado = await this.getBase64(file);
              resolve(returnBase64 ? resultado : filet);
              //Logica de nuevo file
            },
            "image/png",
            1
          );
        }),
          (img.onerror = (error: any) => {
            reject(error);
          });
      }),
        (reader.onerror = (error: any) => {
          reject(error);
        });
    });
  }

  static compressB64(b64, factor) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = b64;
      (img.onload = () => {
        let widthi = 0;
        let heighti = 0;
        widthi = img.width / factor;
        heighti = img.height / factor;
        const elem = document.createElement("canvas");
        elem.width = widthi;
        elem.height = heighti;
        const ctx: any = elem.getContext("2d");
        //ctx.globalAlpha = 0.2;
        // img.width and img.height will contain the original dimensions
        ctx.drawImage(img, 0, 0, widthi, heighti);
        ctx.canvas.toBlob(
          async (blob) => {
            let filet: any = new File([blob], "compress", {
              type: "image/png",
              lastModified: Date.now(),
            });
            let resultado = await this.getBase64(filet);
            resolve(resultado);
            //Logica de nuevo file
          },
          "image/png",
          1
        );
      }),
        (img.onerror = (error: any) => {
          reject(error);
        });
    });
  }

  static urltoFile(url, filename, mimeType) {
    let arr = url.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr?.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mimeType });
  }

  static getBase64(file): Promise<any> {
    // const reader = new FileReader();
    let reader = getFileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  static onlyText(event: any) {
    let numregex = /[^a-z0-9 .]/gi;
    if (numregex.test(event.target.value)) {
      event.target.value = event.target.value.replace(numregex, "");
    }
  }

  static escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  }

  static replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), "g"), replace);
  }

  static sortArrayByParam(array: Array<any>, param: string) {
    array.sort((a: any, b: any) => {
      return a[param].localeCompare(b[param]);
    });
    return array;
  }

  static filterArrayByParam(
    array: Array<any>,
    param: string,
    word: string,
    param2: string = ""
  ) {
    let users = array,
      result: any = [];
    result = users.filter((user) => {
      return param2?.length > 0
        ? user[param].toLowerCase().search(word.toLowerCase()) != -1 ||
            user[param2].toLowerCase().search(word.toLowerCase()) != -1
        : user[param].toLowerCase().search(word.toLowerCase()) != -1;
    });
    return result;
  }

  static checkColorDark(color) {
    const hex = color.replace("#", "");
    const c_r = parseInt(hex.substring(0, 0 + 2), 16);
    const c_g = parseInt(hex.substring(2, 2 + 2), 16);
    const c_b = parseInt(hex.substring(4, 4 + 2), 16);
    const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
    return brightness > 155;
  }

  static onlyNumberKey(evt) {
    // Only ASCII character in that range allowed
    let ASCIICode = evt.which ? evt.which : evt.keyCode;
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
    return true;
  }

  static isOnlyNumbers(obj) {
    let r = false;
    const regx = /^\d*$/g;

    if (regx.test(obj)) {
      r = true;
    }

    return r;
  }

  static validateCURP(curp) {
    let re =
        /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
      validado = curp.match(re);

    if (!validado)
      //Coincide con el formato general?
      return false;

    //Validar que coincida el dígito verificador
    function digitoVerificador(curp17) {
      //Fuente https://consultas.curp.gob.mx/CurpSP/
      let diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
        lngSuma = 0.0,
        lngDigito = 0.0;
      for (let i = 0; i < 17; i++)
        lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
      lngDigito = 10 - (lngSuma % 10);
      if (lngDigito == 10) return 0;
      return lngDigito;
    }
    if (validado[2] != digitoVerificador(validado[1])) return false;

    return true; //Validado
  }

  static validateRFC(rfc) {
    let regex: RegExp =
      /^[A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]$/g;
    return regex.test(rfc);
  }

  static addLeadingZeros(str, targetLength) {
    return str.padStart(targetLength, "0");
  }

  static padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  static async getBase64ImageFromUrl(url: string) {
    //let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      //const reader = new FileReader();
      let reader = getFileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  }

  static getBase64ImageFromUrl2(url, outputFormat: string = "image/jpeg") {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        let canvas: any = document.createElement("CANVAS"),
          ctx = canvas.getContext("2d"),
          dataURL;
        let self: any = this.onload;
        canvas.height = self.height;
        canvas.width = self.width;
        ctx.drawImage(self, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        //callback(dataURL);
        canvas = null;
        resolve(dataURL);
      };

      img.src = url;
    });
  }

  static capitalizeFirsLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static shuffle(array) {
    //ordena aleatoriamente un array
    let currentIndex = array?.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  ///////////////////////////////ONLY PRESENTATION
  static applyStyles(element, styles, dimensiones: any = null): void {
    let carta: any = document.getElementById("carta");

    let dimensions = { ...dimensiones };

    dimensions.height = dimensions.height - 100;
    dimensions.width = dimensions.width - 88;

    if (element.nodeName == "P") {
      element.style.padding = "0";
      element.style.margin = "0";
    }
    let titulos: any = Object.keys(styles);
    //this.addImg(this.data.logo.img, true, false);
    titulos.forEach((estilo) => {
      try {
        if (estilo == "top") {
          let percentageValue =
            dimensions.height /
            ((100 / dimensions.height) * Number(styles[estilo].split("px")[0]));
          styles[estilo] = `${
            carta.offsetHeight - carta.offsetHeight * (percentageValue / 100)
          }px`;
        }
        element.style[String(estilo)] = String(styles[estilo]);
      } catch (error) {}
    });
  }

  public static getStylesComplete(styles): void {
    let titulos: any = Object.keys(styles);
    let estilosReal: any = {};
    //this.addImg(this.data.logo.img, true, false);
    titulos.forEach((estilo) => {
      //element.style.setProperty(estilo, styles[estilo]);
      //element.style['backgroundColor'] = 'blue'

      try {
        if (styles[estilo] && String(styles[estilo])?.length > 0) {
          estilosReal[String(estilo)] = String(styles[estilo]);
        }
      } catch (error) {}
    });
    return estilosReal;
  }

  public static calculateStorageSize(): number {
    let _lsTotal = 0,
      _xLen,
      _x;
    for (_x in localStorage) {
      if (!localStorage.hasOwnProperty(_x)) {
        continue;
      }
      _xLen = (localStorage[_x]?.length + _x?.length) * 2;
      _lsTotal += _xLen;
    }

    let storageSize = _lsTotal / 1024;
    return storageSize;
  }

  public static addMilliseconds(milliseconds, isSeconds: boolean = false) {
    let result = Date.now();
    result = result + milliseconds * (isSeconds ? 1000 : 1);
    return result;
  }

  public static millisToDate(milliseconds) {
    return new Date(milliseconds);
  }

  static async createFileFromUrl(url, name, defaultMyme = "application/pdf") {
    let fileName = name;
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
      type: url.includes(".pdf")
        ? "application/pdf"
        : url.includes(".mp3")
        ? "audio/mp3"
        : url.includes(".png")
        ? "image/png"
        : url.includes(".jpg")
        ? "image/jpg"
        : defaultMyme,
    };
    let file = new File(
      [data],
      `${fileName ?? new Date().getTime()}${
        url.includes(".pdf")
          ? ".pdf"
          : url.includes(".mp3")
          ? ".mp3"
          : url.includes(".png")
          ? ".png"
          : url.includes(".jpg")
          ? ".jpg"
          : defaultMyme.split("/")[1]
      }`,
      metadata
    );
    return file;
  }

  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static formatDate(dateSring: string, dateFormat: string = "DD/MM/YYYY") {
    return dateSring && dateSring.length > 0
      ? moment(dateSring).format(dateFormat)
      : "-";
  }

  static isNumeric(num) {
    return !isNaN(num);
  }
}

export const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export default UtilService;