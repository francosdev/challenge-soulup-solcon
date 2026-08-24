import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GraduationCap, Mail, Monitor } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { CircleBadge } from '../components/ui/CircleBadge'
import { NextStep } from '../components/ui/NextStep'
import { PageHero, Realce } from '../components/ui/PageHero'
import { INTEGRANTES, TURMA } from '../data/integrantes'

/** Campos do formulário de contato. */
export interface ContatoFormData {
  nome: string
  email: string
  assunto: string
  mensagem: string
}

const ASSUNTOS: readonly { value: string; label: string }[] = [
  { value: 'duvida', label: 'Dúvida sobre o projeto' },
  { value: 'sugestao', label: 'Sugestão de melhoria' },
  { value: 'parceria', label: 'Interesse em parceria' },
  { value: 'imprensa', label: 'Imprensa / Media' },
  { value: 'outro', label: 'Outro' },
] as const

const CAMPO =
  'w-full rounded-card border bg-white px-4 py-3 font-sans text-sm text-navy transition-colors placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-soul'

/** Iniciais do integrante para o avatar circular da lista lateral. */
function iniciais(nome: string): string {
  const partes = nome.split(' ').filter(Boolean)
  const primeira = partes[0]?.charAt(0) ?? ''
  const ultima = partes.length > 1 ? partes[partes.length - 1].charAt(0) : ''
  return `${primeira}${ultima}`.toUpperCase()
}

export function Contato() {
  const [enviado, setEnviado] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContatoFormData>({
    defaultValues: { nome: '', email: '', assunto: '', mensagem: '' },
  })

  // Sem consumo de API nesta etapa: o envio apenas confirma na interface.
  const onSubmit = (dados: ContatoFormData): void => {
    console.info('Contato recebido:', dados)
    setEnviado(true)
    reset()
  }

  const borda = (erro: boolean): string => (erro ? 'border-red-600' : 'border-line')

  return (
    <>
      <PageHero
        tag="Contato"
        titulo={
          <>
            Fale com a <Realce>equipe</Realce>
          </>
        }
        texto="Dúvidas sobre o projeto, sugestões ou interesse em parceria? Preencha o formulário e entraremos em contato."
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:py-20">
          {/* FORMULÁRIO */}
          <div>
            {enviado ? (
              <div role="status" className="rounded-card border border-soul-light bg-soul-wash p-8 text-center">
                <p className="font-display text-4xl">✅</p>
                <p className="mt-3 font-display text-xl font-semibold text-navy">Mensagem enviada!</p>
                <p className="mt-2 font-sans text-sm text-ink-muted">
                  Agradecemos o contato. Retornaremos em até 3 dias úteis.
                </p>
                <button
                  type="button"
                  onClick={() => setEnviado(false)}
                  className="mt-5 font-sans text-sm font-medium text-soul underline underline-offset-4"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* NOME */}
                  <div>
                    <label htmlFor="nome" className="font-sans text-sm font-medium text-navy">
                      Nome completo *
                    </label>
                    <input
                      id="nome"
                      type="text"
                      placeholder="Seu nome"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.nome)}
                      aria-describedby={errors.nome ? 'erro-nome' : undefined}
                      className={`mt-2 ${CAMPO} ${borda(Boolean(errors.nome))}`}
                      {...register('nome', {
                        required: 'Informe seu nome.',
                        minLength: { value: 3, message: 'O nome precisa de pelo menos 3 caracteres.' },
                      })}
                    />
                    {errors.nome ? (
                      <p id="erro-nome" className="mt-2 font-sans text-xs text-red-600">
                        {errors.nome.message}
                      </p>
                    ) : null}
                  </div>

                  {/* E-MAIL */}
                  <div>
                    <label htmlFor="email" className="font-sans text-sm font-medium text-navy">
                      E-mail *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'erro-email' : undefined}
                      className={`mt-2 ${CAMPO} ${borda(Boolean(errors.email))}`}
                      {...register('email', {
                        required: 'Informe seu e-mail.',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                          message: 'Informe um e-mail válido, como nome@dominio.com.',
                        },
                      })}
                    />
                    {errors.email ? (
                      <p id="erro-email" className="mt-2 font-sans text-xs text-red-600">
                        {errors.email.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* ASSUNTO */}
                <div>
                  <label htmlFor="assunto" className="font-sans text-sm font-medium text-navy">
                    Assunto *
                  </label>
                  <select
                    id="assunto"
                    aria-invalid={Boolean(errors.assunto)}
                    aria-describedby={errors.assunto ? 'erro-assunto' : undefined}
                    className={`mt-2 ${CAMPO} ${borda(Boolean(errors.assunto))}`}
                    {...register('assunto', { required: 'Escolha um assunto.' })}
                  >
                    <option value="">Selecione um assunto</option>
                    {ASSUNTOS.map((assunto) => (
                      <option key={assunto.value} value={assunto.value}>
                        {assunto.label}
                      </option>
                    ))}
                  </select>
                  {errors.assunto ? (
                    <p id="erro-assunto" className="mt-2 font-sans text-xs text-red-600">
                      {errors.assunto.message}
                    </p>
                  ) : null}
                </div>

                {/* MENSAGEM */}
                <div>
                  <label htmlFor="mensagem" className="font-sans text-sm font-medium text-navy">
                    Mensagem *
                  </label>
                  <textarea
                    id="mensagem"
                    rows={6}
                    placeholder="Descreva sua dúvida ou mensagem com detalhes (mínimo 20 caracteres)..."
                    aria-invalid={Boolean(errors.mensagem)}
                    aria-describedby={errors.mensagem ? 'erro-mensagem' : undefined}
                    className={`mt-2 resize-y ${CAMPO} ${borda(Boolean(errors.mensagem))}`}
                    {...register('mensagem', {
                      required: 'Escreva sua mensagem.',
                      minLength: { value: 20, message: 'A mensagem precisa de pelo menos 20 caracteres.' },
                    })}
                  />
                  {errors.mensagem ? (
                    <p id="erro-mensagem" className="mt-2 font-sans text-xs text-red-600">
                      {errors.mensagem.message}
                    </p>
                  ) : null}
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                  Enviar mensagem →
                </Button>
              </form>
            )}
          </div>

          {/* INFO LATERAL */}
          <aside className="flex flex-col gap-4">
            <h2 className="font-display text-lg font-semibold text-navy">Outras formas de contato</h2>

            <div className="flex items-center gap-4 rounded-card border border-line bg-white p-5">
              <CircleBadge variant="wash" size="md">
                <Mail size={20} aria-hidden />
              </CircleBadge>
              <div className="min-w-0">
                <p className="font-sans text-xs text-ink-muted">E-mail do projeto</p>
                <a
                  href="mailto:ecoscore@fiap.com.br"
                  className="font-sans text-sm font-medium text-soul underline underline-offset-4"
                >
                  ecoscore@fiap.com.br
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-card border border-line bg-white p-5">
              <CircleBadge variant="wash" size="md">
                <Monitor size={20} aria-hidden />
              </CircleBadge>
              <div className="min-w-0">
                <p className="font-sans text-xs text-ink-muted">Repositório no GitHub</p>
                <a
                  href="https://github.com/francosdev/challenge-soulup-solcon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm font-medium text-soul underline underline-offset-4"
                >
                  challenge-soulup-solcon
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-card border border-line bg-white p-5">
              <CircleBadge variant="wash" size="md">
                <GraduationCap size={20} aria-hidden />
              </CircleBadge>
              <div className="min-w-0">
                <p className="font-sans text-xs text-ink-muted">Instituição</p>
                <p className="font-sans text-sm font-medium text-navy">FIAP — Turma {TURMA} · 2026</p>
              </div>
            </div>

            <div className="rounded-card border border-soul-light bg-soul-wash p-5">
              <p className="font-sans text-sm leading-relaxed text-ink-muted">
                <strong className="font-medium text-soul-deep">Prazo de resposta:</strong> nossa equipe responde
                em até 3 dias úteis. Para dúvidas frequentes, consulte primeiro nossa página de FAQ.
              </p>
            </div>

            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Integrantes no LinkedIn
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {INTEGRANTES.map((integrante) => (
                  <a
                    key={integrante.id}
                    href={integrante.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-card border border-line bg-white p-4 transition-colors hover:border-soul"
                  >
                    <CircleBadge variant="wash" size="md">
                      {iniciais(integrante.nome)}
                    </CircleBadge>
                    <div className="min-w-0">
                      <p className="font-sans text-sm font-medium text-navy">{integrante.nome}</p>
                      <p className="truncate font-sans text-xs text-soul">
                        linkedin.com/in/{integrante.linkedinUser}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <NextStep
        tag="Recomeçar"
        titulo="Volte ao início"
        descricao="Revisite a apresentação do EcoScore ou explore de novo o sistema completo."
        ctaLabel="Ir para o início →"
        ctaTo="/"
        secundarioLabel="Ver o EcoScore"
        secundarioTo="/ecoscore"
      />
    </>
  )
}
