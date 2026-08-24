import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Check, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { CircleBadge } from '../components/ui/CircleBadge'
import { SectionHeading } from '../components/ui/SectionHeading'
import { INTEGRANTES } from '../data/integrantes'

/** Campos do formulário de contato. */
export interface ContatoFormData {
  nome: string
  email: string
  assunto: string
  mensagem: string
}

const ASSUNTOS: readonly string[] = [
  'Dúvida sobre o projeto',
  'Proposta de parceria',
  'Feedback da banca',
  'Outro assunto',
] as const

const CAMPO =
  'w-full rounded-card border bg-white px-4 py-3 font-sans text-sm text-navy transition-colors placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-soul'

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
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:py-20">
        {/* FORMULÁRIO */}
        <div>
          <SectionHeading
            tag="Contato"
            titulo="Escreva. A gente responde."
            descricao="Dúvidas sobre o EcoScore, proposta de parceria ou feedback da banca — todos chegam no mesmo lugar."
          />

          {enviado ? (
            <div
              role="status"
              className="mt-8 flex items-start gap-4 rounded-card border border-soul-light bg-soul-wash p-6"
            >
              <CircleBadge variant="solid" size="sm">
                <Check size={14} aria-hidden />
              </CircleBadge>
              <div>
                <p className="font-display text-base font-semibold text-navy">Mensagem enviada.</p>
                <p className="mt-1 font-sans text-sm text-ink-muted">
                  Obrigado pelo contato. A equipe responde em até 3 dias úteis.
                </p>
                <button
                  type="button"
                  onClick={() => setEnviado(false)}
                  className="mt-3 font-sans text-sm font-medium text-soul underline underline-offset-4"
                >
                  Enviar outra mensagem
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 flex flex-col gap-5">
              {/* NOME */}
              <div>
                <label htmlFor="nome" className="font-sans text-sm font-medium text-navy">
                  Nome
                </label>
                <input
                  id="nome"
                  type="text"
                  placeholder="Como podemos te chamar?"
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
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="voce@email.com"
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

              {/* ASSUNTO */}
              <div>
                <label htmlFor="assunto" className="font-sans text-sm font-medium text-navy">
                  Assunto
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
                    <option key={assunto} value={assunto}>
                      {assunto}
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
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  rows={5}
                  placeholder="Conte o que você precisa."
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

              <Button type="submit" size="lg" disabled={isSubmitting} className="self-start">
                Enviar mensagem
              </Button>
            </form>
          )}
        </div>

        {/* CANAIS */}
        <aside className="flex flex-col gap-5">
          <div className="rounded-card border border-line bg-surf p-6">
            <CircleBadge variant="wash" size="md">
              <Mail size={20} aria-hidden />
            </CircleBadge>
            <h2 className="mt-4 font-display text-lg font-semibold text-navy">E-mail direto</h2>
            <a
              href="mailto:francosdevs@gmail.com"
              className="mt-1 inline-block font-sans text-sm text-soul underline underline-offset-4"
            >
              francosdevs@gmail.com
            </a>
          </div>

          <div className="rounded-card border border-line bg-white p-6">
            <h2 className="font-display text-lg font-semibold text-navy">Fale com a equipe</h2>
            <ul className="mt-4 flex flex-col gap-4">
              {INTEGRANTES.map((integrante) => (
                <li key={integrante.id} className="flex items-center justify-between gap-3">
                  <span className="min-w-0 font-sans text-sm text-navy">
                    {integrante.nome.split(' ')[0]}
                    <span className="ml-2 text-xs text-ink-muted">RM {integrante.rm}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <a
                      href={integrante.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn de ${integrante.nome}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-pill border border-line text-navy transition-colors hover:border-soul hover:text-soul"
                    >
                      <Linkedin size={14} aria-hidden />
                    </a>
                    <a
                      href={integrante.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub de ${integrante.nome}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-pill border border-line text-navy transition-colors hover:border-soul hover:text-soul"
                    >
                      <Github size={14} aria-hidden />
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}
