#EcoScore - painel do administrador

import dados
from autenticacao import ler_senha, senha_confere
from gamificacao import ver_ranking, ver_status_competicao
from impacto import exibir_historico, exibir_impacto
from interface import cabecalho, erro, ler_opcao, linha, menu_admin
from interface import mostrar_matriz, pausar
from usuarios import confirmar_palavra_deletar, escolher_usuario_por_nome
from usuarios import exibir_conquistas_resumidas


def listar_usuarios():
    """Imprime todos os participantes com posição, e-mail e pontos."""
    cabecalho("USUÁRIOS CADASTRADOS")

    matriz = dados.montar_matriz_ranking()
    if len(matriz) == 0:
        print("  Nenhum participante cadastrado.")
        return

    mostrar_matriz(matriz, ["POS", "NOME", "E-MAIL", "PONTOS"], [6, 20, 30, 8])

    linha()
    print("  Total de participantes: " + str(len(matriz)))


def exibir_conta(usuario):
    """Imprime todos os dados de uma conta: pontos, conquistas, impacto e histórico."""
    cabecalho("CONTA DE USUÁRIO")
    print("  Nome: " + usuario["nome"])
    print("  E-mail: " + usuario["email"])
    print("  Soul Points: " + str(usuario["pontos"]))

    if usuario["admin"]:
        print("  Tipo de conta: administrador")
    else:
        print("  Posição no ranking: " + str(dados.posicao_no_ranking(usuario)) + "º lugar")

    linha()
    print("  CONQUISTAS")
    exibir_conquistas_resumidas(usuario)

    linha()
    print("  IMPACTO AMBIENTAL")
    exibir_impacto(usuario)

    linha()
    print("  HISTÓRICO")
    exibir_historico(usuario)


def consultar_conta():
    """Procura uma conta pelo nome e mostra os dados dela, inclusive de administradores."""
    usuario = escolher_usuario_por_nome("CONSULTAR CONTA", True, True)

    if usuario is not None:
        exibir_conta(usuario)


def deletar_conta_usuario(admin_logado):
    """Apaga a conta de um participante depois de três confirmações do administrador."""
    alvo = escolher_usuario_por_nome("DELETAR CONTA DE USUÁRIO", True)

    if alvo is None:
        return

    linha()
    print("  ATENÇÃO: você vai apagar a conta abaixo.\n")
    print("  Nome: " + alvo["nome"])
    print("  E-mail: " + alvo["email"])
    print("  Soul Points: " + str(alvo["pontos"]))
    print("\n  Isso apaga o perfil, o histórico, as conquistas e a")
    print("  participação dessa pessoa no ranking.\n")
    print("  1. Confirmar exclusão")
    print("  0. Cancelar")

    if ler_opcao() != "1":
        print("\n  Exclusão cancelada.")
        return

    if not confirmar_palavra_deletar():
        print("\n  Exclusão cancelada.")
        return

    senha = ler_senha("  Digite a senha do administrador para confirmar: ")
    if not senha_confere(admin_logado, senha):
        erro("Senha incorreta. A conta não foi deletada.")
        return

    nome = alvo["nome"]
    email = alvo["email"]

    try:
        #se não salvar, o remover_usuario já devolve o usuário para a lista
        if not dados.remover_usuario(alvo):
            raise OSError("o arquivo de dados não foi salvo")
    except OSError:
        erro("Não foi possível deletar a conta.")
    else:
        dados.registrar_log("EXCLUSAO_ADMIN", "admin=" + admin_logado["email"] + " usuario=" + email)
        print("\n  Conta de " + nome + " deletada com sucesso.")
    finally:
        linha()


def reiniciar_ranking(admin_logado):
    """Zera pontos, histórico e conquistas de todos os participantes para começar um novo mês."""
    cabecalho("REINICIAR RANKING MENSAL")
    print("  Isso zera os pontos, o histórico e as conquistas")
    print("  de todos os participantes, começando um novo ciclo.\n")

    senha = ler_senha("  Digite sua senha para continuar: ")
    if not senha_confere(admin_logado, senha):
        erro("Senha incorreta.")
        return

    print("\n  Deseja realmente reiniciar o ranking mensal?\n")
    print("  1. Sim, iniciar um novo ciclo")
    print("  0. Cancelar")

    if ler_opcao() != "1":
        print("\n  Reinício cancelado.")
        return

    participantes = dados.usuarios_comuns()

    #guarda os dados de cada um para desfazer se não salvar
    copia = []
    for usuario in participantes:
        copia.append([usuario["pontos"], usuario["historico"], usuario["conquistas"]])

    try:
        for usuario in participantes:
            usuario["pontos"] = 0
            usuario["historico"] = []
            usuario["conquistas"] = []

        if not dados.salvar_dados():
            raise OSError("o arquivo de dados não foi salvo")
    except OSError:
        for i in range(len(participantes)):
            participantes[i]["pontos"] = copia[i][0]
            participantes[i]["historico"] = copia[i][1]
            participantes[i]["conquistas"] = copia[i][2]
        erro("O ranking não foi reiniciado.")
    else:
        dados.registrar_log("RESET_RANKING", "admin=" + admin_logado["email"])
        print("\n  Novo ciclo mensal iniciado!")
        print("  " + str(len(participantes)) + " participantes voltaram a zero ponto.")
    finally:
        linha()


def menu_administrador(admin_logado):
    """Mostra o painel do administrador e executa a opção escolhida."""
    while True:
        menu_admin(admin_logado)
        opcao = ler_opcao("  Opção: ")

        if opcao == "1":
            ver_ranking()
        elif opcao == "2":
            ver_status_competicao()
        elif opcao == "3":
            listar_usuarios()
        elif opcao == "4":
            consultar_conta()
        elif opcao == "5":
            deletar_conta_usuario(admin_logado)
        elif opcao == "6":
            reiniciar_ranking(admin_logado)
        elif opcao == "0":
            print("\n  Você saiu do painel administrativo.")
            pausar()
            return
        else:
            erro("Opção inválida. Tente novamente.")

        pausar()
