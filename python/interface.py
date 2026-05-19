# ============================================================
#  EcoScore - interface de terminal
# ============================================================

from config import META_PONTOS


def linha(char="─", n=52):
    """Exibe uma linha visual para separar blocos no terminal."""
    print(char * n)


def cabecalho(titulo):
    """Renderiza um cabeçalho padronizado para as telas do EcoScore."""
    linha("═")
    print(f"  {titulo}")
    linha("═")


def pausar():
    """Pausa a navegação até o usuário confirmar a leitura."""
    input("\n  [Enter para continuar]")


def barra_progresso(pontos):
    """Monta uma barra textual de progresso até a meta mensal."""
    pontos = min(META_PONTOS, max(0, int(pontos)))
    blocos_preenchidos = pontos // 10
    blocos_vazios = 10 - blocos_preenchidos
    return "[" + ("█" * blocos_preenchidos) + ("░" * blocos_vazios) + f"] {pontos}/{META_PONTOS}"


def exibir_tela_inicial():
    """Mostra o menu inicial de autenticação."""
    cabecalho("ECOSCORE")
    print("  1. Entrar")
    print("  2. Cadastrar conta")
    print("  3. Recuperar senha")
    print("  0. Encerrar programa")
    linha()


def exibir_menu_usuario(usuario):
    """Mostra o menu principal para usuários comuns autenticados."""
    cabecalho("MENU ECOSCORE")
    print(f"  Usuário: {usuario['nome']}")
    print(f"  Soul Points: {usuario['pontos']}")
    print(f"  Progresso: {barra_progresso(usuario['pontos'])}")
    print()
    linha("━")
    print("  AÇÕES")
    linha("━")
    print("  1. Registrar ação sustentável")
    print("  2. Ver ranking")
    print("  3. Consultar perfil")
    print("  4. Visitar perfil de outro usuário")
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
    print("  8. Status da competição")
    print("  0. Sair")
    linha()


def exibir_menu_admin(admin_logado):
    """Mostra o painel exclusivo de administração."""
    cabecalho("PAINEL ADMIN ECOSCORE")
    print(f"  Administrador: {admin_logado['nome']}\n")
    print("  1. Ver ranking")
    print("  2. Status da competição")
    print("  3. Reiniciar ranking mensal")
    print("  4. Listar usuários cadastrados")
    print("  5. Consultar conta de usuário")
    print("  6. Deletar conta de usuário")
    print("  0. Sair")
    linha()


def mostrar_feedback_acao(usuario, titulo, pontos, pontos_somados):
    """Exibe o resultado de uma ação registrada e o avanço do usuário."""
    linha("━")
    print(f"  🌿 {titulo}")

    if pontos_somados:
        print(f"  +{pontos} Soul Points adicionados.")
    else:
        print("  Ação salva no histórico.")
        print("  Ranking encerrado: nenhum EcoPoint foi somado.")

    faltam = max(0, META_PONTOS - usuario["pontos"])
    print(f"  Total atual: {usuario['pontos']} Soul Points")
    print(f"  Faltam {faltam} pontos para chegar a {META_PONTOS}.")
    print(f"  {barra_progresso(usuario['pontos'])}")
    linha("━")
