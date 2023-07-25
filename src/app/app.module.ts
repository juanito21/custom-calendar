import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomCalendarComponent } from './custom-calendar/custom-calendar.component';
import {MatTableModule} from "@angular/material/table";
import { CalendarItemComponent } from './custom-calendar/calendar-item/calendar-item.component';
import { CalendarEventComponent } from './custom-calendar/calendar-item/calendar-event/calendar-event.component';
import {MatCardModule} from "@angular/material/card";
import { CalendarHolidayComponent } from './custom-calendar/calendar-item/calendar-holiday/calendar-holiday.component';
import { MonthPickerComponent } from './custom-calendar/month-picker/month-picker.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";

import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from "@angular/common";
import { CalendarLegendComponent } from './custom-calendar/calendar-legend/calendar-legend.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    CustomCalendarComponent,
    CalendarItemComponent,
    CalendarEventComponent,
    CalendarHolidayComponent,
    MonthPickerComponent,
    CalendarLegendComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
