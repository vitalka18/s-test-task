import {
  Component,
  DestroyRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserControlComponent } from '../user-control/user-control.component';
import { AddUserButtonComponent } from '../add-user-button/add-user-button.component';
import { User } from '@interfaces/users.interface';
import { DatePipe, DOCUMENT } from '@angular/common';
import { Subject, take, takeUntil, timer } from 'rxjs';
import { ToastsService } from '@services/toasts.service';
import { ToastVariants } from '@enums/toasts.enum';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InvalidControlsCountPipe } from '../../../../shared/pipes/invalid-controls-count.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface UserForm {
  users: FormArray<FormControl<User>>;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    UserControlComponent,
    AddUserButtonComponent,
    DatePipe,
    ReactiveFormsModule,
    NgbTooltipModule,
    InvalidControlsCountPipe,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit, OnDestroy {
  countries = input.required<string[]>();
  delay = input<number>(5);
  submitted = output<User[]>();
  isSubmitting = signal(false);
  isSubmitted = signal(false);
  countdown = 0;
  form!: FormGroup<UserForm>;
  cancel$ = new Subject<void>();

  private readonly formBuilder = inject(FormBuilder);
  private readonly toastsService = inject(ToastsService);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  get usersForm(): FormArray<FormControl<User>> {
    return this.form.get('users') as FormArray<FormControl<User>>;
  }

  get timer(): number {
    return this.countdown * 1000;
  }

  ngOnInit() {
    this.form = this.createForm();
  }

  ngOnDestroy() {
    this.cancel$.complete();
    this.cancel$.unsubscribe();
  }

  onAddControl() {
    const control = this.buildUserControl();
    this.usersForm.push(control);
  }

  onCancelSubmit() {
    this.cancel$.next();
    this.isSubmitting.set(false);
    this.countdown = 0;
    this.form.enable();
  }

  onRemoveControl(index: number) {
    const confirmation = this.document?.defaultView?.confirm(
      'Are you sure you want to remove this user?'
    );

    if (confirmation) {
      this.usersForm.removeAt(index);
    }
  }

  onSubmit() {
    this.isSubmitted.set(true);

    if (this.form.valid) {
      this.submitForm();
    } else {
      this.toastsService.show({
        body: 'Please fix all validation errors',
        header: 'Validation Error',
        variant: ToastVariants.Danger,
      });
      this.form.markAllAsTouched();
    }
  }

  private buildUserControl(): FormControl {
    return this.formBuilder.control<User>(null!, Validators.required);
  }

  private clearForm() {
    this.usersForm.clear();
    this.onAddControl();
  }

  private createForm(): FormGroup<UserForm> {
    return this.formBuilder.group({
      users: this.formBuilder.array([this.buildUserControl()]),
    });
  }

  private submitForm() {
    this.countdown = this.delay() + 1;
    this.isSubmitting.set(true);
    this.form.disable();

    timer(0, 1000)
      .pipe(
        take(this.delay() + 1),
        takeUntil(this.cancel$),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.countdown--;

        if (this.countdown <= 0) {
          this.submitted.emit(this.form.value.users!);

          this.clearForm();
          this.form.enable();

          this.isSubmitting.set(false);
          this.isSubmitted.set(false);
        }
      });
  }
}
