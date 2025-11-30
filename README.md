# Site de Dedicatória ❤️ (React + Tailwind + Vite)

Um site romântico e lindo para dedicar à sua namorada. Personalizável, leve e com suporte para imagens online!

## ✨ Melhorias Recentes

- ✅ **Suporte para URLs de imagens** - Agora você pode usar imagens da internet!
- ✅ **Design moderno e elegante** - Animações suaves e efeitos visuais incríveis
- ✅ **Totalmente responsivo** - Funciona perfeitamente em celular, tablet e desktop
- ✅ **Animações melhoradas** - Corações flutuantes, estrelas cintilantes e muito mais

## 🚀 Como usar (rápido)

1. **Baixe** o projeto.
2. No terminal, rode:
   ```bash
   npm install
   npm run dev
   ```
3. Abra o link `http://localhost:5173` no navegador.

## 📸 Como adicionar imagens

### ⭐ Opção 1: Diretamente da galeria do celular (MAIS FÁCIL!)

**Agora você pode adicionar fotos diretamente da galeria do seu celular!**

1. Abra o site no seu celular
2. Clique no botão de **configurações** (⚙️) no canto superior direito
3. Clique em **"Adicionar fotos da galeria"**
4. Selecione as fotos que deseja adicionar
5. Pronto! As fotos aparecerão no carrossel automaticamente

**Vantagens:**
- ✅ Funciona direto no celular
- ✅ Não precisa de internet para ver as fotos depois
- ✅ As fotos ficam salvas no navegador
- ✅ Pode adicionar várias fotos de uma vez
- ✅ Pode remover fotos facilmente

### Opção 2: Imagens locais (pasta `public`)
Coloque suas imagens na pasta `public` e use assim:
```javascript
const fotos = [
  "/minha-foto.jpg",
  "/outra-foto.png",
];
```

### Opção 3: URLs de imagens online
Você também pode usar URLs de qualquer lugar da internet:

```javascript
const fotos = [
  "https://i.imgur.com/exemplo.jpg",
  "https://images.unsplash.com/photo-exemplo",
  "https://exemplo.com/imagem.jpg",
];
```

**Onde encontrar imagens:**
- **Imgur**: Faça upload em https://imgur.com e copie o link direto
- **Google Photos**: Compartilhe a foto e copie o link
- **Unsplash**: Use imagens gratuitas de https://unsplash.com
- **Qualquer serviço de hospedagem de imagens**

## 🎨 Personalização

No arquivo `src/App.jsx`, você pode personalizar:

- **Nome**: `const nome = "meu amor";`
- **Mensagem**: `const mensagem = "...";`
- **Autor**: `const autor = "...";`
- **Data do namoro**: `const dataInicioNamoro = new Date(2025, 7, 14);` (14 de Agosto de 2025)
- **Vídeo local**: `const videoPath = "/video.mp4";` (coloque seu vídeo na pasta `public`)

## 🎬 Como adicionar seu vídeo

1. Coloque seu arquivo de vídeo na pasta `public` (ex: `video.mp4`, `nossa-musica.mp4`)
2. Abra o arquivo `src/App.jsx`
3. Encontre a linha: `const videoPath = "/video.mp4";`
4. Altere para o nome do seu arquivo: `const videoPath = "/seu-video.mp4";`
5. Pronto! O vídeo tocará automaticamente com som quando a página carregar

**Formatos suportados:** MP4, WebM, OGG

**Dica:** Para melhor compatibilidade, use MP4 (H.264).

## 🏗️ Build para publicar

```bash
npm run build
```

Os arquivos finais estarão em `dist/`. Você pode enviar para qualquer hospedagem estática:
- **Vercel** (recomendado): https://vercel.com
- **Netlify**: https://netlify.com
- **GitHub Pages**: https://pages.github.com

## 💡 Dicas

- Use imagens em formato JPG ou PNG para melhor compatibilidade
- Certifique-se de que as URLs das imagens estão acessíveis publicamente
- Para melhor qualidade, use imagens com pelo menos 800x1000 pixels
- O site funciona offline com imagens locais, mas precisa de internet para URLs externas

## ❤️ Feito com muito amor
