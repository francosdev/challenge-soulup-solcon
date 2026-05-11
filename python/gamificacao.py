# ============================================================
#  EcoScore - pontuacao, acoes, conquistas e ranking
# ============================================================

import dados
from config import ACOES_CUIDADO, ACOES_ENERGIA, ACOES_PLANTIO, CATEGORIAS, CONQUISTAS, META_PONTOS
from impacto import calcular_impacto, formatar_quantidade
from interface import cabecalho, linha, mostrar_feedback_acao


def ler_quantidade(mensagem):
    while True:
        entrada = input(mensagem).strip()

        if entrada == "0":
            return None

        if dados.eh_numero_positivo(entrada):
            return float(entrada.replace(",", "."))

        print("  [!] Informe um numero positivo ou 0 para voltar.")


def calcular_pontuacao(categoria_key, quantidade):
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
    if usuario["admin"]:
        return

    impacto = calcular_impacto(usuario)

    if len(usuario["historico"]) >= 1:
        desbloquear_conquista(usuario, "Primeiro Broto")
    if impacto["reciclado"] >= 10:
        desbloquear_conquista(usuario, "Reciclador Ativo")
    if impacto["agua"] >= 100:
        desbloquear_conquista(usuario, "Agua Consciente")
    if impacto["energia"] >= 5:
        desbloquear_conquista(usuario, "Energia Inteligente")
    if impacto["plantio"] >= 5:
        desbloquear_conquista(usuario, "Mao Verde")
    if usuario["pontos"] >= META_PONTOS:
        desbloquear_conquista(usuario, "Campeao EcoScore")


def adicionar_pontos_usuario(usuario, pontos):
    if usuario["admin"] or dados.ranking_encerrado:
        return False

    usuario["pontos"] = min(META_PONTOS, usuario["pontos"] + pontos)

    if usuario["pontos"] >= META_PONTOS:
        dados.ranking_encerrado = True
        print("\n  ⚡ PARABENS! Voce atingiu 100 EcoPoints!")
        print(f"  🏆 {usuario['nome']} venceu o ranking mensal!")
        print("  🌱 O ranking foi encerrado para todos os usuarios.")
        print("  💡 Sua conta de energia deste mes sera subsidiada pela SoulUp.")

    return True


def registrar_acao_usuario(usuario, categoria, descricao, quantidade, pontos):
    acao = dados.criar_acao(categoria, descricao, quantidade, pontos)
    usuario["historico"].append(acao)
    pontos_somados = adicionar_pontos_usuario(usuario, pontos)
    verificar_conquistas(usuario)
    dados.salvar_dados()
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
    while True:
        cabecalho("PLANTIO E JARDINAGEM")
        print("  1. Plantar muda ou arvore")
        print("  2. Cultivar horta domestica")
        print("  3. Compostagem organica")
        print("  4. Cuidar de planta existente")
        print("  5. Criar jardim para polinizadores")
        print("  6. Reaproveitar residuos organicos")
        print("  0. Voltar")

        opcao = input("\n  Escolha uma acao: ").strip()

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
            print("  [!] Opcao invalida.")


def registrar_cuidado_planta(usuario):
    while True:
        cabecalho("CUIDAR DE PLANTA EXISTENTE")
        print("  1. Regar corretamente")
        print("  2. Adubar naturalmente")
        print("  3. Podar sem desperdicio")
        print("  0. Voltar")

        entrada = input("\n  Selecione as acoes realizadas (ex: 1 2 3): ").strip()

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

        print("  [!] Selecione ao menos uma acao valida ou 0 para voltar.")


def registrar_categoria_quantidade(usuario, opcao):
    prompts = {
        "2": "  Quantos kg de material voce reciclou? (0 para voltar): ",
        "3": "  Quantos litros de agua voce economizou? (0 para voltar): ",
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
    while True:
        cabecalho("ACOES DE ECONOMIA DE ENERGIA")
        for key in ACOES_ENERGIA:
            print(f"  {key}. {ACOES_ENERGIA[key]['descricao']}")
        print("  0. Voltar")

        entrada = input("\n  Selecione as acoes realizadas (ex: 1 3 5): ").strip()

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
            mostrar_feedback_acao(usuario, "Acoes de energia registradas com sucesso!", pontos, pontos_somados)
            return True

        print("  [!] Selecione ao menos uma acao valida ou 0 para voltar.")


def registrar_acao_sustentavel(usuario):
    if usuario["admin"]:
        print("  [!] Administradores nao participam da competicao.")
        return

    while True:
        cabecalho("REGISTRAR ACAO")

        if dados.ranking_encerrado:
            print("  ⚠️  O ranking mensal ja foi encerrado.")
            print("  Voce ainda pode registrar acoes, mas elas nao geram pontos.\n")

        print("  1. Plantio e Jardinagem")
        print("  2. Reciclagem de Residuos")
        print("  3. Economia de Agua")
        print("  4. Reducao de Energia")
        print("  0. Voltar")

        opcao = input("\n  Escolha a categoria: ").strip()

        if opcao == "0":
            return
        if opcao not in CATEGORIAS:
            print("  [!] Opcao invalida.")
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
    cabecalho("RANKING ECOSCORE")

    ranking = dados.obter_ranking()
    if not ranking:
        print("  Nenhum usuario comum cadastrado.")
        return

    for posicao, usuario in enumerate(ranking, start=1):
        if posicao == 1:
            print(f"  🏆 {posicao}º {usuario['nome']} - {usuario['pontos']} EcoPoints")
            print(f"     {usuario['email']}")
            print("     🌱 Lider do ciclo sustentavel.")
            linha("·")
        else:
            print(f"  {posicao}º {usuario['nome']} ({usuario['email']}) - {usuario['pontos']} EcoPoints")


def progresso_conquista(usuario, nome_conquista):
    impacto = calcular_impacto(usuario)

    if nome_conquista == "Primeiro Broto":
        return len(usuario["historico"]), 1, "acao"
    if nome_conquista == "Reciclador Ativo":
        return impacto["reciclado"], 10, "kg"
    if nome_conquista == "Agua Consciente":
        return impacto["agua"], 100, "L"
    if nome_conquista == "Energia Inteligente":
        return impacto["energia"], 5, "acoes"
    if nome_conquista == "Mao Verde":
        return impacto["plantio"], 5, "acoes"
    if nome_conquista == "Campeao EcoScore":
        return usuario["pontos"], META_PONTOS, "EcoPoints"

    return 0, 0, ""


def status_conquista(usuario, nome_conquista, progresso_atual):
    if nome_conquista in usuario["conquistas"]:
        return "DESBLOQUEADA ✅"
    if progresso_atual > 0:
        return "EM PROGRESSO"
    return "BLOQUEADA 🔒"


def ver_conquistas(usuario):
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
    cabecalho("STATUS DA COMPETICAO")

    if dados.ranking_encerrado:
        print("  ⚠️ O ranking mensal foi encerrado.\n")
        print("  Ranking: ENCERRADO")
    else:
        print("  Ranking: ATIVO")

    lider = dados.buscar_lider()
    if lider is None:
        print("\n  Nenhum usuario comum cadastrado ainda.")
        print("  Usuarios cadastrados: 0")
        return

    faltam = max(0, META_PONTOS - lider["pontos"])
    print("\n  Lider atual:")
    print(f"  {lider['nome']} - {lider['pontos']} EcoPoints")

    if dados.ranking_encerrado:
        print("\n  O ciclo ja tem um campeao.")
    else:
        print(f"\n  Faltam {faltam} pontos para encerrar o ranking.")

    print(f"\n  Usuarios cadastrados: {len(dados.usuarios_comuns())}")
