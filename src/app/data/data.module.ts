import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { dataRoutingModule } from './data-routing.module';
import { MaterialModule } from '../material/material.module';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    dataRoutingModule,
    MaterialModule,
    FormsModule,
  ],
})
export class DataModule {}
