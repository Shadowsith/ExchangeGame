import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'start',
    loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'deposit',
    loadChildren: () => import('./page/deposit/deposit.module').then(m => m.DepositPageModule)
  },
  {
    path: 'interest',
    loadChildren: () => import('./page/interest/interest.module').then(m => m.InterestPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./page/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./page/about/about.module').then(m => m.AboutPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
