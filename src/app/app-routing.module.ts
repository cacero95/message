import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'bandeja', loadChildren: './pages/bandeja/bandeja.module#BandejaPageModule' },
  { path: 'like', loadChildren: './pages/like/like.module#LikePageModule' },
  { path: 'unlike', loadChildren: './pages/unlike/unlike.module#UnlikePageModule' },
  { path: 'su', loadChildren: './pages/su/su.module#SuPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
