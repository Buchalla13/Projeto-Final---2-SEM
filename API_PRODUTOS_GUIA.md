# Guia de Integração ImageKit + Banco de Dados

## 📋 Resumo das Mudanças

A integração do ImageKit com o banco de dados foi implementada com sucesso. Agora:

✅ URLs de imagens são salvos no campo `Imagem` da tabela `Produtos`  
✅ Upload automático para ImageKit ao criar/atualizar produtos  
✅ Endpoints RESTful completos (CRUD) para gerenciar produtos  
✅ Rota centralizada em `/api/produtos/*`

---

## 🔗 Endpoints Disponíveis

### 1. **Criar Produto (com Upload de Imagem)**
```http
POST /api/produtos/upload
Content-Type: multipart/form-data
```

**Parâmetros:**
```json
{
  "imagem": <arquivo binário>,
  "nome": "Tênis Jordan 1",
  "descricao": "Tênis clássico em preto",
  "preco": "150.00",
  "Tamanho": "42",
  "Cor": "Preto",
  "Estoque": 10,
  "categoriaId": 1  // opcional
}
```

**Resposta (201 Created):**
```json
{
  "sucesso": true,
  "mensagem": "Produto criado com sucesso",
  "produto": {
    "id": 1,
    "nome": "Tênis Jordan 1",
    "descricao": "Tênis clássico em preto",
    "preco": "150.00",
    "Tamanho": "42",
    "Cor": "Preto",
    "Imagem": "https://ik.imagekit.io/e7i52wdao/produtos/produto-1234567-name.jpg",
    "Estoque": 10,
    "categoriaId": 1
  }
}
```

---

### 2. **Listar Todos os Produtos**
```http
GET /api/produtos
```

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "Tênis Jordan 1",
    "descricao": "Tênis clássico em preto",
    "preco": "150.00",
    "Tamanho": "42",
    "Cor": "Preto",
    "Imagem": "https://ik.imagekit.io/e7i52wdao/produtos/produto-1234567-name.jpg",
    "Estoque": 10,
    "categoriaId": 1
  },
  ...
]
```

---

### 3. **Buscar Produto por ID**
```http
GET /api/produtos/:id
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "nome": "Tênis Jordan 1",
  "Imagem": "https://ik.imagekit.io/e7i52wdao/produtos/produto-1234567-name.jpg",
  ...
}
```

---

### 4. **Atualizar Produto**
```http
PUT /api/produtos/:id
Content-Type: multipart/form-data
```

**Parâmetros:**
```json
{
  "imagem": <arquivo binário>,  // opcional
  "nome": "Tênis Jordan 1 Atualizado",
  "preco": "160.00",
  ...
}
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "mensagem": "Produto atualizado com sucesso",
  "produto": { ... }
}
```

---

### 5. **Deletar Produto**
```http
DELETE /api/produtos/:id
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "mensagem": "Produto deletado com sucesso"
}
```

---

## 🧪 Exemplos de Teste com cURL

### Criar Produto com Imagem
```bash
curl -X POST http://localhost:3000/api/produtos/upload \
  -F "nome=Tênis Nike" \
  -F "descricao=Tênis esportivo" \
  -F "preco=99.90" \
  -F "Tamanho=40" \
  -F "Cor=Branco" \
  -F "Estoque=5" \
  -F "categoriaId=1" \
  -F "imagem=@/path/to/image.jpg"
```

### Listar Produtos
```bash
curl http://localhost:3000/api/produtos
```

### Obter Produto Específico
```bash
curl http://localhost:3000/api/produtos/1
```

### Atualizar Produto
```bash
curl -X PUT http://localhost:3000/api/produtos/1 \
  -F "nome=Tênis Nike Atualizado" \
  -F "preco=109.90"
```

### Deletar Produto
```bash
curl -X DELETE http://localhost:3000/api/produtos/1
```

---

## 📦 Estrutura de Dados

### Campo `Imagem` na Tabela `Produtos`

- **Tipo**: TEXT
- **Valor**: URL completa do ImageKit
- **Exemplo**: `https://ik.imagekit.io/e7i52wdao/produtos/produto-1234567-name.jpg`

---

## 🎨 Como Usar no Frontend

### Exibir Imagem em EJS
```ejs
<% produtos.forEach(produto => { %>
  <div class="card">
    <img src="<%= produto.Imagem %>" alt="<%= produto.nome %>">
    <h5><%= produto.nome %></h5>
    <p>R$ <%= produto.preco %></p>
  </div>
<% }); %>
```

### Fetch com JavaScript
```javascript
// Listar produtos
fetch('/api/produtos')
  .then(res => res.json())
  .then(produtos => {
    produtos.forEach(produto => {
      console.log(`${produto.nome}: ${produto.Imagem}`);
    });
  });

// Criar produto
const formData = new FormData();
formData.append('nome', 'Novo Produto');
formData.append('preco', 50.00);
formData.append('Tamanho', '40');
formData.append('Cor', 'Azul');
formData.append('Estoque', 10);
formData.append('imagem', fileInput.files[0]); // arquivo do input

fetch('/api/produtos/upload', {
  method: 'POST',
  body: formData
})
.then(res => res.json())
.then(data => console.log('Produto criado:', data));
```

---

## ⚙️ Variáveis de Ambiente Necessárias

Certifique-se de que seu arquivo `.env` contém:

```dotenv
IMAGEKIT_PUBLIC_KEY=seu_public_key
IMAGEKIT_PRIVATE_KEY=seu_private_key
IMAGEKIT_URL_ENDPOINT=sua_url_endpoint
DB_NAME=projeto_bdd
DB_USER=root
DB_PASS=sua_senha
DB_HOST=localhost
DB_DIALECT=mysql
```

---

## ✅ Checklist de Verificação

- [ ] Servidor iniciado (`npm start`)
- [ ] Banco de dados conectado
- [ ] Credenciais ImageKit no `.env`
- [ ] Testar POST `/api/produtos/upload` com imagem
- [ ] Verificar se URL foi salva no campo `Imagem` do banco
- [ ] Testar GET `/api/produtos` e confirmar URLs aparecem
- [ ] Exibir imagens no frontend usando as URLs retornadas

---

## 🐛 Troubleshooting

**Erro: "Nenhum arquivo enviado"**
- Verifique se a imagem está sendo enviada como `multipart/form-data`
- Nome do campo deve ser `imagem`

**Erro: "Campos obrigatórios faltando"**
- Certifique-se de enviar: `nome`, `preco`, `Tamanho`, `Cor`, `Estoque`

**URL do ImageKit não aparece**
- Verifique credenciais no `.env`
- Confirme se `IMAGEKIT_URL_ENDPOINT` está correto

**Imagem salva mas URL vazia**
- Verifique logs do servidor: `console.error()`
- Confirme se arquivo foi recebido: `console.log(req.file)`

---

## 📝 Notas Importantes

1. **Campos obrigatórios** ao criar produto:
   - `nome`, `preco`, `Tamanho`, `Cor`, `Estoque`
   - Imagem é opcional (pode enviar sem `imagem`)

2. **Atualização parcial**: É possível enviar apenas alguns campos no PUT

3. **Organização no ImageKit**: Imagens são salvas em `/produtos/` automaticamente

4. **Exclusão de Imagens**: Ao deletar um produto, a imagem no ImageKit NÃO é deletada automaticamente (pode ser implementado depois se necessário)

---

**Status**: ✅ Integração Completa e Funcional
