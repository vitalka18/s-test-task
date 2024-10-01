import {
  AfterViewInit,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  Renderer2,
} from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appValidationMessage]',
  standalone: true,
})
export class ValidationMessageDirective implements AfterViewInit {
  controlName = input.required<string>();
  variant = input<'tooltip' | 'feedback'>('feedback');
  visibleErrors = input<boolean>(false);
  private readonly validControlStyle = 'is-valid';
  private readonly invalidControlStyle = 'is-invalid';
  private readonly el = inject(ElementRef);
  private readonly control = inject(NgControl, { self: true });
  private readonly controlContainer = inject(ControlContainer, {
    skipSelf: true,
    self: false,
    host: true,
  });
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);

  @HostListener('focus') onFocus() {
    this.control.control?.markAsTouched();
    this.control.control?.updateValueAndValidity();
  }

  constructor() {
    effect(() => {
      if (this.visibleErrors() || this.controlContainer.touched) {
        this.displayValidationMessages();
        this.displayValidationErrors();
      }
    });
  }

  get validMessageStyle(): string {
    return `valid-${this.variant()}`;
  }

  get invalidMessageStyle(): string {
    return `invalid-${this.variant()}`;
  }

  ngAfterViewInit() {
    this.control.statusChanges
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      ?.subscribe(() => {
        if (this.control.touched) {
          this.displayValidationMessages();
        }
        this.displayValidationErrors();
      });
  }

  private getParentContainer(): HTMLElement {
    return this.el.nativeElement.closest(
      '*:not(.input-group,.form-control)'
    ) as HTMLElement;
  }

  private displayValidationMessages() {
    if (this.control.invalid) {
      this.showValidationMessage();
    } else if (this.control.valid) {
      this.removeValidationMessage();
    }
  }

  private displayValidationErrors(): void {
    if (this.control.invalid) {
      this.setValidityClass(this.invalidControlStyle, this.validControlStyle);
    } else {
      this.setValidityClass(this.validControlStyle, this.invalidControlStyle);
    }
  }

  private removeValidationMessage() {
    const containerElement = this.getParentContainer();

    const errorMessage = containerElement.querySelector(
      `.${this.validMessageStyle},.${this.invalidMessageStyle}`
    ) as HTMLElement;

    if (errorMessage) {
      this.renderer.removeChild(containerElement, errorMessage);
    }
  }

  private setValidityClass(add: string, remove: string) {
    const element = this.el.nativeElement;
    const inputGroup = element.parentElement;

    this.renderer.removeClass(element, remove);
    this.renderer.addClass(element, add);

    if (inputGroup.classList.contains('input-group')) {
      this.renderer.removeClass(inputGroup, remove);
      this.renderer.addClass(inputGroup, add);
    }
  }

  private showValidationMessage() {
    const containerElement = this.getParentContainer();

    let errorMessage = containerElement.querySelector(
      `.${this.validMessageStyle},.${this.invalidMessageStyle}`
    ) as HTMLElement;

    if (!errorMessage) {
      errorMessage = this.renderer.createElement('div');
      this.renderer.appendChild(containerElement, errorMessage);
      const validationMessage = this.renderer.createText(
        `Please provide a correct "${this.controlName()}"`
      );
      this.renderer.appendChild(errorMessage, validationMessage);
    }

    this.renderer.addClass(errorMessage, this.invalidMessageStyle);
  }
}
