import { Component } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common'; // Import CommonModule


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
 menuItems = [
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Passwords', link: '/categories' }
    ];

  isDashboardActive: boolean;

  constructor(private router: Router ) {
    this.isDashboardActive = this.router.url === '/dashboard';
  }


   navigateTo(link: string): void {
    this.router.navigate([link]);
  }
}
