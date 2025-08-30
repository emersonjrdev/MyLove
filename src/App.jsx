import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, Music, MessageCircleHeart, ChevronLeft, ChevronRight, Calendar
} from 'lucide-react'

export default function App() {
  const nome = "meu amor";
  const mensagem = "Em teus olhos encontrei meu lar,\nOnde posso sempre descansar.\nCada momento ao teu lado é especial,\nÉs a razão do meu bem-estar.";
  const autor = "— Para toda a eternidade, seu amor";

  const youtubeVideoId = "dWpGsK8Md28"
  
  // Array de fotos para o carrossel
  const fotos = [
    "/love.png",
    "/love2.png",
  ];

  // Data do início do namoro (14 de agosto de 2024)
  const dataInicioNamoro = new Date(2025, 7, 14); // 14 de Agosto de 2025 - CORRETO
  const [diasNamoro, setDiasNamoro] = useState(0);

  const [fotoAtual, setFotoAtual] = useState(0);

  useEffect(() => {
    document.title = `Para ${nome} ❤️`
    
    // Calcula os dias de namoro
   // Calcula os dias de namoro
// Calcula os dias de namoro
const calcularDiasNamoro = () => {
  const hoje = new Date();
  const diferenca = hoje.getTime() - dataInicioNamoro.getTime();
  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  setDiasNamoro(dias);
};
    calcularDiasNamoro();
    // Atualiza a cada dia (opcional)
    const interval = setInterval(calcularDiasNamoro, 24 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [nome]);

  // Efeito para trocar automaticamente as fotos
  useEffect(() => {
    const interval = setInterval(() => {
      setFotoAtual((prev) => (prev + 1) % fotos.length);
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(interval);
  }, [fotos.length]);

  const proximaFoto = () => {
    setFotoAtual((prev) => (prev + 1) % fotos.length);
  };

  const fotoAnterior = () => {
    setFotoAtual((prev) => (prev - 1 + fotos.length) % fotos.length);
  };

  const hearts = useMemo(() =>
    Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 8 + Math.random() * 6,
      scale: 0.6 + Math.random() * 1.4,
      opacity: 0.3 + Math.random() * 0.7
    })), [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-zinc-900 dark:to-zinc-800">
      {/* Background com corações animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map(h => (
          <motion.div
            key={h.id}
            className="absolute text-rose-500/60 dark:text-rose-400/60"
            initial={{ y: '110vh', x: `${h.left}vw`, scale: h.scale, opacity: 0 }}
            animate={{ y: '-10vh', opacity: h.opacity }}
            transition={{ delay: h.delay, duration: h.duration, repeat: Infinity, repeatType: 'mirror' }}
          >
            <Heart className="w-4 h-4 sm:w-6 sm:h-6 glow" />
          </motion.div>
        ))}
      </div>

      <main className="relative z-10 w-full max-w-3xl">
        <section className="bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-rose-100/40 dark:border-zinc-800">
          <header className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-rose-500 text-white glow heart-animation">
              <MessageCircleHeart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              Para <span className="text-rose-600 dark:text-rose-400">{nome}</span>
            </h1>
          </header>

          {/* Contador de dias de namoro */}
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-rose-100 dark:bg-rose-900/30 rounded-xl text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 dark:text-rose-400" />
              <span className="text-sm sm:text-base font-medium text-rose-700 dark:text-rose-300">
                Nossa Jornada
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-rose-600 dark:text-rose-400">
              {diasNamoro} {diasNamoro === 1 ? 'dia' : 'dias'}
            </div>
            <p className="text-xs sm:text-sm text-rose-700/70 dark:text-rose-300/70 mt-1">
              Desde 14 de Agosto de 2025
            </p>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 sm:gap-6">
            <div className="lg:col-span-3 flex flex-col gap-3 sm:gap-4">
              <motion.div
                className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-200 whitespace-pre-line"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                "{mensagem}"
              </motion.div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">{autor}</p>

              <div className="pt-3 sm:pt-4">
                <h3 className="text-lg sm:text-xl font-semibold text-rose-700 dark:text-rose-300 mb-1 sm:mb-2">Te amo porque...</h3>
                <ul className="text-zinc-600 dark:text-zinc-300 space-y-1 text-xs sm:text-sm">
                  <li>• Você é a pessoa mais especial da minha vida</li>
                  <li>• Seu sorriso ilumina meus dias</li>
                  <li>• Seu abraço é meu lugar favorito</li>
                  <li>• Você me faz querer ser uma pessoa melhor</li>
                  <li>• Cada dia ao seu lado é um presente</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg sm:shadow-xl">
                {/* Carrossel de imagens */}
                <div className="relative w-full h-full">
                  {fotos.map((foto, index) => (
                    <motion.img
                      key={index}
                      src={foto}
                      alt={`Nossa foto ${index + 1}`}
                      className="absolute w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: index === fotoAtual ? 1 : 0,
                        scale: index === fotoAtual ? 1 : 1.05
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  ))}
                  
                  {/* Botões de navegação */}
                  {fotos.length > 1 && (
                    <>
                      <button
                        onClick={fotoAnterior}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 sm:p-2 transition-all"
                        aria-label="Foto anterior"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        onClick={proximaFoto}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 sm:p-2 transition-all"
                        aria-label="Próxima foto"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      
                      {/* Indicadores de slides */}
                      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {fotos.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setFotoAtual(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === fotoAtual 
                                ? 'bg-white' 
                                : 'bg-white/50'
                            }`}
                            aria-label={`Ir para foto ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white text-center">
                  <p className="text-sm sm:text-base md:text-lg font-semibold">Eu te amo, {nome.split(' ')[0]}!</p>
                  <p className="text-xs sm:text-sm">{diasNamoro} dias de felicidade</p>
                </div>
              </div>
            </div>
          </div>

          {/* Player do YouTube Fixo */}
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl sm:rounded-2xl border border-rose-200 dark:border-rose-800/50">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Music className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 dark:text-rose-400" />
              <span className="font-medium text-rose-700 dark:text-rose-300 text-sm sm:text-base">Nossa Música</span>
            </div>
            
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Mensagem final */}
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg sm:rounded-xl text-center">
            <p className="text-rose-700 dark:text-rose-200 font-medium text-sm sm:text-base">
              Obrigado por existir em minha vida. Cada dia ao seu lado é um presente. ❤️
            </p>
            <p className="text-xs sm:text-sm text-rose-700/70 dark:text-rose-300/70 mt-2">
              E contando... {diasNamoro} dias de pura felicidade!
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}