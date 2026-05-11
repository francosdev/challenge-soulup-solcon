# ============================================================
#  EcoScore - autenticação e senhas
# ============================================================

import getpass
import hashlib

from config import ADMIN_EMAIL, HASH_ADMIN_LEGADO_FRACO
from interface import cabecalho, pausar


def criptografar_senha(senha):
    """Gera hash SHA-256 para armazenamento seguro de senhas."""
    return hashlib.sha256(senha.encode("utf-8")).hexdigest()


def senha_esta_criptografada(senha):
    if type(senha) != str or len(senha) != 64:
        return False

    for caractere in senha.lower():
        if not ((caractere >= "0" and caractere <= "9") or (caractere >= "a" and caractere <= "f")):
            return False

    return True


def normalizar_senha(senha):
    if type(senha) != str:
        senha = ""
    if senha_esta_criptografada(senha):
        return senha.lower()
    return criptografar_senha(senha)


def ler_senha_oculta(mensagem):
    """Lê senha sem eco no terminal usando biblioteca portável."""
    return getpass.getpass(mensagem)


def senha_valida(senha):
    return len(senha.strip()) >= 6


def validar_senha_usuario(usuario, senha_digitada):
    """Compara a senha digitada com o hash salvo do usuário."""
    if not senha_digitada:
        return False
    return criptografar_senha(senha_digitada) == usuario["senha"]


def senha_admin_precisa_troca(usuario):
    return usuario["admin"] and usuario["email"].lower() == ADMIN_EMAIL and usuario["senha"] == HASH_ADMIN_LEGADO_FRACO


def trocar_senha_admin_obrigatoria(admin):
    """Força troca de senha do admin quando credencial legada é detectada."""
    from dados import salvar_dados

    cabecalho("TROCA DE SENHA ADMIN")
    print("  Esta conta administrativa usa uma credencial legada.")
    print("  Para continuar, cadastre uma nova senha.\n")

    while True:
        nova_senha = ler_senha_oculta("  Nova senha: ").strip()
        confirmar_senha = ler_senha_oculta("  Confirmar nova senha: ").strip()

        if not senha_valida(nova_senha):
            print("  [!] A nova senha deve ter pelo menos 6 caracteres.")
        elif validar_senha_usuario(admin, nova_senha):
            print("  [!] A nova senha deve ser diferente da senha atual.")
        elif nova_senha != confirmar_senha:
            print("  [!] As senhas não conferem.")
        else:
            admin["senha"] = criptografar_senha(nova_senha)
            salvar_dados()
            print("\n  Senha administrativa atualizada com sucesso.")
            pausar()
            return True


def login():
    """Autentica usuário comum ou administrador e abre o menu correto."""
    from admin import menu_admin
    from dados import buscar_usuario_por_email, registrar_log
    from usuarios import menu_usuario_logado

    cabecalho("ENTRAR")
    print("  Digite 0 para voltar ao menu inicial.\n")

    email = input("  E-mail: ").strip()
    if email == "0":
        return

    senha = ler_senha_oculta("  Senha: ").strip()
    if senha == "0":
        return
    if not senha:
        print("  [!] Senha não pode ser vazia.")
        return

    usuario = buscar_usuario_por_email(email)
    if usuario is None or not validar_senha_usuario(usuario, senha):
        registrar_log("LOGIN_FALHO", f"email={email}")
        print("  E-mail ou senha inválidos.")
        return

    print(f"\n  Bem-vindo(a), {usuario['nome']}!")
    perfil = "admin" if usuario["admin"] else "usuário"
    registrar_log("LOGIN", f"email={usuario['email']} perfil={perfil}")
    pausar()

    if usuario["admin"]:
        if senha_admin_precisa_troca(usuario):
            if not trocar_senha_admin_obrigatoria(usuario):
                return
        menu_admin(usuario)
    else:
        menu_usuario_logado(usuario)
