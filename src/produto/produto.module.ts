import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoRepository } from './produto.repository';
import { FuncionarioModule } from 'src/funcionario/funcionario.module';

@Module({
  imports: [FuncionarioModule],
  controllers: [ProdutoController],
  providers: [ProdutoRepository],
})
export class ProdutoModule {}
