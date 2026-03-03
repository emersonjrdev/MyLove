import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  ImagePlus,
  Moon,
  Music,
  Settings,
  Sparkles,
  Star,
  Sun,
  ThumbsUp,
  Upload,
  X,
} from "lucide-react";
import MainLayout from "./layouts/MainLayout";
import Card from "./components/ui/Card";
import Button from "./components/ui/Button";
import Gallery from "./components/Gallery";
import Lightbox from "./components/Lightbox";
import Timeline from "./components/Timeline";
import SurpriseModal from "./components/SurpriseModal";
import useLoveCounter from "./hooks/useLoveCounter";
import useInViewReveal from "./hooks/useInViewReveal";
import romanticMessages from "./data/messages";
import timeline from "./data/timeline";

const nome = "meu amor";
const mensagem =
  "Em teus olhos encontrei meu lar,\nOnde posso sempre descansar.\nCada momento ao teu lado e especial,\nEs a razao do meu bem-estar.";
const autor = "— Para toda a eternidade, seu amor";
const videoPath = "/Te Vivo.mp4";
const dataInicioNamoro = new Date(2025, 7, 14);

const fotosPadrao = [
  "/WhatsApp Image 2025-11-30 at 00.28.50 (1).jpeg",
  "/WhatsApp Image 2025-11-30 at 00.28.50.jpeg",
  "/WhatsApp Image 2025-11-30 at 00.28.51 (1).jpeg",
  "/WhatsApp Image 2025-11-30 at 00.28.51.jpeg",
  "/love.png",
  "/love2.png",
];

const motivos = [
  "Voce e a pessoa mais especial da minha vida",
  "Seu sorriso ilumina meus dias",
  "Seu abraco e meu lugar favorito",
  "Voce me faz querer ser uma pessoa melhor",
  "Cada dia ao seu lado e um presente",
];

export default function App() {
  const [fotosGaleria, setFotosGaleria] = useState([]);
  const [fotoAtual, setFotoAtual] = useState(0);
  const [mostrarGerenciador, setMostrarGerenciador] = useState(false);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const fileInputRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const loveCounter = useLoveCounter(dataInicioNamoro);
  const fotos = useMemo(() => [...fotosGaleria, ...fotosPadrao], [fotosGaleria]);

  const [heroRef, heroVisible] = useInViewReveal();
  const [timelineRef, timelineVisible] = useInViewReveal();
  const [galleryRef, galleryVisible] = useInViewReveal();

  useEffect(() => {
    document.title = `Para ${nome} ❤️`;
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (fotos.length <= 1) return undefined;
    const timer = setInterval(() => {
      setFotoAtual((prev) => (prev + 1) % fotos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [fotos.length]);

  useEffect(() => {
    const onScroll = () => {
      setParallaxOffset(window.scrollY || 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!lightboxOpen) return;
      if (event.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % fotos.length);
      } else if (event.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev - 1 + fotos.length) % fotos.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [fotos.length, lightboxOpen]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files || []);
    files.forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = e.target?.result;
        if (typeof image === "string") {
          setFotosGaleria((prev) => [...prev, image]);
        }
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removerImagem = (index) => {
    setFotosGaleria((prev) => prev.filter((_, i) => i !== index));
    setFotoAtual(0);
  };

  const proximaFoto = () => setFotoAtual((prev) => (prev + 1) % fotos.length);
  const fotoAnterior = () => setFotoAtual((prev) => (prev - 1 + fotos.length) % fotos.length);

  const nextSurpriseMessage = () => {
    setMessageIndex((prev) => (prev + 1) % romanticMessages.length);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const triggerConfetti = () => {
    const pieces = Array.from({ length: 24 }).map((_, index) => ({
      id: `${Date.now()}-${index}`,
      left: 10 + Math.random() * 80,
      color: ["#c46a8a", "#efb5c8", "#6d2f45", "#f9dfe7"][index % 4],
      delay: Math.random() * 0.4,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 1300);
  };

  return (
    <MainLayout parallaxOffset={reduceMotion ? 0 : parallaxOffset}>
      <section
        ref={heroRef}
        data-visible={heroVisible}
        className="reveal-on-scroll glass-romantic relative overflow-hidden rounded-[2rem] p-4 shadow-[var(--shadow-strong)] sm:p-8"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-semibold tracking-wide text-rose-main">Feito com muito amor</p>
            <h1 className="font-romantic text-3xl font-bold text-wine-dark sm:text-4xl">
              Para {nome}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              aria-label={darkMode ? "Ativar tema claro" : "Ativar tema escuro"}
              onClick={() => setDarkMode((prev) => !prev)}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
            <Button
              type="button"
              variant="ghost"
              aria-label="Abrir gerenciador de fotos"
              onClick={() => setMostrarGerenciador((prev) => !prev)}
            >
              <Settings size={16} />
            </Button>
          </div>
        </div>

        <Card className="mb-5 text-center">
          <div className="mb-2 flex items-center justify-center gap-2 text-rose-main">
            <Calendar size={18} aria-hidden="true" />
            <span className="font-semibold">Tempo juntinhos em tempo real</span>
          </div>
          <p className="font-romantic text-3xl text-wine-dark sm:text-4xl" aria-live="polite">
            {loveCounter.days} {loveCounter.days === 1 ? "dia" : "dias"}
          </p>
          <p className="mt-2 text-sm text-rose-wine/85">{loveCounter.text}</p>
          <p className="mt-1 text-xs text-rose-wine/80">Desde 14 de Agosto de 2025</p>
        </Card>

        {mostrarGerenciador && (
          <Card className="mb-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="section-title text-xl font-semibold">Suas fotos da galeria</h2>
              <button
                type="button"
                className="focus-ring rounded-full p-2 hover:bg-rose-main/15"
                onClick={() => setMostrarGerenciador(false)}
                aria-label="Fechar painel de fotos"
              >
                <X size={16} />
              </button>
            </div>
            <label htmlFor="image-upload" className="mb-4 block">
              <span className="sr-only">Adicionar fotos da galeria</span>
              <div className="focus-ring flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-rose-main/40 bg-white/40 p-4 text-sm font-semibold text-rose-wine hover:bg-white/65 dark:bg-black/15">
                <Upload size={16} />
                Adicionar fotos da galeria
              </div>
            </label>
            <input
              id="image-upload"
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="sr-only"
              onChange={handleImageUpload}
            />

            {fotosGaleria.length ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {fotosGaleria.map((foto, index) => (
                  <div key={`${foto}-${index}`} className="group relative overflow-hidden rounded-xl">
                    <img src={foto} alt={`Foto adicionada ${index + 1}`} className="aspect-square w-full object-cover" />
                    <button
                      type="button"
                      aria-label={`Remover foto ${index + 1}`}
                      className="focus-ring absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white opacity-0 transition group-hover:opacity-100"
                      onClick={() => removerImagem(index)}
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-rose-wine/80">
                Nenhuma foto adicionada ainda. As fotos ficam apenas nesta sessao (sem armazenamento local).
              </p>
            )}
          </Card>
        )}

        <div className="grid gap-5 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-3">
            <Card>
              <p className="font-romantic whitespace-pre-line text-2xl leading-relaxed text-wine-dark">
                "{mensagem}"
              </p>
              <p className="mt-3 text-right text-sm text-rose-wine/85">{autor}</p>
            </Card>

            <Card>
              <h2 className="section-title mb-3 text-2xl font-semibold">Te amo porque...</h2>
              <ul className="space-y-2">
                {motivos.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-xl border border-rose-main/15 bg-white/45 p-3 text-sm text-rose-wine dark:bg-black/10"
                  >
                    <Star className="mt-0.5 text-rose-main" size={14} fill="currentColor" aria-hidden="true" />
                    <span>
                      {index + 1}. {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="lg:col-span-2">
            <div
              className="relative overflow-hidden rounded-2xl"
              role="region"
              aria-roledescription="carrossel"
              aria-label="Carrossel de fotos do casal"
            >
              <img
                src={fotos[fotoAtual]}
                alt={`Nossa foto ${fotoAtual + 1}`}
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-black/25 p-3 text-center text-white">
                <p className="font-semibold">Eu te amo, {nome.split(" ")[0]} ❤️</p>
                <p className="text-xs">A cada segundo com voce, tudo vale a pena.</p>
              </div>
              {fotos.length > 1 && (
                <>
                  <button
                    type="button"
                    className="focus-ring absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white hover:bg-black/55"
                    onClick={fotoAnterior}
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white hover:bg-black/55"
                    onClick={proximaFoto}
                    aria-label="Próxima foto"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {fotos.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`focus-ring h-2 rounded-full transition ${index === fotoAtual ? "w-7 bg-rose-main" : "w-2 bg-rose-main/35"}`}
                    aria-label={`Ir para foto ${index + 1}`}
                    onClick={() => setFotoAtual(index)}
                  />
                ))}
              </div>
              <Button
                type="button"
                variant="soft"
                onClick={() => openLightbox(fotoAtual)}
                aria-label="Abrir foto atual em tela maior"
              >
                <ImagePlus size={15} />
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button type="button" onClick={() => setSurpriseOpen(true)}>
            <Sparkles size={15} />
            <span className="ms-1">Botao surpresa</span>
          </Button>
          <div className="relative">
            <Button
              type="button"
              variant="soft"
              aria-label="Curtir este momento especial"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => {
                if (!liked) {
                  setLiked(true);
                  setLikeCount((count) => count + 1);
                }
              }}
            >
              <ThumbsUp size={15} />
              <span className="ms-1">Curtir ({likeCount})</span>
            </Button>
            {showTooltip && (
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black px-2 py-1 text-xs text-white">
                Clique para deixar seu carinho
              </span>
            )}
          </div>
          <Button type="button" variant="ghost" onClick={triggerConfetti}>
            Momento especial
          </Button>
        </div>
      </section>

      <section
        ref={timelineRef}
        data-visible={timelineVisible}
        className="reveal-on-scroll mt-6 grid gap-6 lg:grid-cols-2"
      >
        <Timeline items={timeline} />
        <Card>
          <h3 className="section-title mb-3 text-2xl font-semibold">Nossa musica especial</h3>
          <p className="mb-3 text-sm text-rose-wine/85">Para voce, com todo meu amor.</p>
          <div className="overflow-hidden rounded-2xl border border-rose-main/20">
            <video
              src={videoPath}
              autoPlay
              loop
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full object-cover"
            >
              Seu navegador nao suporta video.
            </video>
          </div>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-rose-main/15 px-3 py-1 text-xs text-rose-wine">
            <Music size={13} />
            Tocando nossa historia
          </div>
        </Card>
      </section>

      <section
        ref={galleryRef}
        data-visible={galleryVisible}
        className="reveal-on-scroll mt-6"
      >
        <Gallery photos={fotos} onOpen={openLightbox} />
      </section>

      <Card className="relative mt-6 text-center">
        <p className="font-romantic text-2xl text-wine-dark sm:text-3xl">
          Obrigado por existir na minha vida.
        </p>
        <p className="mt-2 text-sm text-rose-wine/90">Cada dia ao seu lado e um presente. ❤️</p>
        <p className="mt-2 text-xs text-rose-wine/80">
          Continuamos contando: {loveCounter.days} dias de pura felicidade.
        </p>
        <AnimatePresence>
          {confetti.map((piece) => (
            <motion.span
              key={piece.id}
              className="confetti-piece"
              style={{ left: `${piece.left}%`, backgroundColor: piece.color }}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 120, rotate: 260 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 1, delay: piece.delay }}
            />
          ))}
        </AnimatePresence>
      </Card>

      <SurpriseModal
        isOpen={surpriseOpen}
        onClose={() => setSurpriseOpen(false)}
        message={romanticMessages[messageIndex]}
        onNextMessage={nextSurpriseMessage}
      />

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={fotos}
        currentIndex={lightboxIndex}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + fotos.length) % fotos.length)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % fotos.length)}
      />
    </MainLayout>
  );
}
