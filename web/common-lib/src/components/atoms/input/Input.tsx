import { InputInterface } from "../../../types/Input.types";
import "./input.scss";
import InputCheckbox from "./InputCheckbox";
import InputDate from "./InputDate";
import InputDragDrop from "./InputDragDrop";
import InputMap from "./InputMap";
import InputOTP from "./InputOTP";
import InputPassword from "./InputPassword";
import InputPhone from "./InputPhone";
import InputSelect from "./InputSelect";
import InputSpecialSelect from "./InputSpecialSelect";
import InputText from "./InputText";
import InputTextarea from "./InputTextarea";
import InputToggle from "./InputToggle";

export default function Input({
  extraClass = "",
  globalExtraClass = "",
  inputData,
  index,
  onChange = (e, index?) => { },
  onBlur = (e) => { },
}: {
  extraClass?: string;
  globalExtraClass?: string;
  inputData: InputInterface;
  index: number;
  onChange?: Function;
  onBlur?: Function;
}) {
  let content = <></>;

  switch (inputData.forceType ?? inputData.type) {
    case "text":
    case "price":
      content = <InputText inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    case "toggle":
      content = <InputToggle inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    case "select":
      content = <InputSelect inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    case "special-select":
      content = <InputSpecialSelect inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    case "password":
      content = <InputPassword inputData={inputData} index={index} onChange={onChange} onBlur={onBlur} />;
      break;
    case "textarea":
      content = <InputTextarea inputData={inputData} index={index} onChange={onChange} onBlur={onBlur} />;
      break;
    case "phone":
      content = <InputPhone inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    case "otp":
      content = <InputOTP inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    case "checkbox":
      content = <InputCheckbox inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    case "date":
    case "date-timelocal":
    case "time":
      content = <InputDate inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    case "map":
      content = <InputMap inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    case "file":
      content = <InputDragDrop inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    default:
      content = <InputText inputData={inputData} index={index} onChange={onChange} onBlur={onBlur} />;
      break;
  }

  return (
    <section className={`${globalExtraClass} ${extraClass} ${inputData.globalExtraClass} gp-form ${inputData.type === "between" ? "between-dates" : ""}`}>
      {content}

    </section>
  );
}
