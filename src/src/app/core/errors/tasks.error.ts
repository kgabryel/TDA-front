export interface SingleTaskErrors {
  title: string[],
  content: string[],
  date: string[],
  notification: string[];
  mainTask: string[];
}

export interface PeriodicTaskErrors {
  title: string[],
  content: string[],
  notification: string[];
  startDate: string[];
  endDate: string[];
  interval: string[];
  intervalType: string[];
}

export const singleTaskErrors = {
  "title": [
    "required",
    "maxlength",
    "invalidFormat"
  ],
  "content": [
    "invalidFormat"
  ],
  "date": [
    "invalidFormat"
  ],
  "notification": [
    "required",
    "invalidFormat"
  ],
  "mainTask": [
    "invalidValue"
  ],
}

export const periodicTaskErrors = {
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
