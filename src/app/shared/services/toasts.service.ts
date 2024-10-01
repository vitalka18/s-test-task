import { Injectable, signal } from '@angular/core';
import { ToastInfo } from '@interfaces/toasts.interface';
import { ToastVariants } from '@enums/toasts.enum';

@Injectable({
  providedIn: 'root',
})
export class ToastsService {
  private _toasts = signal<ToastInfo[]>([]);

  get toasts(): ToastInfo[] {
    return this._toasts();
  }

  show(toastInfo: Partial<ToastInfo>) {
    this._toasts.set([
      ...this.toasts,
      {
        body: toastInfo.body || '',
        delay: toastInfo.delay || 5000,
        variant: toastInfo.variant || ToastVariants.Default,
      },
    ]);
  }

  remove(toastInfo: ToastInfo) {
    this._toasts.set(this.toasts.filter(toast => toast !== toastInfo));
  }
}
