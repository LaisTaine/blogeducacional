import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogginInterceptor } from './shared/interceptors/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // --- INÍCIO DO CÓDIGO DE DEPURAÇÃO ---
  // Acessa o servidor HTTP interno da aplicação
  const server = app.getHttpServer();
  // Acessa o roteador que contém a lista de rotas
  const router = server._events.request._router;

  console.log('--- ROTAS REGISTRADAS NA APLICAÇÃO ---');
  router.stack.forEach(function(layer) {
    if (layer.route) {
      // Imprime o caminho e os métodos (GET, POST, etc.)
      const path = layer.route.path;
      const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
      console.log(`${methods} ${path}`);
    }
  });
  console.log('------------------------------------');
  // --- FIM DO CÓDIGO DE DEPURAÇÃO ---

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Blog Education')
    .setDescription('The Blog Education API description')
    .setVersion('1.0')
    .addTag('blog-education')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new LogginInterceptor());

  app.enableCors({
    origin: [
      'http://localhost:3001', 'https://blogeducacional-front.onrender.com'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
  });

  await app.listen(process.env.PORT ?? 3010);
}
bootstrap();
