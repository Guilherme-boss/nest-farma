import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { emailUnico } from '../validacao/email-valida.validator';

export class CriaFuncionarioDTO {
  @IsNotEmpty()
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é invalido' })
  @emailUnico({ message: 'Já existe usuario com esse email' })
  email: string;

  @MinLength(4)
  senha: string;
}
