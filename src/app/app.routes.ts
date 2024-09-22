import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'phone-number',
    loadComponent: () => import('./phone-number/phone-number.page').then( m => m.PhoneNumberPage)
  },
  {
    path: 'account-form',
    loadComponent: () => import('./account-form/account-form.page').then( m => m.AccountFormPage)
  },
];
