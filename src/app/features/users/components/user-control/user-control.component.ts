import {
  Component,
  DestroyRef,
  forwardRef,
  inject,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  OperatorFunction,
} from 'rxjs';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NgbCalendar,
  NgbDatepickerModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { randomStringUtil } from '@utils/random-string.util';
import { User } from '@interfaces/users.interface';
import { countryValidator } from '../../validators/country.validator';
import { UsernameValidator } from '../../validators/username.validator';
import { ValidationMessageDirective } from '@directives/validation-message.directive';

type UserControl = {
  [key in keyof User]: FormControl<User[key]>;
};

@Component({
  selector: 'app-user-control',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    ValidationMessageDirective,
  ],
  templateUrl: './user-control.component.html',
  styleUrl: './user-control.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => UserControlComponent),
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UserControlComponent),
      multi: true,
    },
  ],
})
export class UserControlComponent
  implements ControlValueAccessor, Validator, OnInit, OnChanges
{
  countries = input.required<string[]>();
  isSubmitted = input.required<boolean>();

  formBuilder = inject(FormBuilder);
  ngbCalendar = inject(NgbCalendar);
  userNameValidator = inject(UsernameValidator);

  group!: FormGroup<UserControl>;
  id = randomStringUtil();
  maxDate = this.ngbCalendar.getToday();
  private readonly destroyRef = inject(DestroyRef);

  countries$: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : this.countries()
              .filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  ngOnInit() {
    this.group = this.createControlGroup();

    combineLatest([this.group.statusChanges, this.group.valueChanges])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.onChange(UserControlComponent.normalizeValue(this.group.value));
        this.onTouched();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['countries']) {
      this.onValidatorChange();
    }
  }

  onChange = (value: User) => {};
  onTouched = () => {};
  onValidatorChange = () => {};

  registerOnChange(fn: (value: User) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  registerOnValidatorChange(fn: () => void) {
    this.onValidatorChange = fn;
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.group.disable();
    } else {
      this.group.enable();
    }
  }

  validate(): ValidationErrors | null {
    return this.group.valid || this.group.disabled
      ? null
      : { userInvalid: true };
  }

  writeValue(value: User) {
    const newValue: User = UserControlComponent.normalizeValue(value);
    this.group.setValue(newValue);
  }

  private createControlGroup(): FormGroup<UserControl> {
    return this.formBuilder.group<UserControl>({
      username: this.formBuilder.control('', {
        validators: [Validators.required],
        nonNullable: true,
        asyncValidators: [
          this.userNameValidator.validate.bind(this.userNameValidator),
        ],
      }),
      birthday: this.formBuilder.control('', {
        nonNullable: true,
      }),
      country: this.formBuilder.control('', {
        validators: [Validators.required, countryValidator(this.countries())],
        nonNullable: true,
      }),
    });
  }

  private static normalizeValue(value: Partial<User>) {
    return {
      birthday: value?.birthday || '',
      username: value?.username || '',
      country: value?.country || '',
    };
  }
}
