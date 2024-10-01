import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastsService } from '../../services/toasts.service';
import { ToastVariants } from '../../enum/toasts.enum';
import { ToastInfo } from '../../interface/toasts.interface';

@Component({
  selector: 'app-toasts-container',
  templateUrl: './toasts-container.component.html',
  styleUrl: './toasts-container.component.scss',
  standalone: true,
  imports: [NgbToastModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastsContainerComponent {
  private readonly toastService = inject(ToastsService);

  toastVariants: Record<ToastVariants, string> = {
    [ToastVariants.Default]: 'text-dark',
    [ToastVariants.Success]: 'bg-success text-light',
    [ToastVariants.Danger]: 'bg-danger text-light',
  };

  get toasts(): ToastInfo[] {
    return this.toastService.toasts;
  }

  onRemoveToast(toast: ToastInfo) {
    this.toastService.remove(toast);
  }
}
