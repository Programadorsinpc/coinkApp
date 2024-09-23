import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonItem,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserData } from 'src/app/models/userData.model';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.page.html',
  styleUrls: ['./phone-number.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonInput,
    IonItem,
    IonIcon,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class PhoneNumberPage {
  private userDataService = inject(UserDataService);

  phoneNumber: string = ''; // Variable para almacenar el número de teléfono
  isValid: boolean = true;

  constructor(private router: Router) {

  }

  loadPhoneNumber(): void {
    const userData: UserData | null = this.userDataService.getUserData();

    if (userData?.phoneNumber) {
      this.phoneNumber = userData?.phoneNumber.toString()
    }
  }

  // Método para agregar un número al input
  addNumber(num: string) {
    if (this.phoneNumber.length < 10) {
      this.phoneNumber += num;
    }
  }

  // Método para eliminar el último dígito
  removeLastDigit() {
    this.phoneNumber = this.phoneNumber.slice(0, -1);
  }

  // Método para confirmar el número
  confirmNumber() {
    console.log('Número confirmado:', this.phoneNumber);
    if (this.phoneNumber.length !== 10) {
      this.isValid = false;
      return;
    }
    this.userDataService.setPhoneNumber(parseInt(this.phoneNumber));
    this.router.navigateByUrl('/account-form');
  }
}
