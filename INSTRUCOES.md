# Instruções de Configuração — Quiz IA na Prática

## Arquivos do projeto

| Arquivo | Finalidade |
|---|---|
| `antes.html` | Pergunta inicial sobre medos — escaneada no início da oficina |
| `index.html` | Quiz final — escaneado nos últimos 10 min |
| `codigo_apps_script.gs` | Script do Google — recebe respostas dos dois formulários |
| `painel.html` | Painel ao vivo no seu PC — mostra nuvem de medos e resultados do quiz |

---

## ETAPA 1 — Apps Script e planilha (≈ 10 min)

### 1.1 Criar a planilha
1. Acesse **sheets.google.com** → crie uma planilha nova
2. Nomeie como **Quiz IA Oficina**

### 1.2 Criar o Apps Script
1. Na planilha: **Extensões → Apps Script**
2. Apague o código padrão
3. Cole todo o conteúdo de `codigo_apps_script.gs`
4. Salve (Ctrl+S) e nomeie o projeto **QuizIA**

### 1.3 Testar
1. Selecione a função **testeMedo** → clique **Executar**
2. Na primeira vez: **Revisar permissões → Avançado → Ir para QuizIA → Permitir**
3. Selecione **testeQuiz** → clique **Executar**
4. Volte à planilha: devem ter aparecido duas abas — **Medos_Iniciais** e **Respostas**

### 1.4 Publicar como Web App
1. **Implantar → Nova implantação → ⚙ → App da Web**
2. Configure:
   - Executar como: **Eu**
   - Quem tem acesso: **Qualquer pessoa** ← obrigatório
3. Clique **Implantar** → copie a URL (parece com `https://script.google.com/macros/s/XXXX/exec`)
4. **Guarde essa URL** — vai entrar nos dois HTMLs

---

## ETAPA 2 — Configurar os formulários

### 2.1 `antes.html` (pergunta inicial)
Abra em editor de texto e substitua:
```
const SCRIPT_URL = 'COLE_AQUI_A_URL_DO_APPS_SCRIPT';
```
pela URL copiada no passo 1.4.

### 2.2 `index.html` (quiz final)
Mesma coisa — substitua o mesmo placeholder pela mesma URL.

---

## ETAPA 3 — GitHub Pages (≈ 5 min)

1. Acesse **github.com** → **New repository**
2. Nome: `quiz-ia-oficina` | Public | marque "Add README"
3. **Add file → Upload files** → suba os dois arquivos: **`antes.html`** e **`index.html`**
4. **Commit changes**
5. **Settings → Pages → Deploy from branch → main → / (root) → Save**
6. Aguarde ~2 min. As URLs serão:
   - `https://SEU-USUARIO.github.io/quiz-ia-oficina/antes.html`
   - `https://SEU-USUARIO.github.io/quiz-ia-oficina/`

---

## ETAPA 4 — Painel ao vivo (`painel.html`)

O painel lê dois CSVs — um de cada aba da planilha.

### 4.1 Publicar a aba "Medos_Iniciais" como CSV
1. Na planilha: **Arquivo → Compartilhar → Publicar na web**
2. Primeira lista: **Medos_Iniciais** | Segunda: **CSV**
3. Publicar → copie a URL

### 4.2 Publicar a aba "Respostas" como CSV
1. Repita o processo — agora selecione a aba **Respostas**
2. Copie a segunda URL

### 4.3 Inserir as duas URLs no painel
Abra `painel.html` e substitua:
```
const CSV_MEDOS = 'COLE_AQUI_URL_CSV_ABA_MEDOS_INICIAIS';
const CSV_QUIZ  = 'COLE_AQUI_URL_CSV_ABA_RESPOSTAS';
```
pelas URLs copiadas nos passos 4.1 e 4.2.

---

## ETAPA 5 — Dois QR codes

Acesse **qr-code-generator.com** e gere um QR code para cada URL:

| QR code | URL | Quando usar |
|---|---|---|
| **QR Inicial** | `…/antes.html` | Projetar na abertura da oficina |
| **QR Quiz** | `…/index.html` | Projetar nos últimos 10 minutos |

Insira os dois QR codes em slides separados da apresentação.

---

## Na oficina — roteiro do painel

| Momento | Ação |
|---|---|
| **Abertura** | Projete o QR Inicial → participantes respondem a pergunta dos medos → você abre o painel e mostra a nuvem amarela ao vivo |
| **Durante a oficina** | Deixe o painel aberto em segundo plano |
| **Últimos 10 min** | Projete o QR Quiz → participantes respondem o quiz → você projeta o painel com os resultados |
| **Encerramento** | Compare as duas nuvens lado a lado: medos do início vs "IA é…" do final |

---

## Problemas comuns

| Problema | Solução |
|---|---|
| Respostas não chegam | Verifique se o Apps Script está publicado como "Qualquer pessoa" |
| Painel não atualiza | Confirme as duas URLs de CSV nas abas corretas |
| GitHub Pages não carrega | Aguarde 2–3 min e recarregue |
| Wi-Fi instável na sala | Teste antes com hotspot do seu celular |
