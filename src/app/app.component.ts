import { Component } from '@angular/core';
import {CalendarEvent, CalendarHoliday} from "./custom-calendar/custom-calendar.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'custom-calendar';

  events: CalendarEvent[] = [
    {start: '2023-07-19', end: '2023-07-29', id: 1, description: 'Jean HASCOET'},
    {start: '2023-07-21', end: '2023-07-24', id: 2, description: 'b2'},
    {start: '2023-07-21', end: '2023-07-22', id: 3, description: 'b4'},
    {start: '2023-07-27', end: '2023-07-28', id: 4, description: 'b3'},
    {start: '2023-07-27', end: '2023-07-28', id: 5, description: 'b3'},
    {start: '2023-07-27', end: '2023-07-28', id: 6, description: 'a1'},
    {start: '2023-07-27', end: '2023-07-28', id: 8, description: 'a2'}
  ];

  holidays: CalendarHoliday[] = [
    {start: '2023-07-19', end: '2023-07-29', id: 1, legend: 'Zone A'},
    {start: '2023-07-19', end: '2023-07-29', id: 2, legend: 'Zone B'},
    {start: '2023-07-19', end: '2023-07-29', id: 2, legend: 'Zone C'},

    {start: '2023-07-30', end: '2023-08-07', id: 3, legend: 'Zone C'},
    {start: '2023-08-01', end: '2023-08-07', id: 3, legend: 'Zone B'},

  ]
}
