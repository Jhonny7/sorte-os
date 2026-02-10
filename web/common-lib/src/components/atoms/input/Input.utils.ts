import { UtilService, formatCurrency } from "../../../services/UtilService";

export function changePrice(event, inputData, setMessage, onBlur, index, isHandleBlur = false) {
  let input: any = event.target.value;
  let valFinal: any = null;
  let value: any = null;
  let before: any = null;
  let after: any = null;

  let lastCharacter = event.target.value.slice(-1);
  if (!UtilService.isOnlyNumbers(lastCharacter)) {
    event.target.value = event.target.value.slice(0, -1);
    return;
  }

  if (inputData.type == "porcentual") {
    event.target.value = event.target.value.replaceAll("%", "");
  }

  if (event.target.value.length > -1 && event.target.value.length <= 11) {
    if (event.target.value.charAt(event.target.value.length - 1) == ".") {
      input = input.slice(0, -1);
    } else {
      value = Array.from(event.target.value.replace(".", ""));
      before = value.slice(value.length - 2, value.length);
      after = [];
      if (inputData.type == "price" && value.length > 2) {
        after = value.slice(0, value.length - 2);
      }
      if (before.length == 1 && inputData.type == "price") {
        valFinal = after.join("") + ".0" + before.join("");
      } else if (inputData.type == "price") {
        valFinal = after.join("") + "." + before.join("");
      } else {
        valFinal = after + before;
      }

      if (inputData.type == "price") {
        input = formatCurrency.format(
          valFinal.replace("$", "").replace(",", "")
        );
      } else {
        input = `${event.target.value}`;
      }
    }

    if (inputData.type == "porcentual" && input > 100) {
      input = 100;
    }

    if (inputData.type == "porcentual") {
      input += `%`;
    }

    event.target.value = input;
    inputData.value = input;
    inputData.hasError = false;
    setMessage(event.target.value);
    if (isHandleBlur) {
      onBlur(inputData, index);
    }
  }
}
