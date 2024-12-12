import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { RegistrationFormComponent } from './component/registration-form/registration-form.component';

const routes: Routes = [
  {
    path: '', component: HomePage,

  }, {
    path: 'form', component: RegistrationFormComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
