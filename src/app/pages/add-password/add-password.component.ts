import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Password } from '../../interfaces/password.interface';
import { DataService } from '../../services/data.services';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule





@Component({
  selector: 'app-add-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-password.component.html',
  styleUrl: './add-password.component.css'
})
export class AddPasswordComponent {
  passwordData: Password = {
    category: '',
    app: '',
    userName: '',
    encryptedPassword: ''
  };
  show = false;

  constructor(private router: Router, private dataService: DataService) { }

    toggleShow(): void {
    this.show = !this.show; // Toggle show password
    }

   submitForm(form: NgForm): void {
     if (form.valid) {
     this.passwordData.encryptedPassword = this.dataService.encryptPassword(this.passwordData.encryptedPassword);
     this.dataService.addPassword(this.passwordData).subscribe(
      () => {
        // Reset form fields after successful submission
        form.resetForm();
        console.log('Password added successfully');

        // Navigate back to previous page
        this.router.navigate(['/categories']); // Navigate to categories after submission
      },
      (error) => {
        console.error('Error adding password:', error);
        // Handle error here, display error message to user
      }
    );
    } else {
      // Display error message
      console.error('Form is invalid');
    }
  }
}