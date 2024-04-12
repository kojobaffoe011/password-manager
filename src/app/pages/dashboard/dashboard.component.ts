import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';
import { DataService } from '../../services/data.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent implements OnInit{
  passwords: any[] = [];
  loading = false;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.fetchPasswords();
  }

  fetchPasswords(): void {

  this.loading = true;
    this.dataService.getPasswords().subscribe(
      (passwords) => {
         this.passwords = passwords;
      },
      (error) => {
        console.error('Error fetching data:', error);
      },
      () => {
        this.loading = false;
      }
    );
    }


  navigateTo(link: string): void {
    this.router.navigate([link]);
  }
}
