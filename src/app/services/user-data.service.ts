import { Injectable, signal } from '@angular/core';
import { UserData } from '../models/userData.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userData = signal<UserData | null>(null);
  
  private errorSignal = signal<string | null>(null);

  constructor() {
    try {
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
    } catch (error) {
      this.handleError("Error inicializando los datos del usuario", error);
    }
  }

  setPhoneNumber(number: number): void {
    try {
      const currentUserData = this.userData();
      if (currentUserData) {
        this.userData.set({
          ...currentUserData,
          phoneNumber: number,
        });
      } else {
        throw new Error("No se pudieron actualizar los datos del usuario.");
      }
    } catch (error) {
      this.handleError("Error al actualizar el número de teléfono", error);
    }
  }

  setAccountData(data: Partial<UserData>): void {
    try {
      const currentUserData = this.userData();
      if (currentUserData) {
        this.userData.set({
          ...currentUserData,
          ...data,
        });
      } else {
        throw new Error("No se pudieron actualizar los datos de la cuenta.");
      }
    } catch (error) {
      this.handleError("Error al actualizar los datos de la cuenta", error);
    }
  }

  acceptTerms(): void {
    try {
      const currentUserData = this.userData();
      if (currentUserData) {
        this.userData.set({
          ...currentUserData,
          acceptTerms: true,
        });
      } else {
        throw new Error("No se pudo actualizar la aceptación de términos.");
      }
    } catch (error) {
      this.handleError("Error al aceptar los términos y condiciones", error);
    }
  }

  getUserData(): UserData | null {
    try {
      return this.userData();
    } catch (error) {
      this.handleError("Error al obtener los datos del usuario", error);
      return null;
    }
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.errorSignal.set(`${message}: ${error.message || error}`);
  }

  getError(): string | null {
    return this.errorSignal();
  }
}
