import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent {

  @Input() date: string = new Date().toISOString();
  @Output() dateChange: EventEmitter<string> = new EventEmitter<string>;

  isInPast: boolean = false;
  isInFuture: boolean = false;

  constructor() {
  }

  previousMonth() {
    const newDate = new Date(this.date);
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    if (month === 0) {
      month = 11;
      year = year - 1;
    } else {
      month = month - 1;
    }
    newDate.setMonth(month);
    newDate.setFullYear(year);
    this.date = newDate.toISOString();
    this.changeFlags();
  }

  nextMonth() {
    const newDate = new Date(this.date);
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    if (month === 11) {
      month = 0;
      year = year + 1;
    } else {
      month = month + 1;
    }
    newDate.setMonth(month);
    newDate.setFullYear(year);
    this.date = newDate.toISOString();
    this.changeFlags();
  }

  backToNow() {
    this.date = new Date().toISOString();
    this.changeFlags();
  }

  changeFlags() {
    const current = new Date(this.date).getTime();
    const now = new Date().getTime();

    this.isInFuture = false;
    this.isInPast = false;

    if (current > now) {
      this.isInFuture = true;
      this.isInPast = false;
    }
    if (now > current) {
      this.isInFuture = false;
      this.isInPast = true;
    }
    this.dateChange.emit(this.date);
  }
}
