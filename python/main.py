#EcoScore

import admin
import dados
import usuarios
from autenticacao import ler_senha, ler_senha_nova, senha_confere
from config import ADMIN_EMAIL, OPCOES_MENU_INICIAL
from interface import cabecalho, erro, ler_opcao, pausar, tela_inicial


def criar_admin_padrao():
    """Cria a conta de administrador na primeira vez que o programa roda."""
    admin_existente = dados.buscar_por_email(ADMIN_EMAIL)
    if admin_existente is not None and admin_existente["admin"]:
        return

    cabecalho("CONFIGURAÇÃO DO ADMINISTRADOR")
    print("  Nenhuma conta de administrador foi encontrada.")
    print("  Crie a senha do admin para continuar.")
    print("  E-mail do admin: " + ADMIN_EMAIL + "\n")

    senha = None
    while senha is None:
        senha = ler_senha_nova("  Nova senha do admin: ")
        if senha is None:
            print("  [!] A senha do administrador é obrigatória.")

    novo_admin = dados.criar_usuario("Admin", ADMIN_EMAIL, senha, True)

    try:
        dados.usuarios.append(novo_admin)
        if not dados.salvar_dados():
            raise OSError("o arquivo de dados não foi salvo")
    except OSError:
        #o admin fica na lista mesmo assim, senão ninguém entra no painel
        erro("A conta de administrador foi criada, mas não foi gravada no arquivo.")
        print("  Ela será gravada junto na próxima vez que o sistema salvar.")
    else:
        dados.registrar_log("ADMIN_CRIADO", "email=" + ADMIN_EMAIL)
        print("\n  Conta de administrador criada com sucesso.")
    finally:
        pausar()


def abrir_sessao(usuario):
    """Leva o usuário para o painel certo: administrador ou usuário comum."""
    if usuario["admin"]:
        admin.menu_administrador(usuario)
    else:
        usuarios.menu_usuario_logado(usuario)


def fazer_login():
    """Pede e-mail e senha e abre a sessão se estiverem certos."""
    cabecalho("ENTRAR")
    print("  Digite 0 para voltar ao menu inicial.\n")

    email = input("  E-mail: ").strip()
    if email == "0":
        return

    senha = ler_senha("  Senha: ")
    if senha == "0":
        return

    usuario = dados.buscar_por_email(email)

    #mesma mensagem nos dois casos, para não entregar quais e-mails existem
    if usuario is None or not senha_confere(usuario, senha):
        dados.registrar_log("LOGIN_FALHO", "email=" + email)
        erro("E-mail ou senha inválidos.")
        pausar()
        return

    if usuario["admin"]:
        perfil = "admin"
    else:
        perfil = "usuario"

    dados.registrar_log("LOGIN", "email=" + usuario["email"] + " perfil=" + perfil)
    print("\n  Bem-vindo(a), " + usuario["nome"] + "!")
    pausar()

    abrir_sessao(usuario)


def menu_inicial():
    """Mostra o menu inicial e executa a opção escolhida até a pessoa encerrar."""
    while True:
        tela_inicial()
        opcao = ler_opcao("  Opção: ")

        if opcao not in OPCOES_MENU_INICIAL:
            erro("Opção inválida. Tente novamente.")
            pausar()
            continue

        if opcao == "1":
            fazer_login()
        elif opcao == "2":
            novo_usuario = usuarios.cadastrar_usuario()
            if novo_usuario is not None:
                abrir_sessao(novo_usuario)
        elif opcao == "3":
            usuarios.recuperar_senha()
        elif opcao == "0":
            cabecalho("ATÉ LOGO")
            print("  Continue sendo sustentável!")
            return


def main():
    """Abre o sistema: carrega os dados, cria o admin se precisar e mostra o menu inicial."""
    dados.carregar_dados()
    criar_admin_padrao()
    menu_inicial()


if __name__ == "__main__":
    main()
