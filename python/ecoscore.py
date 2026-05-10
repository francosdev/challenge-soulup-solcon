# ============================================================
#  EcoScore — Sistema de Gamificação Sustentável
#  FIAP | Turma 1TDS | Sprint 1 | 2026
# ============================================================

import json
import msvcrt
import os

# Lista global de usuários.
# Cada elemento é uma lista: [nome, email, senha, pontos, historico, conquistas]
usuarios = []
ranking_encerrado = False  # True quando algum usuário atingir 100 pontos
ARQUIVO_DADOS = "ecoscore_dados.json"

# Dicionário de categorias: chave -> (nome_exibido, slug, peso_por_unidade)
CATEGORIAS = {
    "1": ("Plantio e Jardinagem",   "plantio",    5.0),
    "2": ("Reciclagem de Resíduos", "reciclagem", 3.0),
    "3": ("Economia de Água",       "agua",        0.1),
    "4": ("Redução de Energia",     "energia",     2.0),
}

CONQUISTAS = [
    ("Primeiro Broto",      "🌱", "Você registrou sua primeira ação sustentável!"),
    ("Reciclador Ativo",   "♻️", "Você reciclou 10kg de materiais no ciclo mensal!"),
    ("Água Consciente",    "💧", "Você economizou 100 litros de água!"),
    ("Energia Inteligente", "⚡", "Você registrou 5 ações de economia de energia!"),
    ("Mão Verde",          "🌿", "Você registrou 5 ações de plantio e jardinagem!"),
    ("Campeão EcoScore",   "🏆", "Você atingiu 100 EcoPoints!"),
]


# ── utilidades ───────────────────────────────────────────────

# Imprime uma linha decorativa com o caractere e comprimento escolhidos.
def linha(char="─", n=52):
    print(char * n)


# Renderiza um título com linhas decorativas.
def cabecalho(titulo):
    linha("═")
    print(f"  {titulo}")
    linha("═")


# Salva os dados do EcoScore em arquivo JSON.
def salvar_dados():
    dados = {
        "ranking_encerrado": ranking_encerrado,
        "usuarios": usuarios,
    }

    with open(ARQUIVO_DADOS, "w", encoding="utf-8") as arquivo:
        json.dump(dados, arquivo, ensure_ascii=False, indent=4)


# Adapta históricos antigos para o formato: categoria, descrição, quantidade, pontos.
def normalizar_historico(historico):
    historico_normalizado = []

    for acao in historico:
        if len(acao) == 4:
            historico_normalizado.append(acao)
        elif len(acao) == 3:
            if type(acao[1]) == str:
                historico_normalizado.append([acao[0], acao[1], 1, acao[2]])
            else:
                historico_normalizado.append([acao[0], acao[0], acao[1], acao[2]])

    return historico_normalizado


# Garante que usuários antigos sejam adaptados para a estrutura atual.
def normalizar_usuarios():
    for i, usuario in enumerate(usuarios):
        if len(usuario) == 6:
            if type(usuario[4]) != list:
                usuario[4] = []
            usuario[4] = normalizar_historico(usuario[4])
            if type(usuario[5]) != list:
                usuario[5] = []
        elif len(usuario) == 5:
            usuarios[i] = [usuario[0], usuario[1], usuario[2], usuario[3], normalizar_historico(usuario[4]), []]
        elif len(usuario) == 4:
            usuarios[i] = [usuario[0], usuario[1], "", usuario[2], normalizar_historico(usuario[3]), []]


# Carrega os dados salvos, se o arquivo existir.
def carregar_dados():
    global usuarios, ranking_encerrado

    if os.path.exists(ARQUIVO_DADOS):
        with open(ARQUIVO_DADOS, "r", encoding="utf-8") as arquivo:
            dados = json.load(arquivo)

        if type(dados) == dict:
            if "usuarios" in dados:
                usuarios = dados["usuarios"]
            else:
                usuarios = []

            if "ranking_encerrado" in dados:
                ranking_encerrado = dados["ranking_encerrado"]
            else:
                ranking_encerrado = False
        else:
            usuarios = dados
            ranking_encerrado = False

        normalizar_usuarios()


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
        if entrada == "0":
            return None
        if eh_numero_positivo(entrada):
            return float(entrada)
        print("  [!] Informe um número positivo ou 0 para voltar.")


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

    if ranking_encerrado:
        return False

    usuario_logado[3] = min(100, usuario_logado[3] + pontos)
    if usuario_logado[3] >= 100:
        ranking_encerrado = True
        print("\n  ⚡ PARABÉNS! Você atingiu 100 EcoPoints!")
        print(f"  🏆 {usuario_logado[0]} venceu o ranking mensal!")
        print("  🌱 O ranking foi encerrado para todos os usuários.")
        print("  💡 Sua conta de energia deste mês será subsidiada pela SoulUp.")

    return True


# Percorre a lista de usuários comparando e-mails sem diferenciar maiúsculas.
# Retorna o índice do usuário encontrado ou -1 se não existir.
def buscar_usuario(email):
    for i, u in enumerate(usuarios):
        if u[1].lower() == email.lower():        # índice 1 = email
            return i
    return -1


# Verifica se uma string representa um número decimal positivo.
def eh_numero_positivo(texto):
    texto = texto.strip()

    if len(texto) == 0:
        return False

    pontos_decimais = 0
    tem_digito = False

    for c in texto:
        if c == ".":
            pontos_decimais = pontos_decimais + 1
            if pontos_decimais > 1:
                return False
        elif c >= "0" and c <= "9":
            tem_digito = True
        else:
            return False

    if not tem_digito:
        return False

    if float(texto) <= 0:
        return False

    return True


# Formata números para evitar casas decimais desnecessárias.
def formatar_quantidade(valor):
    if int(valor) == valor:
        return str(int(valor))
    return str(valor)


# Retorna o nome da conquista, ícone e mensagem pelo nome salvo.
def buscar_conquista(nome_conquista):
    for conquista in CONQUISTAS:
        if conquista[0] == nome_conquista:
            return conquista
    return None


# Exibe o feedback de uma conquista nova.
def mostrar_conquista(conquista):
    linha("━")
    print("  🏆 NOVA CONQUISTA!")
    print(f"  {conquista[1]} {conquista[0]}")
    print(f"  {conquista[2]}")
    linha("━")


# Desbloqueia uma conquista sem repetir.
def desbloquear_conquista(usuario_logado, nome_conquista):
    conquista = buscar_conquista(nome_conquista)
    if conquista is not None and nome_conquista not in usuario_logado[5]:
        usuario_logado[5].append(nome_conquista)
        mostrar_conquista(conquista)


# Calcula o impacto acumulado a partir do histórico do usuário.
def calcular_impacto(usuario_logado):
    mudas = 0
    hortas = 0
    plantio = 0
    compostagem = 0
    polinizadores = 0
    reaproveitados = 0
    reciclado = 0
    agua = 0
    energia = 0

    for acao in usuario_logado[4]:
        categoria = acao[0]
        descricao = acao[1]
        quantidade = acao[2]

        if categoria == "Plantio":
            plantio = plantio + 1
            if descricao == "Plantar muda ou árvore":
                mudas = mudas + quantidade
            elif descricao == "Cultivar horta doméstica":
                hortas = hortas + quantidade
            elif descricao == "Compostagem Orgânica":
                compostagem = compostagem + quantidade
            elif descricao == "Criar jardim para polinizadores":
                polinizadores = polinizadores + quantidade
            elif descricao == "Reaproveitar resíduos orgânicos":
                reaproveitados = reaproveitados + quantidade
        elif categoria == CATEGORIAS["2"][0]:
            reciclado = reciclado + quantidade
        elif categoria == CATEGORIAS["3"][0]:
            agua = agua + quantidade
        elif categoria == CATEGORIAS["4"][0]:
            energia = energia + quantidade

    return (mudas, hortas, plantio, compostagem, polinizadores, reaproveitados, reciclado, agua, energia)


# Verifica se alguma conquista foi desbloqueada após uma ação.
def verificar_conquistas(usuario_logado):
    if len(usuario_logado[4]) >= 1:
        desbloquear_conquista(usuario_logado, "Primeiro Broto")

    impacto = calcular_impacto(usuario_logado)

    if impacto[6] >= 10:
        desbloquear_conquista(usuario_logado, "Reciclador Ativo")
    if impacto[7] >= 100:
        desbloquear_conquista(usuario_logado, "Água Consciente")
    if impacto[8] >= 5:
        desbloquear_conquista(usuario_logado, "Energia Inteligente")
    if impacto[2] >= 5:
        desbloquear_conquista(usuario_logado, "Mão Verde")
    if usuario_logado[3] >= 100:
        desbloquear_conquista(usuario_logado, "Campeão EcoScore")


# Registra uma ação no histórico, soma pontos, verifica conquistas e salva.
def registrar_acao_usuario(usuario_logado, acao, pontos):
    usuario_logado[4].append(acao)
    pontos_somados = adicionar_pontos_usuario(usuario_logado, pontos)
    verificar_conquistas(usuario_logado)
    salvar_dados()
    return pontos_somados


# Exibe feedback visual padronizado para ações registradas.
def mostrar_feedback_acao(titulo, pontos, pontos_somados):
    linha("━")
    print(f"  🌿 {titulo}")
    if pontos_somados:
        print(f"  +{pontos} EcoPoints adicionados.")
    else:
        print("  Ação salva no histórico.")
        print("  Ranking encerrado: nenhum EcoPoint foi somado.")
    linha("━")


# ── funcionalidades ──────────────────────────────────────────

# Lê um nome válido para cadastro ou retorna None para cancelar.
def ler_nome_cadastro():
    while True:
        nome = input("  Nome: ").strip()
        if nome == "0":
            return None
        if nome:
            return nome
        print("  [!] Nome não pode ser vazio.")


# Lê um e-mail válido para cadastro ou retorna None para cancelar.
def ler_email_cadastro():
    while True:
        email = input("  E-mail: ").strip()
        if email == "0":
            return None
        if email:
            return email
        print("  [!] E-mail não pode ser vazio.")


# Lê uma senha válida para cadastro ou retorna None para cancelar.
def ler_senha_cadastro():
    while True:
        senha = ler_senha_oculta("  Senha: ").strip()
        if senha == "0":
            return None
        if senha:
            return senha
        print("  [!] Senha não pode ser vazia.")


# Solicita nome, e-mail e senha, confirma os dados e insere o usuário na lista global.
def cadastrar_usuario():
    cabecalho("CADASTRAR CONTA")
    print("  Digite 0 a qualquer momento para voltar ao menu inicial.\n")

    nome = ler_nome_cadastro()
    if nome is None:
        return

    email = ler_email_cadastro()
    if email is None:
        return

    senha = ler_senha_cadastro()
    if senha is None:
        return

    while True:
        cabecalho("CONFIRMAR CADASTRO")
        print(f"  Nome: {nome}")
        print(f"  E-mail: {email}")
        print("  Senha: ********")
        print("\n  Os dados estão corretos?\n")
        print("  1. Confirmar cadastro")
        print("  2. Corrigir nome")
        print("  3. Corrigir e-mail")
        print("  4. Corrigir senha")
        print("  0. Cancelar e voltar ao menu inicial")

        opcao = input("\n  Opção: ").strip()

        match opcao:
            case "1":
                if buscar_usuario(email) != -1:
                    print("  [!] E-mail já cadastrado. Corrija o e-mail para continuar.")
                else:
                    novo_usuario = [nome, email, senha, 0, [], []]
                    usuarios.append(novo_usuario)
                    salvar_dados()
                    print("\n  Conta criada com sucesso!")
                    print(f"  Bem-vindo(a), {nome}!")
                    input("\n  [Enter para continuar]")
                    menu_usuario_logado(novo_usuario)
                    return
            case "2":
                novo_nome = ler_nome_cadastro()
                if novo_nome is None:
                    return
                nome = novo_nome
            case "3":
                novo_email = ler_email_cadastro()
                if novo_email is None:
                    return
                email = novo_email
            case "4":
                nova_senha = ler_senha_cadastro()
                if nova_senha is None:
                    return
                senha = nova_senha
            case "0":
                return
            case _:
                print("  [!] Opção inválida. Tente novamente.")


# Solicita e-mail e senha, valida os campos e abre o menu do usuário logado.
def login():
    cabecalho("ENTRAR")
    print("  Digite 0 para voltar ao menu inicial.\n")

    email = input("  E-mail: ").strip()
    if email == "0":
        return
    if not email:
        print("  [!] E-mail não pode ser vazio.")
        return

    senha = ler_senha_oculta("  Senha: ").strip()
    if senha == "0":
        return
    if not senha:
        print("  [!] Senha não pode ser vazia.")
        return

    i = buscar_usuario(email)
    if i == -1:
        print("  E-mail ou senha inválidos.")
        return

    usuario_logado = usuarios[i]
    if usuario_logado[2] != senha:
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
        cabecalho("PLANTIO E JARDINAGEM")
        print("  1. Plantar muda ou árvore")
        print("  2. Cultivar horta doméstica")
        print("  3. Compostagem orgânica")
        print("  4. Cuidar de planta existente")
        print("  5. Criar jardim para polinizadores")
        print("  6. Reaproveitar resíduos orgânicos")
        print("  0. Voltar")

        opcao = input("\n  Escolha uma ação: ").strip()

        if opcao == "0":
            return False

        if opcao in ACOES_PLANTIO:
            descricao = ACOES_PLANTIO[opcao][0]
            unidade = ACOES_PLANTIO[opcao][1]
            peso = ACOES_PLANTIO[opcao][2]

            quantidade = ler_quantidade(f"  Informe a quantidade em {unidade} (0 para voltar): ")
            if quantidade is None:
                continue

            pontos = min(100, int(quantidade * peso))
            acao = ("Plantio", descricao, quantidade, pontos)
            pontos_somados = registrar_acao_usuario(usuario_logado, acao, pontos)
            mostrar_feedback_acao(f"{descricao} registrada com sucesso!", pontos, pontos_somados)
            return True

        if opcao == "4":
            resultado = registrar_cuidado_planta(usuario_logado)
            if resultado:
                return True
        else:
            print("  [!] Opção inválida.")


# Submenu para cuidar de planta existente.
def registrar_cuidado_planta(usuario_logado):
    ACOES_CUIDADO = {
        "1": ("Regar corretamente",    2),
        "2": ("Adubar naturalmente",   2),
        "3": ("Podar sem desperdício", 2),
    }

    while True:
        cabecalho("CUIDAR DE PLANTA EXISTENTE")
        print("  1. Regar corretamente")
        print("  2. Adubar naturalmente")
        print("  3. Podar sem desperdício")
        print("  0. Voltar")

        entrada = input("\n  Selecione as ações realizadas (ex: 1 2 3): ").strip()
        if entrada == "0":
            return False

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
            pontos = len(selecionadas) * 2
            descricao = ""

            for pos, s in enumerate(selecionadas):
                if pos > 0:
                    descricao = descricao + ", "
                descricao = descricao + ACOES_CUIDADO[s][0]

            acao = ("Plantio", descricao, len(selecionadas), pontos)
            pontos_somados = registrar_acao_usuario(usuario_logado, acao, pontos)
            mostrar_feedback_acao("Cuidado com planta registrado com sucesso!", pontos, pontos_somados)
            return True

        print("  [!] Selecione ao menos uma ação válida ou 0 para voltar.")


# Escolhe a categoria e registra a ação para o usuário logado.
def registrar_acao_sustentavel(usuario_logado):
    global ranking_encerrado

    while True:
        cabecalho("REGISTRAR AÇÃO")

        if ranking_encerrado:
            print("  ⚠️  O ranking mensal já foi encerrado.")
            print("  Você ainda pode registrar ações, mas não geram mais pontos.\n")

        print("  1. Plantio e Jardinagem")
        print("  2. Reciclagem de Resíduos")
        print("  3. Economia de Água")
        print("  4. Redução de Energia")
        print("  0. Voltar")

        opcao = input("\n  Escolha a categoria: ").strip()

        if opcao == "0":
            return

        if opcao not in CATEGORIAS:
            print("  [!] Opção inválida.")
        elif opcao == "1":
            if registrar_plantio_jardinagem(usuario_logado):
                return
        elif opcao == "4":
            if registrar_energia(usuario_logado):
                return
        else:
            if registrar_categoria_quantidade(usuario_logado, opcao):
                return


# Registra categorias simples que usam quantidade.
def registrar_categoria_quantidade(usuario_logado, opcao):
    prompts_categoria = {
        "2": "  Quantos kg de material você reciclou? (0 para voltar): ",
        "3": "  Quantos litros de água você economizou? (0 para voltar): ",
    }

    quantidade = ler_quantidade(prompts_categoria[opcao])
    if quantidade is None:
        return False

    pontos = calcular_pontuacao(opcao, quantidade)
    nome_cat = CATEGORIAS[opcao][0]
    acao = (nome_cat, nome_cat, quantidade, pontos)
    pontos_somados = registrar_acao_usuario(usuario_logado, acao, pontos)
    mostrar_feedback_acao(f"{nome_cat} registrada com sucesso!", pontos, pontos_somados)
    return True


# Registra ações de economia de energia.
def registrar_energia(usuario_logado):
    ACOES_ENERGIA = {
        "1": ("Desliguei luzes em ambientes vazios",     2),
        "2": ("Desliguei aparelhos em standby",          2),
        "3": ("Reduzi uso do ar condicionado",           2),
        "4": ("Usei luz natural no lugar da artificial", 2),
        "5": ("Lavei roupa com água fria",               2),
    }

    while True:
        cabecalho("AÇÕES DE ECONOMIA DE ENERGIA")
        for key in ACOES_ENERGIA:
            print(f"  {key}. {ACOES_ENERGIA[key][0]}")
        print("  0. Voltar")

        entrada = input("\n  Selecione as ações realizadas (ex: 1 3 5): ").strip()
        if entrada == "0":
            return False

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
            total = 0
            descricao = ""

            for pos, s in enumerate(selecionadas):
                total = total + ACOES_ENERGIA[s][1]
                if pos > 0:
                    descricao = descricao + ", "
                descricao = descricao + ACOES_ENERGIA[s][0]

            pontos = min(100, total)
            acao = (CATEGORIAS["4"][0], descricao, len(selecionadas), pontos)
            pontos_somados = registrar_acao_usuario(usuario_logado, acao, pontos)
            mostrar_feedback_acao("Ações de energia registradas com sucesso!", pontos, pontos_somados)
            return True

        print("  [!] Selecione ao menos uma ação válida ou 0 para voltar.")


# Exibe todos os usuários ordenados do maior para o menor pontuador.
def ver_ranking():
    cabecalho("RANKING ECOSCORE")

    if not usuarios:
        print("  Nenhum usuário cadastrado.")
        return

    def pegar_pontos(u):
        return u[3]

    ordenados = sorted(usuarios, key=pegar_pontos, reverse=True)

    for pos, u in enumerate(ordenados, start=1):
        nome = u[0]
        email = u[1]
        pontos = u[3]
        if pos == 1:
            print(f"  🏆 {pos}º {nome} — {pontos} EcoPoints")
            print(f"     {email}")
            print("     🌱 Líder do ciclo sustentável.")
            linha("·")
        else:
            print(f"  {pos}º {nome} ({email}) — {pontos} EcoPoints")


# Retorna o status visual da conquista.
def status_conquista(usuario_logado, nome_conquista, progresso_atual):
    if nome_conquista in usuario_logado[5]:
        return "DESBLOQUEADA ✅"
    if progresso_atual > 0:
        return "EM PROGRESSO"
    return "BLOQUEADA 🔒"


# Exibe uma conquista com objetivo, status e progresso.
def exibir_card_conquista(icone, nome, status, objetivo, progresso):
    print(f"  {icone} {nome}")
    print(f"  Status: {status}")
    print(f"  Objetivo: {objetivo}")
    if progresso:
        print(f"  Progresso atual: {progresso}")
    linha("━")


# Exibe as conquistas do usuário logado com progresso gamificado.
def ver_conquistas(usuario_logado):
    cabecalho("CONQUISTAS ECOSCORE")

    impacto = calcular_impacto(usuario_logado)
    total_acoes = len(usuario_logado[4])
    plantio = impacto[2]
    reciclado = impacto[6]
    agua = impacto[7]
    energia = impacto[8]
    pontos = usuario_logado[3]

    exibir_card_conquista(
        "🌱",
        "Primeiro Broto",
        status_conquista(usuario_logado, "Primeiro Broto", total_acoes),
        "Registrar sua primeira ação sustentável.",
        f"{total_acoes} / 1 ação",
    )

    exibir_card_conquista(
        "♻️",
        "Reciclador Ativo",
        status_conquista(usuario_logado, "Reciclador Ativo", reciclado),
        "Reciclar 10kg de material.",
        f"{formatar_quantidade(reciclado)}kg / 10kg",
    )

    exibir_card_conquista(
        "💧",
        "Água Consciente",
        status_conquista(usuario_logado, "Água Consciente", agua),
        "Economizar 100 litros de água.",
        f"{formatar_quantidade(agua)}L / 100L",
    )

    exibir_card_conquista(
        "⚡",
        "Energia Inteligente",
        status_conquista(usuario_logado, "Energia Inteligente", energia),
        "Registrar 5 ações de energia.",
        f"{formatar_quantidade(energia)} / 5 ações",
    )

    exibir_card_conquista(
        "🌿",
        "Mão Verde",
        status_conquista(usuario_logado, "Mão Verde", plantio),
        "Registrar 5 ações de plantio.",
        f"{formatar_quantidade(plantio)} / 5 ações",
    )

    exibir_card_conquista(
        "🏆",
        "Campeão EcoScore",
        status_conquista(usuario_logado, "Campeão EcoScore", pontos),
        "Atingir 100 EcoPoints.",
        f"{pontos} / 100 EcoPoints",
    )


# Retorna o líder atual do ranking.
def buscar_lider():
    if not usuarios:
        return None

    lider = usuarios[0]
    for usuario in usuarios:
        if usuario[3] > lider[3]:
            lider = usuario

    return lider


# Exibe o status geral da competição mensal.
def ver_status_competicao():
    cabecalho("STATUS DA COMPETIÇÃO")

    if ranking_encerrado:
        print("  ⚠️ O ranking mensal foi encerrado.\n")
        print("  Ranking: ENCERRADO")
    else:
        print("  Ranking: ATIVO")

    lider = buscar_lider()

    if lider is None:
        print("\n  Nenhum usuário cadastrado ainda.")
        print("  Usuários cadastrados: 0")
        return

    pontos_lider = lider[3]
    faltam = max(0, 100 - pontos_lider)

    print("\n  Líder atual:")
    print(f"  {lider[0]} — {pontos_lider} EcoPoints")

    if ranking_encerrado:
        print("\n  O ciclo já tem um campeão.")
    else:
        print(f"\n  Faltam {faltam} pontos para encerrar o ranking.")

    print(f"\n  Usuários cadastrados: {len(usuarios)}")


# Calcula a posição de um usuário no ranking.
def calcular_posicao_ranking(usuario_visitado):
    def pegar_pontos(u):
        return u[3]

    ordenados = sorted(usuarios, key=pegar_pontos, reverse=True)

    for pos, usuario in enumerate(ordenados, start=1):
        if usuario is usuario_visitado:
            return pos

    return 0


# Busca usuários por nome, ignorando diferenças de maiúsculas/minúsculas.
def buscar_usuarios_por_nome(nome):
    encontrados = []
    termo = nome.lower()

    for usuario in usuarios:
        if termo in usuario[0].lower():
            encontrados.append(usuario)

    return encontrados


# Exibe a lista de usuários encontrados sem expor e-mail ou senha.
def exibir_lista_usuarios_encontrados(encontrados):
    cabecalho("USUÁRIOS ENCONTRADOS")

    for i, usuario in enumerate(encontrados, start=1):
        print(f"  {i}. {usuario[0]} — {usuario[3]} EcoPoints")

    print("\n  0. Cancelar")


# Seleciona um usuário da lista de resultados.
def selecionar_usuario_encontrado(encontrados):
    while True:
        opcao = input("\n  Escolha um perfil: ").strip()

        if opcao == "0":
            return None

        if opcao.isdigit():
            indice = int(opcao)
            if indice >= 1 and indice <= len(encontrados):
                return encontrados[indice - 1]

        print("  [!] Opção inválida.")


# Retorna uma linha resumida para as últimas ações do perfil público.
def resumir_acao_publica(acao):
    categoria = acao[0]
    descricao = acao[1]
    quantidade = formatar_quantidade(acao[2])
    pontos = acao[3]
    unidade = unidade_acao(acao)

    if categoria == CATEGORIAS["3"][0]:
        return f"{categoria} | {quantidade}{unidade} | +{pontos} pts"

    if categoria == CATEGORIAS["2"][0]:
        return f"{categoria} | {quantidade}{unidade} | +{pontos} pts"

    if categoria == descricao:
        return f"{categoria} | +{pontos} pts"

    return f"{categoria} | {descricao} | +{pontos} pts"


# Exibe o perfil público de outro usuário.
def exibir_perfil_publico(usuario_visitado):
    posicao = calcular_posicao_ranking(usuario_visitado)
    impacto = calcular_impacto(usuario_visitado)

    cabecalho("PERFIL PÚBLICO")
    print(f"  Nome: {usuario_visitado[0]}")
    print(f"  EcoPoints: {usuario_visitado[3]}")
    print(f"  Ranking: {posicao}º lugar")

    linha("━")
    print("  🏆 CONQUISTAS\n")

    if not usuario_visitado[5]:
        print("  Nenhuma conquista desbloqueada ainda.")
    else:
        for nome_conquista in usuario_visitado[5]:
            conquista = buscar_conquista(nome_conquista)
            if conquista is not None:
                print(f"  {conquista[1]} {conquista[0]}")

    linha("━")
    print("  🌍 IMPACTO AMBIENTAL\n")
    print(f"  🌱 Ações de plantio: {formatar_quantidade(impacto[2])}")
    print(f"  🥬 Hortas cultivadas: {formatar_quantidade(impacto[1])}")
    print(f"  ♻️ Material reciclado: {formatar_quantidade(impacto[6])} kg")
    print(f"  💧 Água economizada: {formatar_quantidade(impacto[7])} litros")
    print(f"  ⚡ Ações de energia: {formatar_quantidade(impacto[8])}")

    linha("━")
    print("  🕓 ÚLTIMAS AÇÕES\n")

    if not usuario_visitado[4]:
        print("  Nenhuma ação registrada ainda.")
    else:
        ultimas_acoes = usuario_visitado[4][-3:]
        ultimas_acoes.reverse()

        for i, acao in enumerate(ultimas_acoes, start=1):
            print(f"  {i}. {resumir_acao_publica(acao)}")


# Fluxo social para visitar o perfil público de outro usuário.
def visitar_perfil_usuario(usuario_logado):
    cabecalho("VISITAR PERFIL")
    print("  Digite o nome do usuário que deseja procurar.")
    print("  Digite 0 para voltar.\n")

    nome = input("  Nome: ").strip()

    if nome == "0":
        return

    if not nome:
        print("  [!] Nome não pode ser vazio.")
        return

    encontrados = buscar_usuarios_por_nome(nome)

    if len(encontrados) == 0:
        print("\n  Nenhum usuário encontrado.")
        return

    if len(encontrados) == 1:
        usuario_visitado = encontrados[0]
    else:
        exibir_lista_usuarios_encontrados(encontrados)
        usuario_visitado = selecionar_usuario_encontrado(encontrados)
        if usuario_visitado is None:
            return

    if usuario_visitado is usuario_logado:
        print("\n  Esse é o seu perfil. Use a opção Consultar perfil.")
        return

    exibir_perfil_publico(usuario_visitado)


# Remove o usuário da lista global e salva os dados atualizados.
def deletar_usuario(usuario_logado):
    global ranking_encerrado

    for i, usuario in enumerate(usuarios):
        if usuario is usuario_logado:
            usuarios.pop(i)
            ranking_encerrado = False

            for usuario_restante in usuarios:
                if usuario_restante[3] >= 100:
                    ranking_encerrado = True

            salvar_dados()
            return True

    return False


# Confirma senha e executa a exclusão permanente da conta.
def confirmar_exclusao_conta(usuario_logado):
    linha("━")
    print("  ⚠️ ATENÇÃO")
    print("  Essa ação irá apagar permanentemente:")
    print("  - seu perfil")
    print("  - EcoPoints")
    print("  - histórico de ações")
    print("  - conquistas")
    print()
    print("  Essa ação não poderá ser desfeita.")
    linha("━")
    print("\n  Deseja continuar?\n")
    print("  1. Sim")
    print("  0. Cancelar")

    while True:
        opcao = input("\n  Opção: ").strip()

        match opcao:
            case "1":
                cabecalho("CONFIRMAR IDENTIDADE")
                print("  Digite sua senha para deletar a conta.")
                print("  Digite 0 para cancelar.\n")

                senha = ler_senha_oculta("  Senha: ").strip()

                if senha == "0":
                    return False

                if not senha or senha != usuario_logado[2]:
                    print("  Senha incorreta.")
                    return False

                if deletar_usuario(usuario_logado):
                    linha("━")
                    print("  🗑️ Conta deletada com sucesso.")
                    print("  Esperamos ver você novamente no EcoScore.")
                    linha("━")
                    return True

                print("  [!] Não foi possível deletar a conta.")
                return False
            case "0":
                return False
            case _:
                print("  [!] Opção inválida.")


# Reinicia o ranking mensal.
def reiniciar_ranking():
    global ranking_encerrado

    cabecalho("REINICIAR RANKING MENSAL")
    print("  Deseja realmente reiniciar o ranking mensal?\n")
    print("  1. Sim")
    print("  0. Cancelar")

    while True:
        opcao = input("\n  Opção: ").strip()

        match opcao:
            case "1":
                for usuario in usuarios:
                    usuario[3] = 0
                    usuario[4] = []
                    usuario[5] = []
                ranking_encerrado = False
                salvar_dados()
                print("\n  Novo ciclo mensal iniciado com sucesso!")
                return
            case "0":
                return
            case _:
                print("  [!] Opção inválida.")


# Retorna o ícone da categoria do histórico.
def icone_categoria(categoria):
    if categoria == "Plantio":
        return "🌱"
    if categoria == CATEGORIAS["2"][0]:
        return "♻️"
    if categoria == CATEGORIAS["3"][0]:
        return "💧"
    if categoria == CATEGORIAS["4"][0]:
        return "⚡"
    return "🌿"


# Retorna a unidade visual da ação registrada.
def unidade_acao(acao):
    categoria = acao[0]
    descricao = acao[1]

    if categoria == CATEGORIAS["2"][0]:
        return "kg"
    if categoria == CATEGORIAS["3"][0]:
        return "L"
    if categoria == CATEGORIAS["4"][0]:
        return " ações"
    if descricao == "Compostagem Orgânica":
        return "kg"
    if descricao == "Reaproveitar resíduos orgânicos":
        return "kg"
    if descricao == "Plantar muda ou árvore":
        return " mudas"
    if descricao == "Cultivar horta doméstica":
        return " vasos/canteiros"
    if descricao == "Criar jardim para polinizadores":
        return " flores/plantas"
    return " ações"


# Exibe o histórico com uma apresentação mais gamificada.
def exibir_historico(usuario_logado):
    print("  Histórico de ações:")

    if not usuario_logado[4]:
        print("  Nenhuma ação registrada ainda.")
        return

    for acao in usuario_logado[4]:
        categoria = acao[0]
        descricao = acao[1]
        quantidade = formatar_quantidade(acao[2])
        pontos = acao[3]
        unidade = unidade_acao(acao)

        linha("·")
        if categoria == descricao:
            print(f"  {icone_categoria(categoria)} {categoria}")
        else:
            print(f"  {icone_categoria(categoria)} {categoria} | {descricao}")
        print(f"  Quantidade: {quantidade}{unidade}")
        print(f"  EcoPoints: +{pontos}")


# Exibe impacto ambiental acumulado a partir do histórico.
def exibir_impacto(usuario_logado):
    impacto = calcular_impacto(usuario_logado)

    cabecalho("IMPACTO AMBIENTAL")
    print(f"  🌱 Mudas/árvores plantadas: {formatar_quantidade(impacto[0])}")
    print(f"  🥬 Hortas cultivadas: {formatar_quantidade(impacto[1])} vasos/canteiros")
    print(f"  🌿 Ações de plantio/jardinagem: {formatar_quantidade(impacto[2])}")
    print(f"  🍂 Resíduos orgânicos compostados: {formatar_quantidade(impacto[3])} kg")
    print(f"  🌸 Plantas para polinizadores: {formatar_quantidade(impacto[4])}")
    print(f"  ♻️ Resíduos orgânicos reaproveitados: {formatar_quantidade(impacto[5])} kg")
    print()
    print(f"  ♻️ Material reciclado: {formatar_quantidade(impacto[6])} kg")
    print(f"  💧 Água economizada: {formatar_quantidade(impacto[7])} litros")
    print(f"  ⚡ Ações de energia: {formatar_quantidade(impacto[8])}")


# Exibe nome, e-mail, total de pontos e histórico de ações do usuário logado.
def consultar_perfil(usuario_logado):
    cabecalho("CONSULTA DE PERFIL")

    print(f"  Nome : {usuario_logado[0]}")
    print(f"  Email: {usuario_logado[1]}")
    print(f"  Total: {usuario_logado[3]} EcoPoints")
    linha("·")

    exibir_historico(usuario_logado)
    print()
    exibir_impacto(usuario_logado)


# ── menus ────────────────────────────────────────────────────

# Renderiza a tela inicial de login e cadastro.
def exibir_tela_inicial():
    cabecalho("ECOSCORE")
    print("  1. Entrar")
    print("  2. Cadastrar conta")
    print("  0. Encerrar programa")
    linha()


# Renderiza o menu da conta autenticada.
def exibir_menu_usuario(usuario_logado):
    cabecalho("MENU ECOSCORE")
    print(f"  Usuário: {usuario_logado[0]}")
    print(f"  EcoPoints: {usuario_logado[3]}")
    print()
    print("  1. Registrar ação sustentável")
    print("  2. Ver ranking")
    print("  3. Consultar perfil")
    print("  4. Visitar perfil de outro usuário")
    print("  5. Deletar minha conta")
    print("  6. Ver conquistas")
    print("  7. Status da competição")
    print("  8. Reiniciar ranking mensal")
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
            case "4":
                visitar_perfil_usuario(usuario_logado)
            case "5":
                conta_deletada = confirmar_exclusao_conta(usuario_logado)
                if conta_deletada:
                    break
            case "6":
                ver_conquistas(usuario_logado)
            case "7":
                ver_status_competicao()
            case "8":
                reiniciar_ranking()
            case "0":
                print("\n  Você saiu da conta.")
                break
            case _:
                print("  [!] Opção inválida. Tente novamente.")

        input("\n  [Enter para continuar]")


# Ponto de entrada: tela inicial com login, cadastro e encerramento.
def main():
    carregar_dados()

    while True:
        exibir_tela_inicial()
        opcao = input("  Opção: ").strip()

        match opcao:
            case "1":
                login()
            case "2":
                cadastrar_usuario()
            case "0":
                cabecalho("ATÉ LOGO")
                print("  Continue sendo sustentável. 🌱")
                break
            case _:
                print("  [!] Opção inválida. Tente novamente.")

        if opcao != "1" and opcao != "2":
            input("\n  [Enter para continuar]")


if __name__ == "__main__":
    main()
