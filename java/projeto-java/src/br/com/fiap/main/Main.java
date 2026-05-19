package br.com.fiap.main;

import br.com.fiap.bean.*;

import javax.swing.*;

public class Main {
    public static void main(String[] args) {
        //Calculadora de Pontos
        CalculadoraPontos calculadora = new CalculadoraPontos();
        //Exemplo de usuário com 80% de confiabilidade e 220 Soul Coins
        Usuario murilo = new Usuario("Murilo Souza","@murilo.souza",80, 220);
        //Exemplo de ação de reciclagem de 3kg, com registro no perfil
        Acao acao1 = new Acao("3kg de lixo reciclados");
        murilo.registrarAcao(acao1.registrarPontos(calculadora.pontosReciclagem(3)), acao1.detalhes());
        //Exemplo de ação de economia de 100L de água
        Acao acao2 = new Acao("100L de água economizados");
        murilo.registrarAcao(acao2.registrarPontos(calculadora.pontosAgua(100)), acao2.detalhes());
        //Exemplo de ação de ganho de 20kg de CO2.
        Acao acao3 = new Acao("20kg de Carbono a menos no planeta");
        murilo.registrarAcao(acao3.registrarPontos(calculadora.pontosCarbono(20)), acao3.detalhes());
        //Exemplo de ação de natureza de dificuldade 2
        Acao acao4 = new Acao("Compra de uma muda de árvore");
        murilo.registrarAcao(acao4.registrarPontos(calculadora.pontosNatureza(2)), acao4.detalhes());
        //Mostrando como ficou o perfil
        JOptionPane.showMessageDialog(null, murilo.detalhesPerfil(), "Exemplo de perfil", JOptionPane.INFORMATION_MESSAGE);

        //Agora testando os outros três tipos de classe e com entradas do usuário.
        do {
            int escolha = 7; //7 é diferente de zero, e vai ser mudado dentro do while
            Usuario usuario = new Usuario(); //Instanciar aqui para ficar dentro do 'do', só apaga quando digitado 0
            //Declaração de objetos de ação
            Acao acaoUsuario;
            AcaoConquista acaoConquistaUsuario;
            AcaoQuiz acaoQuizUsuario;
            AcaoPost acaoPostUsuario;

            try {
                String nome = JOptionPane.showInputDialog("Digite o nome do usuário: ");
                usuario.setNome(nome);
                String id = JOptionPane.showInputDialog("Digite o id do usuário: ");
                usuario.setId(id);
                float confiabilidade = Float.parseFloat(JOptionPane.showInputDialog("Digite a confiabilidade desse usuário (0-100): "));
                usuario.setConfiabilidade(confiabilidade);
                int soulCoins = Integer.parseInt(JOptionPane.showInputDialog("Quantos Soul Coins ele tem? "));
                usuario.setSoulCoins(soulCoins);
            } catch (Exception e) {
                JOptionPane.showMessageDialog(null, e.getMessage(), "Erro!", JOptionPane.ERROR_MESSAGE);
            }
            while (escolha != 0){
                try {
                    escolha = Integer.parseInt(JOptionPane.showInputDialog("Digite qual opção você gostaria de realizar:\n1. Registrar uma Ação simples\n2. Registrar uma conquista\n3. Registrar um quiz realizado\n4. Registrar um post encerrado\n5. Ver perfil atual\n6.Registrar penalidade\n0. Sair"));
                    switch (escolha){
                        case 1:
                            try {
                                escolha = Integer.parseInt(JOptionPane.showInputDialog("Digite o tipo de ação:\n1. Natureza\n2. Carbono\n3. Água\n4. Reciclagem\n0. cancelar ação"));
                                acaoUsuario = new Acao(JOptionPane.showInputDialog("Digite o nome da ação: "));
                                switch (escolha){
                                    case 1:
                                        int dificuldade = Integer.parseInt(JOptionPane.showInputDialog("Qual é a dificuldade da ação realizada? Digite (entre 1 a 5): "));
                                        usuario.registrarAcao(acaoUsuario.registrarPontos(calculadora.pontosNatureza(dificuldade)),
                                                acaoUsuario.detalhes());
                                        break;
                                    case 2:
                                        float kgCarbono = Integer.parseInt(JOptionPane.showInputDialog("Qual é a qtde. de carbono? Digite (um número): "));
                                        usuario.registrarAcao(acaoUsuario.registrarPontos(calculadora.pontosCarbono(kgCarbono)),
                                                acaoUsuario.detalhes());
                                        break;
                                    case 3:
                                        float litros = Integer.parseInt(JOptionPane.showInputDialog("Qual é a qtde. de litros economizados? Digite (um número): "));
                                        usuario.registrarAcao(acaoUsuario.registrarPontos(calculadora.pontosAgua(litros)),
                                                acaoUsuario.detalhes());
                                        break;
                                    case 4:
                                        float kgReciclados = Integer.parseInt(JOptionPane.showInputDialog("Qual é a qtde. de KG reciclados? Digite (um número): "));
                                        usuario.registrarAcao(acaoUsuario.registrarPontos(calculadora.pontosReciclagem(kgReciclados)),
                                                acaoUsuario.detalhes());
                                        break;
                                    case 0:
                                        escolha = 7; //Para não cancelar no while, já que estou usando a mesma variável
                                        break;
                                    default:
                                        throw new Exception("Opção inválida (0-4)");
                                }
                            } catch (Exception e) {
                                JOptionPane.showMessageDialog(null, e.getMessage(), "Erro!", JOptionPane.ERROR_MESSAGE);
                            }
                            break;
                        case 2:
                            try {
                                escolha = Integer.parseInt(JOptionPane.showInputDialog("Digite o tipo de conquista:\n1. Natureza\n2. Carbono\n3. Água\n4. Reciclagem\n0. cancelar ação"));
                                acaoConquistaUsuario = new AcaoConquista(JOptionPane.showInputDialog("Digite o nome da conquista: "), Integer.parseInt(JOptionPane.showInputDialog("Qual é a raridade dessa conquista? Digite (número de 1 a 4): ")));
                                switch (escolha){
                                    case 1:
                                        int dificuldade = Integer.parseInt(JOptionPane.showInputDialog("Qual é a dificuldade da conquista realizada? Digite (entre 1 a 5): "));
                                        usuario.registrarAcao(acaoConquistaUsuario.registrarPontos(calculadora.pontosNatureza(dificuldade)),
                                                acaoConquistaUsuario.detalhes());
                                        break;
                                    case 2:
                                        float kgCarbono = Float.parseFloat(JOptionPane.showInputDialog("Qual é a qtde. de carbono? Digite (um número): "));
                                        usuario.registrarAcao(acaoConquistaUsuario.registrarPontos(calculadora.pontosCarbono(kgCarbono)),
                                                acaoConquistaUsuario.detalhes());
                                        break;
                                    case 3:
                                        float litros = Float.parseFloat(JOptionPane.showInputDialog("Qual é a qtde. de litros economizados? Digite (um número): "));
                                        usuario.registrarAcao(acaoConquistaUsuario.registrarPontos(calculadora.pontosAgua(litros)),
                                                acaoConquistaUsuario.detalhes());
                                        break;
                                    case 4:
                                        float kgReciclados = Float.parseFloat(JOptionPane.showInputDialog("Qual é a qtde. de KG reciclados? Digite (um número): "));
                                        usuario.registrarAcao(acaoConquistaUsuario.registrarPontos(calculadora.pontosReciclagem(kgReciclados)),
                                                acaoConquistaUsuario.detalhes());
                                        break;
                                    case 0:
                                        escolha = 7; //Para não cancelar no while, já que estou usando a mesma variável
                                        break;
                                    default:
                                        throw new Exception("Opção inválida (0-4)");
                                }
                            } catch (Exception e) {
                                JOptionPane.showMessageDialog(null, e.getMessage(), "Erro!", JOptionPane.ERROR_MESSAGE);
                            }
                            break;
                        case 3:
                            try {
                                escolha = Integer.parseInt(JOptionPane.showInputDialog("Digite o tipo de quiz:\n1. Natureza\n2. Carbono\n3. Água\n4. Reciclagem\n5. sem ação (Pontos apenas por resposta)\n0. Cancelar ação"));
                                acaoQuizUsuario = new AcaoQuiz(JOptionPane.showInputDialog("Digite o nome do quiz: "),
                                        Integer.parseInt(JOptionPane.showInputDialog("Digite a qtde. de acertos nesse quiz: ")),
                                        Integer.parseInt(JOptionPane.showInputDialog("Digite o valor do quiz, a qtde. pontos por acerto: ")));
                                switch (escolha){
                                    case 1:
                                        int dificuldade = Integer.parseInt(JOptionPane.showInputDialog("Qual é a dificuldade da ação atrelada ao quiz realizado? Digite (entre 1 a 5): "));
                                        usuario.registrarAcao(acaoQuizUsuario.registrarPontos(calculadora.pontosNatureza(dificuldade)),
                                                acaoQuizUsuario.detalhes());
                                        break;
                                    case 2:
                                        float kgCarbono = Float.parseFloat(JOptionPane.showInputDialog("Qual é a qtde. de carbono atrelada? Digite (um número): "));
                                        usuario.registrarAcao(acaoQuizUsuario.registrarPontos(calculadora.pontosCarbono(kgCarbono)),
                                                acaoQuizUsuario.detalhes());
                                        break;
                                    case 3:
                                        float litros = Float.parseFloat(JOptionPane.showInputDialog("Qual é a qtde. de litros atrelaods? Digite (um número): "));
                                        usuario.registrarAcao(acaoQuizUsuario.registrarPontos(calculadora.pontosAgua(litros)),
                                                acaoQuizUsuario.detalhes());
                                        break;
                                    case 4:
                                        float kgReciclados = Float.parseFloat(JOptionPane.showInputDialog("Qual é a qtde. de KG reciclados atrelados? Digite (um número): "));
                                        usuario.registrarAcao(acaoQuizUsuario.registrarPontos(calculadora.pontosReciclagem(kgReciclados)),
                                                acaoQuizUsuario.detalhes());
                                        break;
                                    case 5:
                                        usuario.registrarAcao(acaoQuizUsuario.registrarPontos(), acaoQuizUsuario.detalhes());
                                        break;
                                    case 0:
                                        escolha = 7; //Para não cancelar no while, já que estou usando a mesma variável
                                        break;
                                    default:
                                        throw new Exception("Opção inválida (0-4)");
                                }
                            } catch (Exception e) {
                                JOptionPane.showMessageDialog(null, e.getMessage(), "Erro!", JOptionPane.ERROR_MESSAGE);
                            }
                            break;
                        case 4:
                            try {
                                escolha = Integer.parseInt(JOptionPane.showInputDialog("Digite o tipo de post:\n1. Natureza\n2. Carbono\n3. Água\n4. Reciclagem\n0. Cancelar ação"));
                                acaoPostUsuario = new AcaoPost(JOptionPane.showInputDialog("Digite o nome do quiz: "),
                                        Integer.parseInt(JOptionPane.showInputDialog("Digite a posição do post no ranking: ")),
                                        Integer.parseInt(JOptionPane.showInputDialog("Digite o saldo de votos do post: ")));
                                switch (escolha){
                                    case 1:
                                        int dificuldade = Integer.parseInt(JOptionPane.showInputDialog("Qual é a dificuldade da ação atrelada ao post? Digite (entre 1 a 5): "));
                                        usuario.registrarAcao(acaoPostUsuario.registrarPontos(calculadora.pontosNatureza(dificuldade)),
                                                acaoPostUsuario.detalhes());
                                        break;
                                    case 2:
                                        float kgCarbono = Float.parseFloat(JOptionPane.showInputDialog("Qual é a qtde. de carbono atrelada? Digite (um número): "));
                                        usuario.registrarAcao(acaoPostUsuario.registrarPontos(calculadora.pontosCarbono(kgCarbono)),
                                                acaoPostUsuario.detalhes());
                                        break;
                                    case 3:
                                        float litros = Float.parseFloat(JOptionPane.showInputDialog("Qual é a qtde. de litros atrelaods? Digite (um número): "));
                                        usuario.registrarAcao(acaoPostUsuario.registrarPontos(calculadora.pontosAgua(litros)),
                                                acaoPostUsuario.detalhes());
                                        break;
                                    case 4:
                                        float kgReciclados = Float.parseFloat(JOptionPane.showInputDialog("Qual é a qtde. de KG reciclados atrelados? Digite (um número): "));
                                        usuario.registrarAcao(acaoPostUsuario.registrarPontos(calculadora.pontosReciclagem(kgReciclados)),
                                                acaoPostUsuario.detalhes());
                                        break;
                                    case 0:
                                        escolha = 7; //Para não cancelar no while, já que estou usando a mesma variável
                                        break;
                                    default:
                                        throw new Exception("Opção inválida (0-4)");
                                }
                            } catch (Exception e) {
                                JOptionPane.showMessageDialog(null, e.getMessage(), "Erro!", JOptionPane.ERROR_MESSAGE);
                            }
                            break;
                        case 5:
                            JOptionPane.showMessageDialog(null, usuario.detalhesPerfil(),
                                    String.format("Perfil de %s", usuario.getNome()), JOptionPane.INFORMATION_MESSAGE);
                            break;
                        case 6:
                            int valorPenalidade = Integer.parseInt(JOptionPane.showInputDialog("Digite o valor da penalidade de confiabilidade (0-100, a confiabilidade não cairá abaixo de 0): "));
                            String descOcorrido = JOptionPane.showInputDialog("Descreva o ocorrido: ");
                            //Mensagem de confirmação mostrando o texto e confiabilidade que será tirada.
                            if (JOptionPane.showConfirmDialog(null,
                                    String.format("Tem certeza que quer retirar %d de confiabilidade do usuário %s com a descrição:\n%s",valorPenalidade,usuario.getNome(),descOcorrido), "Confirme",
                                    JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE) == 0) {
                                usuario.registrarPenalidade(valorPenalidade, descOcorrido);
                            }
                            break;
                        case 0:
                            JOptionPane.showMessageDialog(null, "Encerrando...Clique no botão para continuar!");
                            break;
                        default:
                            throw new Exception("Opção inválida");
                    }
                } catch (Exception e) {
                    JOptionPane.showMessageDialog(null, e.getMessage(), "Erro!", JOptionPane.ERROR_MESSAGE);
                }
            }
        } while (JOptionPane.showConfirmDialog(null, "Quer registrar outro usuário?", "Continuar?", JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE) == 0);

    }
}
