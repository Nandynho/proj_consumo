import { Controller, Post, Body } from '@nestjs/common';
import { ConsumoService } from './app.service';

@Controller('consumo')
export class ConsumoController {
  constructor(private readonly consumoService: ConsumoService) {}

  @Post()
  async registrarConsumo(
    @Body('userId') userId: string,
    @Body('quantidade') quantidade: number,
    @Body('data') data: Date,
  ) {
    return this.consumoService.registrarConsumo(userId, quantidade, data);
  }
}

@Get('alerta')
async verificarAlerta(@Query('userId') userId: string) {
  return this.consumoService.verificarAlertaConsumo(userId);
}
