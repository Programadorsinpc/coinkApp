import { Injectable, signal } from '@angular/core';
import { UserData } from '../models/userData.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  // Signal para el estado del usuario
  private userData = signal<UserData | null>(null);
  
  // Signal para manejar errores
  private errorSignal = signal<string | null>(null);

  constructor() {
    try {
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
    } catch (error) {
      this.handleError("Error inicializando los datos del usuario", error);
    }
  }

  // Método para actualizar el número de teléfono
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

  // Método para actualizar los datos de la cuenta del usuario
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

  // Método para aceptar los términos y condiciones
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

  // Método para obtener los datos actuales del usuario (por si se necesita)
  getUserData(): UserData | null {
    try {
      return this.userData();
    } catch (error) {
      this.handleError("Error al obtener los datos del usuario", error);
      return null;
    }
  }

  // Método para manejar errores y actualizar el signal de error
  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.errorSignal.set(`${message}: ${error.message || error}`);
  }

  // Método para obtener el último error
  getError(): string | null {
    return this.errorSignal();
  }
}
