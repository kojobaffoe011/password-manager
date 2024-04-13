import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Password } from '../interfaces/password.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  itemId: string = '';
  url = 'http://localhost:3000'

  constructor(private http: HttpClient, private router: Router) { }

  getPasswords(): Observable<Password[]> {
    return this.http.get<Password[]>(`${this.url}/passwords`);
  }

  addPassword(passwordData: Password): Observable<any> {
    return this.http.post<any>(`${this.url}/passwords`, passwordData);
  }

  deletePassword(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/passwords/${id}`);
  }

  updatePassword(id: string, passwordData: Password): Observable<any> {
    return this.http.put<any>(`${this.url}/passwords/${id}`, passwordData);
  }

  getSinglePassword(id: string): Observable<Password> {
    return this.http.get<Password>(`${this.url}/passwords/${id}`);
  }

   encryptPassword(password: string): string {
    return btoa(password); // Using btoa() function to encode password to Base64
   }
  
   decryptPassword(encryptedPassword: string): string {
    return atob(encryptedPassword); // Using atob() function to decode Base64 encoded password
   }
  
  confirmDelete(itemId: string): void {
        if (confirm('Are you sure you want to delete this item?')) {
            // Proceed with the delete action
          this.deletePassword(itemId).subscribe(data => {
          this.router.navigate([`/dashboard`]);
          }, (error) => {
            console.log('Error deleting this item', error)
          });
        } else {
            console.log('Operation cancelled')
        }
    }
}

