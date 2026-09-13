import { Award, Camera, Clock, Droplets, Globe, MapPin, Recycle, Rocket, Smartphone, Sprout, Star } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Card } from '../components/ui/Card'
import { CircleBadge } from '../components/ui/CircleBadge'
import { FeatureItem, FeatureList } from '../components/ui/FeatureList'
import { NextStep } from '../components/ui/NextStep'
import { PageHero, Realce } from '../components/ui/PageHero'
import { ETAPAS } from '../data/como-funciona'

const ICONES_ETAPA = {
  globe: Globe,
  smartphone: Smartphone,
  camera: Camera,
  star: Star,
  award: Award,
} as const

export function ComoFunciona() {
  return (
    <>
      <PageHero
        tag="Como funciona"
        titulo={
          <>
            Do <Realce>mundo real</Realce> à recompensa
          </>
        }
        texto="Cada ação sustentável que você faz no mundo real se transforma em Soul Points — validada, verificada e recompensada."
      />

      {/* FLUXO */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="O fluxo"
            titulo="5 etapas simples"
            descricao="Desde a ação sustentável até a recompensa na sua conta — veja como cada etapa funciona."
          />

          <ol className="mx-auto mt-10 flex max-w-3xl flex-col gap-4">
            {ETAPAS.map((etapa) => {
              const Icone = ICONES_ETAPA[etapa.icone]
              return (
                <li key={etapa.numero} className="flex gap-4 rounded-card border border-line bg-white p-5 sm:p-6">
                  <CircleBadge variant="solid" size="md">
                    {etapa.numero}
                  </CircleBadge>
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-1.5 rounded-pill border border-soul-light bg-soul-wash px-2.5 py-1 font-sans text-xs font-medium text-soul-deep">
                      <Icone size={12} aria-hidden />
                      {etapa.tag}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-semibold text-navy">{etapa.titulo}</h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">{etapa.texto}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* VALIDAÇÃO */}
      <section className="border-t border-line bg-surf">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="Validação"
            titulo="Como a evidência é validada"
            descricao="Foto capturada direto no app — sem upload externo. Simples para quem é honesto, difícil de falsificar para quem não é."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CircleBadge variant="wash" size="md">
                <Camera size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">Foto no app</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                A captura acontece diretamente pelo app. Sem upload de arquivo externo — isso elimina o vetor de
                fraude mais óbvio sem adicionar fricção perceptível para quem está sendo honesto.
              </p>
            </Card>
            <Card>
              <CircleBadge variant="wash" size="md">
                <MapPin size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">Metadados automáticos</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                Localização GPS e timestamp são registrados automaticamente. Isso impede reutilização de fotos
                antigas e contextualiza a evidência sem trabalho extra do usuário.
              </p>
            </Card>
            <Card>
              <CircleBadge variant="wash" size="md">
                <Clock size={20} aria-hidden />
              </CircleBadge>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">Tempo real em Jardinagem</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">
                A única etapa com tempo obrigatório: a foto 14 dias após o plantio. Cria um motivo concreto de
                retorno à plataforma sem precisar de streak artificial ou notificação agressiva.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* AS 3 CLASSES */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            tag="As 3 classes"
            titulo="O que conta como evidência?"
            descricao="Escolhidas por acessibilidade urbana — qualquer usuário em apartamento consegue percorrer as três classes sem espaço, equipamento ou contexto específico."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <div className="flex items-center gap-3">
                <CircleBadge variant="wash" size="md">
                  <Sprout size={20} aria-hidden />
                </CircleBadge>
                <h3 className="font-display text-lg font-semibold text-navy">Jardinagem</h3>
              </div>
              <FeatureList className="mt-4">
                <FeatureItem>Plantar em qualquer recipiente: garrafa PET, copo, lata</FeatureItem>
                <FeatureItem>Foto no momento do plantio (evidência 1)</FeatureItem>
                <FeatureItem>Foto 14 dias depois (evidência 2 — único prazo obrigatório)</FeatureItem>
                <FeatureItem>Vaso de PET vale nas trilhas de Jardinagem e Reciclagem ao mesmo tempo</FeatureItem>
              </FeatureList>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <CircleBadge variant="wash" size="md">
                  <Recycle size={20} aria-hidden />
                </CircleBadge>
                <h3 className="font-display text-lg font-semibold text-navy">Reciclagem</h3>
              </div>
              <FeatureList className="mt-4">
                <FeatureItem>Foto na separação de recicláveis em casa</FeatureItem>
                <FeatureItem>Foto no ponto de coleta no momento da entrega</FeatureItem>
                <FeatureItem>Vaso feito de PET conta aqui e em Jardinagem ao mesmo tempo</FeatureItem>
              </FeatureList>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <CircleBadge variant="wash" size="md">
                  <Droplets size={20} aria-hidden />
                </CircleBadge>
                <h3 className="font-display text-lg font-semibold text-navy">Água</h3>
              </div>
              <FeatureList className="mt-4">
                <FeatureItem>Foto de adaptação instalada: redutor de fluxo, captador de chuva</FeatureItem>
                <FeatureItem>Reutilização de água documentada no app</FeatureItem>
                <FeatureItem>Sem necessidade de fatura ou comprovante externo</FeatureItem>
              </FeatureList>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-surf">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="rounded-card border border-line bg-white p-8 text-center sm:p-10">
            <CircleBadge variant="wash" size="lg" className="mx-auto">
              <Rocket size={28} aria-hidden />
            </CircleBadge>
            <h2 className="mt-5 font-display text-2xl font-semibold text-navy sm:text-3xl">
              Pronto para começar?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-sans text-base leading-relaxed text-ink-muted">
              Explore o sistema completo de habilidades e veja o que você pode alcançar com suas ações
              sustentáveis.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button to="/ecoscore">Ver skill tree</Button>
              <Button to="/faq" variant="secondary">
                Tem dúvidas? FAQ →
              </Button>
            </div>
          </div>
        </div>
      </section>

      <NextStep
        titulo="Sinta o impacto no Dashboard"
        descricao="Veja em tempo real como cada ação alimenta um ecossistema vivo — com mascote, métricas e respostas emocionais."
        ctaLabel="Abrir o Dashboard →"
        ctaTo="/dashboard"
      />
    </>
  )
}
