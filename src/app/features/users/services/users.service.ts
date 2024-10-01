import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CountryEnum } from '@enums/country.enum';
import { User } from '@interfaces/users.interface';
import {
  CheckUserResponseData,
  SubmitFormResponseData,
} from '@interfaces/responses.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly countries = Object.values(CountryEnum);
  private readonly httpClient = inject(HttpClient);

  saveForms(users: User[]): Observable<SubmitFormResponseData> {
    return this.httpClient.post<SubmitFormResponseData>(
      '/api/submitForm',
      users
    );
  }

  checkUsernameValidity(username: string): Observable<CheckUserResponseData> {
    return this.httpClient.post<CheckUserResponseData>('/api/checkUsername', {
      username: username,
    });
  }
}
