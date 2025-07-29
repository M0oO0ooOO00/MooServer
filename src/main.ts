import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { SwaggerConfig } from './common/config/swagger.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // config service
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT') ?? 3000;

    // RestResponse Interceptor
    app.useGlobalInterceptors(new ResponseInterceptor());

    // HttpException filter
    app.useGlobalFilters(new HttpExceptionFilter());

    // swagger-config
    SwaggerConfig.setUp(app);

    await app.listen(port ?? 3030);
}
bootstrap();
