import moment from "moment";

export function usePipeDate(value: any, dateFormat: string) {
  function transform(value: any, dateFormat: string): any {
    return moment(value).format(dateFormat);
  }

  return transform(value, dateFormat);
}

export default usePipeDate;