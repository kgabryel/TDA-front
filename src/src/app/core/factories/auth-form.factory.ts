import {FormControl, FormGroup, Validators} from "@angular/forms";

export enum formNames {
  email = 'email',
  password = 'password',
}

export abstract class AuthFormFactory {
  public static getLoginForm(): FormGroup {
    return new FormGroup({
      [formNames.email]: new FormControl('', [Validators.required, Validators.email]),
      [formNames.password]: new FormControl('', [Validators.required])
    });
  }

  public static getRegisterForm(): FormGroup {
    return new FormGroup({
      [formNames.email]: new FormControl('', [Validators.required, Validators.email]),
      [formNames.password]: new FormControl('', [Validators.required]),
    });
  }
}
