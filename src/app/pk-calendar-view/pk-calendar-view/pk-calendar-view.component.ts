import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as dayjs from 'dayjs'
import * as customParseFormat from 'dayjs/plugin/customParseFormat'
@Component({
  selector: 'app-pk-calendar-view',
  templateUrl: './pk-calendar-view.component.html',
  styleUrls: ['./pk-calendar-view.component.scss'],
})
export class PkCalendarViewComponent implements OnInit {
  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDay: any;
  startingAt: string = ''
  endingAt: string = ''
  @Input() numberHours :number = 3;
  @Output() DayTimeEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    const now = dayjs();
    dayjs.extend(customParseFormat)
    this.startingAt = now.format('hh:mm A');
    this.endingAt = now.add(this.numberHours, 'h').format('hh:mm A');
    this.date = new Date();
    this.monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'Dicember',
    ]
    this.getDaysOfMonth();
  }

  sendDayAndIntervalTime() {
    const obj = {
      currentDay: this.currentDay,
      currentMonth: this.currentMonth,
      currentYear: this.currentYear,
      startingAt: this.startingAt,
      endingAt: this.endingAt
    }
    this.DayTimeEvent.emit(obj);
  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDay = new Date().getDate();
    } else {
      this.currentDay = 999;
    }

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i+1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var i = 0; i < (6-lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i+1);
    }
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(var i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth)+7); i++) {
        this.daysInNextMonth.push(i);
      }
    }
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.getDaysOfMonth();
  }

  setTime(name: string, value: number){
    let day = dayjs(this[name], 'hh:mm A');
    if (day.minute() % 15 !== 0){
      const time: string = this.getRealTime(day.hour(), day.minute(), day.format('A'));
      this[name] = dayjs(time, 'hh:mm A').format('hh:mm A');
    } else {
      this[name] = value > 0 ? day.add(value, 'm').format('hh:mm A') : day.subtract(Math.abs(value), 'm').format('hh:mm A');
    }
  }
  private getRealTime(hour: number, min: number, format: string){
    let m = 0;
    let h = hour;
    if (min > 0 && min < 15) {
      m = 15
    } else if (min >= 15 && min < 30) {
      m = 30
    } else if (min >= 30 && min < 45) {
      m = 45
    } else {
      h = hour <= 12 ? hour + 1 : 1;
    }
    return `${h}:${m} ${format}`;
  }
}
