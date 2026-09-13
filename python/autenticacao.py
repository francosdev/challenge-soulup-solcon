#EcoScore - funções de senha

import getpass
import hashlib

from config import MINIMO_SENHA


def criptografar_senha(senha):
    """Transforma a senha em hash SHA-256, para ela nunca ficar salva como texto."""
    return hashlib.sha256(senha.encode("utf-8")).hexdigest()


def ler_senha(mensagem):
    """Lê uma senha mostrando * no lugar de cada caractere digitado."""
    try:
        senha = getpass.getpass(mensagem, echo_char="*")
    except TypeError:
        senha = getpass.getpass(mensagem)
    return senha.strip()


def senha_valida(senha):
    """Confere se a senha tem o tamanho mínimo."""
    return len(senha) >= MINIMO_SENHA


def senha_confere(usuario, senha_digitada):
    """Confere se a senha digitada é a senha do usuário."""
    if senha_digitada == "":
        return False
    return criptografar_senha(senha_digitada) == usuario["senha"]


def ler_senha_nova(mensagem="  Senha: "):
    """Pede uma senha nova duas vezes, até ela ser válida e as duas serem iguais."""
    while True:
        senha = ler_senha(mensagem)

        if senha == "0":
            return None
        if not senha_valida(senha):
            print(f"  [!] A senha precisa ter pelo menos {MINIMO_SENHA} caracteres.")
            continue

        confirmacao = ler_senha("  Confirmar senha: ")
        if confirmacao == "0":
            return None
        if senha != confirmacao:
            print("  [!] As senhas não são iguais. Tente de novo.")
            continue

        return senha
