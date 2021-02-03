import {Injectable} from "@angular/core";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlarmValidator} from "../validators/alarms/alarm.validator";

export enum formNames {
  mainGroup = 'main',
  notifications = 'notifications',
  typesGroup = 'typesGroup',
  contentGroup = 'contentGroup',
  types = 'types',
  typeSearch = 'typeSearch',
  dates = 'dates',
  start = 'dates',
  stop = 'stop',
  interval = 'interval',
  intervalType = 'intervalType',
  title = 'title',
  content = 'content',
  notificationTime = 'notificationTime',
  notificationType = 'notificationType',
}

export abstract class FormFactory {
  public abstract getForm(): FormGroup;
}

@Injectable()
export class SingleFormFactory extends FormFactory {
  private readonly alarmValidator: AlarmValidator;

  public constructor(alarmValidator: AlarmValidator) {
    super();
    this.alarmValidator = alarmValidator;
  }

  public getForm(): FormGroup {
    return new FormGroup({
      [formNames.mainGroup]: new FormGroup({
        [formNames.title]: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        [formNames.content]: new FormControl('')
      }),
      [formNames.typesGroup]: new FormGroup({
        [formNames.types]: new FormArray([]),
        [formNames.typeSearch]: new FormControl()
      }),
      [formNames.notifications]: new FormArray([
        new FormControl('', [Validators.required])
      ], [Validators.required])
    }, null, [this.alarmValidator.validateSingle.bind(this.alarmValidator)]);
  }
}

@Injectable()
export class PeriodicFormFactory extends FormFactory {
  private readonly alarmValidator: AlarmValidator;

  public constructor(alarmValidator: AlarmValidator) {
    super();
    this.alarmValidator = alarmValidator;
  }

  public getForm(): FormGroup {
    return new FormGroup({
      [formNames.mainGroup]: new FormGroup({
        [formNames.title]: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        [formNames.dates]: new FormGroup({
          [formNames.start]: new FormControl('', [Validators.required]),
          [formNames.stop]: new FormControl()
        }),
        [formNames.interval]: new FormControl('', [Validators.required, Validators.min(1)]),
        [formNames.intervalType]: new FormControl('', [Validators.required]),
      }),
      [formNames.contentGroup]: new FormGroup({
        [formNames.content]: new FormControl()
      }),
      [formNames.typesGroup]: new FormGroup({
        [formNames.types]: new FormArray([]),
        [formNames.typeSearch]: new FormControl()
      }),
      [formNames.notifications]: new FormArray([
        new FormGroup({
          [formNames.notificationTime]: new FormControl('', [Validators.required]),
          [formNames.notificationType]: new FormControl('', [Validators.required]),
        })
      ])
    }, null, [this.alarmValidator.validatePeriodic.bind(this.alarmValidator)]);
  }
}
