#EcoScore - impacto ambiental e histórico de ações

from config import nome_categoria
from interface import linha, mostrar_matriz


def formatar_numero(valor):
    """Transforma um número em texto, tirando o .0 quando ele for inteiro."""
    if valor == int(valor):
        return str(int(valor))
    return str(valor)


def calcular_impacto(usuario):
    """Soma tudo que o usuário fez, por categoria e por tipo de plantio."""
    impacto = {
        "total_acoes": 0,
        "pontos": usuario["pontos"],
        "plantio": 0,
        "reciclagem": 0,
        "agua": 0,
        "energia": 0,
        "mudas": 0,
        "hortas": 0,
        "compostagem": 0,
        "polinizadores": 0,
        "reaproveitados": 0,
    }

    for acao in usuario["historico"]:
        impacto["total_acoes"] += 1
        categoria = acao["categoria"]

        if categoria == "plantio":
            #conta quantas ações de plantio a pessoa fez
            impacto["plantio"] += 1

            #e soma a quantidade de cada tipo (mudas, hortas...)
            tipo = acao["tipo"]
            if tipo in impacto:
                impacto[tipo] += acao["quantidade"]
        elif categoria == "reciclagem":
            impacto["reciclagem"] += acao["quantidade"]
        elif categoria == "agua":
            impacto["agua"] += acao["quantidade"]
        elif categoria == "energia":
            impacto["energia"] += acao["quantidade"]

    return impacto


def montar_matriz_impacto(usuario, resumido=False):
    """Monta a matriz do impacto ambiental do usuário."""
    impacto = calcular_impacto(usuario)

    if resumido:
        return [
            ["Ações de plantio",   formatar_numero(impacto["plantio"]),    "ações"],
            ["Hortas cultivadas",  formatar_numero(impacto["hortas"]),     "vasos/canteiros"],
            ["Material reciclado", formatar_numero(impacto["reciclagem"]), "kg"],
            ["Água economizada",   formatar_numero(impacto["agua"]),       "litros"],
            ["Ações de energia",   formatar_numero(impacto["energia"]),    "ações"],
        ]

    return [
        ["Mudas/árvores plantadas",  formatar_numero(impacto["mudas"]),          "mudas"],
        ["Hortas cultivadas",        formatar_numero(impacto["hortas"]),         "vasos/canteiros"],
        ["Ações de plantio",         formatar_numero(impacto["plantio"]),        "ações"],
        ["Resíduos compostados",     formatar_numero(impacto["compostagem"]),    "kg"],
        ["Plantas p/ polinizadores", formatar_numero(impacto["polinizadores"]),  "flores/plantas"],
        ["Resíduos reaproveitados",  formatar_numero(impacto["reaproveitados"]), "kg"],
        ["Material reciclado",       formatar_numero(impacto["reciclagem"]),     "kg"],
        ["Água economizada",         formatar_numero(impacto["agua"]),           "litros"],
        ["Ações de energia",         formatar_numero(impacto["energia"]),        "ações"],
    ]


def exibir_impacto(usuario, resumido=False):
    """Imprime a tabela de impacto ambiental do usuário."""
    matriz = montar_matriz_impacto(usuario, resumido)
    mostrar_matriz(matriz, ["INDICADOR", "VALOR", "UNIDADE"], [28, 10, 18])


def texto_da_acao(acao):
    """Monta uma linha de resumo de uma ação, usada no perfil público."""
    quantidade = formatar_numero(acao["quantidade"])
    categoria = nome_categoria(acao["categoria"])
    return f"{categoria} | {acao['descricao']} | {quantidade} {acao['unidade']} | +{acao['pontos']} pts | {acao['data']}"


def exibir_acao(acao):
    """Imprime os detalhes de uma ação do histórico."""
    linha(".")
    print(f"  {nome_categoria(acao['categoria'])} - {acao['descricao']}")
    print(f"  Quantidade: {formatar_numero(acao['quantidade'])} {acao['unidade']}")
    print(f"  Soul Points: +{acao['pontos']}")
    print(f"  Data: {acao['data']}")


def exibir_historico(usuario, limite=0):
    """Imprime o histórico do usuário, da ação mais recente para a mais antiga."""
    historico = usuario["historico"]

    if len(historico) == 0:
        print("  Nenhuma ação registrada ainda.")
        return

    if limite > 0 and len(historico) > limite:
        acoes = historico[-limite:]
        print(f"  Últimas {limite} ações (de {len(historico)} no total):")
    else:
        acoes = historico
        print(f"  Histórico completo ({len(historico)} ações):")

    #de trás para frente, para a ação mais recente aparecer primeiro
    for i in range(len(acoes) - 1, -1, -1):
        exibir_acao(acoes[i])
