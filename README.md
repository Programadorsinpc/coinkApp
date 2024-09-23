# 🚀 Simulación de Registro en Coink - Prueba Técnica

Este proyecto es una prueba técnica cuyo objetivo es desarrollar una aplicación en Ionic que simula un proceso de registro exitoso en Coink, integrando las APIs proporcionadas y cumpliendo con varios requisitos funcionales y de diseño.

## 🌟 Características

- **Navegación y Validación**: La aplicación restringe la navegación entre los pasos del registro hasta que el usuario haya proporcionado entradas válidas en todos los campos requeridos. Cada pantalla valida los datos, como el formato del correo electrónico y número de teléfono, y proporciona retroalimentación adecuada si hay errores.
- **Integración de API**: La aplicación se integra con dos APIs de Coink para obtener dinámicamente los tipos de documentos y los géneros disponibles
- **Manejo de Errores**: Los errores inesperados, como fallos en las APIs, se manejan de manera adecuada, mostrando mensajes informativos al usuario. Esto garantiza una experiencia fluida incluso en caso de problemas externos.
- **Recolección de Datos del Usuario**: Al finalizar el proceso de registro, se recopilan todos los datos del usuario, tales como número de teléfono, detalles del documento, género, correo electrónico y PIN. Si falta algún dato requerido, el usuario es redirigido a la pantalla correspondiente para completar la información. Una vez que todos los datos estén completos, se registra la información en la consola.
- **Interfaz amigable**: Construida con Tailwind CSS para un diseño responsivo y atractivo.

## 🛠️ Tecnologías Utilizadas

- **Ionic**.
- **Angular**

## 🚀 Instalación y Configuración

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

### 1. Clona el repositorio

git clone https://github.com/Programadorsinpc/coinkApp.git
cd coinkApp

### 2. Asegurate de instalar las dependencias

npm install

### 3. Corre el proyecto

ionic serve

Nota: todo esto se debe hacer desde la terminal

## 🛠️ Generacion de la APK

### Comandos de Capacitor

#### 1. Para construir y ejecutar tu aplicación con Capacitor, usa los siguientes comandos:

ionic build

#### Para sincronizar los cambios con la plataforma Android:

ionic capacitor sync android

#### 2. Para abrir el proyecto en Android Studio:

ionic capacitor open android

#### 3. Desde Android Studio, puedes construir el APK siguiendo estos pasos:

Una vez abierto el proyecto, ve a "Build" en la barra de menú.
Selecciona "Build Bundle(s)/APK(s)" > "Build APK(s)".
Después de que se complete el proceso, podrás encontrar el APK en el directorio de salida especificado.
Tambien la puedes instalar desde Android Studio si tienes conectado en modo desarrollador algún smartphone

## 📂 Calidad del Código y Patrones de Diseño

- **Arquitectura basada en Servicios**: La aplicación separa responsabilidades utilizando un UserDataService para manejar los datos del usuario y las llamadas API.
- **Validaciones Simples**: Se implementa una lógica clara y directa para la validación de datos.
- **Navegación**: La navegación se gestiona a través de Ionic routing, con comportamiento similar a guards, asegurando que los usuarios no puedan avanzar sin completar los datos correctamente.
- **Manejo de Errores:**: Los errores de las APIs y otros comportamientos inesperados se manejan adecuadamente, mostrando mensajes informativos al usuario.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Siéntete libre de abrir un issue o un pull request si deseas mejorar alguna característica o corregir un error.

## ¡Gracias por explorar este proyecto! 🎉

Si tienes alguna pregunta o sugerencia, no dudes en contactarme.
