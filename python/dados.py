#EcoScore - usuários, arquivo JSON e ranking

import json
import os
from datetime import datetime

from autenticacao import criptografar_senha
from config import ARQUIVO_CORROMPIDO, ARQUIVO_DADOS, ARQUIVO_LOG, META_PONTOS

#lista de usuários (cada usuário é um dicionário)
usuarios = []

#posição de cada coluna na matriz do ranking
COL_POSICAO = 0
COL_NOME = 1
COL_EMAIL = 2
COL_PONTOS = 3


def data_de_hoje():
    """Devolve a data e a hora atuais em texto, no formato dd/mm/aaaa hh:mm."""
    return datetime.now().strftime("%d/%m/%Y %H:%M")


def criar_usuario(nome, email, senha, admin=False):
    """Monta o dicionário de um usuário novo, com a senha já criptografada."""
    return {
        "nome": nome.strip(),
        "email": email.strip(),
        "senha": criptografar_senha(senha),
        "pontos": 0,
        "historico": [],
        "conquistas": [],
        "admin": admin,
    }


def criar_acao(categoria, tipo, descricao, quantidade, unidade, pontos):
    """Monta o dicionário de uma ação sustentável para guardar no histórico."""
    return {
        "categoria": categoria,
        "tipo": tipo,
        "descricao": descricao,
        "quantidade": quantidade,
        "unidade": unidade,
        "pontos": pontos,
        "data": data_de_hoje(),
    }


def arrumar_usuario(usuario):
    """Completa ou corrige os campos de um usuário lido do arquivo JSON."""
    #se alguém mexer no JSON na mão e apagar ou estragar um campo, o programa não quebra
    modelo = {
        "nome": "Usuário sem nome",
        "email": "",
        "senha": "",
        "pontos": 0,
        "historico": [],
        "conquistas": [],
        "admin": False,
    }

    for campo in modelo:
        if campo not in usuario or type(usuario[campo]) != type(modelo[campo]):
            usuario[campo] = modelo[campo]

    return usuario


def carregar_dados():
    """Lê o arquivo JSON e preenche a lista de usuários do sistema."""
    #esvazia a lista sem criar outra, por isso não precisa de global
    usuarios.clear()

    if not os.path.exists(ARQUIVO_DADOS):
        return

    arquivo = None
    corrompido = False

    try:
        arquivo = open(ARQUIVO_DADOS, "r", encoding="utf-8")
        dados_lidos = json.load(arquivo)
        #se o JSON for uma lista em vez de dicionário, o .get dá AttributeError
        lista = dados_lidos.get("usuarios", [])
        if type(lista) != list:
            raise ValueError("o campo usuarios não é uma lista")
    except (ValueError, OSError, AttributeError):
        corrompido = True
        print("  [!] O arquivo de dados está corrompido. O sistema vai começar vazio.")
    else:
        ignorados = 0
        for usuario in lista:
            if type(usuario) == dict:
                usuarios.append(arrumar_usuario(usuario))
            else:
                ignorados += 1

        if ignorados > 0:
            print("  [!] " + str(ignorados) + " registro(s) inválido(s) do arquivo foram ignorados.")
    finally:
        if arquivo is not None:
            arquivo.close()

    #só dá para renomear depois que o arquivo foi fechado no finally
    if corrompido:
        guardar_arquivo_corrompido()


def guardar_arquivo_corrompido():
    """Renomeia o arquivo de dados quebrado para ele não ser apagado na próxima gravação."""
    try:
        os.replace(ARQUIVO_DADOS, ARQUIVO_CORROMPIDO)
    except OSError:
        print("  [!] Não foi possível guardar o arquivo quebrado. Ele será substituído na próxima gravação.")
    else:
        print(f"  [!] O arquivo quebrado foi guardado em: {ARQUIVO_CORROMPIDO}")


def salvar_dados():
    """Grava a lista de usuários no arquivo JSON."""
    dados_para_salvar = {"usuarios": usuarios}

    arquivo = None

    try:
        arquivo = open(ARQUIVO_DADOS, "w", encoding="utf-8")
        json.dump(dados_para_salvar, arquivo, ensure_ascii=False, indent=4)
        #grava agora, para um erro de disco cair no except
        arquivo.flush()
    except OSError:
        print("  [!] Não foi possível salvar os dados no arquivo.")
        return False
    else:
        return True
    finally:
        if arquivo is not None:
            arquivo.close()


def registrar_log(evento, detalhe):
    """Acrescenta uma linha no arquivo de auditoria com data, evento e detalhe."""
    try:
        arquivo = open(ARQUIVO_LOG, "a", encoding="utf-8")
        arquivo.write(f"{data_de_hoje()} | {evento} | {detalhe}\n")
        arquivo.close()
    except OSError:
        pass


def buscar_por_email(email):
    """Procura um usuário pelo e-mail, sem diferenciar maiúsculas de minúsculas."""
    email = email.strip().lower()

    for usuario in usuarios:
        if usuario["email"].lower() == email:
            return usuario

    return None


def email_disponivel(email, dono_atual=None):
    """Verifica se um e-mail ainda não está sendo usado por outra conta."""
    email = email.strip().lower()

    for usuario in usuarios:
        if usuario != dono_atual and usuario["email"].lower() == email:
            return False

    return True


def buscar_por_nome(nome, incluir_admin=False):
    """Procura os usuários que têm o texto digitado em alguma parte do nome."""
    encontrados = []
    procurado = nome.strip().lower()

    for usuario in usuarios:
        if usuario["admin"] and not incluir_admin:
            continue
        if procurado in usuario["nome"].lower():
            encontrados.append(usuario)

    return encontrados


def usuarios_comuns():
    """Separa os participantes da competição, deixando os administradores de fora."""
    comuns = []

    for usuario in usuarios:
        if not usuario["admin"]:
            comuns.append(usuario)

    return comuns


def remover_usuario(alvo):
    """Apaga um usuário da lista e grava o arquivo."""
    for i in range(len(usuarios)):
        if usuarios[i] == alvo:
            usuarios.pop(i)

            if salvar_dados():
                return True

            #não salvou: coloca o usuário de volta no mesmo lugar
            usuarios.insert(i, alvo)
            return False

    return False


def ordenar_matriz_por_pontos(matriz):
    """Ordena a matriz do ranking do maior para o menor número de pontos."""
    for i in range(len(matriz)):
        for j in range(len(matriz) - 1):
            if matriz[j][COL_PONTOS] < matriz[j + 1][COL_PONTOS]:
                linha_guardada = matriz[j]
                matriz[j] = matriz[j + 1]
                matriz[j + 1] = linha_guardada

    return matriz


def montar_matriz_ranking():
    """Monta a matriz do ranking com os participantes ordenados por pontos."""
    matriz = []

    for usuario in usuarios_comuns():
        matriz.append([0, usuario["nome"], usuario["email"], usuario["pontos"]])

    ordenar_matriz_por_pontos(matriz)

    #numera as posições depois de ordenar
    for i in range(len(matriz)):
        matriz[i][COL_POSICAO] = i + 1

    return matriz


def posicao_no_ranking(usuario):
    """Descobre em que lugar do ranking o usuário está."""
    if usuario["admin"]:
        return 0

    matriz = montar_matriz_ranking()
    for i in range(len(matriz)):
        if matriz[i][COL_EMAIL] == usuario["email"]:
            return matriz[i][COL_POSICAO]

    return 0


def buscar_lider():
    """Devolve o participante que está em primeiro lugar no ranking."""
    matriz = montar_matriz_ranking()

    if len(matriz) == 0:
        return None

    return buscar_por_email(matriz[0][COL_EMAIL])


def ranking_esta_encerrado():
    """Verifica se algum participante já chegou à meta de pontos do mês."""
    for usuario in usuarios_comuns():
        if usuario["pontos"] >= META_PONTOS:
            return True

    return False
