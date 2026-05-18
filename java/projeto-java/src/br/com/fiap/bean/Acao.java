package br.com.fiap.bean;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Registra uma ação simples, registrada por QR code ou outros
 * @since Java 21
 */
public class Acao {
    private String nome;
    private int soulCoinsGerados;
    private LocalDateTime dataRealizacao;

    public Acao() {}
    //Registra apenas o nome da ação, já que data e pontos são obtidos pelos métodos.
    public Acao(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public int getSoulCoinsGerados() {
        return soulCoinsGerados;
    }
    public void setSoulCoinsGerados(int soulCoinsGerados) {
        this.soulCoinsGerados = soulCoinsGerados;
    }
    public LocalDateTime getDataRealizacao() {
        return dataRealizacao;
    }
    public void setDataRealizacao(LocalDateTime dataRealizacao) {
        this.dataRealizacao = dataRealizacao;
    }

    /**
     * Registrar uma ação
     * @param pontosGerados o número de pontos dessa ação
     * @return O número de Soul Coins gerados
     */
    public int gerarPontos(int pontosGerados) {
        dataRealizacao = LocalDateTime.now();
        soulCoinsGerados = pontosGerados;
        return pontosGerados;
    }

    /**
     * Mostra uma descrição da ação realizada * @return retorna uma string com a descrição
     */
    public String detalhes() {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        return String.format("A ação \"%s\" foi realizada em (%s) e gerou %d Soul Coins.", nome, dataRealizacao.format(dtf), soulCoinsGerados);
    }
}