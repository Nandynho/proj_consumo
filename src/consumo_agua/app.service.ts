// src/consumo/consumo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsumoDto } from './dto/create-consumo.dto';
import { HistoricoConsumoDto } from './dto/historico-consumo.dto';

interface Consumo {
    userId: number;
    quantidade: number;
    data: Date;
}

@Injectable()
export class ConsumoService {
    private consumos: Consumo[] = []; // Armazena os consumos temporariamente

    registrarConsumo(createConsumoDto: CreateConsumoDto): Consumo {
        const consumo = { ...createConsumoDto };
        this.consumos.push(consumo);
        return consumo;
    }

    consultarHistorico(userId: number, historicoDto: HistoricoConsumoDto): Consumo[] {
        const { dataInicial, dataFinal } = historicoDto;
        return this.consumos.filter(
            consumo => consumo.userId === userId &&
                       consumo.data >= dataInicial &&
                       consumo.data <= dataFinal,
        );
    }

    verificarAlerta(userId: number): string {
        const userConsumos = this.consumos
            .filter(consumo => consumo.userId === userId)
            .sort((a, b) => b.data.getTime() - a.data.getTime());

        if (userConsumos.length < 2) {
            return 'Dados insuficientes para alerta de consumo.';
        }

        const consumoAtual = userConsumos[0].quantidade;
        const consumoMesAnterior = userConsumos[1].quantidade;

        if (consumoAtual > consumoMesAnterior) {
            return 'Alerta: Consumo elevado em relação ao mês anterior.';
        }
        return 'Consumo dentro do esperado.';
    }
}

}
