export interface BookmarksErrors {
  href: string[],
  title: string[],
  backgroundColor: string[],
  textColor: string[]
}

export const bookmarksErrors = {
  "href": [
    "required",
    "invalidFormat"
  ],
  "title": [
    "required",
    "maxlength",
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
