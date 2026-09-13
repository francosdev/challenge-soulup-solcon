#EcoScore - funções que mostram coisas na tela

from config import META_PONTOS, TAMANHO_BARRA


def linha(caractere="-", tamanho=52):
    """Imprime uma linha feita com o mesmo caractere repetido."""
    print(caractere * tamanho)


def cabecalho(titulo):
    """Imprime o título de uma tela entre duas linhas de "="."""
    print()
    linha("=")
    print(f"  {titulo}")
    linha("=")


def pausar():
    """Espera a pessoa apertar Enter para continuar."""
    input("\n  [Enter para continuar]")


def erro(mensagem):
    """Imprime uma mensagem de erro com [!] na frente."""
    print(f"  [!] {mensagem}")


def barra_progresso(pontos):
    """Monta a barra de progresso dos pontos até a meta."""
    if pontos < 0:
        pontos = 0
    if pontos > META_PONTOS:
        pontos = META_PONTOS

    cheios = int(pontos * TAMANHO_BARRA / META_PONTOS)
    vazios = TAMANHO_BARRA - cheios
    return "[" + ("#" * cheios) + ("-" * vazios) + f"] {pontos}/{META_PONTOS}"


def mostrar_lista_opcoes(lista, campo="descricao"):
    """Imprime uma lista numerada usando um campo de cada dicionário."""
    for i in range(len(lista)):
        print(f"  {i + 1}. {lista[i][campo]}")


def ler_opcao(mensagem="\n  Opção: "):
    """Lê a opção digitada num menu."""
    return input(mensagem).strip()


def tela_inicial():
    """Imprime o menu inicial do sistema."""
    cabecalho("ECOSCORE")
    print("  1. Entrar")
    print("  2. Cadastrar conta")
    print("  3. Recuperar senha")
    print("  0. Encerrar programa")
    linha()


def menu_usuario(usuario):
    """Imprime o menu do usuário comum, com nome, pontos e barra de progresso."""
    cabecalho("MENU ECOSCORE")
    print(f"  Usuário: {usuario['nome']}")
    print(f"  Soul Points: {usuario['pontos']}")
    print(f"  Progresso: {barra_progresso(usuario['pontos'])}")
    print()
    print("  1. Registrar ação sustentável")
    print("  2. Ver ranking")
    print("  3. Consultar meu perfil")
    print("  4. Visitar perfil de outro usuário")
    print("  5. Ver minhas conquistas")
    print("  6. Editar perfil")
    print("  7. Status da competição")
    print("  8. Deletar minha conta")
    print("  0. Sair da conta")
    linha()


def menu_admin(admin):
    """Imprime o menu do painel administrativo."""
    cabecalho("PAINEL ADMINISTRATIVO")
    print(f"  Administrador: {admin['nome']}\n")
    print("  1. Ver ranking")
    print("  2. Status da competição")
    print("  3. Listar usuários cadastrados")
    print("  4. Consultar conta de usuário")
    print("  5. Deletar conta de usuário")
    print("  6. Reiniciar ranking mensal")
    print("  0. Sair do painel")
    linha()


def mostrar_matriz(matriz, titulos, larguras):
    """Imprime uma matriz como tabela, com as colunas alinhadas."""
    cabecalho_tabela = "  "
    for i in range(len(titulos)):
        cabecalho_tabela = cabecalho_tabela + titulos[i].ljust(larguras[i])
    print(cabecalho_tabela)
    linha()

    for l in range(len(matriz)):
        texto = "  "
        for c in range(len(matriz[l])):
            texto = texto + str(matriz[l][c]).ljust(larguras[c])
        print(texto)


def feedback_acao(usuario, titulo, pontos, pontos_somados):
    """Mostra o resultado de uma ação registrada: pontos ganhos, total e barra."""
    print(f"  {titulo}")

    if pontos_somados:
        print(f"  +{pontos} Soul Points adicionados.")
    else:
        print("  Ação salva no histórico.")
        print("  O ranking já foi encerrado, então nenhum ponto foi somado.")

    faltam = META_PONTOS - usuario["pontos"]
    if faltam < 0:
        faltam = 0

    print(f"  Total atual: {usuario['pontos']} Soul Points")
    print(f"  Faltam {faltam} pontos para chegar a {META_PONTOS}.")
    print(f"  {barra_progresso(usuario['pontos'])}")
    linha()
