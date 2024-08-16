import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Data } from '../../interfaces/data.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [],
})
export class ListPageComponent implements OnInit {
  public data: Data[] = [];
  public filteredData: Data[] = []; // Datos filtrados
  public filterUserId: string = ''; // Valor del filtro

  constructor(private dataService: DataService, private auth: AuthService) {}

  ngOnInit(): void {
    this.loadData();
  }

  // Función para filtrar la lista por `userId`
  filterByUserId(): void {
    if (this.filterUserId) {
      const userId = parseInt(this.filterUserId, 10);
      if (!isNaN(userId)) {
        this.filteredData = this.data.filter((item) => item.userId === userId);
      } else {
        this.filteredData = []; // Si el valor no es un número, muestra una lista vacía
      }
    } else {
      this.filteredData = [...this.data]; // Si el input está vacío, muestra todos los datos
    }
  }

  // Carga de datos del servicio
  loadData(): void {
    this.dataService.getData().subscribe((data: Data[]) => {
      this.data = data;
      this.filteredData = [...this.data]; // Inicializa filteredData con todos los datos
    });
  }

  // Verifica si el usuario es admin
  esAdmin(): boolean {
    return this.auth.currentUser?.role === 'admin';
  }
}
