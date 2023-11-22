import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('News Story Service')
    .setDescription(
      'servcio de creaccion de historia a traves de noticias creativas a traves de noiticas seleccionada por el usuario',
    )
    .setVersion('1.0')
    .addTag('endpoint') // Puedes agregar más tags según tus necesidades
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
