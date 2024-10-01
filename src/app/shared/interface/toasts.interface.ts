import { ToastVariants } from '../enum/toasts.enum';

export interface ToastInfo {
  header?: string;
  body: string;
  delay: number;
  variant: ToastVariants;
}
