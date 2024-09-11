import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FuncionarioRepository } from './funcionario.repository';
import { CriaFuncionarioDTO } from 'src/funcionario/dto/CriaFuncionario.dto';
import { FuncionarioEntity } from './funcionario.entity';
import { v4 as uuid } from 'uuid';
import { listaFuncionariosDTO } from './dto/ListaFuncionario.dto';
import { AtualizaFuncionarioDTO } from './dto/AtualizaFuncionario.dto';

@Controller('/funcionarios')
export class FuncionarioController {
  constructor(private funcionarioRepository: FuncionarioRepository) {}

  @Post('/cria')
  async criaFuncionario(@Body() dadosDoFuncionario: CriaFuncionarioDTO) {
    const funcionarioEntity = new FuncionarioEntity();
    funcionarioEntity.email = dadosDoFuncionario.email;
    funcionarioEntity.senha = dadosDoFuncionario.senha;
    funcionarioEntity.nome = dadosDoFuncionario.nome;
    funcionarioEntity.id = uuid();

    this.funcionarioRepository.salvar(funcionarioEntity);
    return {
      funcionario: new listaFuncionariosDTO(
        funcionarioEntity.id,
        funcionarioEntity.nome,
      ),
      message: 'funcionario cadastrado',
    };
  }

  @Get('/busca')
  async listaFuncionarios() {
    const salvos = await this.funcionarioRepository.listar();
    const funcionarioLista = salvos.map(
      (funcionario) =>
        new listaFuncionariosDTO(funcionario.id, funcionario.nome),
    );
    return funcionarioLista;
  }

  @Put('/:id')
  async atualizarFuncionario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaFuncionarioDTO,
  ) {
    const funcionarioAtualizado = await this.funcionarioRepository.atualiza(
      id,
      novosDados,
    );
    return {
      funcionario: funcionarioAtualizado,
      message: 'Funcionario atualizado',
    };
  }
  @Delete('/:id')
  async removeFUncionario(@Param('id') id: string) {
    const funcionarioRemovido = await this.funcionarioRepository.remover(id);

    return {
      funcionario: funcionarioRemovido,
      messege: ' funcionario removido',
    };
  }
}
