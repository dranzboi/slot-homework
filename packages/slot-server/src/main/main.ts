import {NestFactory} from '@nestjs/core';
import {Config} from './Config';
import {Logger} from "@nestjs/common";
import {AppModule} from "./AppModule";

async function bootstrap() {
  const port = Config.httpPort;
  
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*',      
    methods: '*',  
    allowedHeaders: '*',  
    credentials: false, 
  });
  
  await app.listen(port, "0.0.0.0");
  
  Logger.log(`Slot server started on port: ${port}`);
}

bootstrap();
