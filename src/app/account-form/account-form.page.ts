import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.page.html',
  styleUrls: ['./account-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AccountFormPage implements OnInit{

  accountForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.fb.control('', Validators.required)

    // Inicializamos el formulario con validaciones
    // this.datosCuentaForm = this.fb.group({
    //   tipoDocumento: ['', Validators.required],
    //   numeroDocumento: ['', [Validators.required, Validators.minLength(6)]],
    //   fechaExpedicion: ['', Validators.required],
    //   fechaNacimiento: ['', Validators.required],
    //   genero: ['', Validators.required],
    //   correo: ['', [Validators.required, Validators.email]],
    //   confirmarCorreo: ['', [Validators.required, Validators.email]],
    //   pin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    //   confirmarPin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    // }, { validator: this.matchingFields('correo', 'confirmarCorreo') });
  }

  // Función para validar que el correo y su confirmación sean iguales
  matchingFields(field1: string, field2: string) {
    return (formGroup: FormGroup) => {
      const control1 = formGroup.controls[field1];
      const control2 = formGroup.controls[field2];
      if (control1.value !== control2.value) {
        control2.setErrors({ notMatch: true });
      } else {
        control2.setErrors(null);
      }
    };
  }

  // Validamos el formulario antes de enviar
  onSubmit() {
    // if (this.datosCuentaForm.valid) {
    //   // Aquí iría la lógica para enviar los datos al backend
    //   console.log(this.datosCuentaForm.value);
    // }
  }

}
