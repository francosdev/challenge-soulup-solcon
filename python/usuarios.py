# ============================================================
#  EcoScore - usuários, perfil e fluxo social
# ============================================================

import dados
from autenticacao import criptografar_senha, ler_senha_oculta, senha_valida, validar_senha_usuario
from gamificacao import registrar_acao_sustentavel, ver_conquistas, ver_ranking, ver_status_competicao
from impacto import exibir_historico, exibir_impacto, exibir_impacto_resumido, resumir_acao_publica
from interface import barra_progresso, cabecalho, exibir_menu_usuario, linha, pausar


def validar_email(email):
    """Valida e-mail com regra simples para cadastro e edição."""
    email = email.strip()

    if not email or " " in email:
        return False
    if email.count("@") != 1:
        return False

    partes = email.split("@")
    usuario_email = partes[0]
    dominio = partes[1]

    if not usuario_email or not dominio:
        return False
    if "." not in dominio:
        return False
    if dominio.startswith(".") or dominio.endswith("."):
        return False

    return True


def ler_nome_cadastro(mensagem="  Nome: "):
    while True:
        nome = input(mensagem).strip()

        if nome == "0":
            return None
        if nome:
            return nome

        print("  [!] Nome não pode ser vazio.")


def ler_email_cadastro(usuario_atual=None, mensagem="  E-mail: "):
    while True:
        email = input(mensagem).strip()

        if email == "0":
            return None
        if not validar_email(email):
            print("  [!] Informe um e-mail válido.")
        elif not dados.email_disponivel(email, usuario_atual):
            print("  [!] E-mail já cadastrado.")
        else:
            return email


def ler_senha_cadastro(mensagem="  Senha: "):
    while True:
        senha = ler_senha_oculta(mensagem).strip()

        if senha == "0":
            return None
        if senha_valida(senha):
            return senha

        print("  [!] Senha deve ter pelo menos 6 caracteres.")


def cadastrar_usuario():
    """Realiza cadastro com revisão dos dados antes de salvar."""
    cabecalho("CADASTRAR CONTA")
    print("  Digite 0 a qualquer momento para voltar ao menu inicial.\n")

    nome = ler_nome_cadastro()
    if nome is None:
        return

    email = ler_email_cadastro()
    if email is None:
        return

    senha = ler_senha_cadastro()
    if senha is None:
        return

    while True:
        cabecalho("CONFIRMAR CADASTRO")
        print(f"  Nome: {nome}")
        print(f"  E-mail: {email}")
        print("  Senha: ********")
        print("\n  Os dados estão corretos?\n")
        print("  1. Confirmar cadastro")
        print("  2. Corrigir nome")
        print("  3. Corrigir e-mail")
        print("  4. Corrigir senha")
        print("  0. Cancelar e voltar ao menu inicial")

        opcao = input("\n  Opção: ").strip()

        match opcao:
            case "1":
                novo_usuario = dados.criar_usuario(nome, email, senha, 0, [], [], False)
                dados.usuarios.append(novo_usuario)
                dados.salvar_dados()
                print("\n  Conta criada com sucesso!")
                print(f"  Bem-vindo(a), {nome}!")
                pausar()
                menu_usuario_logado(novo_usuario)
                return
            case "2":
                novo_nome = ler_nome_cadastro("  Novo nome: ")
                if novo_nome is None:
                    return
                nome = novo_nome
            case "3":
                novo_email = ler_email_cadastro(None, "  Novo e-mail: ")
                if novo_email is None:
                    return
                email = novo_email
            case "4":
                nova_senha = ler_senha_cadastro("  Nova senha: ")
                if nova_senha is None:
                    return
                senha = nova_senha
            case "0":
                return
            case _:
                print("  [!] Opção inválida. Tente novamente.")


def consultar_perfil(usuario):
    """Mostra dados privados, histórico e impacto do usuário logado."""
    cabecalho("MEU PERFIL")
    print(f"  Nome: {usuario['nome']}")
    print(f"  E-mail: {usuario['email']}")
    print(f"  Soul Points: {usuario['pontos']}")
    print(f"  Progresso: {barra_progresso(usuario['pontos'])}")

    posicao = dados.calcular_posicao_ranking(usuario)
    if posicao > 0:
        print(f"  Ranking: {posicao}º lugar")

    linha("━")
    exibir_impacto(usuario)
    linha("━")
    exibir_historico(usuario, 5, True)


def selecionar_usuario_encontrado(encontrados, mostrar_email=False):
    """Permite escolher um usuário quando a busca retorna múltiplos nomes."""
    cabecalho("USUÁRIOS ENCONTRADOS")

    for indice, usuario in enumerate(encontrados, start=1):
        if mostrar_email:
            print(f"  {indice}. {usuario['nome']} - {usuario['email']} - {usuario['pontos']} Soul Points")
        else:
            print(f"  {indice}. {usuario['nome']} - {usuario['pontos']} Soul Points")

    print("\n  0. Cancelar")

    while True:
        opcao = input("\n  Escolha um perfil: ").strip()

        if opcao == "0":
            return None
        if opcao.isdigit():
            indice = int(opcao)
            if indice >= 1 and indice <= len(encontrados):
                return encontrados[indice - 1]

        print("  [!] Opção inválida.")


def escolher_usuario_por_nome(titulo, mostrar_email=False):
    """Busca usuários comuns por nome e retorna o perfil selecionado."""
    cabecalho(titulo)
    print("  Digite o nome do usuário que deseja procurar.")
    print("  Digite 0 para voltar.\n")

    nome = input("  Nome: ").strip()

    if nome == "0":
        return None
    if not nome:
        print("  [!] Nome não pode ser vazio.")
        return None

    encontrados = dados.buscar_usuarios_por_nome(nome)

    if not encontrados:
        print("\n  Nenhum usuário encontrado.")
        return None
    if len(encontrados) == 1:
        return encontrados[0]

    return selecionar_usuario_encontrado(encontrados, mostrar_email)


def exibir_conquistas_resumidas(usuario):
    """Lista apenas as conquistas desbloqueadas do usuário."""
    from config import CONQUISTAS

    if not usuario["conquistas"]:
        print("  Nenhuma conquista desbloqueada ainda.")
        return

    for nome_conquista in usuario["conquistas"]:
        conquista = CONQUISTAS.get(nome_conquista)
        if conquista is not None:
            print(f"  {conquista['icone']} {nome_conquista}")


def mensagem_diferenca_pontos(usuario_logado, usuario_visitado):
    """Compara Soul Points entre o usuário logado e o perfil visitado."""
    diferenca = usuario_visitado["pontos"] - usuario_logado["pontos"]

    if diferenca > 0:
        return f"{usuario_visitado['nome']} está {diferenca} Soul Points à sua frente."
    if diferenca < 0:
        return f"Você está {abs(diferenca)} Soul Points à frente de {usuario_visitado['nome']}."
    return "Vocês estão empatados em Soul Points."


def exibir_perfil_publico(usuario_logado, usuario_visitado):
    """Exibe perfil público sem e-mail ou senha, com comparação social."""
    cabecalho("PERFIL PÚBLICO")
    print(f"  Nome: {usuario_visitado['nome']}")
    print(f"  Soul Points: {usuario_visitado['pontos']}")
    print(f"  Ranking: {dados.calcular_posicao_ranking(usuario_visitado)}º lugar")
    print(f"  Comparação: {mensagem_diferenca_pontos(usuario_logado, usuario_visitado)}")

    linha("━")
    print("  🏆 CONQUISTAS\n")
    exibir_conquistas_resumidas(usuario_visitado)

    linha("━")
    print("  🌍 IMPACTO AMBIENTAL\n")
    exibir_impacto_resumido(usuario_visitado)

    linha("━")
    print("  🕓 ÚLTIMAS AÇÕES\n")

    if not usuario_visitado["historico"]:
        print("  Nenhuma ação registrada ainda.")
        return

    ultimas_acoes = usuario_visitado["historico"][-3:]
    ultimas_acoes.reverse()

    for indice, acao in enumerate(ultimas_acoes, start=1):
        print(f"  {indice}. {resumir_acao_publica(acao)}")


def visitar_perfil_usuario(usuario_logado):
    """Fluxo social para visitar o perfil público de outro usuário."""
    usuario_visitado = escolher_usuario_por_nome("VISITAR PERFIL")

    if usuario_visitado is None:
        return
    if usuario_visitado is usuario_logado:
        print("\n  Esse é o seu perfil. Use a opção Consultar perfil.")
        return

    exibir_perfil_publico(usuario_logado, usuario_visitado)


def editar_perfil(usuario):
    """Permite editar nome, e-mail e senha da conta logada."""
    while True:
        cabecalho("EDITAR PERFIL")
        print("  1. Alterar nome")
        print("  2. Alterar e-mail")
        print("  3. Alterar senha")
        print("  0. Voltar")

        opcao = input("\n  Opção: ").strip()

        match opcao:
            case "1":
                novo_nome = ler_nome_cadastro("  Novo nome: ")
                if novo_nome is None:
                    return
                usuario["nome"] = novo_nome
                dados.salvar_dados()
                print("  Nome atualizado com sucesso!")
            case "2":
                novo_email = ler_email_cadastro(usuario, "  Novo e-mail: ")
                if novo_email is None:
                    return
                usuario["email"] = novo_email
                dados.salvar_dados()
                print("  E-mail atualizado com sucesso!")
            case "3":
                alterar_senha(usuario)
            case "0":
                return
            case _:
                print("  [!] Opção inválida.")


def alterar_senha(usuario):
    """Altera a senha após validar a senha atual."""
    senha_atual = ler_senha_oculta("  Senha atual: ").strip()

    if senha_atual == "0":
        return
    if not validar_senha_usuario(usuario, senha_atual):
        print("  Senha atual incorreta.")
        pausar()
        return

    while True:
        nova_senha = ler_senha_oculta("  Nova senha: ").strip()
        if nova_senha == "0":
            return
        confirmar_senha = ler_senha_oculta("  Confirmar nova senha: ").strip()
        if confirmar_senha == "0":
            return

        if not senha_valida(nova_senha):
            print("  [!] Nova senha deve ter pelo menos 6 caracteres.")
        elif nova_senha != confirmar_senha:
            print("  [!] As senhas não conferem.")
        else:
            break

    usuario["senha"] = criptografar_senha(nova_senha)
    dados.salvar_dados()
    print("  Senha atualizada com sucesso!")
    pausar()


def confirmar_texto_deletar():
    texto = input("  Digite DELETAR para confirmar: ").strip()
    return texto == "DELETAR"


def confirmar_exclusao_conta(usuario):
    """Confirma senha e palavra-chave antes de excluir a própria conta."""
    if usuario["admin"]:
        print("  [!] Administradores devem ser gerenciados pelo painel administrativo.")
        return False

    linha("━")
    print("  ⚠️ ATENCAO")
    print("  Essa ação irá apagar permanentemente:")
    print("  - seu perfil")
    print("  - Soul Points")
    print("  - histórico de ações")
    print("  - conquistas")
    print()
    print("  Essa ação não poderá ser desfeita.")
    linha("━")
    print("\n  Deseja continuar?\n")
    print("  1. Sim")
    print("  0. Cancelar")

    opcao = input("\n  Opção: ").strip()
    if opcao == "0":
        return False
    if opcao != "1":
        print("  [!] Opção inválida.")
        return False

    if not confirmar_texto_deletar():
        print("  Exclusão cancelada.")
        return False

    senha = ler_senha_oculta("  Digite sua senha para deletar a conta: ").strip()
    if not validar_senha_usuario(usuario, senha):
        print("  Senha incorreta.")
        return False

    if remover_usuario(usuario):
        dados.registrar_log("EXCLUSAO_CONTA", f"email={usuario['email']} origem=usuario")
        linha("━")
        print("  🗑️ Conta deletada com sucesso.")
        print("  Esperamos ver você novamente no EcoScore.")
        linha("━")
        return True

        print("  [!] Não foi possível deletar a conta.")
    return False


def remover_usuario(usuario_alvo):
    """Remove um usuário da lista global e recalcula o ranking."""
    for indice, usuario in enumerate(dados.usuarios):
        if usuario is usuario_alvo:
            dados.usuarios.pop(indice)
            dados.recalcular_ranking_encerrado()
            dados.salvar_dados()
            return True

    return False


def menu_usuario_logado(usuario):
    """Controla a navegação da sessão de um usuário comum."""
    while True:
        exibir_menu_usuario(usuario)
        opcao = input("  Opção: ").strip()

        match opcao:
            case "1":
                registrar_acao_sustentavel(usuario)
            case "2":
                ver_ranking()
            case "3":
                consultar_perfil(usuario)
            case "4":
                visitar_perfil_usuario(usuario)
            case "5":
                editar_perfil(usuario)
            case "6":
                if confirmar_exclusao_conta(usuario):
                    break
            case "7":
                ver_conquistas(usuario)
            case "8":
                ver_status_competicao()
            case "0":
                print("\n  Você saiu da conta.")
                break
            case _:
                print("  [!] Opção inválida. Tente novamente.")

        pausar()
