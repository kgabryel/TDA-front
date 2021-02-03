import {Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, mergeMap, startWith} from 'rxjs/operators';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {NotificationType} from "../../../../../core/models/notification-type";
import {Store} from "@ngrx/store";
import {selectNotificationType, selectNotificationTypes} from "../../../../../store/selectors/notification-types";
import {formNames} from "../../../../../core/factories/alarm.factory";
import {State} from "../../../../../store/reducers";

@Component({
  selector: 'alarms-form-type-part',
  templateUrl: './type-part.component.html',
  styleUrls: ['./type-part.component.scss']
})
export class TypePartComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('chipList') chipList;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public filteredTypes: Observable<NotificationType[]>;
  public selectedTypes: NotificationType[];
  public types: Observable<NotificationType[]>;
  private store: Store<State>;
  public formNames;
  private typesInputs: FormArray;

  constructor(store: Store<State>) {
    this.store = store;
    this.selectedTypes = [];
    this.formNames = formNames;
  }

  ngOnInit(): void {
    this.filter();
    this.types = this.store.select(selectNotificationTypes);
    this.typesInputs = this.formGroup.get(formNames.types) as FormArray;
    this.typesInputs.value.forEach((id: number) => {
      this.store.select(selectNotificationType(id)).subscribe(type => this.selectedTypes.push(type)).unsubscribe();
    });
    this.typesInputs.valueChanges.pipe(
      map<number[], number[]>(types => types)
    )
      .subscribe(types => {
        this.selectedTypes = [];
        types.forEach(id =>
          this.store.select(selectNotificationType(id)).subscribe(type => this.selectedTypes.push(type))
        )
      });
  }

  add(event: MatChipInputEvent): void {
    const value = event.value;
    let result: string;
    if ((result = value.trim())) {
      this.types.pipe(map(
        types => {
          types.filter(type => type.name.toLocaleLowerCase() === result.toLocaleLowerCase()).forEach(type => {
            if (!this.selectedTypes.includes(type)) {
              this.typesInputs.push(new FormControl(type.id));
            }
          });
        }
      )).subscribe(() => {
        this.searchInput.nativeElement.value = '';
      });
    }
  }

  remove(typeId: number): void {
    const selectedTypes = this.selectedTypes.filter(item => item.id !== typeId);
    if (selectedTypes.length === 0) {
      this.chipList.errorState = true;
      return;
    }
    this.selectedTypes = selectedTypes;
    const types: number[] = this.selectedTypes.map((type: NotificationType) => type.id);
    this.typesInputs.clear();
    types.forEach((typeId: number) => {
      this.typesInputs.push(new FormControl(typeId));
    })
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.types.pipe(map(
      types => {
        types.filter(type => type.name === event.option.value).forEach(type => {
          if (!this.selectedTypes.includes(type)) {
            this.typesInputs.push(new FormControl(type.id));
          }
        });
      })).subscribe(() => {
      this.searchInput.nativeElement.value = '';
    });
  }

  private filter(): void {
    this.filteredTypes = this.formGroup.get(formNames.typeSearch).valueChanges.pipe(
      startWith(""),
      mergeMap(value => {
        return this.types.pipe(
          map(types => {
            return types.filter(type => {
              if (value === '' || value === null) {
                return true;
              } else {
                return type.name.toLowerCase().includes(value.toLowerCase());
              }
            }).filter(type => !this.selectedTypes.includes(type));
          })
        );
      })
    );
  }
}
