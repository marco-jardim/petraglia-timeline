# Petraglia Timeline

Site informativo que reúne os esforços para localizar Antônio Petraglia, professor aposentado desaparecido desde 12/10/2025. A página combina galeria de fotos reais, linha do tempo, mapa interativo, resumo do caso, cobertura na imprensa, cartões de apoio e compartilhamento rápido para redes sociais.

## Principais recursos

- **Galeria acessível** com miniaturas clicáveis, botões de navegação e metadados de cada foto real do acervo da família.
- **Mapa Leaflet + linha do tempo** destacando os avistamentos confirmados entre Urca, Lapa, Glória e Cinelândia com marcadores numerados e rota conectando os pontos.
- **Mapa de calor complementar** (ignora o primeiro registro) indicando onde os avistamentos mais recentes se concentram para orientar equipes de campo.
- **Resumo do caso** sempre atualizado, cruzando a linha do tempo com as reportagens mais recentes para contextualizar voluntários e imprensa.
- **Seção “Repercussão na imprensa”** com cards para O Globo, Veja Rio, O Dia e Record TV, cada um apontando para a matéria original.
- **Compartilhamento facilitado** (Instagram, Facebook, X, TikTok, WhatsApp, Telegram e Web Share API) com feedback visual e fallback de cópia automática.
- **Cartaz A4 pronto para impressão** para ampliar o alcance offline, além de orientações rápidas na seção de apoio.
- **Tema automático/claro/escuro** com detecção do sistema e persistência local, garantindo leitura confortável em qualquer ambiente.

## Estrutura do projeto

```
petraglia-timeline/
├── index.html              # Página principal com hero, mapa, timeline, imprensa e apoio
├── assets/
│   ├── styles.css          # Estilos globais (layout, componentes, responsividade)
│   ├── app.js              # Galeria, timeline, mapa, botões de compartilhamento
│   ├── petraglia.jpg       # Fotos reais fornecidas pela família
│   ├── petraglia2.jpg
│   ├── petraglia3.jpg
│   └── A4_cartaz.pdf       # Cartaz em formato A4 para impressão
├── .github/workflows/
│   ├── deploy-pages.yml    # Pipeline de publicação no GitHub Pages
│   └── static.yml          # Verificações estáticas/auxiliares
├── .nojekyll               # Garante que o GitHub Pages sirva arquivos estáticos
├── .env.example            # Placeholder para futuras integrações que exijam chaves
├── LICENSE                 # Licença MIT
└── README.md               # Este arquivo
```

## Executando localmente

- Pré-requisitos: qualquer navegador moderno; não há dependências adicionais.
- Abra `index.html` diretamente no navegador (duplo clique ou `code + browser`). Todas as seções usam bibliotecas via CDN.

## Deploy no GitHub Pages

- O repositório inclui fluxo de trabalho `deploy-pages.yml` configurado para publicar a branch principal em GitHub Pages.
- Alternativamente, é possível ativar Pages manualmente em *Settings → Pages*, apontando para a branch `main` e pasta raiz.
- O arquivo `.nojekyll` garante que recursos como `assets/app.js` sejam servidos sem interferência do mecanismo padrão do GitHub Pages.

## Atualizando conteúdos

- **Fotos e metadados da galeria:** editar o array `photoProfiles` em `assets/app.js` e incluir os novos arquivos no diretório `assets/`.
- **Avistamentos e rota:** ajustar a constante `events` em `assets/app.js`. Cada item define `date`, `time`, `title`, `description` e `coords`.
- **Resumo do caso / texto editorial:** atualizar a seção `case-summary` em `index.html`, incluindo links relevantes.
- **Cobertura na imprensa:** editar a grade `press-grid` em `index.html`. Cada `article` possui título, metadados e link externo.
- **Cartaz:** substituir `assets/A4_cartaz.pdf` se surgir uma nova versão. O link é referenciado na seção `support-section`.

## Automação da data de atualização

- Existe um hook opcional de `pre-commit` (em `.git/hooks/pre-commit`, não versionado) que substitui automaticamente a data do banner "Atualizado em" a cada commit. Copie o script fornecido no repositório local, garanta permissão de execução e personalize conforme necessário.
- Para automatizar em servidores remotos, adapte o fluxo `deploy-pages.yml` com uma etapa que ajuste o campo `<time datetime="...">` antes de publicar.

## Contato e compartilhamento rápido

- Canal oficial: Disque Denúncia `(21) 2253-1177`.
- Perfil centralizador de informações: [`@vamos_achar_antonio`](https://www.instagram.com/vamos_achar_antonio).
- Use a seção de compartilhamento para difundir rapidamente o caso por redes sociais e mensageiros.

## Licença

[MIT License](LICENSE). Sinta-se à vontade para copiar, modificar e distribuir.