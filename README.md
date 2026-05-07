# Efood - Projeto de Delivery

Um projeto web moderno de delivery de comida desenvolvido com HTML, CSS e JavaScript puro, consumindo dados de uma API externa.

## 🚀 Funcionalidades

- **Listagem de Restaurantes**: Exibe restaurantes com informações detalhadas (nome, tipo, avaliação, descrição)
- **Cardápio Interativo**: Modal com o cardápio completo de cada restaurante
- **Sistema de Compras**: Modal de compra com formulário completo para finalização de pedido
- **Design Responsivo**: Interface adaptável para desktop e mobile
- **Carregamento Dinâmico**: Dados carregados via AJAX da API externa

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica do projeto
- **CSS3**: Estilização moderna com Grid e Flexbox
- **JavaScript ES6+**: Lógica da aplicação e requisições AJAX
- **API Externa**: https://api-ebac.vercel.app/api/efood/restaurantes

## 📁 Estrutura do Projeto

```
efood-project/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos da aplicação
├── js/
│   └── script.js       # Lógica JavaScript
├── assets/
│   └── images/         # Imagens do projeto
└── README.md           # Documentação
```

## 🎯 Como Executar

1. Clone ou faça o download do projeto
2. Abra a pasta `efood-project` em seu servidor local
3. Abra o arquivo `index.html` no navegador

**Para desenvolvimento local:**
```bash
# Usando Python
python -m http.server 8080

# Ou usando Node.js
npx serve .

# Acesse: http://localhost:8080
```

## 📱 Funcionalidades Detalhadas

### Listagem de Restaurantes
- Grid responsivo com cards de restaurantes
- Exibição de imagem, nome, tipo, avaliação e descrição
- Botão "Ver Cardápio" para cada restaurante

### Modal de Cardápio
- Exibe informações completas do restaurante
- Lista de itens do cardápio com foto, descrição e preço
- Botão "Comprar" para cada item

### Modal de Compra
- Formulário completo com:
  - Nome completo
  - Telefone
  - Endereço de entrega
  - Quantidade
  - Observações
- Cálculo automático do total
- Validação de campos obrigatórios

### Notificações
- Sistema de notificações para feedback do usuário
- Mensagens de sucesso e erro
- Design moderno e discreto

## 🎨 Design

- **Cores**: Esquema moderno com vermelho (#e74c3c) como cor principal
- **Fontes**: Roboto do Google Fonts
- **Layout**: Grid e Flexbox para responsividade
- **Animações**: Transições suaves e efeitos hover

## 📡 API

O projeto consome a API:
```
https://api-ebac.vercel.app/api/efood/restaurantes
```

Retorna dados de restaurantes incluindo:
- Informações básicas (id, título, tipo, avaliação, descrição)
- Imagem de capa
- Cardápio completo com itens, preços e descrições

## 🔧 Personalização

### Cores
As cores principais podem ser alteradas no arquivo `css/style.css`:
- Cor primária: `#e74c3c` (vermelho)
- Cor de sucesso: `#27ae60` (verde)
- Cor de erro: `#e74c3c` (vermelho)

### Fontes
As fontes podem ser alteradas no `<head>` do `index.html` e no CSS.

### API Endpoint
O endpoint da API pode ser alterado no arquivo `js/script.js` na função `loadRestaurants()`.

## 📱 Responsividade

O projeto é totalmente responsivo e se adapta a:
- Desktop (> 768px)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🚀 Próximos Passos

- [ ] Implementar sistema de autenticação
- [ ] Adicionar carrinho de compras
- [ ] Integrar com sistema de pagamento
- [ ] Adicionar filtros de busca
- [ ] Implementar sistema de avaliação

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais e demonstrativos.
