import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{CabsListComponent} from  './cabs-list/cabs-list.component';


const routes: Routes = [
    { path: '', redirectTo: 'cabs', pathMatch: 'full' },
  { path: 'cabs', component: CabsListComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
