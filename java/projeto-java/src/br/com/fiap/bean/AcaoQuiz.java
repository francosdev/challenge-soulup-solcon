package br.com.fiap.bean;

import javax.swing.*;
import java.time.format.DateTimeFormatter;

/**
 * Registra um quiz.
 * @since Java 21
 */
public class AcaoQuiz extends Acao{
    private int acertos;
    private int pontosPorQuestao;

    public AcaoQuiz() {}
    public AcaoQuiz(String nome, int acertos, int valorQuestao) {
        super(nome);
        setAcertos(acertos);
        setPontosPorQuestao(pontosPorQuestao);
    }

    public int getAcertos() {
        return acertos;
    }
    public void setAcertos(int acertos) {
        //Impedir que o número de acertos seja menor que zero
        try {
            if (acertos >= 0) {
                this.acertos = acertos;
            } else {
                throw new Exception("Valor inválido. N´mero de aceros deve ser maior que zero");
            }

        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, e.getMessage(), "Erro!", JOptionPane.ERROR_MESSAGE);
        }
    }
    public int getPontosPorQuestao() {
        return pontosPorQuestao;
    }
    public void setPontosPorQuestao(int pontosPorQuestao) {
        //Regra: os pontos ganhos por questão devem variar entre 1 a 10 dependendo do quiz.
        try {
            if (pontosPorQuestao > 0 && pontosPorQuestao <= 10) {
                this.pontosPorQuestao = pontosPorQuestao;
            } else {
                throw new Exception("O valor de quantos pontos cada questão ganha no quiz só pode ser entre 1 e 10.");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, e.getMessage(), "Erro!", JOptionPane.ERROR_MESSAGE);
        }
    }

    /**
     * Gera pontos a partir de quizzes que estão atrelados a algum evento e ação e dependem de um cálculo externo.
     * @param pontosGerados o número de pontos desse quiz
     * @return retorna o valor de Soul coins gerados.
     */
    public int registrarPontos(int pontosGerados) {
        //Quiz vale a metade dos pontos quando atrelados a uma conquista ou outra ação
        super.registrarPontos((int) (pontosGerados*0.5));
        return super.getSoulCoinsGerados();
    }

    /**
     * Gera pontos a partir de um número de acertos vezes o número de quanto valia cada questão
     * @return O número de Soul Coins gerados.
     */
    public int registrarPontos() {
        //Quiz normal:
        super.registrarPontos(pontosPorQuestao*acertos);
        return super.getSoulCoinsGerados();
    }

    public String detalhes() {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        return String.format("Quiz \"%s\" concluído em (%s) e gerou %d Soul Coins. Acertou %d questões",
                super.getNome(), super.getDataRealizacao().format(dtf), super.getSoulCoinsGerados(), acertos);
    }
}
