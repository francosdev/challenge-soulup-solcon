jogos = []

def cadastrar_jogos():
    quantidade = int(input('Quantos jogos deseja cadastrar? '))
    for _ in range(quantidade):
        nome = input('Digite o nome do jogo: ')
        jogos.append(nome)
    print('\nLista inicial de jogos: ')
    print(jogos)

def listar_jogos():
    if not jogos:
        print('\nNenhum jogo cadastrado.')
        return
    print('\nLista de jogos cadastrados:')
    for jogo in jogos:
        print(f'- {jogo}')

def adicionar_jogo():
    novo = input('\nDigite o nome de um novo jogo para adicionar: ')
    jogos.append(novo)
    print('====================')
    print('\n Lista atualizada: ')
    print(jogos)

def remover_jogo():
    remover = input('\nDigite o nome de um jogo para remover: ')
    if remover in jogos:
        jogos.remove(remover)
        print(f'"{remover}" removido com sucesso.')
    else:
        print(f'Jogo "{remover}" nao encontrado na lista.')

def ordenar_jogos():
    jogos.sort()
    print('====================')
    print('\n Lista final de jogos: ')
    print(jogos)
    for jogo in jogos:
        print(jogo)

def menu():
    while True:
        print('\n========= RANKING DE JOGOS =========')
        print('1. Cadastrar jogos')
        print('2. Listar jogos cadastrados')
        print('3. Adicionar um novo jogo')
        print('4. Remover um jogo')
        print('5. Ordenar a lista em ordem alfabetica')
        print('6. Encerrar o programa')
        print('=====================================')

        opcao = input('Escolha uma opcao: ')

        if opcao == '1':
            cadastrar_jogos()
        elif opcao == '2':
            listar_jogos()
        elif opcao == '3':
            adicionar_jogo()
        elif opcao == '4':
            remover_jogo()
        elif opcao == '5':
            ordenar_jogos()
        elif opcao == '6':
            print('Encerrando o programa. Até logo!')
            break
        else:
            print('Opcao invalida. Tente novamente.')

menu()
