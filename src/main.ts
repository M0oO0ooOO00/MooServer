import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './common/config/swagger.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // config service
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT') ?? 3000;

    // swagger-config
    SwaggerConfig.setUp(app);

    await app.listen(port ?? 3030);
}
bootstrap();
