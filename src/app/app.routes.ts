import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'phone-number',
    loadComponent: () => import('./pages/phone-number/phone-number.page').then( m => m.PhoneNumberPage)
  },
  {
    path: 'account-form',
    loadComponent: () => import('./pages/account-form/account-form.page').then( m => m.AccountFormPage)
  },
  {
    path: 'contract',
    loadComponent: () => import('./pages/contract/contract.page').then( m => m.ContractPage)
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.page').then( m => m.WelcomePage)
  },
];
