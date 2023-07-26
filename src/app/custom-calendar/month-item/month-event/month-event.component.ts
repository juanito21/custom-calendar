import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CalendarEventParams} from "../../custom-calendar.model";

@Component({
  selector: 'app-month-event',
  templateUrl: './month-event.component.html',
  styleUrls: ['./month-event.component.scss']
})
export class MonthEventComponent {
  @Input() params: CalendarEventParams;
  @Output() click: EventEmitter<number> = new EventEmitter();

  onClick() {
    this.click.emit(this.params.id)
  }
}
