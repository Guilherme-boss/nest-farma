import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { FuncionarioRepository } from '../funcionario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailValida implements ValidatorConstraintInterface {
  constructor(private funcionarioRepository: FuncionarioRepository) {}

  async validate(value: any): Promise<boolean> {
    const existeEmail = await this.funcionarioRepository.emailExistente(value);
    return !existeEmail;
  }
}
export const emailUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailValida,
    });
  };
};
