# ============================================================
#  EcoScore - ponto de entrada
# ============================================================

import sys

sys.stdout.reconfigure(encoding="utf-8")

from autenticacao import login, recuperar_senha
from config import OPCOES_MENU_INICIAL
from dados import carregar_dados
from interface import cabecalho, exibir_tela_inicial, pausar
from usuarios import cadastrar_usuario


def menu_inicial():
    while True:
        exibir_tela_inicial()
        opcao = input("  Opção: ").strip()

        if opcao not in OPCOES_MENU_INICIAL:
            print("  [!] Opção inválida. Tente novamente.")
            pausar()
            continue

        match opcao:
            case "1":
                login()
            case "2":
                cadastrar_usuario()
            case "3":
                recuperar_senha()
            case "0":
                cabecalho("ATE LOGO")
                print("  Continue sendo sustentável. 🌱")
                break


def main():
    carregar_dados()
    menu_inicial()


if __name__ == "__main__":
    main()
