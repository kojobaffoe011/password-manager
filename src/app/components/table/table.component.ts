import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { DataService } from '../../services/data.services';
import { LoaderComponent } from '../loader/loader.component';



@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{


  data: any[] = [];
  loading = false;


  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.fetchPasswords();
  }

  viewDetails(itemId: string): void {
    this.router.navigate([`/view-password`, itemId]);
  }

  deleteItem(itemId: string): void {
    this.dataService.confirmDelete(itemId);
  }

  fetchPasswords(): void {

  this.loading = true;
    this.dataService.getPasswords().subscribe(
      (data) => {
         this.data = data;
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
