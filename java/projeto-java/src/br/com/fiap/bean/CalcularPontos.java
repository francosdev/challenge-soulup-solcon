package br.com.fiap.bean;

/**
 * Calcula os pontos de um tipo de ação
 * @since Java 21
 */
public class CalcularPontos {
    /**
     * calcula pontos do tipo natureza (plantas, árvores...)
     * @param dificuldade recebe o valor de dificuldade da ação
     * @return retorna o número d epontos gerados dependendo da dificuldade.
     */
    public int pontosNatureza(int dificuldade) {
        return dificuldade * 5;
    }
    /**
     * calcula carbono não gasto para gerar pontos.
     * @param qtdeCarbono recebe o valor de carbono não gasto
     * @return retorna o número de pontos gerados.
     */
    public int pontosCarbono(float qtdeCarbono) {
        // 16 pontos por quilo, pois são R$0,16 e cada quilo custa R$0,20 IRL
        return Math.round(qtdeCarbono * 16);
    }
    /**
     * Calcula o quanto a pessoa economizou de água
     * @param qtdeLitros recebe o valor de água economizada
     * @return retorna o número de pontos gerados.
     */
    public int pontosAgua(float qtdeLitros) {
        // 1 ponto por litro economizado
        return Math.round(qtdeLitros * 1);
    }
    /**
     * Calcula o quanto a pessoa reciclou
     * @param qtdeReciclada recebe o valor de lixo reciclado
     * @return retorna o número de pontos gerados.
     */
    public int pontosReciclagem(float qtdeReciclada) {
        // 160 por quilo reciclado, 200 sera uma média de diferentes materiais, 160 é isso reduzida.
        return Math.round(qtdeReciclada * 160);
    }
}