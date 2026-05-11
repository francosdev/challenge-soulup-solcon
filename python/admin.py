# ============================================================
#  EcoScore - painel administrativo
# ============================================================

import dados
from autenticacao import ler_senha_oculta, validar_senha_usuario
from gamificacao import ver_ranking, ver_status_competicao
from impacto import exibir_historico, exibir_impacto
from interface import cabecalho, exibir_menu_admin, linha, pausar
from usuarios import escolher_usuario_por_nome, exibir_conquistas_resumidas, confirmar_texto_deletar


def listar_usuarios_cadastrados_admin():
    cabecalho("USUARIOS CADASTRADOS")

    participantes = dados.usuarios_comuns()
    if not participantes:
        print("  Nenhum usuario comum cadastrado.")
        return

    for indice, usuario in enumerate(participantes, start=1):
        posicao = dados.calcular_posicao_ranking(usuario)
        print(f"  {indice}. {usuario['nome']} - {usuario['email']} - {usuario['pontos']} EcoPoints - {posicao}º lugar")


def exibir_conta_admin(usuario):
    cabecalho("CONTA DE USUARIO")
    print(f"  Nome: {usuario['nome']}")
    print(f"  E-mail: {usuario['email']}")
    print(f"  EcoPoints: {usuario['pontos']}")
    print(f"  Ranking: {dados.calcular_posicao_ranking(usuario)}º lugar")

    linha("━")
    print("  🏆 CONQUISTAS")
    exibir_conquistas_resumidas(usuario)

    linha("━")
    exibir_historico(usuario, None, False)

    print()
    exibir_impacto(usuario)


def consultar_conta_admin():
    usuario = escolher_usuario_por_nome("CONSULTAR CONTA DE USUARIO", True)

    if usuario is not None:
        exibir_conta_admin(usuario)


def deletar_conta_admin(admin_logado):
    usuario_alvo = escolher_usuario_por_nome("DELETAR CONTA DE USUARIO", True)

    if usuario_alvo is None:
        return
    if usuario_alvo["admin"] or usuario_alvo is admin_logado:
        print("  [!] Administradores nao podem ser deletados por essa funcao.")
        return

    linha("━")
    print("  ⚠️ DELETAR CONTA DE USUARIO\n")
    print(f"  Nome: {usuario_alvo['nome']}")
    print(f"  E-mail: {usuario_alvo['email']}")
    print(f"  EcoPoints: {usuario_alvo['pontos']}")
    print("\n  Essa acao apagara permanentemente:")
    print("  - perfil")
    print("  - historico")
    print("  - conquistas")
    print("  - participacao no ranking")
    print()
    print("  1. Confirmar exclusao")
    print("  0. Cancelar")

    opcao = input("\n  Opcao: ").strip()
    if opcao == "0":
        return
    if opcao != "1":
        print("  [!] Opcao invalida.")
        return

    if not confirmar_texto_deletar():
        print("  Exclusao cancelada.")
        return

    senha = ler_senha_oculta("  Digite a senha do administrador para confirmar: ").strip()
    if not validar_senha_usuario(admin_logado, senha):
        print("  Senha incorreta.")
        return

    nome_deletado = usuario_alvo["nome"]
    if remover_usuario_comum(usuario_alvo):
        print(f"\n  🗑️ Conta de {nome_deletado} deletada com sucesso.")
    else:
        print("  [!] Nao foi possivel deletar a conta.")


def remover_usuario_comum(usuario_alvo):
    for indice, usuario in enumerate(dados.usuarios):
        if usuario is usuario_alvo and not usuario["admin"]:
            dados.usuarios.pop(indice)
            dados.recalcular_ranking_encerrado()
            dados.salvar_dados()
            return True

    return False


def reiniciar_ranking(admin_logado):
    if not admin_logado["admin"]:
        print("  [!] Apenas administradores podem reiniciar o ranking.")
        return

    cabecalho("REINICIAR RANKING MENSAL")
    print("  ⚠️ Area administrativa\n")
    senha = ler_senha_oculta("  Digite sua senha para continuar: ").strip()

    if not validar_senha_usuario(admin_logado, senha):
        print("  Senha incorreta.")
        return

    print("\n  Deseja realmente reiniciar o ranking mensal?\n")
    print("  1. Sim")
    print("  0. Cancelar")

    opcao = input("\n  Opcao: ").strip()
    if opcao == "0":
        return
    if opcao != "1":
        print("  [!] Opcao invalida.")
        return

    for usuario in dados.usuarios_comuns():
        usuario["pontos"] = 0
        usuario["historico"] = []
        usuario["conquistas"] = []

    dados.recalcular_ranking_encerrado()
    dados.salvar_dados()
    print("\n  Novo ciclo mensal iniciado com sucesso!")


def menu_admin(admin_logado):
    while True:
        exibir_menu_admin(admin_logado)
        opcao = input("  Opcao: ").strip()

        match opcao:
            case "1":
                ver_ranking()
            case "2":
                ver_status_competicao()
            case "3":
                reiniciar_ranking(admin_logado)
            case "4":
                listar_usuarios_cadastrados_admin()
            case "5":
                consultar_conta_admin()
            case "6":
                deletar_conta_admin(admin_logado)
            case "0":
                print("\n  Voce saiu do painel administrativo.")
                break
            case _:
                print("  [!] Opcao invalida. Tente novamente.")

        pausar()
