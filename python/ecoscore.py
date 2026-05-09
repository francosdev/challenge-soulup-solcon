# ============================================================
#  EcoScore — Sistema de Gamificação Sustentável
#  FIAP | Turma 1TDS | Sprint 1 | 2026
# ============================================================

# Lista global de usuários.
# Cada elemento é uma lista: [nome, email, total_pontos, lista_de_acoes]
usuarios = []
ranking_encerrado = False  # True quando algum usuário atingir 100 pontos

# Dicionário de categorias: chave -> (nome_exibido, slug, peso_por_unidade)
CATEGORIAS = {
    "1": ("Plantio / Jardinagem",   "plantio",    5.0),
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

# Solicita nome e e-mail, valida os campos e insere o usuário na lista global.
def cadastrar_usuario():
    linha()
    print("  CADASTRO DE USUÁRIO")
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

    # Adiciona o usuário com pontuação zero e histórico de ações vazio
    usuarios.append([nome, email, 0, []])
    print(f"\n  Usuário '{nome}' cadastrado com sucesso!")


# Localiza o usuário pelo e-mail, escolhe categoria e registra a ação.
def registrar_acao():
    global ranking_encerrado
    linha()
    print("  REGISTRAR AÇÃO SUSTENTÁVEL")
    linha()

    # Localiza o usuário pelo e-mail informado
    email = input("  E-mail do usuário: ").strip()
    i = buscar_usuario(email)
    if i == -1:
        print("  [!] Usuário não encontrado.")
        return

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

        # Lê a entrada e filtra somente as chaves válidas com um for + append
        while True:
            entrada = input("\n  Selecione as ações realizadas (ex: 1 3 5): ").strip()
            partes = entrada.split()
            selecionadas = []
            for s in partes:
                if s in ACOES_ENERGIA:
                    selecionadas.append(s)
            if len(selecionadas) > 0:
                break
            print("  [!] Selecione ao menos uma ação válida.")

        # Soma os pontos das ações escolhidas com um for, limitando a 100
        total = 0
        for s in selecionadas:
            total = total + ACOES_ENERGIA[s][1]    # índice 1 = pontos
        pontos = min(100, total)

        # Constrói a descrição concatenando os nomes um a um
        descricao = ""
        for i, s in enumerate(selecionadas):
            if i > 0:
                descricao = descricao + ", "
            descricao = descricao + ACOES_ENERGIA[s][0]  # índice 0 = nome

        # Registra a ação e acumula os pontos no total do usuário
        acao = (CATEGORIAS["4"][0], descricao, pontos)
        usuarios[i][3].append(acao)                    # índice 3 = lista de ações
        if not ranking_encerrado:
            usuarios[i][2] = min(100, usuarios[i][2] + pontos)
            if usuarios[i][2] >= 100:
                ranking_encerrado = True
                print("\n  ⚡ PARABÉNS! Você atingiu 100 EcoPoints!")
                print(f"  🏆 {usuarios[i][0]} venceu o ranking mensal!")
                print("  🌱 O ranking foi encerrado para todos os usuários.")
                print("  💡 Sua conta de energia deste mês será subsidiada pela SoulUp.")
        print(f"\n  Ações registradas! +{pontos} EcoPoints")
        return

    # Prompts específicos para as categorias numéricas 1, 2 e 3
    prompts_categoria = {
        "1": "  Quantas mudas ou árvores você plantou? ",
        "2": "  Quantos kg de material você reciclou? ",
        "3": "  Quantos litros de água você economizou? ",
    }

    # Valida a quantidade usando a função auxiliar antes de converter
    while True:
        entrada = input(prompts_categoria[opcao]).strip()
        if eh_numero_positivo(entrada):
            quantidade = float(entrada)
            break
        print("  [!] Informe um número positivo.")

    # Calcula os pontos e grava a ação no histórico do usuário
    pontos = calcular_pontuacao(opcao, quantidade)
    nome_cat = CATEGORIAS[opcao][0]                      # índice 0 = nome da categoria

    acao = (nome_cat, quantidade, pontos)
    usuarios[i][3].append(acao)                        # índice 3 = lista de ações
    if not ranking_encerrado:
        usuarios[i][2] = min(100, usuarios[i][2] + pontos)
        if usuarios[i][2] >= 100:
            ranking_encerrado = True
            print("\n  ⚡ PARABÉNS! Você atingiu 100 EcoPoints!")
            print(f"  🏆 {usuarios[i][0]} venceu o ranking mensal!")
            print("  🌱 O ranking foi encerrado para todos os usuários.")
            print("  💡 Sua conta de energia deste mês será subsidiada pela SoulUp.")

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
        return u[2]                                      # índice 2 = total de pontos

    ordenados = sorted(usuarios, key=pegar_pontos, reverse=True)

    # Primeiro lugar recebe destaque; demais ficam em formato compacto
    for pos, u in enumerate(ordenados, start=1):
        nome   = u[0]                                    # índice 0 = nome
        email  = u[1]                                    # índice 1 = email
        pontos = u[2]                                    # índice 2 = pontos
        if pos == 1:
            print(f"  🏆 {pos}º {nome} — {pontos} EcoPoints")
            print(f"     {email}")
            print(f"     🌱 Campeão da Sustentabilidade! Sua conta de energia este mês é por conta da SoulUp.")
            linha("·")
        else:
            print(f"  {pos}º {nome} ({email}) — {pontos} EcoPoints")


# Exibe nome, e-mail, total de pontos e histórico de ações de um usuário.
def consultar_perfil():
    linha()
    print("  CONSULTA DE PERFIL")
    linha()

    # Localiza o usuário pelo e-mail informado
    email = input("  E-mail do usuário: ").strip()
    i = buscar_usuario(email)
    if i == -1:
        print("  [!] Usuário não encontrado.")
        return

    # Acessa cada campo pelo índice, sem desempacotamento com _
    nome   = usuarios[i][0]
    email  = usuarios[i][1]
    pontos = usuarios[i][2]
    acoes  = usuarios[i][3]

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
            print(f"    {i}. {acao[0]} | qtd: {acao[1]} | {acao[2]} pts")


# ── menu principal ────────────────────────────────────────────

# Renderiza o cabeçalho e as opções do menu principal.
def exibir_menu():
    linha("═")
    print("  🌿  EcoScore — Gamificação Sustentável  🌿")
    linha("═")
    print("  1. Cadastrar usuário")
    print("  2. Registrar ação sustentável")
    print("  3. Ver ranking")
    print("  4. Consultar perfil")
    print("  0. Sair")
    linha()


# Ponto de entrada: loop principal com match/case despachando para cada função.
def main():
    while True:
        exibir_menu()
        opcao = input("  Opção: ").strip()

        match opcao:
            case "1":
                cadastrar_usuario()
            case "2":
                registrar_acao()
            case "3":
                ver_ranking()
            case "4":
                consultar_perfil()
            case "0":
                linha("═")
                print("  Até logo! Continue sendo sustentável. 🌱")
                linha("═")
                break
            case _:
                print("  [!] Opção inválida. Tente novamente.")

        input("\n  [Enter para continuar]")


if __name__ == "__main__":
    main()
