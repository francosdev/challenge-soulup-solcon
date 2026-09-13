import { Building2, Cpu, GraduationCap, Github, Handshake, Lightbulb, Linkedin, Sprout, Target } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Card } from '../components/ui/Card'
import { CircleBadge } from '../components/ui/CircleBadge'
import { NextStep } from '../components/ui/NextStep'
import { PageHero, Realce } from '../components/ui/PageHero'
import { INTEGRANTES, TURMA } from '../data/integrantes'

const DISCIPLINAS: readonly string[] = [
  'Artificial Intelligence & Chat Bot',
  'Building Relational Database',
  'Computational Thinking Using Python',
  'Domain Driven Design using Java',
  'Front-end Design Engineering',
  'Software Engineering and Business Model',
] as const

export function Integrantes() {
  return (
    <>
      <PageHero
        tag="Equipe"
        titulo={
          <>
            Quem fez o <Realce>EcoScore</Realce>
          </>
        }
        texto={`Turma ${TURMA} — FIAP 2026. Três estudantes unidos pela SolCon com uma visão em comum: tecnologia a serviço da sustentabilidade.`}
      />

      {/* CARDS DOS INTEGRANTES */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  <p className="mt-2 font-sans text-sm font-medium text-soul">RM: {integrante.rm}</p>
                  <p className="mt-1 font-sans text-xs text-ink-muted">{integrante.curso}</p>
                  <p className="mt-1 font-sans text-xs text-ink-muted">Turma {integrante.turma}</p>
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
              alt="SolCon — Conectamos Hoje. Construímos o Futuro."
              loading="lazy"
              className="w-full max-w-xs rounded-card border border-line bg-white p-8"
            />
          </div>

          <div>
            <span className="inline-flex items-center rounded-pill border border-soul-light bg-white px-3 py-1 font-sans text-xs font-medium text-soul-deep">
              Nossa startup
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold text-navy sm:text-3xl">
              <Realce>Sol</Realce>Con
            </h2>
            <p className="mt-2 font-sans text-sm font-semibold uppercase tracking-wide text-soul">
              Conectamos hoje. Construímos o futuro.
            </p>
            <p className="mt-4 font-sans text-base leading-relaxed text-ink-muted">
              A <strong className="font-medium text-soul">SolCon</strong> é uma startup de soluções tecnológicas
              conectadas, criada para transformar ideias em produtos digitais com propósito. Nascemos da crença
              de que tecnologia bem aplicada gera impacto real.
            </p>
            <p className="mt-3 font-sans text-base leading-relaxed text-ink-muted">
              É com essa mentalidade que desenvolvemos o{' '}
              <strong className="font-medium text-navy">EcoScore</strong> — nossa solução de gamificação
              sustentável para a plataforma SoulUp, transformando hábitos cotidianos em ações com recompensas
              reais e impacto ambiental mensurável.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge tone="azul">
                <Lightbulb size={12} aria-hidden /> Inovação
              </Badge>
              <Badge tone="azul">
                <Sprout size={12} aria-hidden /> Sustentabilidade
              </Badge>
              <Badge tone="azul">
                <Cpu size={12} aria-hidden /> Tecnologia
              </Badge>
              <Badge tone="azul">
                <Target size={12} aria-hidden /> Propósito
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* CONTEXTO ACADÊMICO */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="Contexto acadêmico"
            titulo="Challenge FIAP 2026"
            descricao="O projeto foi desenvolvido no contexto do Challenge FIAP 2026, metodologia de aprendizado por projetos reais."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="text-center">
              <CircleBadge variant="wash" size="md" className="mx-auto">
                <GraduationCap size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">FIAP</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                Faculdade de Informática e Administração Paulista — referência em tecnologia e inovação no
                Brasil.
              </p>
            </Card>
            <Card className="text-center">
              <CircleBadge variant="wash" size="md" className="mx-auto">
                <Building2 size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">Turma {TURMA}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                1º semestre de 2026 do curso de Análise e Desenvolvimento de Sistemas — modalidade presencial.
              </p>
            </Card>
            <Card className="text-center">
              <CircleBadge variant="wash" size="md" className="mx-auto">
                <Handshake size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">Parceria SoulUp</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                Empresa parceira que trouxe o desafio real: como aumentar o engajamento sustentável da
                plataforma.
              </p>
            </Card>
          </div>

          <div className="mt-10 rounded-card border border-line bg-surf p-8 text-center">
            <h3 className="font-display text-lg font-semibold text-navy">Disciplinas envolvidas</h3>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {DISCIPLINAS.map((disciplina) => (
                <Badge key={disciplina} tone="verde">
                  {disciplina}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <NextStep
        titulo="Quer falar com a equipe?"
        descricao="Entre em contato para tirar dúvidas, enviar sugestões ou propor parcerias."
        ctaLabel="Falar com a equipe →"
        ctaTo="/contato"
      />
    </>
  )
}
