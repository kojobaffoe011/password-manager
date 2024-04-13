import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';
import { TableComponent } from '../../components/table/table.component';
import { DataService } from '../../services/data.services';

@Component({
  selector: 'app-passwords',
  standalone: true,
  imports: [TableComponent, LoaderComponent, CommonModule],
  templateUrl: './passwords.component.html',
  styleUrl: './passwords.component.css'
})
export class PasswordsComponent implements OnInit{
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
        alert('Error fetching Data')
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
