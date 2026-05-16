package br.com.fiap.bean;

import javax.swing.*;

public class Usuario {
    private String nome;
    private String id;
    private float confiabilidade;
    private int soulCoins;
    //Um valor "vazio" é definido para não dar erro na concatenação de strings.
    private String atividadeRecente = "";

    public Usuario (){}
    //Construtor para registrar usuário (nome, id e confiabilidade).
    public Usuario(String nome, String id, float confiabilidade) {
        this.nome = nome;
        setId(id);
        setConfiabilidade(confiabilidade);
    }

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getId() {
        return id;
    }
    // A id é sempre minúscula.
    public void setId(String id) {
        this.id = id.toLowerCase();
    }
    public float getConfiabilidade() {
        return confiabilidade;
    }
    // Confiabilidade varia entre 0 e 100%, e é mostrada como porcentagem
    public void setConfiabilidade(float confiabilidade) {
        try {
            if (confiabilidade >= 0 && confiabilidade <= 100) {
                this.confiabilidade = confiabilidade;
            } else {
                throw new Exception("Valor inválido, digite um número de 1 a 100 para confiabilidade");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, e.getMessage(), "Erro", JOptionPane.ERROR_MESSAGE);
        }
    }
    public int getSoulCoins() {
        return soulCoins;
    }
    public void setSoulCoins(int soulCoins) {
        this.soulCoins = soulCoins;
    }
    public String getAtividadeRecente() {
        return atividadeRecente;
    }
    public void setAtividadeRecente(String atividadeRecente) {
        this.atividadeRecente = atividadeRecente;
    }

    public void registrarPontos(int soulCoins, String descAcao){
        this.soulCoins += soulCoins;
        this.atividadeRecente = this.atividadeRecente.concat(descAcao+"\n");
    }
    public String detalhesPerfil(){
        return String.format("Nome: %s\nId: %s\nConfiabilidade: %.1f\nSoul Coins: %d\nAtividade recente:\n%s",
                nome, id, confiabilidade, soulCoins, atividadeRecente);
    }
    //Retgistra uma penalidade d confiabilidade para o usuário, e retorna uma string indicando o registro.
    public String registrarPenalidade(float valorPenalidade, String descOcorrido){
        //Recebe valores positivos e não pode receber negativs, por isso o try
        try {
            // 0 vai permitir que seja "cancelado"
            if (valorPenalidade >= 0) {
                /*Se o valor da penalidade for maio que o valor atual então ele vai ser colocado como zero
                Isso impede que a confiablidade fique negativa, basicamente o mathmax vai pegar o maior valor, se o resultado for negativo será o 0*/
                this.confiabilidade = Math.max(0, this.confiabilidade -= valorPenalidade);
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, e.getMessage(), "Erro!", JOptionPane.ERROR_MESSAGE);
        }
        return String.format("Penalidade registrada, %s perdeu %.1f%% de confiabilidade, ficando com %.1f%%. Desc: %s",
                nome, valorPenalidade, confiabilidade, descOcorrido);
    }
}
