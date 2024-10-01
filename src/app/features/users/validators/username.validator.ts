import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { distinctUntilChanged, map, Observable, switchMap, timer } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { UsersService } from '@users/services/users.service';

@Injectable({
  providedIn: 'root',
})
export class UsernameValidator implements AsyncValidator {
  private usersService = inject(UsersService);

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return timer(300).pipe(
      distinctUntilChanged(),
      switchMap(() =>
        this.usersService.checkUsernameValidity(control.value).pipe(
          map(validation => {
            if (validation.isAvailable) {
              return null;
            }

            return { usernameAlreadyExists: 'This email already taken' };
          })
        )
      )
    );
  }
}
