import { Routes } from '@angular/router';
import { LockscreenComponent } from "./lockscreen/lockscreen.component";
import { ImpatientCustomerComponent } from "./impatient-customer/impatient-customer.component";

export const routes: Routes = [
  {path: 'search', component: LockscreenComponent},
  {path: 'impatient-customer', component: ImpatientCustomerComponent},
];
