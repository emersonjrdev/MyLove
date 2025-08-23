# Site de Dedicatória (React + Tailwind + Vite)

Um site romântico para dedicar à sua namorada. Personalizável, leve e bonito.

## Como usar (rápido)

1. **Baixe** o `.zip` deste projeto.
2. Em uma pasta, **extraia** o conteúdo.
3. No terminal, rode:
   ```bash
   npm install
   npm run dev
   ```
4. Abra o link do `http://localhost:5173` no navegador.

## Personalização por URL

Você pode gerar um link com parâmetros para já abrir com seu texto/foto:

```
?nome=Ana%20J%C3%BAlia&msg=Voc%C3%AA%20%C3%A9%20meu%20lugar%20favorito.&foto=https://link-da-foto.jpg&musica=https://link-da-musica&autor=%E2%80%94%20Seu%20nome
```

## Build para publicar

```bash
npm run build
```
Os arquivos finais estarão em `dist/`. Você pode enviar para qualquer hospedagem estática (Netlify, Vercel, GitHub Pages, etc.).
