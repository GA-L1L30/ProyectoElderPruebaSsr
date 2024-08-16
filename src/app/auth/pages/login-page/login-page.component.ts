import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserWithoutRole } from '../../interfaces/datosUsuario';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin(): void {
    const user = this.getformData();
    this.authService.login(user);
  }

  getformData(): UserWithoutRole {
    const { username, password } = this.loginForm.value;
    const user: UserWithoutRole = {
      user: username,
      password,
    };
    return user;
  }
  
}
