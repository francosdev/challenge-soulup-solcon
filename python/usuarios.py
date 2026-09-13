#EcoScore - cadastro e perfil dos usuários

import random

import dados
from autenticacao import criptografar_senha, ler_senha, ler_senha_nova, senha_confere
from gamificacao import registrar_acao_sustentavel, ver_conquistas, ver_ranking
from gamificacao import ver_status_competicao
from impacto import exibir_historico, exibir_impacto, texto_da_acao
from interface import barra_progresso, cabecalho, erro, ler_opcao, linha
from interface import menu_usuario, pausar


def validar_email(email):
    """Confere se o texto tem o formato básico de um e-mail."""
    email = email.strip()

    if email == "" or " " in email:
        return False
    if email.count("@") != 1:
        return False

    partes = email.split("@")
    nome_usuario = partes[0]
    dominio = partes[1]

    if nome_usuario == "" or dominio == "":
        return False
    if "." not in dominio:
        return False
    if dominio.startswith(".") or dominio.endswith("."):
        return False

    return True


def ler_nome(mensagem="  Nome: "):
    """Pede um nome até o usuário digitar algo que não seja vazio."""
    while True:
        nome = input(mensagem).strip()

        if nome == "0":
            return None
        if nome != "":
            return nome

        erro("O nome não pode ficar vazio.")


def ler_email(dono_atual=None, mensagem="  E-mail: "):
    """Pede um e-mail até ele ter formato válido e não estar em uso por outra conta."""
    while True:
        email = input(mensagem).strip()

        if email == "0":
            return None
        if not validar_email(email):
            erro("Digite um e-mail válido. Exemplo: nome@email.com")
        elif not dados.email_disponivel(email, dono_atual):
            erro("Esse e-mail já está cadastrado.")
        else:
            return email


def confirmar_cadastro(nome, email):
    """Mostra os dados do cadastro e pergunta se estão corretos."""
    cabecalho("CONFIRMAR CADASTRO")
    print("  Nome: " + nome)
    print("  E-mail: " + email)
    print("  Senha: ********")
    print("\n  Os dados estão corretos?\n")
    print("  1. Confirmar cadastro")
    print("  2. Corrigir nome")
    print("  3. Corrigir e-mail")
    print("  4. Corrigir senha")
    print("  0. Cancelar")
    return ler_opcao()


def cadastrar_usuario():
    """Cadastra uma conta nova: pede os dados, confirma e grava no arquivo."""
    cabecalho("CADASTRAR CONTA")
    print("  Digite 0 a qualquer momento para cancelar.\n")

    nome = ler_nome()
    if nome is None:
        return None

    email = ler_email()
    if email is None:
        return None

    senha = ler_senha_nova()
    if senha is None:
        return None

    while True:
        opcao = confirmar_cadastro(nome, email)

        if opcao == "1":
            novo_usuario = dados.criar_usuario(nome, email, senha)

            try:
                dados.usuarios.append(novo_usuario)
                if not dados.salvar_dados():
                    raise OSError("o arquivo de dados não foi salvo")
            except OSError:
                #não salvou: tira o usuário que acabou de entrar
                dados.usuarios.pop()
                erro("A conta não foi criada. Tente novamente mais tarde.")
                novo_usuario = None
            else:
                dados.registrar_log("CADASTRO", "email=" + email)
                print("\n  Conta criada com sucesso!")
                print("  Bem-vindo(a), " + nome + "!")
            finally:
                pausar()

            return novo_usuario

        elif opcao == "2":
            novo_nome = ler_nome("  Novo nome: ")
            if novo_nome is None:
                return None
            nome = novo_nome

        elif opcao == "3":
            novo_email = ler_email(None, "  Novo e-mail: ")
            if novo_email is None:
                return None
            email = novo_email

        elif opcao == "4":
            nova_senha = ler_senha_nova("  Nova senha: ")
            if nova_senha is None:
                return None
            senha = nova_senha

        elif opcao == "0":
            print("\n  Cadastro cancelado.")
            pausar()
            return None

        else:
            erro("Opção inválida.")


def recuperar_senha():
    """Redefine a senha de um usuário comum usando um código mostrado na tela."""
    #o código aparece na tela porque o projeto não envia e-mail de verdade
    cabecalho("RECUPERAR SENHA")
    print("  Digite 0 para voltar.\n")

    email = input("  E-mail cadastrado: ").strip()
    if email == "0":
        return

    usuario = dados.buscar_por_email(email)
    if usuario is None:
        print("\n  Nenhuma conta encontrada com esse e-mail.")
        pausar()
        return

    if usuario["admin"]:
        print("\n  A senha do administrador não pode ser recuperada por aqui.")
        pausar()
        return

    codigo = str(random.randint(100000, 999999))

    print("\n  --- SIMULACAO DE E-MAIL ---------------------")
    print("  Para: " + email)
    print("  Assunto: Recuperação de senha - EcoScore")
    print("  Seu código de recuperação é: " + codigo)
    print("  ---------------------------------------------\n")

    tentativas = 3
    while tentativas > 0:
        digitado = input("  Digite o código recebido (0 para cancelar): ").strip()

        if digitado == "0":
            return
        if digitado == codigo:
            break

        tentativas -= 1
        if tentativas > 0:
            print("  [!] Código incorreto. Tentativas restantes: " + str(tentativas))

    if tentativas == 0:
        print("\n  Muitas tentativas incorretas. Tente novamente mais tarde.")
        dados.registrar_log("RECUPERACAO_FALHA", "email=" + email)
        pausar()
        return

    nova_senha = ler_senha_nova("\n  Nova senha: ")
    if nova_senha is None:
        return

    senha_antiga = usuario["senha"]

    try:
        usuario["senha"] = criptografar_senha(nova_senha)
        if not dados.salvar_dados():
            raise OSError("o arquivo de dados não foi salvo")
    except OSError:
        usuario["senha"] = senha_antiga
        erro("A senha não foi alterada.")
    else:
        dados.registrar_log("RECUPERACAO_SENHA", "email=" + email)
        print("\n  Senha redefinida com sucesso!")
    finally:
        pausar()


def exibir_conquistas_resumidas(usuario):
    """Imprime os nomes das conquistas do usuário, uma por linha."""
    if len(usuario["conquistas"]) == 0:
        print("  Nenhuma conquista desbloqueada ainda.")
        return

    for nome_conquista in usuario["conquistas"]:
        print("  - " + nome_conquista)


def consultar_perfil(usuario):
    """Mostra o perfil do usuário logado: dados, impacto, conquistas e histórico."""
    cabecalho("MEU PERFIL")
    print("  Nome: " + usuario["nome"])
    print("  E-mail: " + usuario["email"])
    print("  Soul Points: " + str(usuario["pontos"]))
    print("  Progresso: " + barra_progresso(usuario["pontos"]))

    posicao = dados.posicao_no_ranking(usuario)
    if posicao > 0:
        print("  Posição no ranking: " + str(posicao) + "º lugar")

    linha()
    print("  IMPACTO AMBIENTAL")
    exibir_impacto(usuario)

    linha()
    print("  CONQUISTAS")
    exibir_conquistas_resumidas(usuario)

    linha()
    print("  HISTÓRICO")
    exibir_historico(usuario, 5)

    if len(usuario["historico"]) > 5:
        print("\n  1. Ver histórico completo")
        print("  0. Voltar")
        if ler_opcao() == "1":
            print()
            exibir_historico(usuario)


def escolher_da_lista(encontrados, mostrar_email):
    """Mostra uma lista numerada de usuários e pede para escolher um deles."""
    cabecalho("USUÁRIOS ENCONTRADOS")

    for i in range(len(encontrados)):
        usuario = encontrados[i]
        texto = "  " + str(i + 1) + ". " + usuario["nome"]
        if mostrar_email:
            texto = texto + " - " + usuario["email"]
        texto = texto + " - " + str(usuario["pontos"]) + " Soul Points"
        print(texto)

    print("\n  0. Cancelar")

    while True:
        opcao = ler_opcao("\n  Escolha um perfil: ")

        if opcao == "0":
            return None
        if opcao.isdigit():
            numero = int(opcao)
            if numero >= 1 and numero <= len(encontrados):
                return encontrados[numero - 1]

        erro("Opção inválida.")


def escolher_usuario_por_nome(titulo, mostrar_email=False, incluir_admin=False):
    """Pede um nome, procura os usuários e devolve o que for escolhido."""
    cabecalho(titulo)
    print("  Digite o nome do usuário que você quer procurar.")
    print("  Digite 0 para voltar.\n")

    nome = input("  Nome: ").strip()

    if nome == "0":
        return None
    if nome == "":
        erro("O nome não pode ficar vazio.")
        return None

    encontrados = dados.buscar_por_nome(nome, incluir_admin)

    if len(encontrados) == 0:
        print("\n  Nenhum usuário encontrado com esse nome.")
        return None
    if len(encontrados) == 1:
        return encontrados[0]

    return escolher_da_lista(encontrados, mostrar_email)


def comparar_pontos(usuario_logado, usuario_visitado):
    """Monta a frase que compara os Soul Points de dois usuários."""
    diferenca = usuario_visitado["pontos"] - usuario_logado["pontos"]

    if diferenca > 0:
        return usuario_visitado["nome"] + " está " + str(diferenca) + " Soul Points à sua frente."
    if diferenca < 0:
        return "Você está " + str(-diferenca) + " Soul Points à frente de " + usuario_visitado["nome"] + "."
    return "Vocês estão empatados em Soul Points."


def exibir_perfil_publico(usuario_logado, usuario_visitado):
    """Mostra o perfil público de outro usuário, sem o e-mail dele."""
    cabecalho("PERFIL PÚBLICO")
    print("  Nome: " + usuario_visitado["nome"])
    print("  Soul Points: " + str(usuario_visitado["pontos"]))
    print("  Posição no ranking: " + str(dados.posicao_no_ranking(usuario_visitado)) + "º lugar")
    print("  " + comparar_pontos(usuario_logado, usuario_visitado))

    linha()
    print("  CONQUISTAS")
    exibir_conquistas_resumidas(usuario_visitado)

    linha()
    print("  IMPACTO AMBIENTAL")
    exibir_impacto(usuario_visitado, True)

    linha()
    print("  ÚLTIMAS AÇÕES")

    historico = usuario_visitado["historico"]
    if len(historico) == 0:
        print("  Nenhuma ação registrada ainda.")
        return

    #as 3 últimas ações, da mais nova para a mais velha
    ultimas = historico[-3:]
    for i in range(len(ultimas) - 1, -1, -1):
        print("  - " + texto_da_acao(ultimas[i]))


def visitar_perfil(usuario_logado):
    """Procura outro usuário pelo nome e mostra o perfil público dele."""
    visitado = escolher_usuario_por_nome("VISITAR PERFIL")

    if visitado is None:
        return
    if visitado == usuario_logado:
        print("\n  Esse é o seu perfil. Use a opção Consultar meu perfil.")
        return

    exibir_perfil_publico(usuario_logado, visitado)


def alterar_senha(usuario):
    """Troca a senha do usuário depois de conferir a senha atual."""
    senha_atual = ler_senha("  Senha atual (0 para cancelar): ")

    if senha_atual == "0":
        return
    if not senha_confere(usuario, senha_atual):
        erro("Senha atual incorreta.")
        return

    nova_senha = ler_senha_nova("  Nova senha: ")
    if nova_senha is None:
        return

    senha_antiga = usuario["senha"]

    try:
        usuario["senha"] = criptografar_senha(nova_senha)
        if not dados.salvar_dados():
            raise OSError("o arquivo de dados não foi salvo")
    except OSError:
        usuario["senha"] = senha_antiga
        erro("A senha não foi alterada.")
    else:
        dados.registrar_log("TROCA_SENHA", "email=" + usuario["email"])
        print("  Senha atualizada com sucesso!")
    finally:
        linha()


def editar_perfil(usuario):
    """Mostra o submenu de edição de perfil para alterar nome, e-mail ou senha."""
    while True:
        cabecalho("EDITAR PERFIL")
        print("  1. Alterar nome")
        print("  2. Alterar e-mail")
        print("  3. Alterar senha")
        print("  0. Voltar")

        opcao = ler_opcao()

        if opcao == "1":
            novo_nome = ler_nome("  Novo nome (0 para cancelar): ")
            if novo_nome is not None:
                nome_antigo = usuario["nome"]

                try:
                    usuario["nome"] = novo_nome
                    if not dados.salvar_dados():
                        raise OSError("o arquivo de dados não foi salvo")
                except OSError:
                    usuario["nome"] = nome_antigo
                    erro("O nome não foi alterado.")
                else:
                    dados.registrar_log("EDICAO_NOME", "email=" + usuario["email"])
                    print("  Nome atualizado com sucesso!")
                finally:
                    linha()

        elif opcao == "2":
            novo_email = ler_email(usuario, "  Novo e-mail (0 para cancelar): ")
            if novo_email is not None:
                email_antigo = usuario["email"]

                try:
                    usuario["email"] = novo_email
                    if not dados.salvar_dados():
                        raise OSError("o arquivo de dados não foi salvo")
                except OSError:
                    usuario["email"] = email_antigo
                    erro("O e-mail não foi alterado.")
                else:
                    dados.registrar_log("EDICAO_EMAIL", "antigo=" + email_antigo + " novo=" + novo_email)
                    print("  E-mail atualizado com sucesso!")
                finally:
                    linha()

        elif opcao == "3":
            alterar_senha(usuario)

        elif opcao == "0":
            return

        else:
            erro("Opção inválida.")

        pausar()


def confirmar_palavra_deletar():
    """Pede para digitar a palavra DELETAR como confirmação de exclusão."""
    texto = input("  Digite DELETAR para confirmar: ").strip()
    return texto == "DELETAR"


def deletar_minha_conta(usuario):
    """Apaga a conta do usuário logado depois de três confirmações."""
    cabecalho("DELETAR MINHA CONTA")
    print("  ATENÇÃO: essa ação vai apagar permanentemente:")
    print("  - o seu perfil")
    print("  - os seus Soul Points")
    print("  - o seu histórico de ações")
    print("  - as suas conquistas")
    print("\n  Não é possível desfazer essa ação.\n")
    print("  1. Quero deletar minha conta")
    print("  0. Cancelar")

    if ler_opcao() != "1":
        print("\n  Exclusão cancelada.")
        return False

    if not confirmar_palavra_deletar():
        print("\n  Exclusão cancelada.")
        return False

    senha = ler_senha("  Digite sua senha para confirmar: ")
    if not senha_confere(usuario, senha):
        erro("Senha incorreta. A conta não foi deletada.")
        return False

    email = usuario["email"]
    conta_apagada = False

    try:
        #se não salvar, o remover_usuario já devolve o usuário para a lista
        if not dados.remover_usuario(usuario):
            raise OSError("o arquivo de dados não foi salvo")
    except OSError:
        erro("Não foi possível deletar a conta.")
    else:
        conta_apagada = True
        dados.registrar_log("EXCLUSAO_CONTA", "email=" + email + " origem=usuario")
        linha()
        print("  Conta deletada com sucesso.")
        print("  Esperamos ver você de novo no EcoScore.")
    finally:
        linha()

    return conta_apagada


def menu_usuario_logado(usuario):
    """Mostra o menu principal do usuário comum e executa a opção escolhida."""
    while True:
        menu_usuario(usuario)
        opcao = ler_opcao("  Opção: ")

        if opcao == "1":
            registrar_acao_sustentavel(usuario)
        elif opcao == "2":
            ver_ranking()
        elif opcao == "3":
            consultar_perfil(usuario)
        elif opcao == "4":
            visitar_perfil(usuario)
        elif opcao == "5":
            ver_conquistas(usuario)
        elif opcao == "6":
            editar_perfil(usuario)
        elif opcao == "7":
            ver_status_competicao()
        elif opcao == "8":
            if deletar_minha_conta(usuario):
                pausar()
                return
        elif opcao == "0":
            print("\n  Você saiu da conta.")
            pausar()
            return
        else:
            erro("Opção inválida. Tente novamente.")

        pausar()
