# Proyecto Node.js - Prueba Técnica

## Descripción

Este proyecto es una aplicación Node.js que interactúa con una base de datos MySQL. La aplicación permite gestionar clientes, pagos y billeteras.

## Requisitos

- Node.js (versión 14 o superior)
- MySQL (versión 5.7 o superior)
- Git

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/yesid1721/fintechTest
   cd tu-repositorio

2. **Instalar dependencias:**

   ```bash
   npm install

3. **Configurar la base de datos:**

   Importa el archivo walletdb.sql de la ruta **src/app/database/walletDB.sql** a tu servidor MySQL. 

    Puedes hacerlo usando MySQL Workbench o la línea de comandos:
   ```bash
   mysql -u tu_usuario -p < walletDB.sql

4. **Configurar las variables de entorno:**

   Crea un archivo .env.development en la raíz del proyecto y añade las siguientes variables de entorno::
   ```bash
    NODE_ENV=development
    BASE_URL=http://localhost
    PORT=5000
    DB_HOST=localhost
    DB_USER= {tu usuario}
    DB_PASSWORD= {tu password}
    DB_PORT=3306
    DB_DATABASE_NAME=walletdb

## Ejecución

1. **Inicia el servidor**

   ```bash
   npm run dev

1. **Acceder a la aplicación**

   API deisponible es http://localhost:5000/api/v1

   Swagger disponible en http://localhost:5000/docs

## Endpoints

### customers
- **POST** `http://localhost:5000/api/v1/customers/create`: Crear un nuevo cliente.

  body para la consulta
  ```json
  {
    "document": "string",
    "full_name": 0,
    "email": "string",
    "phone": "string"
  }

### Payments
- **POST** `http://localhost:5000/api/v1/payments/sendPayment`: Crear un nuevo pago.
  
  body para la consulta
  ```json
  {
    "document": "string",
    "phone": "string",
    "payment": 0
  }

- **PUT** `http://localhost:5000/api/v1/payments/confirmPayment`: Confirmar un pago

  body para la consulta
  ```json
  {
    "document": "string",
    "phone": "string",
    "session_id": 0,
    "token": "string"
  }

### Wallets
- **GET** `http://localhost:5000/api/v1/wallet/checkBalance`: Obtener el saldo de la billetera de un cliente.

- **POST** `http://localhost:5000/api/v1/wallet/recharge`: Hacer una recarga a la billtera del cliente.

    body para la consulta
  ```json
  {
    "document": "string",
    "phone": "string",
    "amount": 0
  }  

## Contacto

Si tienes alguna pregunta o sugerencia sobre el proyecto, no dudes en ponerte en contacto:

- **Email**: yessid1721@gmail.com
- **GitHub**: https://github.com/yesid1721
