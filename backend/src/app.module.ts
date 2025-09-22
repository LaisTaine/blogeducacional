// Em: src/app.module.ts (VERSÃO DE TESTE)

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Necessário para as variáveis de ambiente
    }),
    UserModule, // O AuthModule depende do UserModule, então precisamos dele
    AuthModule, // <-- O MÓDULO QUE ESTAMOS TESTANDO
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}