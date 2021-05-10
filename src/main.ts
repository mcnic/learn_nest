import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import AppModule from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("Продвинурый backend")
    .setDescription("документация по rest api")
    .setVersion("1.0.0")
    .addTag("Изучаю Nestjs")
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, doc);

  await app.listen(PORT, () => console.log(`server start on port ${PORT}`));
}

start();
