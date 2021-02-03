import {Injectable} from "@angular/core";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskValidator} from "../validators/tasks/task.validator";

export enum formNames {
  taskGroup = 'task',
  alarmGroup = 'alarm',
  title = 'title',
  content = 'content',
  typesGroup = 'typesGroup',
  types = 'types',
  mainTaskGroup = 'mainTaskGroup',
  search = 'search',
  task = 'task',
  typeSearch = 'typeSearch',
  notifications = 'notifications',
  notificationTime = 'notificationTime',
  notificationType = 'notificationType',
  dates = 'dates',
  start = 'start',
  stop = 'stop',
  date = 'date',
  interval = 'interval',
  intervalType = 'intervalType',
}

@Injectable()
export class SingleFormFactory {

  private readonly taskValidator: TaskValidator;

  public constructor(taskValidator: TaskValidator) {
    this.taskValidator = taskValidator;
  }

  public getForm(): FormGroup {
    return new FormGroup({
      [formNames.taskGroup]: new FormGroup({
        [formNames.title]: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        [formNames.content]: new FormControl(''),
        [formNames.date]: new FormControl(''),
        [formNames.task]: new FormControl(),
        [formNames.search]: new FormControl(),
      }),
      [formNames.alarmGroup]: new FormGroup({
        [formNames.title]: new FormControl(''),
        [formNames.content]: new FormControl(''),
      }),
      [formNames.typesGroup]: new FormGroup({
        [formNames.types]: new FormArray([]),
        [formNames.typeSearch]: new FormControl()
      }),
      [formNames.notifications]: new FormArray([
        new FormControl('')
      ])
    }, null, [this.taskValidator.validateSingle.bind(this.taskValidator)]);
  }
}

@Injectable()
export class PeriodicFormFactory {

  private readonly taskValidator: TaskValidator;

  public constructor(taskValidator: TaskValidator) {
    this.taskValidator = taskValidator;
  }

  public getForm(): FormGroup {
    return new FormGroup({
      [formNames.taskGroup]: new FormGroup({
        [formNames.title]: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        [formNames.content]: new FormControl(''),
        [formNames.dates]: new FormGroup({
          [formNames.start]: new FormControl('', [Validators.required]),
          [formNames.stop]: new FormControl()
        }),
        [formNames.interval]: new FormControl(),
        [formNames.intervalType]: new FormControl(),
      }),
      [formNames.alarmGroup]: new FormGroup({
        [formNames.title]: new FormControl(''),
        [formNames.content]: new FormControl(''),
      }),
      [formNames.typesGroup]: new FormGroup({
        [formNames.types]: new FormArray([]),
        [formNames.typeSearch]: new FormControl()
      }),
      [formNames.notifications]: new FormArray([
        new FormGroup({
          [formNames.notificationType]: new FormArray([]),
          [formNames.notificationTime]: new FormControl()
        })
      ])
    },null, [this.taskValidator.validatePeriodic.bind(this.taskValidator)]);
  }
}
