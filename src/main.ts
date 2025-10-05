// Импорт функции NestFactory из пакета @nestjs/core.
// Эта функция используется для создания экземпляра приложения NestJS.
import { NestFactory } from '@nestjs/core';

// Импорт главного модуля приложения (AppModule), который содержит основную конфигурацию.
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/respons-interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

// Асинхронная функция bootstrap, которая запускает приложение.
// Принятое название "bootstrap" обозначает стартовую точку входа в приложение.
async function bootstrap() {
  // Создание экземпляра приложения на основе корневого модуля AppModule.
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); //валидации входящих данных.

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new AllExceptionsFilter());

  app.setGlobalPrefix('api');

  // Запуск сервера: слушаем порт, указанный в переменной окружения PORT,
  // или используем порт 3000 по умолчанию.
  await app.listen(process.env.PORT ?? 3000);
}

// Вызов функции bootstrap для запуска приложения.
bootstrap();
