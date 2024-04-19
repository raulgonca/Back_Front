import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from 'axios';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Configurar axios globalmente con la URL base y las opciones de CORS
  axios.defaults.baseURL = 'http://localhost:3000'; // Establecer la URL base de tu servidor NestJS
  axios.defaults.withCredentials = true; // Habilitar el envío de cookies de autenticación

  // Configurar CORS con NestJS
  app.enableCors({
    origin: 'http://localhost:3001', // Permitir solicitudes desde la URL de tu aplicación React
    credentials: true, // Permitir enviar cookies de autenticación
  });

<<<<<<< HEAD
=======


  const config = new DocumentBuilder()
    .setTitle('Stafko')
    .setDescription('Documentacion del codigo Backend')
    .setVersion('1.0')
    .addTag('Project')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

>>>>>>> 5c4e9098 (19/4 arreglo push)
  await app.listen(3000);
}

bootstrap();
