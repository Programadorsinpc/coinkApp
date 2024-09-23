import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-welcome',
  imports: [IonicModule],
  standalone: true,
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  isModalOpen: boolean = false;
  private userDataService = inject(UserDataService)

  constructor(private router: Router) {}

  ngOnInit() {
    this.validateUserData()
  }

  openModalOnInit() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;



    const userData = this.userDataService.getUserData();
    console.log('Datos del usuario al finalizar el registro:', userData);
    setTimeout(() => {
      this.router.navigateByUrl('/splash');
    }, 2000);
  }

  validateUserData() {
    const userData = this.userDataService.getUserData()!;

    if (!userData.phoneNumber) {
      console.warn('Falta el número de teléfono, redirigiendo a la página de número de teléfono...');
      this.router.navigate(['/phone-number']);
      return;
    }

    if (!userData.docType || !userData.docNumber || !userData.docBirthDate || !userData.email || !userData.pin) {
      console.warn('Faltan datos del documento, redirigiendo a la página de documento...');
      this.router.navigate(['/account-form']);
      return;
    }

    if (!userData.acceptTerms) {
      console.warn('Falta aceptar los términos, redirigiendo a la página de contrato...');
      this.router.navigate(['/contract']);
      return;
    }

    this.openModalOnInit();
    // Si todos los datos están completos, mostrarlos en el log
    console.log('Datos del usuario:', userData);
  }

}
