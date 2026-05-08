export interface FormElement {
  id: number;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  value?: any;
  options?: { label: string; value: string }[];
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: number;
  padding?: number;
}
