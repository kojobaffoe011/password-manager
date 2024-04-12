import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';
import { TableComponent } from '../../components/table/table.component';
import { DataService } from '../../services/data.services';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TableComponent, LoaderComponent, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
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
