import { Film, Users, Award, Star } from "lucide-react"
import StatsCard from "@/components/stats-card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-orbitron text-3xl font-bold gradient-text">Sobre o CineVerse</h1>

      <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Filmes"
          value={10000}
          icon={<Film className="h-4 w-4" />}
          description="Filmes em nosso catálogo"
        />
        <StatsCard title="Usuários" value={5000} icon={<Users className="h-4 w-4" />} description="Usuários ativos" />
        <StatsCard title="Prêmios" value={15} icon={<Award className="h-4 w-4" />} description="Prêmios recebidos" />
        <StatsCard
          title="Avaliações"
          value={25000}
          icon={<Star className="h-4 w-4" />}
          description="Avaliações de usuários"
        />
      </div>

      <div className="mb-12 rounded-lg border border-purple-900/30 bg-black/60 p-8 backdrop-blur-sm">
        <h2 className="mb-4 font-orbitron text-2xl font-bold gradient-text">Nossa Missão</h2>
        <p className="mb-4 text-gray-300">
          O CineVerse nasceu da paixão pelo cinema e da vontade de criar uma plataforma onde os amantes da sétima arte
          pudessem descobrir, explorar e compartilhar suas experiências cinematográficas.
        </p>
        <p className="mb-4 text-gray-300">
          Nossa missão é proporcionar uma experiência imersiva e personalizada para os entusiastas do cinema, oferecendo
          informações detalhadas sobre filmes, avaliações da crítica e do público, e recomendações personalizadas
          baseadas nos gostos individuais de cada usuário.
        </p>
        <p className="text-gray-300">
          Acreditamos que o cinema é uma forma de arte que transcende fronteiras e conecta pessoas de diferentes
          culturas e backgrounds. Por isso, trabalhamos incansavelmente para criar uma comunidade global de cinéfilos
          que compartilham a mesma paixão.
        </p>
      </div>

      <div className="mb-12 rounded-lg border border-purple-900/30 bg-black/60 p-8 backdrop-blur-sm">
        <h2 className="mb-4 font-orbitron text-2xl font-bold gradient-text">Nossa Equipe</h2>
        <p className="mb-6 text-gray-300">
          Somos um grupo diversificado de profissionais apaixonados por cinema e tecnologia, trabalhando juntos para
          criar a melhor experiência possível para os amantes de filmes.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-lg border border-purple-900/20 bg-black/40 p-6 text-center">
            <div className="mb-4 h-20 w-20 rounded-full bg-gradient-to-r from-purple-600 to-purple-800" />
            <h3 className="mb-1 font-semibold">João Silva</h3>
            <p className="text-sm text-purple-400">Fundador & CEO</p>
            <p className="mt-2 text-sm text-gray-400">
              Cinéfilo desde criança, João fundou o CineVerse com a visão de criar a melhor plataforma para amantes de
              cinema.
            </p>
          </div>

          <div className="flex flex-col items-center rounded-lg border border-purple-900/20 bg-black/40 p-6 text-center">
            <div className="mb-4 h-20 w-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-500" />
            <h3 className="mb-1 font-semibold">Maria Oliveira</h3>
            <p className="text-sm text-purple-400">Diretora de Conteúdo</p>
            <p className="mt-2 text-sm text-gray-400">
              Com formação em cinema, Maria lidera nossa equipe de curadoria de conteúdo e crítica cinematográfica.
            </p>
          </div>

          <div className="flex flex-col items-center rounded-lg border border-purple-900/20 bg-black/40 p-6 text-center">
            <div className="mb-4 h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
            <h3 className="mb-1 font-semibold">Pedro Santos</h3>
            <p className="text-sm text-purple-400">CTO</p>
            <p className="mt-2 text-sm text-gray-400">
              Desenvolvedor full-stack com mais de 10 anos de experiência, Pedro é responsável por toda a infraestrutura
              tecnológica do CineVerse.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-purple-900/30 bg-black/60 p-8 backdrop-blur-sm">
        <h2 className="mb-4 font-orbitron text-2xl font-bold gradient-text">Nossos Parceiros</h2>
        <p className="mb-6 text-gray-300">
          Trabalhamos com os melhores parceiros da indústria para oferecer conteúdo de qualidade e experiências únicas
          aos nossos usuários.
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex h-24 items-center justify-center rounded-lg border border-purple-900/20 bg-black/40 p-4"
            >
              <div className="h-12 w-full rounded bg-gradient-to-r from-purple-900/30 to-purple-800/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
