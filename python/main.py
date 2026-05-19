# ============================================================
#  EcoScore - ponto de entrada
# ============================================================

import sys
sys.stdout.reconfigure(encoding="utf-8")

from autenticacao import login, recuperar_senha
from dados import carregar_dados
from interface import cabecalho, exibir_tela_inicial, pausar
from usuarios import cadastrar_usuario


def menu_inicial():
    """Exibe a tela inicial e direciona para login, cadastro ou saída."""
    while True:
        exibir_tela_inicial()
        opcao = input("  Opção: ").strip()

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
            case _:
                print("  [!] Opção inválida. Tente novamente.")
                pausar()


def main():
    """Carrega dados persistidos e inicia o EcoScore."""
    carregar_dados()
    menu_inicial()


if __name__ == "__main__":
    main()
