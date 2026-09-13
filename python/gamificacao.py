#EcoScore - ações, pontos, conquistas e ranking

import dados
from config import ACOES_CUIDADO, ACOES_ENERGIA, ACOES_PLANTIO, CATEGORIAS
from config import CONQUISTAS, LIMITE_PONTOS_ACAO, LIMITE_QUANTIDADE, META_PONTOS
from impacto import calcular_impacto, formatar_numero
from interface import cabecalho, erro, feedback_acao, ler_opcao, linha
from interface import mostrar_lista_opcoes, mostrar_matriz


def ler_quantidade(mensagem):
    """Pede uma quantidade até a pessoa digitar um número válido."""
    while True:
        entrada = input(mensagem).strip().replace(",", ".")

        if entrada == "0":
            return None

        #só algarismos e no máximo um ponto, assim "nan", "inf" e "1e400" não passam
        if not entrada.replace(".", "", 1).isdigit():
            erro("Digite só números. Exemplo: 3 ou 2.5")
            continue

        try:
            quantidade = float(entrada)
        except ValueError:
            erro("Digite um número. Exemplo: 3 ou 2.5")
            continue

        if quantidade <= 0:
            erro("A quantidade precisa ser maior que zero.")
            continue

        if quantidade > LIMITE_QUANTIDADE:
            erro("A quantidade máxima por registro é " + str(LIMITE_QUANTIDADE) + ".")
            continue

        return quantidade


def calcular_pontos(quantidade, peso):
    """Calcula os pontos de uma ação: quantidade vezes peso, entre 1 e LIMITE_PONTOS_ACAO."""
    #o máximo existe para ninguém ganhar o mês numa ação só
    pontos = int(quantidade * peso)

    if pontos < 1:
        pontos = 1
    if pontos > LIMITE_PONTOS_ACAO:
        pontos = LIMITE_PONTOS_ACAO

    return pontos


def ler_selecao_multipla(entrada, lista):
    """Transforma o texto digitado, como "1 3 5", na lista de posições escolhidas."""
    escolhidos = []
    partes = entrada.split()

    if len(partes) == 0:
        return []

    for parte in partes:
        if not parte.isdigit():
            return []

        indice = int(parte) - 1
        if indice < 0 or indice >= len(lista):
            return []
        if indice not in escolhidos:
            escolhidos.append(indice)

    return escolhidos


def somar_pontos_selecionados(escolhidos, lista):
    """Soma os pontos das opções escolhidas."""
    soma = 0

    for indice in escolhidos:
        soma += lista[indice]["pontos"]

    return soma


def juntar_descricoes(escolhidos, lista):
    """Junta as descrições das opções escolhidas num texto só."""
    descricoes = []

    for indice in escolhidos:
        descricoes.append(lista[indice]["descricao"])

    return ", ".join(descricoes)


def calcular_conquistas_novas(usuario):
    """Descobre quais conquistas o usuário atingiu e ainda não tinha."""
    novas = []

    if usuario["admin"]:
        return novas

    impacto = calcular_impacto(usuario)

    for conquista in CONQUISTAS:
        valor_atual = impacto[conquista["metrica"]]
        if valor_atual >= conquista["meta"] and conquista["nome"] not in usuario["conquistas"]:
            novas.append(conquista["nome"])

    return novas


def mostrar_conquistas_novas(novas):
    """Imprime um aviso para cada conquista nova."""
    for nome in novas:
        linha()
        print("  NOVA CONQUISTA DESBLOQUEADA!")
        print("  " + nome)
        linha()


def somar_pontos(usuario, pontos):
    """Soma os pontos no usuário, se o ranking ainda estiver aberto."""
    if usuario["admin"] or dados.ranking_esta_encerrado():
        return False

    usuario["pontos"] += pontos
    if usuario["pontos"] > META_PONTOS:
        usuario["pontos"] = META_PONTOS

    return True


def mostrar_campeao(usuario):
    """Imprime o aviso de que o usuário chegou à meta e encerrou o ranking."""
    print()
    print("  PARABÉNS! " + usuario["nome"] + " chegou a " + str(META_PONTOS) + " Soul Points!")
    print("  O ranking mensal foi encerrado para todos os participantes.")
    print("  Sua conta de energia deste mês será subsidiada pela SoulUp.")


def registrar_acao(usuario, categoria, tipo, descricao, quantidade, unidade, pontos):
    """Registra uma ação no histórico, soma os pontos, confere as conquistas e grava."""
    #guarda como estava antes, para desfazer se não salvar
    pontos_antes = usuario["pontos"]
    ranking_antes = dados.ranking_esta_encerrado()

    salvou = False
    somou_pontos = False
    novas_conquistas = []
    acao = dados.criar_acao(categoria, tipo, descricao, quantidade, unidade, pontos)

    try:
        usuario["historico"].append(acao)
        somou_pontos = somar_pontos(usuario, pontos)

        novas_conquistas = calcular_conquistas_novas(usuario)
        for nome in novas_conquistas:
            usuario["conquistas"].append(nome)

        if not dados.salvar_dados():
            raise OSError("o arquivo de dados não foi salvo")
    except OSError:
        #não salvou: desfaz tudo (o ranking volta sozinho, porque depende dos pontos)
        for nome in novas_conquistas:
            usuario["conquistas"].remove(nome)
        usuario["pontos"] = pontos_antes
        usuario["historico"].pop()
        somou_pontos = False
    else:
        salvou = True

        if dados.ranking_esta_encerrado() and not ranking_antes:
            mostrar_campeao(usuario)
        mostrar_conquistas_novas(novas_conquistas)

        detalhe = "email=" + usuario["email"] + " categoria=" + categoria + " pontos=" + str(pontos)
        dados.registrar_log("ACAO_REGISTRADA", detalhe)
    finally:
        linha()

    return (salvou, somou_pontos)


def registrar_cuidado_planta(usuario):
    """Mostra o submenu de cuidado com planta e registra as ações marcadas."""
    while True:
        cabecalho("CUIDAR DE PLANTA EXISTENTE")
        mostrar_lista_opcoes(ACOES_CUIDADO)
        print("  0. Voltar")

        entrada = input("\n  Marque as ações que você fez (ex: 1 2 3): ").strip()
        if entrada == "0":
            return False

        escolhidos = ler_selecao_multipla(entrada, ACOES_CUIDADO)
        if len(escolhidos) == 0:
            erro("Escolha ao menos uma opção válida, ou 0 para voltar.")
            continue

        descricao = juntar_descricoes(escolhidos, ACOES_CUIDADO)
        pontos = somar_pontos_selecionados(escolhidos, ACOES_CUIDADO)
        quantidade = len(escolhidos)

        salvou, somou_pontos = registrar_acao(usuario, "plantio", "cuidado", descricao, quantidade, "ações", pontos)
        if salvou:
            feedback_acao(usuario, "Cuidado com planta registrado!", pontos, somou_pontos)
        else:
            erro("A ação não foi registrada. Pontos e conquistas não foram alterados.")
        return True


def registrar_plantio(usuario):
    """Mostra o submenu de plantio e registra a ação escolhida."""
    while True:
        cabecalho("PLANTIO E JARDINAGEM")
        mostrar_lista_opcoes(ACOES_PLANTIO)
        print("  " + str(len(ACOES_PLANTIO) + 1) + ". Cuidar de planta existente")
        print("  0. Voltar")

        opcao = ler_opcao("\n  Escolha uma ação: ")
        if opcao == "0":
            return False

        if not opcao.isdigit():
            erro("Opção inválida.")
            continue

        numero = int(opcao)

        #a última opção abre o submenu de cuidado com a planta
        if numero == len(ACOES_PLANTIO) + 1:
            if registrar_cuidado_planta(usuario):
                return True
            continue

        if numero < 1 or numero > len(ACOES_PLANTIO):
            erro("Opção inválida.")
            continue

        acao = ACOES_PLANTIO[numero - 1]
        quantidade = ler_quantidade("  Quantidade em " + acao["unidade"] + " (0 para voltar): ")
        if quantidade is None:
            continue

        pontos = calcular_pontos(quantidade, acao["pontos"])
        salvou, somou_pontos = registrar_acao(usuario, "plantio", acao["tipo"], acao["descricao"], quantidade, acao["unidade"], pontos)
        if salvou:
            feedback_acao(usuario, acao["descricao"] + ": registrado!", pontos, somou_pontos)
        else:
            erro("A ação não foi registrada. Pontos e conquistas não foram alterados.")
        return True


def registrar_energia(usuario):
    """Mostra o submenu de economia de energia e registra as ações marcadas."""
    while True:
        cabecalho("REDUÇÃO DE ENERGIA")
        mostrar_lista_opcoes(ACOES_ENERGIA)
        print("  0. Voltar")

        entrada = input("\n  Marque as ações que você fez (ex: 1 3 5): ").strip()
        if entrada == "0":
            return False

        escolhidos = ler_selecao_multipla(entrada, ACOES_ENERGIA)
        if len(escolhidos) == 0:
            erro("Escolha ao menos uma opção válida, ou 0 para voltar.")
            continue

        descricao = juntar_descricoes(escolhidos, ACOES_ENERGIA)
        pontos = somar_pontos_selecionados(escolhidos, ACOES_ENERGIA)
        quantidade = len(escolhidos)

        salvou, somou_pontos = registrar_acao(usuario, "energia", "", descricao, quantidade, "ações", pontos)
        if salvou:
            feedback_acao(usuario, "Ações de energia registradas!", pontos, somou_pontos)
        else:
            erro("A ação não foi registrada. Pontos e conquistas não foram alterados.")
        return True


def registrar_por_quantidade(usuario, categoria):
    """Registra reciclagem ou água, que só pedem uma quantidade."""
    if categoria["chave"] == "reciclagem":
        pergunta = "  Quantos kg de material você reciclou? (0 para voltar): "
        unidade = "kg"
    else:
        pergunta = "  Quantos litros de água você economizou? (0 para voltar): "
        unidade = "litros"

    quantidade = ler_quantidade(pergunta)
    if quantidade is None:
        return False

    pontos = calcular_pontos(quantidade, categoria["peso"])
    salvou, somou_pontos = registrar_acao(usuario, categoria["chave"], "", categoria["nome"], quantidade, unidade, pontos)
    if salvou:
        feedback_acao(usuario, categoria["nome"] + ": registrado!", pontos, somou_pontos)
    else:
        erro("A ação não foi registrada. Pontos e conquistas não foram alterados.")
    return True


def registrar_acao_sustentavel(usuario):
    """Mostra o menu de categorias e leva para o registro da categoria escolhida."""
    if usuario["admin"]:
        erro("Administradores não participam da competição.")
        return

    while True:
        cabecalho("REGISTRAR AÇÃO SUSTENTÁVEL")

        if dados.ranking_esta_encerrado():
            print("  Atenção: o ranking mensal já foi encerrado.")
            print("  Você ainda pode registrar ações, mas elas não geram pontos.\n")

        mostrar_lista_opcoes(CATEGORIAS, "nome")
        print("  0. Voltar")

        opcao = ler_opcao("\n  Escolha a categoria: ")
        if opcao == "0":
            return

        if not opcao.isdigit():
            erro("Opção inválida.")
            continue

        numero = int(opcao)
        if numero < 1 or numero > len(CATEGORIAS):
            erro("Opção inválida.")
            continue

        categoria = CATEGORIAS[numero - 1]

        if categoria["chave"] == "plantio":
            pronto = registrar_plantio(usuario)
        elif categoria["chave"] == "energia":
            pronto = registrar_energia(usuario)
        else:
            pronto = registrar_por_quantidade(usuario, categoria)

        if pronto:
            return


def ver_ranking():
    """Imprime o ranking dos participantes e o líder do ciclo."""
    cabecalho("RANKING ECOSCORE")

    matriz = dados.montar_matriz_ranking()
    if len(matriz) == 0:
        print("  Nenhum participante cadastrado ainda.")
        return

    mostrar_matriz(matriz, ["POS", "NOME", "E-MAIL", "PONTOS"], [6, 20, 30, 8])

    linha()
    print("  Líder do ciclo: " + matriz[0][dados.COL_NOME])


def montar_matriz_conquistas(usuario):
    """Monta a matriz com o andamento de cada conquista do usuário."""
    impacto = calcular_impacto(usuario)
    matriz = []

    for conquista in CONQUISTAS:
        valor_atual = impacto[conquista["metrica"]]
        meta = conquista["meta"]

        if conquista["nome"] in usuario["conquistas"]:
            status = "DESBLOQUEADA"
        elif valor_atual > 0:
            status = "EM PROGRESSO"
        else:
            status = "BLOQUEADA"

        #para não aparecer algo como 12/10
        if valor_atual > meta:
            valor_atual = meta

        progresso = formatar_numero(valor_atual) + "/" + formatar_numero(meta) + " " + conquista["unidade"]
        matriz.append([conquista["nome"], status, progresso])

    return matriz


def ver_conquistas(usuario):
    """Imprime a tabela de conquistas e o que fazer para desbloquear cada uma."""
    cabecalho("CONQUISTAS ECOSCORE")

    matriz = montar_matriz_conquistas(usuario)
    mostrar_matriz(matriz, ["CONQUISTA", "STATUS", "PROGRESSO"], [22, 16, 24])

    linha()
    print("  Como desbloquear:")
    for conquista in CONQUISTAS:
        print("  - " + conquista["nome"] + ": " + conquista["objetivo"])


def ver_status_competicao():
    """Imprime se o ranking está ativo ou encerrado, quantos participam e quem lidera."""
    cabecalho("STATUS DA COMPETIÇÃO")

    if dados.ranking_esta_encerrado():
        print("  Ranking: ENCERRADO")
    else:
        print("  Ranking: ATIVO")

    print("  Participantes cadastrados: " + str(len(dados.usuarios_comuns())))

    lider = dados.buscar_lider()
    if lider is None:
        print("\n  Nenhum participante cadastrado ainda.")
        return

    print("\n  Líder atual: " + lider["nome"] + " - " + str(lider["pontos"]) + " Soul Points")

    if dados.ranking_esta_encerrado():
        print("  O ciclo deste mês já tem um campeão.")
    else:
        faltam = META_PONTOS - lider["pontos"]
        print("  Faltam " + str(faltam) + " pontos para encerrar o ranking.")
