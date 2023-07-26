import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomCalendarComponent } from './custom-calendar/custom-calendar.component';
import {MatTableModule} from "@angular/material/table";
import { MonthItemComponent } from './custom-calendar/month-item/month-item.component';
import { MonthEventComponent } from './custom-calendar/month-item/month-event/month-event.component';
import {MatCardModule} from "@angular/material/card";
import { MonthHolidayComponent } from './custom-calendar/month-item/month-holiday/month-holiday.component';
import { MonthPickerComponent } from './custom-calendar/month-picker/month-picker.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";

import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from "@angular/common";
import { CalendarLegendComponent } from './custom-calendar/calendar-legend/calendar-legend.component';
import { YearItemComponent } from './custom-calendar/year-item/year-item.component';
import { YearEventComponent } from './custom-calendar/year-item/year-event/year-event.component';
import { YearHolidayComponent } from './custom-calendar/year-item/year-holiday/year-holiday.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    CustomCalendarComponent,
    MonthItemComponent,
    MonthEventComponent,
    MonthHolidayComponent,
    MonthPickerComponent,
    CalendarLegendComponent,
    YearItemComponent,
    YearEventComponent,
    YearHolidayComponent
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
