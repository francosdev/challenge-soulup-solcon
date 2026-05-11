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
    """Lista contas comuns com e-mail, pontuação e posição no ranking."""
    cabecalho("USUÁRIOS CADASTRADOS")

    participantes = dados.usuarios_comuns()
    if not participantes:
        print("  Nenhum usuário comum cadastrado.")
        return

    for indice, usuario in enumerate(participantes, start=1):
        posicao = dados.calcular_posicao_ranking(usuario)
        print(f"  {indice}. {usuario['nome']} - {usuario['email']} - {usuario['pontos']} EcoPoints - {posicao}º lugar")


def exibir_conta_admin(usuario):
    """Exibe dados completos de uma conta comum sem mostrar senha."""
    cabecalho("CONTA DE USUÁRIO")
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
    """Permite ao admin buscar e consultar uma conta comum."""
    usuario = escolher_usuario_por_nome("CONSULTAR CONTA DE USUÁRIO", True)

    if usuario is not None:
        exibir_conta_admin(usuario)


def deletar_conta_admin(admin_logado):
    """Exclui uma conta comum após confirmação textual e senha do admin."""
    usuario_alvo = escolher_usuario_por_nome("DELETAR CONTA DE USUÁRIO", True)

    if usuario_alvo is None:
        return
    if usuario_alvo["admin"] or usuario_alvo is admin_logado:
        print("  [!] Administradores não podem ser deletados por essa função.")
        return

    linha("━")
    print("  ⚠️ DELETAR CONTA DE USUÁRIO\n")
    print(f"  Nome: {usuario_alvo['nome']}")
    print(f"  E-mail: {usuario_alvo['email']}")
    print(f"  EcoPoints: {usuario_alvo['pontos']}")
    print("\n  Essa ação apagará permanentemente:")
    print("  - perfil")
    print("  - histórico")
    print("  - conquistas")
    print("  - participação no ranking")
    print()
    print("  1. Confirmar exclusão")
    print("  0. Cancelar")

    opcao = input("\n  Opção: ").strip()
    if opcao == "0":
        return
    if opcao != "1":
        print("  [!] Opção inválida.")
        return

    if not confirmar_texto_deletar():
        print("  Exclusão cancelada.")
        return

    senha = ler_senha_oculta("  Digite a senha do administrador para confirmar: ").strip()
    if not validar_senha_usuario(admin_logado, senha):
        print("  Senha incorreta.")
        return

    nome_deletado = usuario_alvo["nome"]
    email_deletado = usuario_alvo["email"]
    if remover_usuario_comum(usuario_alvo):
        dados.registrar_log("EXCLUSAO_ADMIN", f"admin={admin_logado['email']} usuario={email_deletado}")
        print(f"\n  🗑️ Conta de {nome_deletado} deletada com sucesso.")
    else:
        print("  [!] Nao foi possivel deletar a conta.")


def remover_usuario_comum(usuario_alvo):
    """Remove apenas contas comuns, preservando administradores."""
    for indice, usuario in enumerate(dados.usuarios):
        if usuario is usuario_alvo and not usuario["admin"]:
            dados.usuarios.pop(indice)
            dados.recalcular_ranking_encerrado()
            dados.salvar_dados()
            return True

    return False


def reiniciar_ranking(admin_logado):
    """Reinicia o ciclo mensal depois de validar a senha do admin."""
    if not admin_logado["admin"]:
        print("  [!] Apenas administradores podem reiniciar o ranking.")
        return

    cabecalho("REINICIAR RANKING MENSAL")
    print("  ⚠️ Área administrativa\n")
    senha = ler_senha_oculta("  Digite sua senha para continuar: ").strip()

    if not validar_senha_usuario(admin_logado, senha):
        print("  Senha incorreta.")
        return

    print("\n  Deseja realmente reiniciar o ranking mensal?\n")
    print("  1. Sim")
    print("  0. Cancelar")

    opcao = input("\n  Opção: ").strip()
    if opcao == "0":
        return
    if opcao != "1":
        print("  [!] Opção inválida.")
        return

    for usuario in dados.usuarios_comuns():
        usuario["pontos"] = 0
        usuario["historico"] = []
        usuario["conquistas"] = []

    dados.recalcular_ranking_encerrado()
    dados.salvar_dados()
    dados.registrar_log("RESET_RANKING", f"admin={admin_logado['email']}")
    print("\n  Novo ciclo mensal iniciado com sucesso!")


def menu_admin(admin_logado):
    """Controla a navegação do painel administrativo."""
    while True:
        exibir_menu_admin(admin_logado)
        opcao = input("  Opção: ").strip()

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
                print("\n  Você saiu do painel administrativo.")
                break
            case _:
                print("  [!] Opção inválida. Tente novamente.")

        pausar()
