import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {environment} from "../../../../../environments/environment";
import {doubleToolbarBreakPoint} from "../../../../config/sizes.config";

@Component({
  selector: 'header-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public small$: Observable<boolean>
  private breakpointObserver: BreakpointObserver;

  constructor(breakpointObserver: BreakpointObserver) {
    this.breakpointObserver = breakpointObserver;
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(doubleToolbarBreakPoint).subscribe(data => this.small$ = of(data.matches));
  }
}
