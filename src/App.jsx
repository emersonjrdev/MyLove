import { useMemo, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, Music, MessageCircleHeart, ChevronLeft, ChevronRight, Calendar,
  Sparkles, Star, Upload, X, ImagePlus, Settings
} from 'lucide-react'

export default function App() {
  const nome = "meu amor";
  const mensagem = "Em teus olhos encontrei meu lar,\nOnde posso sempre descansar.\nCada momento ao teu lado é especial,\nÉs a razão do meu bem-estar.";
  const autor = "— Para toda a eternidade, seu amor";

  // Vídeo local - Coloque seu vídeo na pasta public e atualize o caminho aqui
  // Exemplo: "/video.mp4" ou "/nossa-musica.mp4"
  const videoPath = "/Te Vivo.mp4"; // Vídeo "Te Vivo.mp4" na pasta public
  
  // Fotos padrão (fallback)
  const fotosPadrao = [
    "/WhatsApp Image 2025-11-30 at 00.28.50 (1).jpeg",
    "/WhatsApp Image 2025-11-30 at 00.28.50.jpeg",
    "/WhatsApp Image 2025-11-30 at 00.28.51 (1).jpeg",
    "/WhatsApp Image 2025-11-30 at 00.28.51.jpeg",
    "/love.png",
    "/love2.png",
  ];

  // Data do início do namoro (14 de agosto de 2025)
  const dataInicioNamoro = new Date(2025, 7, 14); // 14 de Agosto de 2025
  const [diasNamoro, setDiasNamoro] = useState(0);

  // Estado para imagens da galeria (base64)
  const [fotosGaleria, setFotosGaleria] = useState(() => {
    // Carrega imagens salvas do localStorage
    const saved = localStorage.getItem('fotosGaleria');
    return saved ? JSON.parse(saved) : [];
  });

  // Combina fotos da galeria com fotos padrão
  const fotos = [...fotosGaleria, ...fotosPadrao];

  const [fotoAtual, setFotoAtual] = useState(0);
  const [imagemCarregando, setImagemCarregando] = useState(true);
  const [mostrarGerenciador, setMostrarGerenciador] = useState(false);
  const [videoTocando, setVideoTocando] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    document.title = `Para ${nome} ❤️`
    
    // Calcula os dias de namoro
    const calcularDiasNamoro = () => {
      const hoje = new Date();
      const diferenca = hoje.getTime() - dataInicioNamoro.getTime();
      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      setDiasNamoro(Math.max(0, dias));
    };
    calcularDiasNamoro();
    // Atualiza a cada hora para manter atualizado
    const interval = setInterval(calcularDiasNamoro, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Salva fotos no localStorage quando mudarem
  useEffect(() => {
    localStorage.setItem('fotosGaleria', JSON.stringify(fotosGaleria));
  }, [fotosGaleria]);

  // Função para converter imagem para base64
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target.result;
          setFotosGaleria(prev => [...prev, base64Image]);
        };
        reader.readAsDataURL(file);
      }
    });
    
    // Limpa o input para permitir selecionar a mesma imagem novamente
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Função para remover imagem
  const removerImagem = (index) => {
    setFotosGaleria(prev => {
      const novasFotos = prev.filter((_, i) => i !== index);
      // Ajusta o índice atual se a foto removida estava sendo exibida
      if (fotoAtual === index && novasFotos.length > 0) {
        setFotoAtual(0);
      } else if (fotoAtual >= prev.length - 1 && novasFotos.length > 0) {
        setFotoAtual(Math.min(fotoAtual, novasFotos.length - 1));
      }
      return novasFotos;
    });
  };

  // Efeito para trocar automaticamente as fotos
  useEffect(() => {
    if (fotos.length <= 1) return;
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
    Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 8,
      scale: 0.5 + Math.random() * 1.5,
      opacity: 0.2 + Math.random() * 0.6
    })), [])

  const stars = useMemo(() =>
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
      scale: 0.3 + Math.random() * 0.7
    })), [])

  // Partículas futuristas
  const particles = useMemo(() =>
    Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: 2 + Math.random() * 4,
      color: ['#f43f5e', '#a855f7', '#3b82f6', '#ec4899'][Math.floor(Math.random() * 4)]
    })), [])

  // Orbs flutuantes
  const orbs = useMemo(() =>
    Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      size: 100 + Math.random() * 200,
      color: ['#f43f5e', '#a855f7', '#3b82f6'][i]
    })), [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{
      background: 'radial-gradient(ellipse at top, #1a0a2e 0%, #0a0a0f 50%, #000000 100%)'
    }}>
      {/* Background futurista com gradiente animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orbs flutuantes coloridos */}
        {orbs.map(orb => (
          <motion.div
            key={orb.id}
            className="floating-orb"
            style={{
              left: `${orb.left}%`,
              top: `${orb.top}%`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              background: `radial-gradient(circle, ${orb.color}40, transparent)`,
              animationDelay: `${orb.delay}s`
            }}
          />
        ))}

        {/* Grid cyberpunk */}
        <div className="absolute inset-0 cyber-grid opacity-20" />

        {/* Partículas futuristas */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `radial-gradient(circle, ${p.color}, transparent)`,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              y: [0, -100, -200],
              x: [0, Math.random() * 50 - 25]
            }}
            transition={{ 
              delay: p.delay, 
              duration: p.duration, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Corações animados com efeito neon */}
        {hearts.map(h => (
          <motion.div
            key={h.id}
            className="absolute"
            initial={{ y: '110vh', x: `${h.left}vw`, scale: h.scale, opacity: 0, rotate: 0 }}
            animate={{ 
              y: '-10vh', 
              opacity: h.opacity,
              rotate: [0, 15, -15, 0]
            }}
            transition={{ 
              delay: h.delay, 
              duration: h.duration, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          >
            <Heart 
              className="w-4 h-4 sm:w-6 sm:h-6 glow" 
              fill="currentColor"
              style={{ color: '#f43f5e' }}
            />
          </motion.div>
        ))}
        
        {/* Estrelas cintilantes com brilho neon */}
        {stars.map(s => (
          <motion.div
            key={s.id}
            className="absolute"
            style={{ 
              left: `${s.left}%`, 
              top: `${s.top}%`,
              filter: 'drop-shadow(0 0 10px rgba(244, 63, 94, 0.8))'
            }}
            animate={{ 
              opacity: [0.2, 1, 0.2],
              scale: [s.scale, s.scale * 1.5, s.scale],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              delay: s.delay, 
              duration: s.duration, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Star className="w-3 h-3 sm:w-4 sm:h-4" fill="#fbbf24" />
          </motion.div>
        ))}

        {/* Efeito de scan line */}
        <div className="absolute inset-0 scan-line opacity-30" />
      </div>

      <main className="relative z-10 w-full max-w-5xl">
        <motion.section 
          className="glass-morphism-dark rounded-3xl sm:rounded-[2rem] shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden glow-border energy-pulse"
          initial={{ opacity: 0, y: 30, scale: 0.96, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          whileHover={{ scale: 1.01 }}
        >
          {/* Efeitos holográficos e brilho futurista */}
          <div className="absolute inset-0 holographic pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(244,63,94,0.2),transparent_60%)] pointer-events-none animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.2),transparent_60%)] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Efeito de energia pulsante */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.1) 0%, transparent 70%)',
                'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.1) 0%, transparent 70%)',
                'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 70%)',
                'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.1) 0%, transparent 70%)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.header 
            className="flex items-center justify-between gap-3 mb-4 sm:mb-6 relative z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <motion.div 
                className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white glow heart-animation shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircleHeart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </motion.div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gradient-futuristic neon-pink">
                  Para <span className="neon-pink">{nome}</span>
                </h1>
                <motion.div 
                  className="flex items-center gap-1 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-3 h-3 text-rose-400 glow" />
                  </motion.div>
                  <span className="text-xs text-rose-400/80 neon-pink" style={{ fontSize: '0.7rem' }}>Feito com muito amor</span>
                </motion.div>
              </div>
            </div>
            
            {/* Botão para gerenciar imagens futurista */}
            <motion.button
              onClick={() => setMostrarGerenciador(!mostrarGerenciador)}
              className="p-2 sm:p-3 rounded-xl glass-morphism text-rose-400 hover:text-rose-300 transition-all shadow-md glow-border"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              title="Gerenciar fotos"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </motion.header>

          {/* Gerenciador de Imagens */}
          <AnimatePresence>
            {mostrarGerenciador && (
              <motion.div
                className="mb-4 sm:mb-6 p-4 sm:p-5 glass-morphism rounded-xl sm:rounded-2xl shadow-lg relative z-10 glow-border"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gradient-futuristic neon-pink flex items-center gap-2">
                    <ImagePlus className="w-5 h-5 glow" />
                    Suas Fotos da Galeria
                  </h3>
                  <button
                    onClick={() => setMostrarGerenciador(false)}
                    className="p-1.5 rounded-lg glass-morphism hover:bg-rose-500/20 transition-colors"
                  >
                    <X className="w-4 h-4 text-rose-400" />
                  </button>
                </div>

                {/* Input de upload */}
                <motion.label
                  htmlFor="image-upload"
                  className="block w-full mb-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center gap-2 p-4 glass-morphism rounded-xl border-2 border-dashed border-rose-500/50 cursor-pointer hover:border-rose-400 transition-colors glow-border">
                    <Upload className="w-5 h-5 text-rose-400 glow" />
                    <span className="text-sm sm:text-base font-medium text-rose-300 neon-pink">
                      Adicionar fotos da galeria
                    </span>
                  </div>
                  <input
                    id="image-upload"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </motion.label>

                {/* Grid de imagens */}
                {fotosGaleria.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {fotosGaleria.map((foto, index) => (
                      <motion.div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden border-2 border-rose-500/50 group glow-border"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                      >
                        <img
                          src={foto}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removerImagem(index)}
                          className="absolute top-1 right-1 p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))}
                  </div>
                )}

                {fotosGaleria.length === 0 && (
                  <p className="text-center text-sm text-rose-300/70 py-4">
                    Nenhuma foto adicionada ainda. Clique acima para adicionar fotos da sua galeria!
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contador de dias de namoro futurista */}
          <motion.div 
            className="mb-5 sm:mb-7 p-5 sm:p-6 glass-morphism rounded-2xl sm:rounded-3xl text-center shadow-xl relative overflow-hidden glow-border"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Efeitos de brilho animados futuristas */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/30 via-pink-500/30 via-purple-500/30 to-blue-500/30 animate-pulse" />
            <motion.div 
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.3),transparent_70%)]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <motion.div
                  animate={{ 
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                  className="p-2 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-lg glow"
                >
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
                <span className="text-base sm:text-lg font-bold text-gradient-futuristic neon-pink">
                  Nossa Jornada de Amor
                </span>
              </div>
              <motion.div 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gradient-futuristic neon-pink"
                key={diasNamoro}
                initial={{ scale: 1.3, opacity: 0, rotateX: 90 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                {diasNamoro} {diasNamoro === 1 ? 'dia' : 'dias'}
              </motion.div>
              <motion.p 
                className="text-sm sm:text-base text-rose-400/90 mt-3 flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-rose-500 glow" fill="currentColor" />
                </motion.div>
                Desde 14 de Agosto de 2025
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
                >
                  <Heart className="w-4 h-4 text-rose-500 glow" fill="currentColor" />
                </motion.div>
              </motion.p>
            </div>
          </motion.div>

          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 sm:gap-6 relative z-10">
            <div className="lg:col-span-3 flex flex-col gap-3 sm:gap-4">
              <motion.div
                className="text-base sm:text-lg md:text-xl leading-relaxed text-white whitespace-pre-line italic p-5 sm:p-6 glass-morphism rounded-2xl shadow-lg relative overflow-hidden glow-border"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.7, type: "spring" }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-rose-500/30 to-transparent rounded-bl-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-transparent to-purple-500/10" />
                <div className="relative z-10 font-serif text-rose-100">
                  "{mensagem}"
                </div>
              </motion.div>
              <motion.p 
                className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 text-right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {autor}
              </motion.p>

              <motion.div 
                className="pt-3 sm:pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gradient-futuristic neon-pink mb-3 sm:mb-4 flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-5 h-5 text-rose-500 glow" fill="currentColor" />
                  </motion.div>
                  Te amo porque...
                </h3>
                <ul className="text-rose-100 space-y-2 text-sm sm:text-base">
                  {[
                    "Você é a pessoa mais especial da minha vida",
                    "Seu sorriso ilumina meus dias",
                    "Seu abraço é meu lugar favorito",
                    "Você me faz querer ser uma pessoa melhor",
                    "Cada dia ao seu lado é um presente"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-2 glass-morphism p-3 rounded-lg hover:scale-105 transition-transform"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.2 }}
                      >
                        <Star className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0 glow" fill="currentColor" />
                      </motion.div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <motion.div 
                className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group glow-border"
                initial={{ opacity: 0, scale: 0.85, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.4, duration: 0.7, type: "spring" }}
                whileHover={{ scale: 1.02, rotateY: 5 }}
                style={{
                  border: '2px solid',
                  borderImage: 'linear-gradient(45deg, #f43f5e, #a855f7, #3b82f6, #f43f5e) 1',
                  boxShadow: '0 0 30px rgba(244, 63, 94, 0.5), inset 0 0 30px rgba(244, 63, 94, 0.1)'
                }}
              >
                {/* Carrossel de imagens */}
                <div className="relative w-full h-full bg-gradient-to-br from-rose-100 to-pink-100 dark:from-zinc-800 dark:to-zinc-900">
                  <AnimatePresence mode="wait">
                    {fotos.map((foto, index) => (
                      index === fotoAtual && (
                        <motion.img
                          key={index}
                          src={foto}
                          alt={`Nossa foto ${index + 1}`}
                          className="absolute w-full h-full object-cover"
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          onLoad={() => setImagemCarregando(false)}
                          onError={() => {
                            setImagemCarregando(false);
                            console.error(`Erro ao carregar imagem: ${foto}`);
                          }}
                        />
                      )
                    ))}
                  </AnimatePresence>
                  
                  {/* Loading state */}
                  {imagemCarregando && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-100 to-pink-100 dark:from-zinc-800 dark:to-zinc-900">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Heart className="w-8 h-8 text-rose-400" fill="currentColor" />
                      </motion.div>
                    </div>
                  )}
                  
                  {/* Botões de navegação */}
                  {fotos.length > 1 && (
                    <>
                      <motion.button
                        onClick={fotoAnterior}
                        className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 glass-morphism hover:bg-rose-500/30 text-white rounded-full p-2 sm:p-2.5 transition-all shadow-lg z-20 glow"
                        aria-label="Foto anterior"
                        whileHover={{ scale: 1.1, rotate: -15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>
                      <motion.button
                        onClick={proximaFoto}
                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 glass-morphism hover:bg-rose-500/30 text-white rounded-full p-2 sm:p-2.5 transition-all shadow-lg z-20 glow"
                        aria-label="Próxima foto"
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>
                      
                      {/* Indicadores de slides */}
                      <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                        {fotos.map((_, index) => (
                          <motion.button
                            key={index}
                            onClick={() => {
                              setImagemCarregando(true);
                              setFotoAtual(index);
                            }}
                            className={`rounded-full transition-all ${
                              index === fotoAtual 
                                ? 'bg-white w-8 h-2' 
                                : 'bg-white/50 w-2 h-2'
                            }`}
                            aria-label={`Ir para foto ${index + 1}`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Overlay com gradiente futurista */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    background: [
                      'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.2) 0%, transparent 70%)',
                      'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.2) 0%, transparent 70%)',
                      'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.2) 0%, transparent 70%)',
                      'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.2) 0%, transparent 70%)'
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Texto sobre a imagem futurista */}
                <motion.div 
                  className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white text-center z-10 glass-morphism p-4 rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-sm sm:text-base md:text-lg font-bold neon-pink">
                    Eu te amo, {nome.split(' ')[0]}! ❤️
                  </p>
                  <p className="text-xs sm:text-sm mt-1 text-rose-200">
                    {diasNamoro} dias de pura felicidade
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Player de Vídeo Local Futurista */}
          <motion.div 
            className="mt-6 sm:mt-8 p-4 sm:p-5 glass-morphism-dark rounded-2xl sm:rounded-3xl shadow-2xl relative overflow-hidden glow-border"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Efeito de brilho animado futurista */}
            <motion.div 
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.2) 0%, transparent 70%)',
                  'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.2) 0%, transparent 70%)',
                  'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.2) 0%, transparent 70%)',
                  'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.2) 0%, transparent 70%)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
                <motion.div
                  animate={{ 
                    rotate: [0, -15, 15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                  className="p-2 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-lg glow"
                >
                  <Music className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
                <div className="text-center">
                  <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-gradient-futuristic neon-pink">
                    Nossa Música Especial
                  </h3>
                  <p className="text-xs sm:text-sm text-rose-300/80 mt-0.5">
                    Para você, com todo meu amor ❤️
                  </p>
                </div>
              </div>
              
              <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl group glow-border" style={{
                border: '2px solid',
                borderImage: 'linear-gradient(45deg, #f43f5e, #a855f7, #3b82f6) 1',
                boxShadow: '0 0 30px rgba(244, 63, 94, 0.5)'
              }}>
                <video
                  ref={videoRef}
                  src={videoPath}
                  autoPlay
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                  onPlay={() => setVideoTocando(true)}
                  onPause={() => setVideoTocando(false)}
                  onError={(e) => {
                    console.error('Erro ao carregar vídeo. Certifique-se de que o arquivo está na pasta public.');
                  }}
                >
                  Seu navegador não suporta vídeos HTML5.
                </video>
                
                {/* Overlay decorativo futurista */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    background: [
                      'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.1) 0%, transparent 70%)',
                      'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.1) 0%, transparent 70%)',
                      'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 70%)',
                      'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.1) 0%, transparent 70%)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Indicador de som futurista */}
                {videoTocando && (
                  <motion.div
                    className="absolute top-3 right-3 glass-morphism text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-xs sm:text-sm glow"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Music className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.div>
                    <span>Tocando</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Mensagem final futurista */}
          <motion.div 
            className="mt-6 sm:mt-8 p-4 sm:p-5 glass-morphism rounded-xl sm:rounded-2xl text-center shadow-lg relative overflow-hidden glow-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.15) 0%, transparent 70%)',
                  'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.15) 0%, transparent 70%)',
                  'radial-gradient(circle at 50% 50%, rgba(244,63,94,0.15) 0%, transparent 70%)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative z-10">
              <motion.p 
                className="text-rose-100 font-semibold text-sm sm:text-base md:text-lg neon-pink"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Obrigado por existir em minha vida. Cada dia ao seu lado é um presente. ❤️
              </motion.p>
              <motion.p 
                className="text-xs sm:text-sm text-rose-200/90 mt-3 flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-rose-500 glow" fill="currentColor" />
                </motion.div>
                E contando... {diasNamoro} dias de pura felicidade!
                <motion.div
                  animate={{ scale: [1, 1.3, 1], rotate: [0, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Heart className="w-4 h-4 text-rose-500 glow" fill="currentColor" />
                </motion.div>
              </motion.p>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  )
}