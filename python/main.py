# ============================================================
#  EcoScore - ponto de entrada
# ============================================================

from autenticacao import login
from dados import carregar_dados
from interface import cabecalho, exibir_tela_inicial, pausar
from usuarios import cadastrar_usuario


def menu_inicial():
    while True:
        exibir_tela_inicial()
        opcao = input("  Opcao: ").strip()

        match opcao:
            case "1":
                login()
            case "2":
                cadastrar_usuario()
            case "0":
                cabecalho("ATE LOGO")
                print("  Continue sendo sustentavel. 🌱")
                break
            case _:
                print("  [!] Opcao invalida. Tente novamente.")
                pausar()


def main():
    carregar_dados()
    menu_inicial()


if __name__ == "__main__":
    main()
