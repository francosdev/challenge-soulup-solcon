#EcoScore - valores fixos usados pelo sistema todo

import os

#os arquivos de dados ficam na mesma pasta do código
PASTA = os.path.dirname(__file__)
ARQUIVO_DADOS = os.path.join(PASTA, "ecoscore_dados.json")
ARQUIVO_LOG = os.path.join(PASTA, "ecoscore_auditoria.txt")
ARQUIVO_CORROMPIDO = os.path.join(PASTA, "ecoscore_dados_corrompido.json")

ADMIN_EMAIL = "admin@ecoscore.com"
META_PONTOS = 100         #pontos para ganhar o mês
LIMITE_PONTOS_ACAO = 25   #máximo de pontos numa ação só
LIMITE_QUANTIDADE = 1000  #quantidade máxima num registro só
TAMANHO_BARRA = 10        #quantos blocos a barra de progresso tem
MINIMO_SENHA = 6

#tupla porque essas opções nunca mudam
OPCOES_MENU_INICIAL = ("1", "2", "3", "0")

#a chave é salva no histórico e o nome aparece na tela
CATEGORIAS = [
    {"chave": "plantio",    "nome": "Plantio e Jardinagem",   "peso": 5.0},
    {"chave": "reciclagem", "nome": "Reciclagem de Resíduos", "peso": 3.0},
    {"chave": "agua",       "nome": "Economia de Água",       "peso": 0.1},
    {"chave": "energia",    "nome": "Redução de Energia",     "peso": 2.0},
]

#o tipo é usado para somar o impacto ambiental
ACOES_PLANTIO = [
    {"descricao": "Plantar muda ou árvore",         "unidade": "mudas",           "pontos": 5, "tipo": "mudas"},
    {"descricao": "Cultivar horta doméstica",       "unidade": "vasos/canteiros", "pontos": 4, "tipo": "hortas"},
    {"descricao": "Compostagem orgânica",           "unidade": "kg",              "pontos": 3, "tipo": "compostagem"},
    {"descricao": "Criar jardim para polinizadores","unidade": "flores/plantas",  "pontos": 6, "tipo": "polinizadores"},
    {"descricao": "Reaproveitar resíduos orgânicos","unidade": "kg",              "pontos": 2, "tipo": "reaproveitados"},
]

#cuidados com uma planta que já existe (dá para marcar vários)
ACOES_CUIDADO = [
    {"descricao": "Regar corretamente",   "pontos": 2},
    {"descricao": "Adubar naturalmente",  "pontos": 2},
    {"descricao": "Podar sem desperdício","pontos": 2},
]

#dá para marcar várias
ACOES_ENERGIA = [
    {"descricao": "Desliguei luzes em ambientes vazios",   "pontos": 2},
    {"descricao": "Desliguei aparelhos em standby",        "pontos": 2},
    {"descricao": "Reduzi o uso do ar condicionado",       "pontos": 2},
    {"descricao": "Usei luz natural no lugar da artificial","pontos": 2},
    {"descricao": "Lavei roupa com água fria",             "pontos": 2},
]

#metrica é o número do impacto que vai ser comparado com a meta
CONQUISTAS = [
    {"nome": "Primeiro Broto",     "objetivo": "Registrar a primeira ação sustentável.", "metrica": "total_acoes", "meta": 1,           "unidade": "ação"},
    {"nome": "Reciclador Ativo",   "objetivo": "Reciclar 10 kg de material.",            "metrica": "reciclagem",  "meta": 10,          "unidade": "kg"},
    {"nome": "Água Consciente",    "objetivo": "Economizar 100 litros de água.",         "metrica": "agua",        "meta": 100,         "unidade": "litros"},
    {"nome": "Energia Inteligente","objetivo": "Registrar 5 ações de energia.",          "metrica": "energia",     "meta": 5,           "unidade": "ações"},
    {"nome": "Mão Verde",          "objetivo": "Registrar 5 ações de plantio.",          "metrica": "plantio",     "meta": 5,           "unidade": "ações"},
    {"nome": "Campeão EcoScore",   "objetivo": "Atingir 100 Soul Points.",               "metrica": "pontos",      "meta": META_PONTOS, "unidade": "Soul Points"},
]


def buscar_categoria(chave):
    """Procura uma categoria pela chave salva no histórico."""
    for categoria in CATEGORIAS:
        if categoria["chave"] == chave:
            return categoria
    return None


def nome_categoria(chave):
    """Devolve o nome da categoria para mostrar na tela."""
    categoria = buscar_categoria(chave)
    if categoria is None:
        return chave
    return categoria["nome"]
