package br.com.fiap.bean;

import javax.swing.*;
import java.time.format.DateTimeFormatter;

/**
 * Registra pontos de um post.
 * @since Java 21
 */
public class AcaoPost extends Acao{
    private int posicaoRanking;
    //O número de upvotes subtraido de downvotes do post
    private int saldoVotos;

    public AcaoPost() {}
    public AcaoPost(String nome, int posicaoRanking, int saldoVotos) {
        super(nome);
        setPosicaoRanking(posicaoRanking);
        this.saldoVotos = saldoVotos;
    }

    public int getPosicaoRanking() {
        return posicaoRanking;
    }
    public void setPosicaoRanking(int posicaoRanking) {
        try {
            if (posicaoRanking > 0) {
                this.posicaoRanking = posicaoRanking;
            } else {
                throw new Exception("Posição deve ser um número positivo igual ou maior que 1.");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, e.getMessage(), "Valor inválido!", JOptionPane.ERROR_MESSAGE);
        }
    }
    public int getSaldoVotos() {
        return saldoVotos;
    }
    public void setSaldoVotos(int saldoVotos) {
        this.saldoVotos = saldoVotos;
    }

    /**
     * Registra um número de pontos com base nos pontos gerados da ação e no engajamento que ela teve.
     * @param pontosGerados o número de pontos dessa ação
     * @return
     */
    public int registrarPontos(int pontosGerados) {
        //Posições altas no ranking semanal ou do evento dão bonus de pontos
        int adicional = 0;
        if(posicaoRanking == 1){
            adicional = 100;
        }
        else if(posicaoRanking == 2){
            adicional = 75;
        }
        else if(posicaoRanking == 3){
            adicional = 50;
        }
        else if(posicaoRanking <= 10){
            adicional = 25;
        }
        /*  Quantidade de votos também dá pontos
        Porem vai até um limite de 100 pontos
        A cada 100 saldo de votos um ponto
        Arredonda pra baixo, então 199 ainda é um ponto
        Porém, se o valor do saldo for negativo (muitos downvotes)
        ele não pode tirar nenhum Soul Coin    */
        adicional += Math.max(0, Math.min(100, saldoVotos/100));
        super.registrarPontos(pontosGerados * 2 + adicional);
        return super.getSoulCoinsGerados();
    }
    public String detalhes() {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        return String.format("Período de alta do Post: \"%s\" encerrado em (%s), gerou %d Soul Coins, tendo um total de %d votos, ficando na %d posição do ranking.",
                super.getNome(), super.getDataRealizacao().format(dtf), super.getSoulCoinsGerados(), saldoVotos, posicaoRanking);
    }
}
