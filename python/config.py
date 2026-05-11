# ============================================================
#  EcoScore - configuracoes gerais
# ============================================================

import os

BASE_DIR = os.path.dirname(__file__)
ROOT_DIR = os.path.dirname(BASE_DIR)

ARQUIVO_DADOS = os.path.join(BASE_DIR, "ecoscore_dados.json")
ARQUIVO_DADOS_LEGADO = os.path.join(ROOT_DIR, "ecoscore_dados.json")

ADMIN_EMAIL = "admin@ecoscore.com"
META_PONTOS = 100
HASH_ADMIN_LEGADO_FRACO = "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9"

CATEGORIAS = {
    "1": {"nome": "Plantio e Jardinagem", "slug": "plantio", "peso": 5.0},
    "2": {"nome": "Reciclagem de Residuos", "slug": "reciclagem", "peso": 3.0},
    "3": {"nome": "Economia de Agua", "slug": "agua", "peso": 0.1},
    "4": {"nome": "Reducao de Energia", "slug": "energia", "peso": 2.0},
}

ACOES_PLANTIO = {
    "1": {"descricao": "Plantar muda ou arvore", "unidade": "mudas", "pontos": 5},
    "2": {"descricao": "Cultivar horta domestica", "unidade": "vasos/canteiros", "pontos": 4},
    "3": {"descricao": "Compostagem Organica", "unidade": "kg", "pontos": 3},
    "5": {"descricao": "Criar jardim para polinizadores", "unidade": "flores/plantas", "pontos": 6},
    "6": {"descricao": "Reaproveitar residuos organicos", "unidade": "kg", "pontos": 2},
}

ACOES_CUIDADO = {
    "1": {"descricao": "Regar corretamente", "pontos": 2},
    "2": {"descricao": "Adubar naturalmente", "pontos": 2},
    "3": {"descricao": "Podar sem desperdicio", "pontos": 2},
}

ACOES_ENERGIA = {
    "1": {"descricao": "Desliguei luzes em ambientes vazios", "pontos": 2},
    "2": {"descricao": "Desliguei aparelhos em standby", "pontos": 2},
    "3": {"descricao": "Reduzi uso do ar condicionado", "pontos": 2},
    "4": {"descricao": "Usei luz natural no lugar da artificial", "pontos": 2},
    "5": {"descricao": "Lavei roupa com agua fria", "pontos": 2},
}

CONQUISTAS = {
    "Primeiro Broto": {
        "icone": "🌱",
        "objetivo": "Registrar sua primeira acao sustentavel.",
        "mensagem": "Voce registrou sua primeira acao sustentavel!",
    },
    "Reciclador Ativo": {
        "icone": "♻️",
        "objetivo": "Reciclar 10kg de material.",
        "mensagem": "Voce reciclou 10kg de materiais no ciclo mensal!",
    },
    "Agua Consciente": {
        "icone": "💧",
        "objetivo": "Economizar 100 litros de agua.",
        "mensagem": "Voce economizou 100 litros de agua!",
    },
    "Energia Inteligente": {
        "icone": "⚡",
        "objetivo": "Registrar 5 acoes de energia.",
        "mensagem": "Voce registrou 5 acoes de economia de energia!",
    },
    "Mao Verde": {
        "icone": "🌿",
        "objetivo": "Registrar 5 acoes de plantio.",
        "mensagem": "Voce registrou 5 acoes de plantio e jardinagem!",
    },
    "Campeao EcoScore": {
        "icone": "🏆",
        "objetivo": "Atingir 100 EcoPoints.",
        "mensagem": "Voce atingiu 100 EcoPoints!",
    },
}
