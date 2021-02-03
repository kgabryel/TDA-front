interface emailMessages {
  required: string;
  email: string;
}

interface passwordErrors {
  required: string;
}

export interface loginErrors {
  emailErrors: emailMessages,
  passwordErrors: passwordErrors
}
