import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/auth/interfaces/datosUsuario';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [],
})
export class LayoutPageComponent implements OnInit {
  public sidebarItemsAdmin = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
  ];

  public sidebarItemsUser = [
    { label: 'Listado', icon: 'label', url: './list' },
  ];

  public sidebarItems: { label: string; icon: string; url: string }[] | null =
    null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    const role = this.user?.role;

    switch (role) {
      case 'admin':
        this.sidebarItems = [...this.sidebarItemsAdmin];
        break;
      case 'user':
        this.sidebarItems = [...this.sidebarItemsUser];
        break;
      default:
        this.sidebarItems = null; // En caso de que no haya rol definido o sea otro rol.
    }
  }

  get user(): Credentials | undefined {
    return this.authService.currentUser;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
