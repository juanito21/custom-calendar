import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.scss']
})
export class YearPickerComponent {
  @Input() date: string = new Date().toISOString();
  @Output() dateChange: EventEmitter<string> = new EventEmitter<string>;

  isInPast: boolean = false;
  isInFuture: boolean = false;

  constructor() {
  }

  previousYear() {
    const newDate = new Date(this.date);
    this.date = new Date(newDate.setFullYear(newDate.getFullYear() - 1)).toISOString();
    this.changeFlags();
  }

  nextYear() {
    const newDate = new Date(this.date);
    this.date = new Date(newDate.setFullYear(newDate.getFullYear() + 1)).toISOString();
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
