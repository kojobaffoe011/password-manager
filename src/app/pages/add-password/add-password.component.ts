import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Password } from '../../interfaces/password.interface';
import { DataService } from '../../services/data.services';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormComponent } from '../../components/form/form.component';





@Component({
  selector: 'app-add-password',
  standalone: true,
  imports: [FormsModule, CommonModule, FormComponent],
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

   submitForm(event: { form: NgForm, data: any }): void {
     if (event.form.valid) {
     this.passwordData.encryptedPassword = this.dataService.encryptPassword(this.passwordData.encryptedPassword);
     this.dataService.addPassword(this.passwordData).subscribe(
      () => {
        // Reset form fields after successful submission
        event.form.resetForm();
        console.log('Password added successfully');

        // Navigate back to previous page
         this.router.navigate(['/categories']); // Navigate to categories after submission
      },
      (error) => {
        alert('Error Submitting form')
      }
    );
    } else {
      // Display error message
       console.error('Form is invalid');
        console.log(this.passwordData, 'anyway');
       
    }
  }
}