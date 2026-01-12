export type LanguageOptions = "id" | "en";

export interface IMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
export interface IError {
  code: number;
  errors: {
    key: string;
    message: string;
  }[];
  message: string;
  title: string;
}
export interface IResponse<T> {
  data: T;
  message: string;
  meta?: IMeta;
}
export interface IGetRequest {
  params?: {};
  query?: {
    page?: number;
    per_page?: number;
  };
}
export interface IVerticalAccordionItem {
  collapse?: {
    title?: string;
    subtitle?: string;
  };
  title: string;
  content: string;
  image: string;
}
export interface IDataList<T> {
  list: T[];
}
export interface IDataListWithMeta<T> extends IDataList<T> {
  meta: IMeta;
}
export interface IDataDetail<T> {
  detail: T | null;
}
export interface IToast {
  title: string;
  description?: string;
  type: "success" | "error" | "info" | "warning";
  actionText?: string;
  actionCallback?: () => void;
}

export interface IComboboxOption<T> {
  title: string;
  value: T;
}

export interface ICategory {
  id: number;
  title: string;
  slug?: string;
}
