export interface AuthErrors {
  email: string[],
  password: string[]
}

export const authErrors = {
  "email": [
    "required",
    "email"
  ],
  "password": [
    "required"
  ]
}
