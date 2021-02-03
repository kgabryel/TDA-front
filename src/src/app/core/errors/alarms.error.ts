export interface SingleAlarmErrors {
  title: string[],
  content: string[],
  notification: string[]
}

export interface PeriodicAlarmErrors {
  title: string[],
  content: string[],
  notification: string[];
  startDate: string[];
  endDate: string[];
  interval: string[];
  intervalType: string[];
}

export const singleAlarmErrors = {
  "title": [
    "required",
    "maxlength",
    "invalidFormat"
  ],
  "content": [
    "invalidFormat"
  ],
  "notification": [
    "required",
    "invalidFormat"
  ]
}

export const periodicAlarmErrors = {
  "title": [
    "required",
    "maxlength",
    "invalidFormat"
  ],
  "content": [
    "invalidFormat"
  ],
  "notification": [
    "required",
    "invalidFormat"
  ],
  "startDate": [
    "required",
    "invalidFormat"
  ],
  "endDate": [
    "invalidFormat",
    "invalidValue"
  ],
  "interval": [
    "required",
    "invalidFormat",
    "invalidValue"
  ],
  "intervalType": [
    "required",
    "invalidFormat",
    "invalidValue"
  ]
}
