import {
  Component,
  OnInit
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import {Observable, Subject} from 'rxjs';
import {Store} from "@ngrx/store";
import {State} from "../../../../store/reducers";
import {selectTasksWithDate} from "../../../../store/selectors/task";
import {EventParserService} from "../../../../core/services/event-parser/event-parser.service";
import {mergeMap} from "rxjs/operators";
import {CalendarEvent, DAYS_OF_WEEK} from "angular-calendar";
import {Router} from "@angular/router";
import {environment} from "../../../../../environments/environment";
import {LangService} from "../../../../core/services/lang/lang.service";

@Component({
  selector: 'dashboard-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  private store: Store<State>;
  private eventParserService: EventParserService;
  private router: Router;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: Observable<CalendarEvent[]>;
  activeDayIsOpen: boolean = false;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  public locale: string;

  constructor(store: Store<State>, eventParserService: EventParserService, router: Router, langService: LangService) {
    this.locale = environment.lang;
    this.store = store;
    this.eventParserService = eventParserService;
    this.router = router;
    langService.getState().subscribe(lang => this.locale = lang);
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0);
      this.viewDate = date;
    }
  }

  ngOnInit(): void {
    this.events = this.store.select(selectTasksWithDate).pipe(mergeMap(tasks => this.eventParserService.parse(tasks)));
  }

}
