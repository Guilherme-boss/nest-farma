import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioService } from './usuario.service';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() novosDados: CriaUsuarioDTO) {
    const usuarioCadastrado = await this.usuarioService.criaUsuario(novosDados);
    return {
      message: 'usuario Cadastrado',
      usuario: new ListaUsuarioDTO(
        usuarioCadastrado.id,
        usuarioCadastrado.nome,
      ),
    };
  }

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioService.listUsuarios();
    return usuariosSalvos;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
      id,
      novosDados,
    );

    return {
      usuario: usuarioAtualizado,
      messagem: 'usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.deletaUsuario(id);

    return {
      usuario: usuarioRemovido,
      messagem: 'usuário removido com suceso',
    };
  }
}
