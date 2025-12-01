# 📋 ROTAS COMPLETAS DA APLICAÇÃO

## 🎨 ROTAS DE VIEWS (Renderizam páginas EJS)

```
GET  /                           → inicial.ejs              (Página inicial)
GET  /cliente                    → cliente.ejs             (Loja do cliente)
GET  /inscrever                  → cadastro_cliente.ejs    (Cadastro de cliente)
GET  /inscrever_funcionario      → funcionario.ejs         (Cadastro de funcionário)
GET  /login_cliente              → login_cliente.ejs       (Login do cliente)
GET  /login_funcionario          → funcionario.ejs         (Login do funcionário)
GET  /trabalhe_conosco           → funcionario.ejs         (Trabalhe conosco)
GET  /sobre                      → sobre.ejs               (Sobre a loja)
GET  /testar-upload              → testar-upload.ejs       (Teste de upload - em rotateste.js)
```

---

## 🔐 ROTAS DE AUTENTICAÇÃO (POST)

```
POST /inscrever                  → Inscrição de cliente
POST /login_cliente              → Login de cliente
POST /login_funcionario          → Login de funcionário
GET  /logout                     → Logout (em auth.js)
```

---

## 📦 ROTAS DE API - CATEGORIAS

```
GET    /api/categorias           → Listar todas as categorias
GET    /api/categorias/:id       → Obter categoria por ID
POST   /api/categorias           → Criar nova categoria
PUT    /api/categorias/:id       → Atualizar categoria
DELETE /api/categorias/:id       → Deletar categoria
```

### Exemplo de POST (Criar Categoria)
```bash
curl -X POST http://localhost:3000/api/categorias \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Tênis",
    "descricao": "Calçados esportivos"
  }'
```

---

## 👟 ROTAS DE API - PRODUTOS

```
GET    /api/produtos             → Listar todos os produtos
GET    /api/produtos/:id         → Obter produto por ID
POST   /api/produtos/upload      → Criar produto com upload de imagem
PUT    /api/produtos/:id         → Atualizar produto (com opção de nova imagem)
DELETE /api/produtos/:id         → Deletar produto
```

### Exemplo de POST (Criar Produto com Imagem)
```bash
curl -X POST http://localhost:3000/api/produtos/upload \
  -F "nome=Tênis Nike" \
  -F "descricao=Tênis esportivo de qualidade" \
  -F "preco=99.90" \
  -F "Tamanho=40" \
  -F "Cor=Branco" \
  -F "Estoque=10" \
  -F "categoriaId=1" \
  -F "imagem=@/caminho/para/imagem.jpg"
```

---

## 👥 ROTAS DE API - USUÁRIOS

```
GET    /api/usuarios             → Listar todos os usuários
GET    /api/usuarios/:id         → Obter usuário por ID
PUT    /api/usuarios/:id         → Atualizar dados do usuário
DELETE /api/usuarios/:id         → Deletar usuário
```

### Exemplo de PUT (Atualizar Usuário)
```bash
curl -X PUT http://localhost:3000/api/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "endereco": "Rua X, 123",
    "cpf": "123.456.789-00"
  }'
```

---

## 💳 ROTAS DE API - VENDAS

```
GET    /api/vendas               → Listar todas as vendas
GET    /api/vendas/:id           → Obter venda por ID
POST   /api/vendas               → Criar nova venda
PUT    /api/vendas/:id           → Atualizar venda
DELETE /api/vendas/:id           → Deletar venda
```

### Exemplo de POST (Criar Venda)
```bash
curl -X POST http://localhost:3000/api/vendas \
  -H "Content-Type: application/json" \
  -d '{
    "usuarioId": 1,
    "status": "pendente",
    "total": 199.80,
    "data": "2025-12-01"
  }'
```

---

## 📝 ROTAS DE API - ITENS DE VENDA

```
GET    /api/itens-venda          → Listar todos os itens de venda
POST   /api/itens-venda          → Criar item de venda
```

### Exemplo de POST (Criar Item de Venda)
```bash
curl -X POST http://localhost:3000/api/itens-venda \
  -H "Content-Type: application/json" \
  -d '{
    "vendaId": 1,
    "produtoId": 5,
    "quantidade": 2,
    "precoUnitario": 99.90
  }'
```

---

## 🎯 RESUMO RÁPIDO

| Recurso      | Método | Endpoint                    | Status |
|--------------|--------|-----------------------------| -------|
| Views        | GET    | `/`, `/cliente`, etc        | ✅ OK |
| Categorias   | CRUD   | `/api/categorias`           | ✅ OK |
| Produtos     | CRUD   | `/api/produtos`             | ✅ OK |
| Usuários     | CRUD   | `/api/usuarios`             | ✅ OK |
| Vendas       | CRUD   | `/api/vendas`               | ✅ OK |
| Itens Venda  | R+C    | `/api/itens-venda`          | ✅ OK |

---

## 📂 LOCALIZAÇÃO DOS ARQUIVOS

```
src/
├── routes/
│   ├── Routes.js          ← Rotas principais (views + auth)
│   ├── uploadRoutes.js    ← Rotas de produtos (upload)
│   ├── auth.js            ← Rotas de autenticação
│   └── rotateste.js       ← Rota de teste de upload
├── controllers/
│   ├── Controller.js      ← Views (inicial, cliente)
│   ├── ControllerUsuarios.js
│   ├── ControllerCategorias.js
│   ├── ControllerProdutos.js
│   └── ControllerVendas.js
└── views/
    ├── inicial.ejs
    ├── cliente.ejs
    ├── login_cliente.ejs
    ├── login_funcionario.ejs
    ├── cadastro_cliente.ejs
    ├── funcionario.ejs
    ├── sobre.ejs
    └── testar-upload.ejs
```

---

## 🧪 TESTAR TODAS AS ROTAS

```powershell
# 1. Iniciar servidor
npm start

# 2. Testar rota de view (GET)
curl http://localhost:3000/
curl http://localhost:3000/cliente
curl http://localhost:3000/sobre

# 3. Testar API de categorias
curl http://localhost:3000/api/categorias

# 4. Testar API de produtos
curl http://localhost:3000/api/produtos

# 5. Testar API de usuários
curl http://localhost:3000/api/usuarios

# 6. Testar API de vendas
curl http://localhost:3000/api/vendas
```

---

## ✅ CHECKLIST FINAL

- ✅ Todas as rotas de views implementadas
- ✅ Todas as rotas de autenticação implementadas
- ✅ CRUD completo de Categorias
- ✅ CRUD completo de Produtos (com ImageKit)
- ✅ CRUD completo de Usuários
- ✅ CRUD completo de Vendas
- ✅ Rotas de Itens de Venda

---

**Atualizado:** 01/12/2025
**Status:** ✅ Todas as rotas implementadas e funcionais
