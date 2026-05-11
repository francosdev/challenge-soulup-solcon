# ============================================================
#  EcoScore - configuracoes gerais
# ============================================================

import os

BASE_DIR = os.path.dirname(__file__)
ROOT_DIR = os.path.dirname(BASE_DIR)

ARQUIVO_DADOS = os.path.join(BASE_DIR, "ecoscore_dados.json")
ARQUIVO_DADOS_LEGADO = os.path.join(ROOT_DIR, "ecoscore_dados.json")
ARQUIVO_LOG = os.path.join(BASE_DIR, "ecoscore_auditoria.txt")

ADMIN_EMAIL = "admin@ecoscore.com"
META_PONTOS = 100
HASH_ADMIN_LEGADO_FRACO = "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9"

CATEGORIAS = {
    "1": {"nome": "Plantio e Jardinagem", "slug": "plantio", "peso": 5.0},
    "2": {"nome": "Reciclagem de Resíduos", "slug": "reciclagem", "peso": 3.0},
    "3": {"nome": "Economia de Água", "slug": "agua", "peso": 0.1},
    "4": {"nome": "Redução de Energia", "slug": "energia", "peso": 2.0},
}

ACOES_PLANTIO = {
    "1": {"descricao": "Plantar muda ou árvore", "unidade": "mudas", "pontos": 5},
    "2": {"descricao": "Cultivar horta doméstica", "unidade": "vasos/canteiros", "pontos": 4},
    "3": {"descricao": "Compostagem Orgânica", "unidade": "kg", "pontos": 3},
    "5": {"descricao": "Criar jardim para polinizadores", "unidade": "flores/plantas", "pontos": 6},
    "6": {"descricao": "Reaproveitar resíduos orgânicos", "unidade": "kg", "pontos": 2},
}

ACOES_CUIDADO = {
    "1": {"descricao": "Regar corretamente", "pontos": 2},
    "2": {"descricao": "Adubar naturalmente", "pontos": 2},
    "3": {"descricao": "Podar sem desperdício", "pontos": 2},
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
        "objetivo": "Registrar sua primeira ação sustentável.",
        "mensagem": "Você registrou sua primeira ação sustentável!",
    },
    "Reciclador Ativo": {
        "icone": "♻️",
        "objetivo": "Reciclar 10kg de material.",
        "mensagem": "Você reciclou 10kg de materiais no ciclo mensal!",
    },
    "Água Consciente": {
        "icone": "💧",
        "objetivo": "Economizar 100 litros de água.",
        "mensagem": "Você economizou 100 litros de água!",
    },
    "Energia Inteligente": {
        "icone": "⚡",
        "objetivo": "Registrar 5 ações de energia.",
        "mensagem": "Você registrou 5 ações de economia de energia!",
    },
    "Mão Verde": {
        "icone": "🌿",
        "objetivo": "Registrar 5 ações de plantio.",
        "mensagem": "Você registrou 5 ações de plantio e jardinagem!",
    },
    "Campeão EcoScore": {
        "icone": "🏆",
        "objetivo": "Atingir 100 EcoPoints.",
        "mensagem": "Você atingiu 100 EcoPoints!",
    },
}
