import { Github, Linkedin } from 'lucide-react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CircleBadge } from '../components/ui/CircleBadge'
import { Button } from '../components/ui/Button'
import { INTEGRANTES, TURMA } from '../data/integrantes'

export function Integrantes() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="Equipe"
            titulo="Conheça quem fez."
            descricao={`Turma ${TURMA} — Análise e Desenvolvimento de Sistemas, FIAP 2026. Três estudantes reunidos na SolCon com uma visão em comum: tecnologia a serviço da sustentabilidade.`}
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INTEGRANTES.map((integrante) => (
              <article
                key={integrante.id}
                className="flex flex-col items-center gap-4 rounded-card border border-line bg-white p-6 text-center"
              >
                <span className="inline-flex h-28 w-28 items-center justify-center overflow-hidden rounded-pill border border-soul-light bg-soul-wash">
                  <img
                    src={integrante.foto}
                    alt={integrante.nome}
                    width={112}
                    height={112}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </span>

                <div>
                  <h2 className="font-display text-lg font-semibold leading-snug text-navy">
                    {integrante.nome}
                  </h2>
                  <p className="mt-1 font-sans text-xs text-ink-muted">{integrante.curso}</p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="inline-flex items-center rounded-pill border border-soul-light bg-soul-wash px-3 py-1 font-sans text-xs font-medium text-soul-deep">
                    RM {integrante.rm}
                  </span>
                  <span className="inline-flex items-center rounded-pill border border-line px-3 py-1 font-sans text-xs text-ink-muted">
                    Turma {integrante.turma}
                  </span>
                </div>

                <div className="mt-auto flex items-center gap-3 pt-2">
                  <a
                    href={integrante.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn de ${integrante.nome}`}
                    className="inline-flex items-center gap-2 rounded-pill border border-line px-3 py-2 font-sans text-xs text-navy transition-colors hover:border-soul hover:text-soul"
                  >
                    <Linkedin size={14} aria-hidden />
                    LinkedIn
                  </a>
                  <a
                    href={integrante.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub de ${integrante.nome}`}
                    className="inline-flex items-center gap-2 rounded-pill border border-line px-3 py-2 font-sans text-xs text-navy transition-colors hover:border-soul hover:text-soul"
                  >
                    <Github size={14} aria-hidden />
                    GitHub
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SOLCON */}
      <section className="border-t border-line bg-surf">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div className="flex justify-center">
            <img
              src="./assets/imagens/logo-solcon.png"
              alt="SolCon — conectamos hoje, construímos o futuro"
              loading="lazy"
              className="w-full max-w-xs rounded-card border border-line bg-white p-8"
            />
          </div>

          <div>
            <SectionHeading
              tag="Nossa startup"
              titulo="Conecte hoje. Construa o futuro."
              descricao="A SolCon é uma startup de soluções tecnológicas conectadas, criada para transformar ideias em produtos digitais com propósito."
            />

            <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-ink-muted">
              É com essa mentalidade que desenvolvemos o EcoScore — nossa camada de gamificação sustentável
              para a plataforma SoulUp, que transforma hábitos cotidianos em recompensas reais e impacto
              ambiental mensurável.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {['Inovação', 'Sustentabilidade', 'Tecnologia', 'Propósito'].map((valor) => (
                <span
                  key={valor}
                  className="inline-flex items-center rounded-pill border border-soul-light bg-white px-3 py-1.5 font-sans text-xs font-medium text-soul-deep"
                >
                  {valor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTEXTO ACADÊMICO */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="Contexto acadêmico"
            titulo="Challenge FIAP 2026."
            descricao="O projeto nasceu da metodologia de aprendizado por desafios reais, com a SoulUp trazendo o problema de engajamento sustentável."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: 'fiap',
                numero: '01',
                titulo: 'FIAP',
                texto: 'Faculdade de Informática e Administração Paulista — referência em tecnologia e inovação.',
              },
              {
                id: 'turma',
                numero: '02',
                titulo: `Turma ${TURMA}`,
                texto: '1º semestre de 2026, Análise e Desenvolvimento de Sistemas, modalidade presencial.',
              },
              {
                id: 'soulup',
                numero: '03',
                titulo: 'Parceria SoulUp',
                texto: 'Empresa parceira que trouxe o desafio real de aumentar o engajamento sustentável.',
              },
            ].map((item) => (
              <article key={item.id} className="rounded-card border border-line bg-white p-6">
                <CircleBadge variant="outline" size="sm">
                  {item.numero}
                </CircleBadge>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy">{item.titulo}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">{item.texto}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 rounded-card border border-line bg-surf p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-sm text-ink-muted">
              Quer falar com a equipe sobre o projeto?
            </p>
            <Button to="/contato">Fale com a gente</Button>
          </div>
        </div>
      </section>
    </>
  )
}
