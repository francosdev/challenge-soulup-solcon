package br.com.fiap.bean;

import java.util.ArrayList;

public class Usuario {
    private String nome;
    private String id;
    private float confiabilidade;
    private int soulCoins;
    //Única coisa não aprendida, pesquisei para se encaixar na ideia.
    private ArrayList<String> atividadeRecente;
    public Usuario (){}
    //Construtor para registrar usuário (nome, id e confiabilidade).
    public Usuario(float confiabilidade, String id, String nome) {
        this.confiabilidade = confiabilidade;
        this.id = id;
        this.nome = nome;
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
    public void setId(String id) {
        this.id = id;
    }
    public float getConfiabilidade() {
        return confiabilidade;
    }
    public void setConfiabilidade(float confiabilidade) {
        this.confiabilidade = confiabilidade;
    }
    public int getSoulCoins() {
        return soulCoins;
    }
    public void setSoulCoins(int soulCoins) {
        this.soulCoins = soulCoins;
    }
    public ArrayList<String> getAtividadeRecente() {
        return atividadeRecente;
    }
    public void setAtividadeRecente(String atividadeRecente) {
        this.atividadeRecente.addFirst(atividadeRecente);
    }
    public void registrarPontos(int soulCoins, String descAcao){
        this.soulCoins = soulCoins;
        setAtividadeRecente(String.format("%s\n",
                descAcao));
    }
    public String detalhesPerfil(){
        return String.format("Nome: %s\nId: %s\nConfiabilidade: %.3f\nSoul Coins: %d\nAtividade recente:\n%s",
                nome, id, confiabilidade, soulCoins, atividadeRecente);
    }
}
