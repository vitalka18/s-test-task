import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export const normalizeNgbDate = (date: NgbDateStruct): string => {
  if (!date) {
    return '';
  }

  const day = String(date.day).padStart(2, '0');
  const month = String(date.month).padStart(2, '0');
  const year = date.year;

  return `${day}.${month}.${year}`;
};
