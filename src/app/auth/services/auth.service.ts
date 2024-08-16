import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Credentials, UserWithoutRole } from '../interfaces/datosUsuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioActual = new BehaviorSubject<Credentials | undefined>(
    undefined
  );

  private users = [
    { user: 'admin', password: '123456', role: 'admin' },
    { user: 'user', password: '1234567', role: 'user' },
  ];

  constructor(private router: Router) {}

  get currentUser(): Credentials | undefined {
    return this.usuarioActual.value;
  }

  login(credentials: UserWithoutRole): void {
    const user = this.findUser(credentials);
    if (user) {
      this.usuarioActual.next(user);
      this.router.navigate(['/']);
    } else {
      alert('usuario incorrecto!');
    }
  }

  private findUser(credentials: UserWithoutRole): Credentials | undefined {
    return this.users.find(
      (u) => u.user === credentials.user && u.password === credentials.password
    );
  }

  checkAuthentication(): Observable<boolean> {
    return of(this.usuarioActual.value !== undefined);
  }

  logout(): void {
    this.usuarioActual.next(undefined);
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
