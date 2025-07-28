import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { SwaggerConfig } from './common/config/swagger.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // RestResponse Interceptor
    app.useGlobalInterceptors(new ResponseInterceptor());

    // HttpException filter
    app.useGlobalFilters(new HttpExceptionFilter());

    // swagger-config
    SwaggerConfig.setUp(app);

    await app.listen(process.env.PORT ?? 3030);
}
bootstrap();
