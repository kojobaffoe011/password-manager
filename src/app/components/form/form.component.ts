import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Password } from '../../interfaces/password.interface';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.services';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Input() passwordData: Password = {
    category: '',
    app: '',
    userName: '',
    encryptedPassword: ''
  };
  show = false;

  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  submitForm(form: NgForm, data: any) {
    // Emit the form and data to the parent component
    this.formSubmit.emit({ form, data });
  }

    toggleShow(): void {
    this.show = !this.show; // Toggle show password
    }
}
