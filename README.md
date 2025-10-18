# Aplicação de Linha do Tempo e Mapa Interativo (Outubro 2025)

Esta aplicação Web exibe uma linha do tempo e um mapa interativo com
os locais em que Antonio Pegraglia foi visto na cidade do Rio de Janeiro
dentro do mês de **outubro de 2025**.  Os dados incluídos são baseados
nas ocorrências descritas abaixo:

- **Terça‑feira, 14/10/2025** — visto por um pescador na **Praia da Urca**.
- **Quarta‑feira, 15/10/2025 às 20h** — visto no **Boemia da Lapa
  Cavern Pub** (Avenida Mem de Sá 104).  Mais tarde, após ser encontrado
  deitado na Rua Gomes Freire, caminhou em direção aos **Arcos da
  Lapa**.
- **Sexta‑feira, 17/10/2025** — visto por uma voluntária do **SOS Crianças
  Desaparecidas** próximo à base da **Escadaria Selarón**.
- **Sexta‑feira, 17/10/2025** — visto na **Cinelândia** (Praça Floriano) no
  ponto de distribuição de alimentos.

O mapa interativo utiliza **Leaflet** e **OpenStreetMap**, não sendo
necessário chave de API.  O código JavaScript define marcadores para
cada localidade e conecta os pontos com uma linha para mostrar o
itinerário ao longo dos dias.

## Estrutura do projeto

```
petraglia-timeline/
│
├── index.html       # Página Web com mapa e linha do tempo (raiz do site)
├── .nojekyll        # Impede que o GitHub Pages use Jekyll
├── .env.example     # Arquivo de exemplo para variáveis de ambiente
└── README.md        # Este arquivo
```

### `index.html`

Arquivo estático contendo o HTML, CSS e JavaScript necessários para
renderizar a linha do tempo e o mapa.  As coordenadas dos eventos
estão incorporadas no script.  Se desejar adicionar novos pontos
ou ajustar horários/descrições, edite a constante `events` dentro
deste arquivo.

### `.env.example`

Este arquivo demonstra como declarar variáveis de ambiente caso
deseje adicionar funcionalidades que dependam de chaves (por
exemplo, integrar com a API do Google Maps).  Para a versão atual
nenhuma variável é obrigatória.

## Como executar localmente

1. **Pré‑requisitos:** basta ter um navegador moderno.  Nenhuma
   dependência adicional precisa ser instalada.
2. Abra o arquivo `index.html` localizado na raiz do projeto
   (`petraglia-timeline/index.html`) no navegador.  O mapa e a linha do tempo
   serão carregados.

## Hospedagem no GitHub Pages

A aplicação pode ser servida diretamente como um site estático no
GitHub Pages.  Como o `index.html` está na raiz do repositório e
depende apenas de bibliotecas carregadas via CDN, nenhuma etapa de
construção (build) é necessária.  Para publicar:

1. Crie um repositório no GitHub e faça commit dos arquivos da pasta
   `petraglia-timeline` (incluindo `index.html`, `.nojekyll` e `README.md`).  O
   arquivo `.nojekyll` impede que o GitHub execute o mecanismo
   Jekyll, garantindo que o conteúdo estático seja servido como está.
2. Acesse as configurações do repositório (Settings ➝ Pages) e
   configure o GitHub Pages para servir conteúdo da branch `main`
   (ou qualquer outra) a partir da pasta raiz (`/`).  Salve as
   alterações.
3. Após alguns minutos, o GitHub fornecerá uma URL pública para o
   site, onde o mapa e a linha do tempo ficarão disponíveis.  Se
   preferir automatizar a publicação para uma branch dedicada (`gh-pages`)
   ou compor um processo de build mais complexo, você pode adicionar
   um **GitHub Actions** (`.github/workflows/`) que execute a cópia dos
   arquivos para `gh-pages`.  Como não há etapa de build para este
   projeto, habilitar o GitHub Pages manualmente é o suficiente.

## Adicionando ou editando eventos

Os eventos são definidos como um array de objetos no final do
`index.html`.  Cada objeto possui as propriedades:

- `date`: data no formato `AAAA‑MM‑DD`.
- `time`: horário no formato `HH:MM`.
- `title`: título resumido do evento.
- `description`: descrição detalhada que aparecerá no pop‑up e na linha
  do tempo.
- `coords`: array `[latitude, longitude]` em graus decimais.

Para adicionar um novo ponto, basta incluir um novo objeto neste
array em ordem cronológica.  O script automaticamente cria um
marcador, adiciona o item na linha do tempo e atualiza a rota.

## Observações

- Embora a tarefa sugerisse o uso da API do Google Maps, optou‑se
  pela biblioteca **Leaflet** com dados do **OpenStreetMap** para
  evitar a necessidade de chave de API.  Caso prefira utilizar
  Google Maps, o código pode ser adaptado inserindo o script da
  API correspondente e implementando os marcadores usando a
  `google.maps.Map`.
- As coordenadas aqui utilizadas foram obtidas de fontes públicas
  confiáveis: Mapcarta para a Praia da Urca, geocode.maps.co para o
  endereço da Avenida Mem de Sá 104, Wikipedia para o Aqueduto da
  Carioca e a Escadaria Selarón, e Latitude.to para a Praça Floriano (Cinelândia).  Os valores
  de latitude e longitude são aproximados.

## Licença

(MIT License)[LICENSE].  Sinta‑se à vontade para copiar, modificar e distribuir.