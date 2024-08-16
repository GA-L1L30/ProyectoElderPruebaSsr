import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DataService } from '../../services/data.service';
import { Data } from '../../interfaces/data.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [],
})
export class NewPageComponent implements OnInit {
  public dataForm: FormGroup;
  public tituloAgregar: string = '';
  public esEditar: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    this.dataForm = new FormGroup({}); // Inicialización del formulario
  }

  ngOnInit(): void {
    this.manejarRuta(); // Determina si es edición o creación
    this.manejarTitulo(); // Ajusta el título según la ruta
    this.precargarDatos(); // Configura el formulario
  }

  precargarDatos(): void {
    this.dataForm = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
      ...(this.esEditar && { id: new FormControl('', Validators.required) }),
    });

    if (this.esEditar) {
      this.cargarDatosParaEditar();
    }
  }

  manejarTitulo(): void {
    this.tituloAgregar = this.esEditar
      ? 'Editar Data Existente'
      : 'Crear Nueva Data';
  }

  manejarRuta(): void {
    this.esEditar = this.activatedRoute.snapshot.url.some(
      (segment) => segment.path === 'edit'
    );
  }

  cargarDatosParaEditar(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.dataService.getDataById(id).subscribe((data: Data) => {
        this.dataForm.patchValue(data);
      });
    }
  }

  get currentData(): Data {
    return this.dataForm.value as Data;
  }

  updateData(): void {
    this.dataService.updateData(this.currentData).subscribe((data) => {
      this.showSnackbar(`${JSON.stringify(data)}, actualizada!`);
      this.router.navigate(['/data']);
    });
  }

  createData(): void {
    this.dataService.addData(this.currentData).subscribe((data) => {
      this.showSnackbar(`${JSON.stringify(data)} creada!`);
      this.router.navigate(['/data']);
    });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', { duration: 2500 });
  }

  onSubmit(): void {
    if (this.dataForm.invalid) return;
    this.esEditar ? this.updateData() : this.createData();
  }
}
