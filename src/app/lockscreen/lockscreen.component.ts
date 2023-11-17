import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrl: './lockscreen.component.css'
})
export class LockscreenComponent {
  constructor() {}
}
