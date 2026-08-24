import { ArrowRight, Camera, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { CircleBadge } from '../components/ui/CircleBadge'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Solzinho } from '../components/mascot/Solzinho'
import { META_CICLO, TETO_BENEFICIO } from '../data/acoes'

interface Etapa {
  id: string
  numero: string
  titulo: string
  texto: string
}

const ETAPAS: readonly Etapa[] = [
  {
    id: 'cadastro',
    numero: '01',
    titulo: 'Entre pela SoulUp',
    texto: 'O EcoScore é uma camada dentro da plataforma. Quem já tem conta não precisa de cadastro novo.',
  },
  {
    id: 'aja',
    numero: '02',
    titulo: 'Faça a ação',
    texto: 'Plante, recicle, reduza energia ou economize água. Vale o que acontece no mundo real.',
  },
  {
    id: 'evidencia',
    numero: '03',
    titulo: 'Capture a evidência',
    texto: 'Foto tirada dentro do app, com GPS e timestamp. Sem upload externo, sem galeria.',
  },
  {
    id: 'pontue',
    numero: '04',
    titulo: 'Receba os pontos',
    texto: 'A validação credita os Soul Points na hora e devolve o impacto convertido em métrica.',
  },
  {
    id: 'recompensa',
    numero: '05',
    titulo: 'Chegue aos 100',
    texto: `Feche o ciclo com ${META_CICLO} Soul Points e concorra à conta de energia subsidiada.`,
  },
] as const

export function Sobre() {
  return (
    <>
      {/* INTRO */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <SectionHeading
              tag="Sobre"
              titulo="Entenda o problema. Veja a saída."
              descricao="Campanhas de sustentabilidade prendem atenção por uma semana e somem. Falta consequência: o esforço não vira nada que a pessoa sinta no bolso ou no perfil."
            />

            <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-ink-muted">
              O EcoScore fecha esse laço. Cada ação ecológica registrada vira Soul Points na plataforma
              SoulUp, e os pontos têm destino claro: {META_CICLO} no ciclo colocam a conta de energia do mês
              seguinte por conta da SoulUp, limitada a R$ {TETO_BENEFICIO}.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/solucao">
                Ver a solução
                <ArrowRight size={18} aria-hidden />
              </Button>
              <Button to="/faq" variant="secondary">
                Tirar dúvidas
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Solzinho size={240} animated className="h-auto max-w-full" />
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="border-t border-line bg-surf">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="Como funciona"
            titulo="Cinco passos. Nada além."
            descricao="Do login à recompensa, o fluxo inteiro cabe em cinco etapas — e nenhuma delas depende de o usuário confiar na palavra do outro."
          />

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ETAPAS.map((etapa) => (
              <li key={etapa.id} className="rounded-card border border-line bg-white p-6">
                <CircleBadge variant="wash" size="md">
                  {etapa.numero}
                </CircleBadge>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy">{etapa.titulo}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">{etapa.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="Diferenciais"
            titulo="Prove. Recompense. Repita."
            descricao="Três decisões de projeto sustentam o sistema inteiro."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CircleBadge variant="wash" size="md">
                <Camera size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">Evidência no app</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                Foto capturada dentro do aplicativo, com GPS e timestamp. Elimina o vetor de fraude mais
                óbvio sem criar fricção para quem age de boa-fé.
              </p>
            </Card>

            <Card>
              <CircleBadge variant="wash" size="md">
                <Sparkles size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">Recompensa tangível</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                A conta de energia subsidiada é consequência direta de ações verificadas — não sorteio, não
                cupom, não promessa de desconto futuro.
              </p>
            </Card>

            <Card>
              <CircleBadge variant="wash" size="md">
                <ShieldCheck size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">Reputação que pesa</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                No feed, o voto de quem completou uma trilha vale mais do que o de quem criou a conta
                ontem. Não é algoritmo: é histórico de ação.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ECONOMIA ÚNICA */}
      <section className="border-t border-line bg-surf">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="rounded-card bg-navy p-8 sm:p-12">
            <h2 className="max-w-2xl font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Uma moeda só. Sem conversão.
            </h2>
            <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-white/75">
              O EcoScore usa os Soul Points que a SoulUp já tem. Não existe segunda moeda, não existe taxa
              de câmbio interna e não existe decisão desnecessária para o usuário: o que ele ganha é o
              mesmo ponto que ele gasta.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
