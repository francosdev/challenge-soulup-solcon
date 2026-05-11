# ============================================================
#  EcoScore - interface de terminal
# ============================================================

from config import META_PONTOS


def linha(char="─", n=52):
    print(char * n)


def cabecalho(titulo):
    linha("═")
    print(f"  {titulo}")
    linha("═")


def pausar():
    input("\n  [Enter para continuar]")


def barra_progresso(pontos):
    pontos = min(META_PONTOS, max(0, int(pontos)))
    blocos_preenchidos = pontos // 10
    blocos_vazios = 10 - blocos_preenchidos
    return "[" + ("█" * blocos_preenchidos) + ("░" * blocos_vazios) + f"] {pontos}/{META_PONTOS}"


def exibir_tela_inicial():
    cabecalho("ECOSCORE")
    print("  1. Entrar")
    print("  2. Cadastrar conta")
    print("  0. Encerrar programa")
    linha()


def exibir_menu_usuario(usuario):
    cabecalho("MENU ECOSCORE")
    print(f"  Usuario: {usuario['nome']}")
    print(f"  EcoPoints: {usuario['pontos']}")
    print(f"  Progresso: {barra_progresso(usuario['pontos'])}")
    print()
    linha("━")
    print("  ACOES")
    linha("━")
    print("  1. Registrar acao sustentavel")
    print("  2. Ver ranking")
    print("  3. Consultar perfil")
    print("  4. Visitar perfil de outro usuario")
    print()
    linha("━")
    print("  CONTA")
    linha("━")
    print("  5. Editar perfil")
    print("  6. Deletar minha conta")
    print("  7. Ver conquistas")
    print()
    linha("━")
    print("  SISTEMA")
    linha("━")
    print("  8. Status da competicao")
    print("  0. Sair")
    linha()


def exibir_menu_admin(admin_logado):
    cabecalho("PAINEL ADMIN ECOSCORE")
    print(f"  Administrador: {admin_logado['nome']}\n")
    print("  1. Ver ranking")
    print("  2. Status da competicao")
    print("  3. Reiniciar ranking mensal")
    print("  4. Listar usuarios cadastrados")
    print("  5. Consultar conta de usuario")
    print("  6. Deletar conta de usuario")
    print("  0. Sair")
    linha()


def mostrar_feedback_acao(usuario, titulo, pontos, pontos_somados):
    linha("━")
    print(f"  🌿 {titulo}")

    if pontos_somados:
        print(f"  +{pontos} EcoPoints adicionados.")
    else:
        print("  Acao salva no historico.")
        print("  Ranking encerrado: nenhum EcoPoint foi somado.")

    faltam = max(0, META_PONTOS - usuario["pontos"])
    print(f"  Total atual: {usuario['pontos']} EcoPoints")
    print(f"  Faltam {faltam} pontos para chegar a {META_PONTOS}.")
    print(f"  {barra_progresso(usuario['pontos'])}")
    linha("━")
