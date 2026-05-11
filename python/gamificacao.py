# ============================================================
#  EcoScore - pontuação, ações, conquistas e ranking
# ============================================================

import dados
from config import ACOES_CUIDADO, ACOES_ENERGIA, ACOES_PLANTIO, CATEGORIAS, CONQUISTAS, META_PONTOS
from impacto import calcular_impacto, formatar_quantidade
from interface import cabecalho, linha, mostrar_feedback_acao


def ler_quantidade(mensagem):
    """Lê uma quantidade positiva ou retorna None quando o usuário volta."""
    while True:
        entrada = input(mensagem).strip()

        if entrada == "0":
            return None

        if dados.eh_numero_positivo(entrada):
            return float(entrada.replace(",", "."))

        print("  [!] Informe um número positivo ou 0 para voltar.")


def calcular_pontuacao(categoria_key, quantidade):
    """Calcula EcoPoints pela categoria e quantidade informada."""
    peso = CATEGORIAS[categoria_key]["peso"]
    pontos = min(100, int(quantidade * peso))
    return max(0, pontos)


def desbloquear_conquista(usuario, nome_conquista):
    if usuario["admin"] or nome_conquista in usuario["conquistas"]:
        return

    if nome_conquista in CONQUISTAS:
        usuario["conquistas"].append(nome_conquista)
        conquista = CONQUISTAS[nome_conquista]
        linha("━")
        print("  🏆 NOVA CONQUISTA!")
        print(f"  {conquista['icone']} {nome_conquista}")
        print(f"  {conquista['mensagem']}")
        linha("━")


def verificar_conquistas(usuario):
    """Avalia se novas conquistas foram desbloqueadas após uma ação."""
    if usuario["admin"]:
        return

    impacto = calcular_impacto(usuario)

    if len(usuario["historico"]) >= 1:
        desbloquear_conquista(usuario, "Primeiro Broto")
    if impacto["reciclado"] >= 10:
        desbloquear_conquista(usuario, "Reciclador Ativo")
    if impacto["agua"] >= 100:
        desbloquear_conquista(usuario, "Água Consciente")
    if impacto["energia"] >= 5:
        desbloquear_conquista(usuario, "Energia Inteligente")
    if impacto["plantio"] >= 5:
        desbloquear_conquista(usuario, "Mão Verde")
    if usuario["pontos"] >= META_PONTOS:
        desbloquear_conquista(usuario, "Campeão EcoScore")


def adicionar_pontos_usuario(usuario, pontos):
    """Soma EcoPoints quando a competição está ativa."""
    if usuario["admin"] or dados.ranking_encerrado:
        return False

    usuario["pontos"] = min(META_PONTOS, usuario["pontos"] + pontos)

    if usuario["pontos"] >= META_PONTOS:
        dados.ranking_encerrado = True
        print("\n  ⚡ PARABÉNS! Você atingiu 100 EcoPoints!")
        print(f"  🏆 {usuario['nome']} venceu o ranking mensal!")
        print("  🌱 O ranking foi encerrado para todos os usuários.")
        print("  💡 Sua conta de energia deste mês será subsidiada pela SoulUp.")

    return True


def registrar_acao_usuario(usuario, categoria, descricao, quantidade, pontos):
    """Salva uma ação, atualiza pontuação, conquistas e auditoria."""
    acao = dados.criar_acao(categoria, descricao, quantidade, pontos)
    usuario["historico"].append(acao)
    pontos_somados = adicionar_pontos_usuario(usuario, pontos)
    verificar_conquistas(usuario)
    dados.salvar_dados()
    dados.registrar_log(
        "ACAO_REGISTRADA",
        f"email={usuario['email']} categoria={categoria} pontos={pontos} somou_pontos={pontos_somados}",
    )
    return pontos_somados


def selecionar_multiplas_opcoes(entrada, opcoes):
    partes = entrada.split()
    selecionadas = []

    if not partes:
        return []

    for item in partes:
        if item not in opcoes:
            return []
        if item not in selecionadas:
            selecionadas.append(item)

    return selecionadas


def montar_descricao_multiplas(selecionadas, opcoes):
    descricoes = []

    for key in selecionadas:
        descricoes.append(opcoes[key]["descricao"])

    return ", ".join(descricoes)


def registrar_plantio_jardinagem(usuario):
    """Controla o submenu de ações de plantio e jardinagem."""
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
            acao = ACOES_PLANTIO[opcao]
            quantidade = ler_quantidade(f"  Informe a quantidade em {acao['unidade']} (0 para voltar): ")

            if quantidade is None:
                continue

            pontos = min(100, int(quantidade * acao["pontos"]))
            pontos_somados = registrar_acao_usuario(usuario, "Plantio", acao["descricao"], quantidade, pontos)
            mostrar_feedback_acao(usuario, f"{acao['descricao']} registrada com sucesso!", pontos, pontos_somados)
            return True

        if opcao == "4":
            if registrar_cuidado_planta(usuario):
                return True
        else:
            print("  [!] Opção inválida.")


def registrar_cuidado_planta(usuario):
    """Registra uma ou mais ações de cuidado com plantas existentes."""
    while True:
        cabecalho("CUIDAR DE PLANTA EXISTENTE")
        print("  1. Regar corretamente")
        print("  2. Adubar naturalmente")
        print("  3. Podar sem desperdicio")
        print("  0. Voltar")

        entrada = input("\n  Selecione as ações realizadas (ex: 1 2 3): ").strip()

        if entrada == "0":
            return False

        selecionadas = selecionar_multiplas_opcoes(entrada, ACOES_CUIDADO)

        if selecionadas:
            descricao = montar_descricao_multiplas(selecionadas, ACOES_CUIDADO)
            pontos = 0
            for key in selecionadas:
                pontos = pontos + ACOES_CUIDADO[key]["pontos"]

            pontos_somados = registrar_acao_usuario(usuario, "Plantio", descricao, len(selecionadas), pontos)
            mostrar_feedback_acao(usuario, "Cuidado com planta registrado com sucesso!", pontos, pontos_somados)
            return True

        print("  [!] Selecione ao menos uma ação válida ou 0 para voltar.")


def registrar_categoria_quantidade(usuario, opcao):
    """Registra categorias simples baseadas em quantidade."""
    prompts = {
        "2": "  Quantos kg de material você reciclou? (0 para voltar): ",
        "3": "  Quantos litros de água você economizou? (0 para voltar): ",
    }

    quantidade = ler_quantidade(prompts[opcao])
    if quantidade is None:
        return False

    pontos = calcular_pontuacao(opcao, quantidade)
    categoria = CATEGORIAS[opcao]["nome"]
    pontos_somados = registrar_acao_usuario(usuario, categoria, categoria, quantidade, pontos)
    mostrar_feedback_acao(usuario, f"{categoria} registrada com sucesso!", pontos, pontos_somados)
    return True


def registrar_energia(usuario):
    """Registra múltiplas ações de economia de energia."""
    while True:
        cabecalho("AÇÕES DE ECONOMIA DE ENERGIA")
        for key in ACOES_ENERGIA:
            print(f"  {key}. {ACOES_ENERGIA[key]['descricao']}")
        print("  0. Voltar")

        entrada = input("\n  Selecione as ações realizadas (ex: 1 3 5): ").strip()

        if entrada == "0":
            return False

        selecionadas = selecionar_multiplas_opcoes(entrada, ACOES_ENERGIA)

        if selecionadas:
            descricao = montar_descricao_multiplas(selecionadas, ACOES_ENERGIA)
            pontos = 0
            for key in selecionadas:
                pontos = pontos + ACOES_ENERGIA[key]["pontos"]

            categoria = CATEGORIAS["4"]["nome"]
            pontos_somados = registrar_acao_usuario(usuario, categoria, descricao, len(selecionadas), pontos)
            mostrar_feedback_acao(usuario, "Ações de energia registradas com sucesso!", pontos, pontos_somados)
            return True

        print("  [!] Selecione ao menos uma ação válida ou 0 para voltar.")


def registrar_acao_sustentavel(usuario):
    """Exibe as categorias e direciona o registro sustentável."""
    if usuario["admin"]:
        print("  [!] Administradores não participam da competição.")
        return

    while True:
        cabecalho("REGISTRAR AÇÃO")

        if dados.ranking_encerrado:
            print("  ⚠️  O ranking mensal já foi encerrado.")
            print("  Você ainda pode registrar ações, mas elas não geram pontos.\n")

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
            if registrar_plantio_jardinagem(usuario):
                return
        elif opcao == "4":
            if registrar_energia(usuario):
                return
        else:
            if registrar_categoria_quantidade(usuario, opcao):
                return


def ver_ranking():
    """Exibe o ranking mensal apenas com usuários comuns."""
    cabecalho("RANKING ECOSCORE")

    ranking = dados.obter_ranking()
    if not ranking:
        print("  Nenhum usuário comum cadastrado.")
        return

    for posicao, usuario in enumerate(ranking, start=1):
        if posicao == 1:
            print(f"  🏆 {posicao}º {usuario['nome']} - {usuario['pontos']} EcoPoints")
            print(f"     {usuario['email']}")
            print("     🌱 Líder do ciclo sustentável.")
            linha("·")
        else:
            print(f"  {posicao}º {usuario['nome']} ({usuario['email']}) - {usuario['pontos']} EcoPoints")


def progresso_conquista(usuario, nome_conquista):
    """Retorna progresso, meta e unidade de uma conquista."""
    impacto = calcular_impacto(usuario)

    if nome_conquista == "Primeiro Broto":
        return len(usuario["historico"]), 1, "ação"
    if nome_conquista == "Reciclador Ativo":
        return impacto["reciclado"], 10, "kg"
    if nome_conquista == "Água Consciente":
        return impacto["agua"], 100, "L"
    if nome_conquista == "Energia Inteligente":
        return impacto["energia"], 5, "ações"
    if nome_conquista == "Mão Verde":
        return impacto["plantio"], 5, "ações"
    if nome_conquista == "Campeão EcoScore":
        return usuario["pontos"], META_PONTOS, "EcoPoints"

    return 0, 0, ""


def status_conquista(usuario, nome_conquista, progresso_atual):
    if nome_conquista in usuario["conquistas"]:
        return "DESBLOQUEADA ✅"
    if progresso_atual > 0:
        return "EM PROGRESSO"
    return "BLOQUEADA 🔒"


def ver_conquistas(usuario):
    """Mostra conquistas com status, objetivo e progresso atual."""
    cabecalho("CONQUISTAS ECOSCORE")

    for nome_conquista in CONQUISTAS:
        conquista = CONQUISTAS[nome_conquista]
        progresso_atual, meta, unidade = progresso_conquista(usuario, nome_conquista)
        status = status_conquista(usuario, nome_conquista, progresso_atual)

        print(f"  {conquista['icone']} {nome_conquista}")
        print(f"  Status: {status}")
        print(f"  Objetivo: {conquista['objetivo']}")
        print(f"  Progresso atual: {formatar_quantidade(progresso_atual)} / {formatar_quantidade(meta)} {unidade}")
        linha("━")


def ver_status_competicao():
    """Exibe situação do ciclo mensal da competição."""
    cabecalho("STATUS DA COMPETIÇÃO")

    if dados.ranking_encerrado:
        print("  ⚠️ O ranking mensal foi encerrado.\n")
        print("  Ranking: ENCERRADO")
    else:
        print("  Ranking: ATIVO")

    lider = dados.buscar_lider()
    if lider is None:
        print("\n  Nenhum usuário comum cadastrado ainda.")
        print("  Usuários cadastrados: 0")
        return

    faltam = max(0, META_PONTOS - lider["pontos"])
    print("\n  Líder atual:")
    print(f"  {lider['nome']} - {lider['pontos']} EcoPoints")

    if dados.ranking_encerrado:
        print("\n  O ciclo já tem um campeão.")
    else:
        print(f"\n  Faltam {faltam} pontos para encerrar o ranking.")

    print(f"\n  Usuários cadastrados: {len(dados.usuarios_comuns())}")
