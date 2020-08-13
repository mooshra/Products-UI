import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from './shared/data/routes';
import { AuthGuard } from './shared/guards/auth.guard';
import { AppLayoutComponent } from './layout/layout.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: AppRoutes.HOME },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: AppRoutes.PRODUCTS,
        loadChildren: () =>
          import('./products/products.module').then(m => m.ProductsModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
