import { Module } from '@nestjs/common';
import { ProdutoModule } from './produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.services';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { PedidoModule } from './pedido/pedido.module';
import { APP_FILTER } from '@nestjs/core';
import { FiltroDeExcecaoHttpGlobal } from './filtros/filtro-excecao-global';

@Module({
  imports: [
    ProdutoModule,
    UsuarioModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    PedidoModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroDeExcecaoHttpGlobal,
    },
  ],
})
export class AppModule {}
