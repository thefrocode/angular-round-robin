import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SavingsGroupComponent } from './components/savings-group/savings-group.component';

const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'savings_group/:group_address', component: SavingsGroupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
