import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FirstToZeroComponent } from './components/games/first-to-zero/first-to-zero.component';

const routes: Routes = [
  {path:'', component: DashboardComponent},
  {path:'firstToZero', component: FirstToZeroComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
