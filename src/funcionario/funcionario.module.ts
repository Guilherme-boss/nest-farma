import { Module } from '@nestjs/common';
import { FuncionarioRepository } from './funcionario.repository';
import { EmailValida } from './validacao/email-valida.validator';
import { FuncionarioController } from './funcionario.controller';

@Module({
  controllers: [FuncionarioController],
  providers: [FuncionarioRepository, EmailValida],
})
export class FuncionarioModule {}
