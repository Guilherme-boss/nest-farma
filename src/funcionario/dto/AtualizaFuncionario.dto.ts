import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { emailUnico } from '../validacao/email-valida.validator';

export class AtualizaFuncionarioDTO {
  @IsNotEmpty()
  @IsOptional()
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é invalido' })
  @IsOptional()
  @emailUnico({ message: 'Já existe usuario com esse email' })
  email: string;

  @MinLength(4)
  @IsOptional()
  senha: string;
}
