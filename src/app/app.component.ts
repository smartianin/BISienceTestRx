import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { ImpatientCustomerComponent } from './impatient-customer/impatient-customer.component';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LockscreenComponent,
    ImpatientCustomerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'BI science test prj';
}
