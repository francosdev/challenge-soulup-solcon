# ============================================================
#  EcoScore - impacto ambiental e histórico
# ============================================================

from config import CATEGORIAS
from interface import cabecalho, linha


def formatar_quantidade(valor):
    """Remove casas decimais desnecessárias em quantidades."""
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
    """Calcula métricas ambientais acumuladas a partir do histórico."""
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
    """Retorna a unidade visual adequada para uma ação do histórico."""
    categoria = acao["categoria"]
    descricao = texto_normalizado(acao["descricao"])

    if categoria_eh(categoria, "reciclagem"):
        return "kg"
    if categoria_eh(categoria, "agua"):
        return "L"
    if categoria_eh(categoria, "energia"):
        return " ações"
    if "compostagem" in descricao or "reaproveitar" in descricao:
        return "kg"
    if "muda" in descricao or "arvore" in descricao or "árvore" in descricao:
        return " mudas"
    if "horta" in descricao:
        return " vasos/canteiros"
    if "polinizadores" in descricao:
        return " flores/plantas"
    return " ações"


def exibir_item_historico(acao):
    """Exibe uma ação do histórico em formato legível."""
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
    """Exibe histórico recente e permite abrir o histórico completo."""
    acoes = usuario["historico"]

    if not acoes:
        print("  Nenhuma ação registrada ainda.")
        return

    if limite is None or len(acoes) <= limite:
        acoes_exibidas = list(acoes)
        titulo = "Histórico completo:"
    else:
        acoes_exibidas = acoes[-limite:]
        titulo = f"Últimas {limite} ações:"

    print(f"  {titulo}")
    acoes_exibidas.reverse()

    for acao in acoes_exibidas:
        exibir_item_historico(acao)

    if permitir_ver_tudo and limite is not None and len(acoes) > limite:
        print("\n  1. Ver histórico completo")
        print("  0. Continuar")
        opcao = input("\n  Opção: ").strip()

        if opcao == "1":
            print()
            exibir_historico(usuario, None, False)


def exibir_impacto(usuario):
    """Mostra o impacto ambiental completo do usuário."""
    impacto = calcular_impacto(usuario)

    cabecalho("IMPACTO AMBIENTAL")
    print(f"  🌱 Mudas/árvores plantadas: {formatar_quantidade(impacto['mudas'])}")
    print(f"  🥬 Hortas cultivadas: {formatar_quantidade(impacto['hortas'])} vasos/canteiros")
    print(f"  🌿 Ações de plantio/jardinagem: {formatar_quantidade(impacto['plantio'])}")
    print(f"  🍂 Resíduos orgânicos compostados: {formatar_quantidade(impacto['compostagem'])} kg")
    print(f"  🌸 Plantas para polinizadores: {formatar_quantidade(impacto['polinizadores'])}")
    print(f"  ♻️ Resíduos orgânicos reaproveitados: {formatar_quantidade(impacto['reaproveitados'])} kg")
    print()
    print(f"  ♻️ Material reciclado: {formatar_quantidade(impacto['reciclado'])} kg")
    print(f"  💧 Água economizada: {formatar_quantidade(impacto['agua'])} litros")
    print(f"  ⚡ Ações de energia: {formatar_quantidade(impacto['energia'])}")


def exibir_impacto_resumido(usuario):
    """Mostra uma versão curta do impacto ambiental para perfil público."""
    impacto = calcular_impacto(usuario)

    print(f"  🌱 Ações de plantio: {formatar_quantidade(impacto['plantio'])}")
    print(f"  🥬 Hortas cultivadas: {formatar_quantidade(impacto['hortas'])}")
    print(f"  ♻️ Material reciclado: {formatar_quantidade(impacto['reciclado'])} kg")
    print(f"  💧 Água economizada: {formatar_quantidade(impacto['agua'])} litros")
    print(f"  ⚡ Ações de energia: {formatar_quantidade(impacto['energia'])}")


def resumir_acao_publica(acao):
    """Gera uma linha compacta para últimas ações em perfil público."""
    categoria = acao["categoria"]
    descricao = acao["descricao"]
    quantidade = formatar_quantidade(acao["quantidade"])
    unidade = unidade_acao(acao)

    if categoria == descricao:
        return f"{categoria} | {quantidade}{unidade} | +{acao['pontos']} pts | {acao['data']}"

    return f"{categoria} | {descricao} | +{acao['pontos']} pts | {acao['data']}"
