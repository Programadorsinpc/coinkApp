import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserDataService } from 'src/app/services/user-data.service';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/userData.model';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.page.html',
  styleUrls: ['./account-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class AccountFormPage implements OnInit {
  accountForm!: FormGroup;
  private userDataService = inject(UserDataService);

  constructor(private router: Router) {}

  ngOnInit() {
    this.accountForm = new FormGroup(
      {
        docType: new FormControl('', Validators.required),
        docNumber: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
        ]),
        docExpeditionDate: new FormControl('', Validators.required),
        docBirthDate: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        confirmEmail: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        pin: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ]),
        confirmPin: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ]),
      },
      {
        validators: [
          this.matchingFields('email', 'confirmEmail'),
          this.matchingFields('pin', 'confirmPin'),
        ],
      }
    );
    this.loadUserData();
  }

  loadUserData(): void {
    const userData: UserData | null = this.userDataService.getUserData();

    if (userData) {
      this.accountForm.patchValue({
        docType: userData.docType,
        docNumber: userData.docNumber,
        docExpeditionDate: userData.docExpeditionDate,
        docBirthDate: userData.docBirthDate,
        gender: userData.gender,
        email: userData.email,
        pin: userData.pin,
      });
    }
  }

  // Función que retorna un ValidatorFn y compara dos campos
  matchingFields(field1: string, field2: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formGroup = control as FormGroup;
      const control1 = formGroup.get(field1);
      const control2 = formGroup.get(field2);

      if (!control1 || !control2) return null;

      // Verifica si los valores de los dos campos coinciden
      if (control1.value !== control2.value) {
        // Devuelve un objeto con el error si no coinciden
        return { notMatch: true };
      }

      // Si coinciden, devuelve null indicando que no hay errores
      return null;
    };
  }

  // Función de envío de formulario
  onSubmit() {
    // if (this.accountForm.valid) {
    //   //console.log(this.accountForm.value);
    //   this.userDataService.setAccountData({
    //     docType: this.accountForm.value.docType,
    //     docNumber: this.accountForm.value.docNumber,
    //     docExpeditionDate: this.accountForm.value.docExpeditionDate,
    //     docBirthDate: this.accountForm.value.docBirthDate,
    //     gender: this.accountForm.value.gender,
    //     email: this.accountForm.value.email,
    //     pin: this.accountForm.value.pin,
    //   });

    //   this.router.navigateByUrl('/contract');
    // }
    this.router.navigateByUrl('/contract');
  }
}
