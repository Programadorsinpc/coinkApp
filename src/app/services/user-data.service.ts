import { Injectable, signal } from '@angular/core';
import { UserData } from '../models/userData.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  // Signal para el estado del usuario
  private userData = signal<UserData | null>(null);

  constructor() {
    // Inicialización de los datos del usuario
    const initialUserData: UserData = {
      phoneNumber: undefined,
      docType: undefined,
      docNumber: undefined,
      docBirthDate: undefined,
      gender: undefined,
      email: undefined,
      pin: undefined,
      acceptTerms: undefined,
    };

    this.userData.set(initialUserData);
  }

  // Método para actualizar el número de teléfono
  setPhoneNumber(number: number): void {
    const currentUserData = this.userData();
    if (currentUserData) {
      this.userData.set({
        ...currentUserData,
        phoneNumber: number,
      });
    }
    this.consoleTest()
  }

  // Método para actualizar los datos de la cuenta del usuario
  setAccountData(data: Partial<UserData>): void {
    const currentUserData = this.userData();
    if (currentUserData) {
      this.userData.set({
        ...currentUserData,
        ...data,
      });
    }
    this.consoleTest()
  }

  // Método para aceptar los términos y condiciones
  acceptTerms(): void {
    const currentUserData = this.userData();
    if (currentUserData) {
      this.userData.set({
        ...currentUserData,
        acceptTerms: true,
      });
    }
    this.consoleTest()
  }

  consoleTest(){
    console.log('Current user data: '.replace,this.userData());
  }

  // Método para obtener los datos actuales del usuario (por si se necesita)
  getUserData(): UserData | null {
    return this.userData();
  }
}
