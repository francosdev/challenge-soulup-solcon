# ============================================================
#  EcoScore - impacto ambiental e historico
# ============================================================

from config import CATEGORIAS
from interface import cabecalho, linha


def formatar_quantidade(valor):
    if type(valor) == int:
        return str(valor)
    if type(valor) == float:
        if int(valor) == valor:
            return str(int(valor))
        return str(valor)
    return str(valor)


def texto_normalizado(texto):
    return str(texto).lower()


def categoria_eh(categoria, slug):
    texto = texto_normalizado(categoria)

    if slug == "plantio":
        return "plantio" in texto
    if slug == "reciclagem":
        return "reciclagem" in texto
    if slug == "agua":
        return "agua" in texto or "água" in texto or "gua" in texto
    if slug == "energia":
        return "energia" in texto

    return False


def calcular_impacto(usuario):
    impacto = {
        "mudas": 0,
        "hortas": 0,
        "plantio": 0,
        "compostagem": 0,
        "polinizadores": 0,
        "reaproveitados": 0,
        "reciclado": 0,
        "agua": 0,
        "energia": 0,
    }

    for acao in usuario["historico"]:
        categoria = acao["categoria"]
        descricao = texto_normalizado(acao["descricao"])
        quantidade = acao["quantidade"]

        if categoria_eh(categoria, "plantio"):
            impacto["plantio"] = impacto["plantio"] + 1

            if "muda" in descricao or "arvore" in descricao or "árvore" in descricao:
                impacto["mudas"] = impacto["mudas"] + quantidade
            elif "horta" in descricao:
                impacto["hortas"] = impacto["hortas"] + quantidade
            elif "compostagem" in descricao:
                impacto["compostagem"] = impacto["compostagem"] + quantidade
            elif "polinizadores" in descricao:
                impacto["polinizadores"] = impacto["polinizadores"] + quantidade
            elif "reaproveitar" in descricao:
                impacto["reaproveitados"] = impacto["reaproveitados"] + quantidade
        elif categoria_eh(categoria, "reciclagem"):
            impacto["reciclado"] = impacto["reciclado"] + quantidade
        elif categoria_eh(categoria, "agua"):
            impacto["agua"] = impacto["agua"] + quantidade
        elif categoria_eh(categoria, "energia"):
            impacto["energia"] = impacto["energia"] + quantidade

    return impacto


def icone_categoria(categoria):
    if categoria_eh(categoria, "plantio"):
        return "🌱"
    if categoria_eh(categoria, "reciclagem"):
        return "♻️"
    if categoria_eh(categoria, "agua"):
        return "💧"
    if categoria_eh(categoria, "energia"):
        return "⚡"
    return "🌿"


def unidade_acao(acao):
    categoria = acao["categoria"]
    descricao = texto_normalizado(acao["descricao"])

    if categoria_eh(categoria, "reciclagem"):
        return "kg"
    if categoria_eh(categoria, "agua"):
        return "L"
    if categoria_eh(categoria, "energia"):
        return " acoes"
    if "compostagem" in descricao or "reaproveitar" in descricao:
        return "kg"
    if "muda" in descricao or "arvore" in descricao or "árvore" in descricao:
        return " mudas"
    if "horta" in descricao:
        return " vasos/canteiros"
    if "polinizadores" in descricao:
        return " flores/plantas"
    return " acoes"


def exibir_item_historico(acao):
    categoria = acao["categoria"]
    descricao = acao["descricao"]
    quantidade = formatar_quantidade(acao["quantidade"])
    unidade = unidade_acao(acao)

    linha("·")
    if categoria == descricao:
        print(f"  {icone_categoria(categoria)} {categoria}")
    else:
        print(f"  {icone_categoria(categoria)} {categoria} | {descricao}")
    print(f"  Quantidade: {quantidade}{unidade}")
    print(f"  EcoPoints: +{acao['pontos']}")
    print(f"  Data: {acao['data']}")


def exibir_historico(usuario, limite=5, permitir_ver_tudo=True):
    acoes = usuario["historico"]

    if not acoes:
        print("  Nenhuma acao registrada ainda.")
        return

    if limite is None or len(acoes) <= limite:
        acoes_exibidas = list(acoes)
        titulo = "Historico completo:"
    else:
        acoes_exibidas = acoes[-limite:]
        titulo = f"Ultimas {limite} acoes:"

    print(f"  {titulo}")
    acoes_exibidas.reverse()

    for acao in acoes_exibidas:
        exibir_item_historico(acao)

    if permitir_ver_tudo and limite is not None and len(acoes) > limite:
        print("\n  1. Ver historico completo")
        print("  0. Continuar")
        opcao = input("\n  Opcao: ").strip()

        if opcao == "1":
            print()
            exibir_historico(usuario, None, False)


def exibir_impacto(usuario):
    impacto = calcular_impacto(usuario)

    cabecalho("IMPACTO AMBIENTAL")
    print(f"  🌱 Mudas/arvores plantadas: {formatar_quantidade(impacto['mudas'])}")
    print(f"  🥬 Hortas cultivadas: {formatar_quantidade(impacto['hortas'])} vasos/canteiros")
    print(f"  🌿 Acoes de plantio/jardinagem: {formatar_quantidade(impacto['plantio'])}")
    print(f"  🍂 Residuos organicos compostados: {formatar_quantidade(impacto['compostagem'])} kg")
    print(f"  🌸 Plantas para polinizadores: {formatar_quantidade(impacto['polinizadores'])}")
    print(f"  ♻️ Residuos organicos reaproveitados: {formatar_quantidade(impacto['reaproveitados'])} kg")
    print()
    print(f"  ♻️ Material reciclado: {formatar_quantidade(impacto['reciclado'])} kg")
    print(f"  💧 Agua economizada: {formatar_quantidade(impacto['agua'])} litros")
    print(f"  ⚡ Acoes de energia: {formatar_quantidade(impacto['energia'])}")


def exibir_impacto_resumido(usuario):
    impacto = calcular_impacto(usuario)

    print(f"  🌱 Acoes de plantio: {formatar_quantidade(impacto['plantio'])}")
    print(f"  🥬 Hortas cultivadas: {formatar_quantidade(impacto['hortas'])}")
    print(f"  ♻️ Material reciclado: {formatar_quantidade(impacto['reciclado'])} kg")
    print(f"  💧 Agua economizada: {formatar_quantidade(impacto['agua'])} litros")
    print(f"  ⚡ Acoes de energia: {formatar_quantidade(impacto['energia'])}")


def resumir_acao_publica(acao):
    categoria = acao["categoria"]
    descricao = acao["descricao"]
    quantidade = formatar_quantidade(acao["quantidade"])
    unidade = unidade_acao(acao)

    if categoria == descricao:
        return f"{categoria} | {quantidade}{unidade} | +{acao['pontos']} pts | {acao['data']}"

    return f"{categoria} | {descricao} | +{acao['pontos']} pts | {acao['data']}"
