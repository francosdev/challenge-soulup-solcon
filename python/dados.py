# ============================================================
#  EcoScore - persistência, migração e estado global
# ============================================================

import json
import os
from datetime import datetime

from autenticacao import ler_senha_oculta, normalizar_senha, senha_valida
from config import ADMIN_EMAIL, ARQUIVO_DADOS, ARQUIVO_DADOS_LEGADO, ARQUIVO_LOG, META_PONTOS
from interface import cabecalho

usuarios = []
ranking_encerrado = False


def data_atual():
    """Retorna data e hora atuais no formato usado no histórico e logs."""
    return datetime.now().strftime("%d/%m/%Y %H:%M")


def eh_numero_positivo(texto):
    texto = str(texto).strip().replace(",", ".")

    if len(texto) == 0:
        return False

    pontos_decimais = 0
    tem_digito = False

    for caractere in texto:
        if caractere == ".":
            pontos_decimais = pontos_decimais + 1
            if pontos_decimais > 1:
                return False
        elif caractere >= "0" and caractere <= "9":
            tem_digito = True
        else:
            return False

    if not tem_digito:
        return False
    if float(texto) <= 0:
        return False

    return True


def normalizar_inteiro(valor):
    if type(valor) == bool:
        return 0
    if type(valor) == int:
        return max(0, valor)
    if type(valor) == float:
        return max(0, int(valor))
    if type(valor) == str and eh_numero_positivo(valor):
        return max(0, int(float(valor.replace(",", "."))))
    return 0


def normalizar_quantidade(valor):
    if type(valor) == bool:
        return 0
    if type(valor) == int or type(valor) == float:
        return max(0, valor)
    if type(valor) == str and eh_numero_positivo(valor):
        return float(valor.replace(",", "."))
    return 0


def item_antigo(sequencia, indice, padrao=None):
    if len(sequencia) > indice:
        return sequencia[indice]
    return padrao


def criar_acao(categoria, descricao, quantidade, pontos, data=None):
    """Cria uma ação sustentável no formato atual do sistema."""
    if data is None or data == "":
        data = data_atual()

    return {
        "categoria": str(categoria),
        "descricao": str(descricao),
        "quantidade": normalizar_quantidade(quantidade),
        "pontos": normalizar_inteiro(pontos),
        "data": str(data),
    }


def criar_usuario(nome, email, senha, pontos=0, historico=None, conquistas=None, admin=False):
    """Cria um usuário no modelo de dicionário usado pela aplicação."""
    if historico is None:
        historico = []
    if conquistas is None:
        conquistas = []

    return {
        "nome": str(nome).strip() or "Usuario sem nome",
        "email": str(email).strip(),
        "senha": normalizar_senha(senha),
        "pontos": normalizar_inteiro(pontos),
        "historico": normalizar_historico(historico),
        "conquistas": normalizar_conquistas(conquistas),
        "admin": bool(admin),
    }


def normalizar_acao(acao):
    """Migra ações antigas em listas/tuplas para dicionários."""
    if type(acao) == dict:
        return criar_acao(
            acao.get("categoria", ""),
            acao.get("descricao", acao.get("categoria", "")),
            acao.get("quantidade", 0),
            acao.get("pontos", 0),
            acao.get("data", "Data não disponível"),
        )

    if type(acao) == list or type(acao) == tuple:
        if len(acao) >= 5:
            return criar_acao(
                item_antigo(acao, 0),
                item_antigo(acao, 1),
                item_antigo(acao, 2),
                item_antigo(acao, 3),
                item_antigo(acao, 4),
            )
        if len(acao) == 4:
            return criar_acao(
                item_antigo(acao, 0),
                item_antigo(acao, 1),
                item_antigo(acao, 2),
                item_antigo(acao, 3),
                "Data não disponível",
            )
        if len(acao) == 3:
            categoria = item_antigo(acao, 0)
            segundo_campo = item_antigo(acao, 1)
            terceiro_campo = item_antigo(acao, 2)

            if type(segundo_campo) == str:
                return criar_acao(categoria, segundo_campo, 1, terceiro_campo, "Data não disponível")
            return criar_acao(categoria, categoria, segundo_campo, terceiro_campo, "Data não disponível")

    return criar_acao("Ação", "Registro antigo", 0, 0, "Data não disponível")


def normalizar_historico(historico):
    historico_normalizado = []

    if type(historico) != list:
        return historico_normalizado

    for acao in historico:
        historico_normalizado.append(normalizar_acao(acao))

    return historico_normalizado


def normalizar_conquistas(conquistas):
    from config import CONQUISTAS

    conquistas_normalizadas = []

    if type(conquistas) != list:
        return conquistas_normalizadas

    for conquista in conquistas:
        nome = str(conquista)
        texto = nome.lower()

        if "primeiro" in texto:
            nome = "Primeiro Broto"
        elif "reciclador" in texto:
            nome = "Reciclador Ativo"
        elif "agua" in texto or "água" in texto or "gua" in texto:
            nome = "Água Consciente"
        elif "energia" in texto:
            nome = "Energia Inteligente"
        elif "verde" in texto:
            nome = "Mão Verde"
        elif "campe" in texto:
            nome = "Campeão EcoScore"

        if nome in CONQUISTAS and nome not in conquistas_normalizadas:
            conquistas_normalizadas.append(nome)

    return conquistas_normalizadas


def normalizar_usuario(usuario):
    """Migra usuários antigos em listas para o modelo atual de dicionário."""
    if type(usuario) == dict:
        return criar_usuario(
            usuario.get("nome", ""),
            usuario.get("email", ""),
            usuario.get("senha", ""),
            usuario.get("pontos", 0),
            usuario.get("historico", []),
            usuario.get("conquistas", []),
            usuario.get("admin", False),
        )

    if type(usuario) == list or type(usuario) == tuple:
        nome = item_antigo(usuario, 0, "")
        email = item_antigo(usuario, 1, "")

        if len(usuario) >= 7:
            return criar_usuario(nome, email, item_antigo(usuario, 2), item_antigo(usuario, 3), item_antigo(usuario, 4), item_antigo(usuario, 5), item_antigo(usuario, 6))
        if len(usuario) == 6:
            return criar_usuario(nome, email, item_antigo(usuario, 2), item_antigo(usuario, 3), item_antigo(usuario, 4), item_antigo(usuario, 5), False)
        if len(usuario) == 5:
            return criar_usuario(nome, email, item_antigo(usuario, 2), item_antigo(usuario, 3), item_antigo(usuario, 4), [], False)
        if len(usuario) == 4:
            return criar_usuario(nome, email, "", item_antigo(usuario, 2), item_antigo(usuario, 3), [], False)

    return criar_usuario("Usuário sem nome", "", "", 0, [], [], False)


def normalizar_usuarios():
    global usuarios

    normalizados = []
    for usuario in usuarios:
        normalizados.append(normalizar_usuario(usuario))
    usuarios = normalizados


def caminho_para_carregar():
    if os.path.exists(ARQUIVO_DADOS):
        return ARQUIVO_DADOS
    if os.path.exists(ARQUIVO_DADOS_LEGADO):
        return ARQUIVO_DADOS_LEGADO
    return None


def carregar_dados():
    """Carrega JSON, aplica migração automática e garante o admin padrão."""
    global usuarios, ranking_encerrado

    caminho = caminho_para_carregar()

    if caminho is not None:
        with open(caminho, "r", encoding="utf-8") as arquivo:
            dados = json.load(arquivo)

        if type(dados) == dict:
            usuarios = dados.get("usuarios", [])
            ranking_encerrado = bool(dados.get("ranking_encerrado", False))
        elif type(dados) == list:
            usuarios = dados
            ranking_encerrado = False

    normalizar_usuarios()
    garantir_admin_padrao()
    recalcular_ranking_encerrado()
    salvar_dados()


def salvar_dados():
    """Persiste usuários e estado do ranking em JSON."""
    dados = {
        "ranking_encerrado": ranking_encerrado,
        "usuarios": usuarios,
    }

    with open(ARQUIVO_DADOS, "w", encoding="utf-8") as arquivo:
        json.dump(dados, arquivo, ensure_ascii=False, indent=4)


def registrar_log(evento, detalhe):
    """Registra auditoria simples para ações críticas do sistema."""
    linha_log = f"{data_atual()} | {evento} | {detalhe}\n"

    with open(ARQUIVO_LOG, "a", encoding="utf-8") as arquivo:
        arquivo.write(linha_log)


def garantir_admin_padrao():
    """Cria ou normaliza a conta administrativa do EcoScore."""
    admin = buscar_usuario_por_email(ADMIN_EMAIL)

    if admin is not None:
        admin["nome"] = "Admin"
        admin["email"] = ADMIN_EMAIL
        admin["senha"] = normalizar_senha(admin["senha"])
        admin["admin"] = True
        return

    cabecalho("CONFIGURAÇÃO DO ADMINISTRADOR")
    print("  Nenhuma conta administradora foi encontrada.")
    print("  Crie uma senha forte para o admin padrão do EcoScore.\n")

    while True:
        senha = ler_senha_oculta("  Nova senha do admin: ").strip()
        confirmar = ler_senha_oculta("  Confirmar senha: ").strip()

        if not senha_valida(senha):
            print("  [!] A senha do admin deve ter pelo menos 6 caracteres.")
        elif senha != confirmar:
            print("  [!] As senhas não conferem.")
        else:
            usuarios.append(criar_usuario("Admin", ADMIN_EMAIL, senha, 0, [], [], True))
            print("\n  Conta administradora criada com segurança.")
            return


def buscar_usuario_por_email(email):
    """Busca usuário por e-mail sem diferenciar maiúsculas e minúsculas."""
    email = email.strip().lower()

    for usuario in usuarios:
        if usuario["email"].lower() == email:
            return usuario

    return None


def email_disponivel(email, usuario_atual=None):
    for usuario in usuarios:
        if usuario is not usuario_atual and usuario["email"].lower() == email.lower():
            return False
    return True


def usuarios_comuns():
    comuns = []

    for usuario in usuarios:
        if not usuario["admin"]:
            comuns.append(usuario)

    return comuns


def buscar_usuarios_por_nome(nome, incluir_admin=False):
    encontrados = []
    termo = nome.strip().lower()

    for usuario in usuarios:
        if (incluir_admin or not usuario["admin"]) and termo in usuario["nome"].lower():
            encontrados.append(usuario)

    return encontrados


def obter_ranking():
    """Retorna usuários comuns ordenados por Soul Points."""
    def pegar_pontos(usuario):
        return usuario["pontos"]

    return sorted(usuarios_comuns(), key=pegar_pontos, reverse=True)


def calcular_posicao_ranking(usuario_alvo):
    if usuario_alvo["admin"]:
        return 0

    for posicao, usuario in enumerate(obter_ranking(), start=1):
        if usuario is usuario_alvo:
            return posicao

    return 0


def buscar_lider():
    ranking = obter_ranking()

    if not ranking:
        return None

    return ranking[0]


def recalcular_ranking_encerrado():
    """Recalcula o encerramento do ranking considerando apenas usuários comuns."""
    global ranking_encerrado

    ranking_encerrado = False
    for usuario in usuarios_comuns():
        if usuario["pontos"] >= META_PONTOS:
            ranking_encerrado = True
