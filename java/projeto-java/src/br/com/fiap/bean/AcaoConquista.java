package br.com.fiap.bean;

import javax.swing.*;
import java.time.LocalDateTime;

public class AcaoConquista extends Acao {
    private int raridade;

    public AcaoConquista(){}
    public AcaoConquista(String nome, int raridade) {
        super(nome);
        setRaridade(raridade);
    }

    public int getRaridade() {
        return raridade;
    }
    public void setRaridade(int raridade) {
        try {
            if (raridade > 0 && raridade <= 4) {
                this.raridade = raridade;
            } else {
                throw new Exception("Valor inválida, a raridade varia de 1 a 4.");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, e.getMessage(), "ERRO!", JOptionPane.ERROR_MESSAGE);
        }
    }

    public int registrarPontos(int pontosGerados) {
        //Os pontos são multiplicados por 1.5 e tem um adicional dependendo da raridade
        super.gerarPontos((int) (pontosGerados * 1.5 + raridade * 5));
        return super.getSoulCoinsGerados();
    }

    public String detalhes() {
        return String.format("Conquista \"%s\" foi ganha em (%s) e gerou %d Soul Coins.", super.getNome(), super.getDataRealizacao(), super.getSoulCoinsGerados());
    }
}