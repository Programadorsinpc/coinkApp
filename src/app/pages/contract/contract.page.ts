import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserDataService } from '../../services/user-data.service'; // Importamos el servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.page.html',
  styleUrls: ['./contract.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule], // Agregamos ReactiveFormsModule
})
export class ContractPage implements OnInit {
  private userDataService = inject(UserDataService);
  acceptContract: boolean = false;
  private router = inject(Router);

  ngOnInit() {
    // Cargar el estado inicial de acceptTerms desde el servicio, si está definido
    const userData = this.userDataService.getUserData();
    if (userData && userData.acceptTerms) {
      this.acceptContract = userData.acceptTerms;
    }
  }

  onCheckboxChange(event: any) {
    this.acceptContract = event.target.checked;
  }

  onClickButton(){
    if(this.acceptContract){
      this.userDataService.acceptTerms();
      this.router.navigateByUrl('/welcome')
    }
  }
}
