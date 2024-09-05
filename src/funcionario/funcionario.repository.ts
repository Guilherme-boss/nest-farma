import { Injectable } from '@nestjs/common';
import { FuncionarioEntity } from './funcionario.entity';

@Injectable()
export class FuncionarioRepository {
  private funcionarios: FuncionarioEntity[] = [];

  salvar(funcionario: FuncionarioEntity) {
    this.funcionarios.push(funcionario);
  }

  async listar() {
    return this.funcionarios;
  }

  async emailExistente(email: string) {
    const funcionario = this.funcionarios.find(
      (funcionario) => funcionario.email === email,
    );
    return funcionario !== undefined;
  }

  private buscarPorId(id: string) {
    const possivelFuncionario = this.funcionarios.find(
      (funcionarioSalvo) => funcionarioSalvo.id === id,
    );

    if (!possivelFuncionario) {
      throw new Error('funcionario não existe');
    }
  }

  async atualiza(id: string, dadosDeAtualizacao: Partial<FuncionarioEntity>) {
    const funcionario = this.buscarPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }

      funcionario[chave] = valor;
    });
    return funcionario;
  }

  async remover(id: string) {
    const funcionario = this.buscarPorId(id);
    this.funcionarios = this.funcionarios.filter(
      (funcionarioSalvo) => funcionarioSalvo.id !== id,
    );

    return funcionario;
  }
}
