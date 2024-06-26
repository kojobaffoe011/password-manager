import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.services';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Password } from '../../interfaces/password.interface';
import { LoaderComponent } from '../../components/loader/loader.component';
import { FormComponent } from '../../components/form/form.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SharedServices } from '../../services/shared.services';


@Component({
  selector: 'app-view-password',
  standalone: true,
  imports: [FormsModule, CommonModule, LoaderComponent, FormComponent, ButtonComponent],
  templateUrl: './view-password.component.html',
  styleUrl: './view-password.component.css'
})


export class ViewPasswordComponent implements OnInit {

  data: any;
  loading = false;
  editMode = false; // Property to track edit mode
  show = false;
  itemId = this.route.snapshot.paramMap.get('id') as string; // Get id from route parameter
  passwordData: Password = {
    category: '',
    app: '',
    userName: '',
    encryptedPassword: '',
    updatedAt: new Date(),

  };



  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute, public sharedServices: SharedServices) { }

  ngOnInit(): void {
    console.log(this.passwordData)
    this.fetchPassword(this.itemId);
  }



  fetchPassword(id: string): void {
  this.loading = true;
    this.dataService.getSinglePassword(String(id)).subscribe(data => {
      this.passwordData = data;
      this.passwordData.encryptedPassword = this.dataService.decryptPassword(this.passwordData.encryptedPassword);
    },
      (error) => {
        console.error('Error fetching data:', error);
      },
      () => {
        this.loading = false;
      }
    );
    }

    toggleEditMode(): void {
    this.editMode = !this.editMode; // Toggle edit mode
    }
  
    toggleShow(): void {
    this.show = !this.show; // Toggle show password
    }
  
    submitForm(event: { form: NgForm, data: any }): void {
     if (event.form.valid) {
       this.passwordData.encryptedPassword = this.dataService.encryptPassword(this.passwordData.encryptedPassword);
       this.passwordData.updatedAt = new Date();
     this.dataService.updatePassword(this.itemId, this.passwordData).subscribe(
      () => {
        // Reset form fields after successful submission
        event.form.resetForm();
        console.log('Password added successfully');

        // Navigate back to previous page
        this.router.navigate(['/categories']); // Navigate to categories after submission
      },
      (error) => {
        console.error('Error adding password:', error);
        alert('Error Submitting Form')
      }
    );
    } else {
      // Display error message
      console.log('Form is invalid');
    }
    }
  
    deleteItem(itemId: string): void {
    this.dataService.confirmDelete(itemId);
    console.log('deleted', itemId)
    this.router.navigate(['/dashboard']); // Navigate to categories after submission

  }

}
