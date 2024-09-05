import { Module } from '@nestjs/common';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { ProdutoModule } from './produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.services';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    FuncionarioModule,
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
})
export class AppModule {}
