export interface InputInterface {
  id: string;
  type: string;
  value: any;
  label?: string;
  placeholder?: string;
  hasError?: boolean;
  errorMessage?: string;
  required?: boolean;
  maxLength?: number;
  options?: Array<{ value: string; label: string }>;
  hasEye?: boolean; 
  extraClass?: string;
}
