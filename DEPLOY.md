# 🚀 Guia de Deploy - Site Para Minha Namorada

Este guia vai te ajudar a colocar seu site no ar de forma rápida e fácil!

## 📦 Opção 1: Vercel (RECOMENDADO - Mais Fácil!)

### Passo a Passo:

1. **Instale a Vercel CLI** (opcional, mas facilita):
   ```bash
   npm install -g vercel
   ```

2. **Faça login na Vercel**:
   - Acesse: https://vercel.com
   - Faça login com GitHub, Google ou email

3. **Deploy via Site (Mais Fácil)**:
   - Acesse: https://vercel.com/new
   - Conecte seu repositório do GitHub (ou faça upload do projeto)
   - A Vercel detecta automaticamente que é um projeto Vite
   - Clique em "Deploy"
   - Pronto! Seu site estará no ar em segundos! 🎉

4. **Deploy via CLI** (Alternativa):
   ```bash
   cd MyLove
   vercel
   ```
   - Siga as instruções no terminal
   - Quando perguntar, pressione Enter para aceitar as configurações padrão

### ✅ Vantagens da Vercel:
- ✅ Deploy automático a cada push no GitHub
- ✅ HTTPS gratuito
- ✅ Domínio personalizado gratuito
- ✅ Muito rápido e fácil
- ✅ Suporta vídeos grandes

---

## 🌐 Opção 2: Netlify

### Passo a Passo:

1. **Acesse o Netlify**:
   - Vá para: https://netlify.com
   - Faça login (pode usar GitHub)

2. **Deploy**:
   - Arraste e solte a pasta `dist` (após fazer build) OU
   - Conecte seu repositório do GitHub
   - Configure:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Clique em "Deploy"

### ✅ Vantagens do Netlify:
- ✅ Fácil de usar
- ✅ HTTPS gratuito
- ✅ Deploy contínuo

---

## 📝 Opção 3: GitHub Pages

### Passo a Passo:

1. **Instale o plugin do Vite para GitHub Pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Adicione scripts no package.json**:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Configure o vite.config.js**:
   ```js
   export default {
     base: '/MyLove/',
     // ... resto da configuração
   }
   ```

4. **Faça o deploy**:
   ```bash
   npm run deploy
   ```

5. **Ative o GitHub Pages**:
   - Vá em Settings > Pages
   - Selecione a branch `gh-pages`
   - Seu site estará em: `https://seu-usuario.github.io/MyLove/`

---

## 🔨 Antes de Fazer Deploy

### 1. Faça o Build do Projeto:
```bash
npm run build
```

Isso cria a pasta `dist` com os arquivos prontos para produção.

### 2. Teste Localmente:
```bash
npm run preview
```

Isso mostra como o site ficará em produção.

### 3. Verifique se o Vídeo Está na Pasta Public:
- Certifique-se de que `Te Vivo.mp4` está em `public/`
- O vídeo será incluído automaticamente no build

---

## ⚠️ Importante sobre Vídeos

- **Vercel**: Suporta vídeos até 100MB (plano gratuito)
- **Netlify**: Suporta vídeos até 100MB (plano gratuito)
- **GitHub Pages**: Limite de 100MB por arquivo

Se seu vídeo for maior que 100MB:
1. Comprima o vídeo (use ferramentas online)
2. Ou use um serviço de hospedagem de vídeo (YouTube, Vimeo, etc.)
3. Ou use um CDN para vídeos (Cloudflare, etc.)

---

## 🎯 Recomendação Final

**Use a Vercel!** É a opção mais fácil e rápida:
1. Acesse https://vercel.com
2. Conecte seu GitHub
3. Selecione o repositório
4. Clique em Deploy
5. Pronto! 🎉

---

## 📱 Depois do Deploy

Após fazer o deploy, você receberá um link como:
- `https://meu-site.vercel.app`
- `https://meu-site.netlify.app`
- `https://seu-usuario.github.io/MyLove`

Compartilhe esse link com sua namorada! ❤️

---

## 🔄 Atualizações Futuras

- **Vercel/Netlify**: Atualiza automaticamente quando você faz push no GitHub
- **GitHub Pages**: Execute `npm run deploy` novamente

---

## 💡 Dicas

- Sempre teste localmente antes de fazer deploy
- Verifique se todas as imagens e vídeos estão carregando
- Use um domínio personalizado se quiser (gratuito na Vercel/Netlify)


