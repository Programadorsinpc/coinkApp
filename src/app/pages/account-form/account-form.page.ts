import { Component, inject, OnInit, signal } from '@angular/core';
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
import { ApiService } from 'src/app/services/api.service';
import { RequestStatus } from 'src/app/models/api.model';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.page.html',
  styleUrls: ['./account-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class AccountFormPage implements OnInit {
  status = signal<RequestStatus>('init');
  accountForm!: FormGroup;
  isLoading = false;
  private userDataService = inject(UserDataService);
  private router = inject(Router);
  private apiService = inject(ApiService);

  documentTypes: string[] = [];
  genders: string[] = [];
  errorMessage = signal<string | null>(null); 

  ngOnInit() {
    try {
      this.initForm();
      this.loadUserData();
      this.fetchDocumentTypes();
      this.fetchGenders();
    } catch (error) {
      this.handleError("Error inicializando la página", error);
    }
  }

  private initForm() {
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
  }

  private fetchDocumentTypes() {
    try {
      this.status.set('loading');
      this.apiService.getDocumentTypes()?.subscribe({
        next: (response) => {
          console.log(response);
          this.documentTypes = response.data;
          this.status.set('success');
        },
        error: (error) => {
          this.handleError("Error obteniendo tipos de documento", error);
        },
        complete: () => this.status.set('init'),
      });
    } catch (error) {
      this.handleError("Error en la solicitud de tipos de documento", error);
    }
  }

  private fetchGenders() {
    try {
      this.status.set('loading');
      this.apiService.getGenders()?.subscribe({
        next: (response) => {
          console.log(response);
          this.genders = response.data;
          this.status.set('success');
        },
        error: (error) => {
          this.handleError("Error obteniendo géneros", error);
        },
        complete: () => this.status.set('init'),
      });
    } catch (error) {
      this.handleError("Error en la solicitud de géneros", error);
    }
  }

  loadUserData(): void {
    try {
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
    } catch (error) {
      this.handleError("Error cargando datos del usuario", error);
    }
  }

  private handleError(message: string, error: any): void {
    console.error(`${message}:`, error);
    this.status.set('failed');
    this.errorMessage.set(`${message}: ${error.message || error}`);
  }

  matchingFields(field1: string, field2: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formGroup = control as FormGroup;
      const control1 = formGroup.get(field1);
      const control2 = formGroup.get(field2);

      if (!control1 || !control2) return null;

      if (control1.value !== control2.value) {
        return { notMatch: true };
      }

      return null;
    };
  }

  onSubmit() {
    try {
      if (this.accountForm.valid) {
        this.userDataService.setAccountData({
          docType: this.accountForm.value.docType,
          docNumber: this.accountForm.value.docNumber,
          docExpeditionDate: this.accountForm.value.docExpeditionDate,
          docBirthDate: this.accountForm.value.docBirthDate,
          gender: this.accountForm.value.gender,
          email: this.accountForm.value.email,
          pin: this.accountForm.value.pin,
        });

        this.router.navigateByUrl('/contract');
      } else {
        this.handleError("Formulario inválido", new Error("Campos incompletos o erróneos"));
      }
    } catch (error) {
      this.handleError("Error al enviar el formulario", error);
    }
  }
}
