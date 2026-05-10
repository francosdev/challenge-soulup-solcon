# ============================================================
#  EcoScore — Sistema de Gamificação Sustentável
#  FIAP | Turma 1TDS | Sprint 1 | 2026
# ============================================================

import msvcrt

# Lista global de usuários.
# Cada elemento é uma lista: [nome, email, senha, total_pontos, lista_de_acoes]
usuarios = []
ranking_encerrado = False  # True quando algum usuário atingir 100 pontos

# Dicionário de categorias: chave -> (nome_exibido, slug, peso_por_unidade)
CATEGORIAS = {
    "1": ("Plantio e Jardinagem",   "plantio",    5.0),
    "2": ("Reciclagem de Resíduos", "reciclagem", 3.0),
    "3": ("Economia de Água",       "agua",        0.1),
    "4": ("Redução de Energia",     "energia",     2.0),
}


# ── utilidades ───────────────────────────────────────────────

# Calcula os EcoPoints multiplicando quantidade pelo peso da categoria.
# Resultado limitado entre 0 e 100 (teto por registro).
def calcular_pontuacao(categoria_key, quantidade):
    peso = CATEGORIAS[categoria_key][2]          # índice 2 = peso
    pontos = min(100, int(quantidade * peso))
    return max(0, pontos)


# Valida a quantidade usando a função auxiliar antes de converter.
def ler_quantidade(prompt):
    while True:
        entrada = input(prompt).strip()
        if eh_numero_positivo(entrada):
            return float(entrada)
        print("  [!] Informe um número positivo.")


# Lê a senha caractere por caractere, mostrando "*" no terminal.
def ler_senha_oculta(mensagem):
    senha = ""
    print(mensagem, end="", flush=True)

    while True:
        tecla = msvcrt.getch()

        if tecla == b"\r":
            print()
            return senha

        if tecla == b"\x08":
            if len(senha) > 0:
                senha = senha[:-1]
                print("\b \b", end="", flush=True)
        elif tecla == b"\x00" or tecla == b"\xe0":
            msvcrt.getch()
        else:
            caractere = tecla.decode("latin-1")
            if caractere >= " ":
                senha = senha + caractere
                print("*", end="", flush=True)


# Soma EcoPoints ao usuário e encerra o ranking quando atingir 100 pontos.
def adicionar_pontos_usuario(usuario_logado, pontos):
    global ranking_encerrado

    if not ranking_encerrado:
        usuario_logado[3] = min(100, usuario_logado[3] + pontos)
        if usuario_logado[3] >= 100:
            ranking_encerrado = True
            print("\n  ⚡ PARABÉNS! Você atingiu 100 EcoPoints!")
            print(f"  🏆 {usuario_logado[0]} venceu o ranking mensal!")
            print("  🌱 O ranking foi encerrado para todos os usuários.")
            print("  💡 Sua conta de energia deste mês será subsidiada pela SoulUp.")


# Percorre a lista de usuários comparando e-mails sem diferenciar maiúsculas.
# Retorna o índice do usuário encontrado ou -1 se não existir.
def buscar_usuario(email):
    for i, u in enumerate(usuarios):
        if u[1].lower() == email.lower():        # índice 1 = email
            return i
    return -1


# Imprime uma linha decorativa com o caractere e comprimento escolhidos.
def linha(char="─", n=52):
    print(char * n)


# Verifica se uma string representa um número decimal positivo.
def eh_numero_positivo(texto):
    texto = texto.strip()

    # Rejeita strings vazias
    if len(texto) == 0:
        return False

    pontos_decimais = 0
    tem_digito = False

    # Percorre cada caractere verificando se é dígito ou ponto decimal
    for c in texto:
        if c == ".":
            pontos_decimais = pontos_decimais + 1
            if pontos_decimais > 1:              # mais de um ponto → inválido
                return False
        elif c >= "0" and c <= "9":
            tem_digito = True
        else:
            return False                         # caractere inesperado → inválido

    # Rejeita strings como "." sem nenhum dígito
    if not tem_digito:
        return False

    # Rejeita zero e negativos (o campo anterior garante que float() não falha)
    if float(texto) <= 0:
        return False

    return True


# ── funcionalidades ──────────────────────────────────────────

# Solicita nome, e-mail e senha, valida os campos e insere o usuário na lista global.
def cadastrar_usuario():
    linha()
    print("  CADASTRO DE CONTA")
    linha()

    # Loop até receber um nome não vazio
    while True:
        nome = input("  Nome: ").strip()
        if nome:
            break
        print("  [!] Nome não pode ser vazio.")

    # Loop até receber um e-mail válido e ainda não cadastrado
    while True:
        email = input("  E-mail: ").strip()
        if not email:
            print("  [!] E-mail não pode ser vazio.")
        elif buscar_usuario(email) != -1:
            print("  [!] E-mail já cadastrado.")
        else:
            break

    # Loop até receber uma senha não vazia
    while True:
        senha = ler_senha_oculta("  Senha: ").strip()
        if senha:
            break
        print("  [!] Senha não pode ser vazia.")

    # Adiciona o usuário com pontuação zero e histórico de ações vazio
    novo_usuario = [nome, email, senha, 0, []]
    usuarios.append(novo_usuario)
    print("\n  Conta criada com sucesso!")
    print(f"  Bem-vindo(a), {nome}!")
    input("\n  [Enter para continuar]")
    menu_usuario_logado(novo_usuario)


# Solicita e-mail e senha, valida os campos e abre o menu do usuário logado.
def login():
    linha()
    print("  ENTRAR")
    linha()

    email = input("  E-mail: ").strip()
    senha = ler_senha_oculta("  Senha: ").strip()

    if not email or not senha:
        print("  E-mail ou senha inválidos.")
        return

    i = buscar_usuario(email)
    if i == -1:
        print("  E-mail ou senha inválidos.")
        return

    usuario_logado = usuarios[i]
    if usuario_logado[2] != senha:                  # índice 2 = senha
        print("  E-mail ou senha inválidos.")
        return

    print(f"\n  Bem-vindo(a), {usuario_logado[0]}!")
    input("\n  [Enter para continuar]")
    menu_usuario_logado(usuario_logado)


# Submenu gamificado para ações de plantio e jardinagem.
def registrar_plantio_jardinagem(usuario_logado):
    ACOES_PLANTIO = {
        "1": ("Plantar muda ou árvore",              "mudas",             5),
        "2": ("Cultivar horta doméstica",            "vasos/canteiros",   4),
        "3": ("Compostagem Orgânica",                "kg",                3),
        "5": ("Criar jardim para polinizadores",     "flores/plantas",    6),
        "6": ("Reaproveitar resíduos orgânicos",     "kg",                2),
    }

    while True:
        linha()
        print("  PLANTIO E JARDINAGEM")
        linha()
        print("  1. Plantar muda ou árvore")
        print("  2. Cultivar horta doméstica")
        print("  3. Compostagem orgânica")
        print("  4. Cuidar de planta existente")
        print("  5. Criar jardim para polinizadores")
        print("  6. Reaproveitar resíduos orgânicos")
        print("  0. Voltar")

        opcao = input("\n  Escolha uma ação: ").strip()

        if opcao == "0":
            return

        if opcao in ACOES_PLANTIO:
            descricao = ACOES_PLANTIO[opcao][0]       # índice 0 = descrição
            unidade = ACOES_PLANTIO[opcao][1]         # índice 1 = unidade
            peso = ACOES_PLANTIO[opcao][2]            # índice 2 = pontos por unidade

            quantidade = ler_quantidade(f"  Informe a quantidade em {unidade}: ")
            pontos = min(100, int(quantidade * peso))

            acao = ("Plantio", descricao, quantidade, pontos)
            usuario_logado[4].append(acao)
            adicionar_pontos_usuario(usuario_logado, pontos)

            print(f"\n  🌿 {descricao} registrada com sucesso!")
            print(f"  +{pontos} EcoPoints adicionados.")
            print("  Você contribuiu para um ambiente mais sustentável!")
            return

        if opcao == "4":
            ACOES_CUIDADO = {
                "1": ("Regar corretamente",    2),
                "2": ("Adubar naturalmente",   2),
                "3": ("Podar sem desperdício", 2),
            }

            print("\n  Cuidados com planta existente:")
            for key in ACOES_CUIDADO:
                print(f"    {key}. {ACOES_CUIDADO[key][0]}")

            while True:
                entrada = input("\n  Selecione as ações realizadas (ex: 1 2 3): ").strip()
                partes = entrada.split()
                selecionadas = []
                entrada_valida = True

                for s in partes:
                    if s in ACOES_CUIDADO:
                        if s not in selecionadas:
                            selecionadas.append(s)
                    else:
                        entrada_valida = False

                if entrada_valida and len(selecionadas) > 0:
                    break
                print("  [!] Selecione ao menos uma ação válida.")

            pontos = len(selecionadas) * 2
            descricao = ""
            for pos, s in enumerate(selecionadas):
                if pos > 0:
                    descricao = descricao + ", "
                descricao = descricao + ACOES_CUIDADO[s][0]

            quantidade = len(selecionadas)
            acao = ("Plantio", descricao, quantidade, pontos)
            usuario_logado[4].append(acao)
            adicionar_pontos_usuario(usuario_logado, pontos)

            print(f"\n  🌱 +{pontos} EcoPoints")
            print("  Cuidado com planta existente registrado com sucesso!")
            print("  Você contribuiu para um ambiente mais sustentável!")
            return

        print("  [!] Opção inválida.")


# Escolhe a categoria e registra a ação para o usuário logado.
def registrar_acao_sustentavel(usuario_logado):
    global ranking_encerrado
    linha()
    print("  REGISTRAR AÇÃO SUSTENTÁVEL")
    linha()

    if ranking_encerrado:
        print("\n  ⚠️  O ranking mensal já foi encerrado.")
        print("  Você ainda pode registrar ações, mas não geram mais pontos.")

    # Exibe todas as categorias disponíveis usando o índice 0 (nome)
    print("\n  Categorias de ação:")
    for key in CATEGORIAS:
        print(f"    {key}. {CATEGORIAS[key][0]}")

    # Valida que a categoria escolhida existe no dicionário
    while True:
        opcao = input("\n  Escolha a categoria (1-4): ").strip()
        if opcao in CATEGORIAS:
            break
        print("  [!] Opção inválida.")

    if opcao == "1":
        registrar_plantio_jardinagem(usuario_logado)
        return

    # Submenu exclusivo para Redução de Energia (categoria "4")
    ACOES_ENERGIA = {
        "1": ("Desliguei luzes em ambientes vazios",     10),
        "2": ("Desliguei aparelhos em standby",          10),
        "3": ("Reduzi uso do ar condicionado",           10),
        "4": ("Usei luz natural no lugar da artificial", 10),
        "5": ("Lavei roupa com água fria",               10),
    }

    if opcao == "4":
        # Lista as ações de energia usando o índice 0 (descrição)
        print("\n  Ações de economia de energia:")
        for key in ACOES_ENERGIA:
            print(f"    {key}. {ACOES_ENERGIA[key][0]}")

        # Lê a entrada e valida todas as chaves informadas com um for + append
        while True:
            entrada = input("\n  Selecione as ações realizadas (ex: 1 3 5): ").strip()
            partes = entrada.split()
            selecionadas = []
            entrada_valida = True
            for s in partes:
                if s in ACOES_ENERGIA:
                    if s not in selecionadas:
                        selecionadas.append(s)
                else:
                    entrada_valida = False
            if entrada_valida and len(selecionadas) > 0:
                break
            print("  [!] Selecione ao menos uma ação válida.")

        # Soma os pontos das ações escolhidas com um for, limitando a 100
        total = 0
        for s in selecionadas:
            total = total + ACOES_ENERGIA[s][1]    # índice 1 = pontos
        pontos = min(100, total)

        # Constrói a descrição concatenando os nomes um a um
        descricao = ""
        for pos, s in enumerate(selecionadas):
            if pos > 0:
                descricao = descricao + ", "
            descricao = descricao + ACOES_ENERGIA[s][0]  # índice 0 = nome

        # Registra a ação e acumula os pontos no total do usuário
        acao = (CATEGORIAS["4"][0], descricao, len(selecionadas), pontos)
        usuario_logado[4].append(acao)                 # índice 4 = lista de ações
        adicionar_pontos_usuario(usuario_logado, pontos)
        print(f"\n  Ações registradas! +{pontos} EcoPoints")
        return

    # Prompts específicos para as categorias numéricas 2 e 3
    prompts_categoria = {
        "2": "  Quantos kg de material você reciclou? ",
        "3": "  Quantos litros de água você economizou? ",
    }

    quantidade = ler_quantidade(prompts_categoria[opcao])

    # Calcula os pontos e grava a ação no histórico do usuário
    pontos = calcular_pontuacao(opcao, quantidade)
    nome_cat = CATEGORIAS[opcao][0]                      # índice 0 = nome da categoria

    acao = (nome_cat, nome_cat, quantidade, pontos)
    usuario_logado[4].append(acao)                     # índice 4 = lista de ações
    adicionar_pontos_usuario(usuario_logado, pontos)

    print(f"\n  Ação '{nome_cat}' registrada! +{pontos} EcoPoints")


# Exibe todos os usuários ordenados do maior para o menor pontuador.
def ver_ranking():
    linha()
    print("  RANKING ECOSCORE")
    linha()

    if not usuarios:
        print("  Nenhum usuário cadastrado.")
        return

    # Função interna que retorna a pontuação — substitui o lambda proibido
    def pegar_pontos(u):
        return u[3]                                      # índice 3 = total de pontos

    ordenados = sorted(usuarios, key=pegar_pontos, reverse=True)

    # Primeiro lugar recebe destaque; demais ficam em formato compacto
    for pos, u in enumerate(ordenados, start=1):
        nome   = u[0]                                    # índice 0 = nome
        email  = u[1]                                    # índice 1 = email
        pontos = u[3]                                    # índice 3 = pontos
        if pos == 1:
            print(f"  🏆 {pos}º {nome} — {pontos} EcoPoints")
            print(f"     {email}")
            print(f"     🌱 Campeão da Sustentabilidade! Sua conta de energia este mês é por conta da SoulUp.")
            linha("·")
        else:
            print(f"  {pos}º {nome} ({email}) — {pontos} EcoPoints")


# Exibe nome, e-mail, total de pontos e histórico de ações do usuário logado.
def consultar_perfil(usuario_logado):
    linha()
    print("  CONSULTA DE PERFIL")
    linha()

    # Acessa cada campo pelo índice, sem desempacotamento com _
    nome   = usuario_logado[0]
    email  = usuario_logado[1]
    pontos = usuario_logado[3]
    acoes  = usuario_logado[4]

    print(f"\n  Nome : {nome}")
    print(f"  Email: {email}")
    print(f"  Total: {pontos} EcoPoints")
    linha("·")
    print("  Histórico de ações:")

    # Itera sobre as ações acessando cada campo da tupla pelo índice
    if not acoes:
        print("  Nenhuma ação registrada ainda.")
    else:
        for i, acao in enumerate(acoes, start=1):
            if len(acao) == 4:
                print(f"    {i}. {acao[0]} | {acao[1]} | qtd: {acao[2]} | {acao[3]} pts")
            else:
                print(f"    {i}. {acao[0]} | qtd: {acao[1]} | {acao[2]} pts")


# ── menus ────────────────────────────────────────────────────

# Renderiza a tela inicial de login e cadastro.
def exibir_tela_inicial():
    linha("═")
    print("  ECOSCORE")
    linha("═")
    print("  1. Entrar")
    print("  2. Cadastrar conta")
    print("  0. Encerrar programa")
    linha()


# Renderiza o menu da conta autenticada.
def exibir_menu_usuario(usuario_logado):
    linha("═")
    print("  MENU ECOSCORE")
    linha("═")
    print(f"  Usuário: {usuario_logado[0]}")
    print(f"  EcoPoints: {usuario_logado[3]}")
    print()
    print("  1. Registrar ação sustentável")
    print("  2. Ver ranking")
    print("  3. Consultar perfil")
    print("  0. Sair")
    linha()


# Loop do usuário autenticado.
def menu_usuario_logado(usuario_logado):
    while True:
        exibir_menu_usuario(usuario_logado)
        opcao = input("  Opção: ").strip()

        match opcao:
            case "1":
                registrar_acao_sustentavel(usuario_logado)
            case "2":
                ver_ranking()
            case "3":
                consultar_perfil(usuario_logado)
            case "0":
                print("\n  Você saiu da conta.")
                break
            case _:
                print("  [!] Opção inválida. Tente novamente.")

        input("\n  [Enter para continuar]")


# Ponto de entrada: tela inicial com login, cadastro e encerramento.
def main():
    while True:
        exibir_tela_inicial()
        opcao = input("  Opção: ").strip()

        match opcao:
            case "1":
                login()
            case "2":
                cadastrar_usuario()
            case "0":
                linha("═")
                print("  Até logo! Continue sendo sustentável. 🌱")
                linha("═")
                break
            case _:
                print("  [!] Opção inválida. Tente novamente.")

        if opcao != "1" and opcao != "2":
            input("\n  [Enter para continuar]")


if __name__ == "__main__":
    main()
