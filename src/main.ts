import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerConfig } from './common/config/swagger.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // config service
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT') ?? 3000;

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    // swagger-config
    SwaggerConfig.setUp(app);
    await app.listen(port ?? 3030);
}

bootstrap();
