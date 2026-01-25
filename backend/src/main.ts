import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppErrorFilter } from './auth/presentation/http/filters/AppErrorFilter';
import { DomainErrorFilter } from './auth/presentation/http/filters/DomainErrorFilter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );
    app.useGlobalFilters(new AppErrorFilter(), new DomainErrorFilter());

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
