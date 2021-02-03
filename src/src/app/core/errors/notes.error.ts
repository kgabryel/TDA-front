export interface NotesErrors {
  title: string[],
  content: string[],
  backgroundColor: string[],
  textColor: string[]
}

export const notesErrors = {
  "title": [
    "required",
    "maxlength",
    "invalidFormat"
  ],
  "content": [
    "required",
    "invalidFormat"
  ],
  "backgroundColor": [
    "required",
    "invalidFormat"
  ],
  "textColor": [
    "required",
    "invalidFormat"
  ]
}
