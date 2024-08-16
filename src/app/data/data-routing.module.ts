import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'userData', component: NewPageComponent },
      {
        path: 'edit/:id',
        component: NewPageComponent,
        canActivate: [AuthGuard],
      },
      { path: 'create', component: NewPageComponent, canActivate: [AuthGuard] },
      { path: 'list', component: ListPageComponent },
      { path: '**', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class dataRoutingModule {}
