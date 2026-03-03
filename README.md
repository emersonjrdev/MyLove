# Site Romântico Interativo (React + Vite + Tailwind)

Site dedicado para sua namorada, com visual romântico moderno, microinterações suaves, galeria com lightbox e foco em acessibilidade.

## Stack

- React 18
- Vite 5
- Tailwind CSS
- Framer Motion
- Lucide React

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

## Estrutura principal

```txt
src/
  components/
    ui/
      Button.jsx
      Card.jsx
      Modal.jsx
    BackgroundEffects.jsx
    Gallery.jsx
    Lightbox.jsx
    SurpriseModal.jsx
    Timeline.jsx
  data/
    messages.js
    timeline.js
  hooks/
    useInViewReveal.js
    useLoveCounter.js
  layouts/
    MainLayout.jsx
  styles/
    theme.css
    animations.css
  App.jsx
```

## Personalização rápida

### Conteúdo principal

Edite em `src/App.jsx`:

- `nome`
- `mensagem`
- `autor`
- `dataInicioNamoro`
- `videoPath`
- `fotosPadrao`
- `motivos`

### Mensagens da Surpresa

Edite `src/data/messages.js`.

### Linha do tempo

Edite `src/data/timeline.js`.

### Cores e tema

Edite variáveis CSS em `src/styles/theme.css`:

- `--rose-cream`
- `--rose-blush`
- `--rose-soft`
- `--rose-main`
- `--wine-main`
- `--wine-dark`

## Galeria de fotos (sem localStorage)

- Clique no botão de configurações no topo.
- Use **Adicionar fotos da galeria**.
- As fotos entram no carrossel e na galeria.
- As fotos ficam somente em memória da sessão atual (regra sem `localStorage`).

## Recursos implementados

- Tema romântico com modo escuro opcional
- Contador em tempo real (dias, horas, minutos e segundos)
- Modal surpresa com mensagens carinhosas + corações flutuando
- Linha do tempo com cartões
- Galeria com lightbox e navegação por teclado
- Microinterações: curtir, tooltip e confete leve
- Scroll reveal com `IntersectionObserver`
- Parallax suave no topo

## Acessibilidade e performance

- Estados de foco visíveis (`focus-visible`)
- Modal com `Esc`, foco preso e `aria-*`
- Contraste revisado para textos e botões
- Suporte a `prefers-reduced-motion`
- Fontes Google com `preconnect` e pesos reduzidos
- Sem bibliotecas pesadas extras
