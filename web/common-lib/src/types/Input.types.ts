export interface InputInterface {
  value: any;
  dummyValue?: any;
  values?: Array<any>;
  type: string;
  forceType?: string;
  extraComponent?: any;
  extraLeftComponent?: any;
  hasTopLabel?: boolean;
  label?: string;
  hasError?: boolean;
  placeholder: string | "";
  maxLength?: number;
  name?: string;
  hasEye?: boolean;
  cols?: number;
  rows?: number;
  extraClass?: string;
  globalExtraClass?: string;
  errorMessage?: string;
  required?: boolean;
  hasSearch?: boolean;
  noUpdate?: boolean;
  hasPlaceholder?: boolean;
  id?: any;
  forceOnblur?: boolean;
  joinSwitch?: boolean;
  rightPlaceholder?: string;
  leftPlaceholder?: string;
  rightValue?: any;
  leftValue?: any;
  disabled?: boolean;
  checkboxMode?: string;

  allowedFormats?: string[];
  maxSizeMB?: number;
}
