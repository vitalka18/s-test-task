import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { normalizeNgbDate } from '../utils/normilize-ngb-date.util';

@Injectable()
export class AppNgbDateAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '.';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? normalizeNgbDate(date) : null;
  }
}
