import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './modules/user/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing',
  },
  { path: 'landing', component: LandingPageComponent, data: { title: 'Eazio' } },
  {
    path: '',
    loadComponent: () => import('./modules/user/site-header/site-header.component').then(({ SiteHeaderComponent }) => SiteHeaderComponent),
    children: [
      {
        path: 'signin',
        loadComponent: async () => (await import('./modules/user/signin/signin.component')).SigninComponent,
      },
      {
        path: 'signup',
        loadComponent: async () => (await import('./modules/user/signup/signup.component')).SignupComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    data: { title: 'Dashboard' },

    loadComponent: () => import('./modules/dashboard/dashboard.component').then(({ DashboardComponent }) => DashboardComponent),

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

