import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class FiltroDeExcecaoHttpGlobal implements ExceptionFilter {
  constructor(private adapterHost: HttpAdapterHost) {}
  catch(excecao: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.adapterHost;

    const contexto = host.switchToHttp();
    const resposta = contexto.getResponse();
    const requisicao = contexto.getRequest();

    const { status, body } =
      excecao instanceof HttpException
        ? {
            status: excecao.getStatus(),
            body: excecao.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timeStamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(requisicao),
            },
          };
    httpAdapter.reply(resposta, body, status);
  }
}
