
# Teste Back-End BeMobile - AdonisJS - mySQL

O projeto se trata de um sistema de cadastramento de clientes, livros e vendas, construído com base no padrão de projeto MVC. Agradeço a BeMobile pela oportunidade dada de aprender algo novo e 
desafiador.

## 🚀 Sobre mim
Desde 2021 aprendendo sobre o mundo da programação com o objetivo de me tornar um ótimo desenvolvedor Back-end agregando conhecimento e amizades ao longo do tempo.



## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/juanschiavon/)



## Instalação

- Requisitos:
    ```bash
    É necessário ter o node préviamente instalado em sua máquina.
    
    node v16.17.0 
  
    node releases: https://nodejs.org/en/download/releases/

    ```

```bash
  git clone https://github.com/zschiavon/backend-test.git
```

1. Clone o repositório.

```bash
  git clone https://github.com/zschiavon/backend-test.git
```

2. Instale os pacotes de dependência do projeto..

```bash
  npm install  
```
    
3. Configure as variáveis de ambiente para conexão com banco.

```bash
  Adonis Doc: https://docs.adonisjs.com/guides/environment-variables
```

4. Rode as migrations.

```bash
  node ace migration:run
```

5. Rode as seeds
```bash
  #irá rodar todas as seeds e popular o banco com os dados iniciais.

  node ace db:seed  
```

6. Inicialize o servidor
```bash
  
  node ace serve --watch
```


## Rotas

#### Usuario

```http
  POST /usuario
  POST /usuario/login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório** apena no cadastro. |
| `email` | `string` | **Obrigatório**, único|
| `senha` | `string` | **Obrigatório** |

#### Cliente

```http
## Requer Autorização ##

  GET /clientes -- Obtem lista de clientes.
  GET /clientes/:id?/:mes?/:ano? -- Obtém 1 cliente e Vendas a ele.
  POST /clientes -- Insere um cliente.
  PUT /clientes/:id -- Altera um cliente.
  DELETE /clientes/:id -- Deleta um cliente
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `url` | **Obrigatório**. O ID do Cliente que você quer. |
| `mes/ano      | `url` | **Obrigatório** para aplicar o filtro as vendas, formato mm/yyyy |

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**    |
| `cpf` | `string` | **Obrigatório**, único.|
| `telefone` | `string` | **Obrigatório** |
| `cep` | `string` | **Obrigatório** |
| `numero` | `string` | **Obrigatório** |

Todos os outros dados de endereço serão preenchidos automáticamente através da ViaCepApi.
```
Website: https://viacep.com.br/
```
#### Livro

```http
## Requer Autorização ##

  GET /livro -- Obtem lista de livros.
  GET /livro/:id -- Obtém 1 livro e autor a ele.
  POST /livro -- Insere um livro.
  PUT /livro/:id -- Altera um livro.
  DELETE /livro/:id -- Exclusão lógica(soft delete).
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do Cliente que você quer. |
| `mes`      | `string` | **Obrigatório**. O mês que irá aplicar o filtro as vendas. |
| `ano`      | `string` | **Obrigatório**. O ano que irá aplicar o filtro ás vendas. |

#### Venda

```http
## Requer Autorização ##

  POST /venda -- Cadastra uma venda.

```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `livro_id`      | `number` | **Obrigatório**. O ID Livro. |
| `cliente_id`      | `number` | **Obrigatório**. O ID do Cliente. |
| `quantidade`      | `number` | **Obrigatório**. Quantidade de Livros. |




## Autores

- [@juanschiavon](https://www.github.com/zschiavon)


## Licença

[MIT](https://choosealicense.com/licenses/mit/)


## Desafio imposto.

O teste de back-end da Be mobile consiste em estruturar uma API RESTful e um banco de dados ligado a esta API. Trate-se de um sistema que permite cadastrar usuários externamente e, ao realizarem login, poderão registrar clientes, produtos e vendas. O(a) candidato(a) poderá escolher desenvolver em Node.js (Adonis, Koa ou Express) ou PHP (Laravel).

## Banco de Dados

O banco de dados deve ser estruturado à escolha do(a) candidato(a), mas minimamente deverá conter o seguinte:

- usuários: email, senha;
- clientes: nome, cpf;
- endereço: todos os campos de endereço;
- telefones: cliente, número;
- produtos: colocar os dados necessários para um tipo de produto (livros), além de preço.
- vendas: cliente, produto, quantidade, preço unitário, preço total, data e hora.

## Rotas do Sistema
- cadastro de usuário do sistema (signup)
- login com JWT de usuário cadastrado (login)
- clientes :    
    - listar todos os clientes cadastrados (index)
        - apenas dados principais devem vir aqui;
        - ordenar pelo id.
    - detalhar um(a) cliente e vendas a ele(a) (show)
        - trazer as vendas mais recentes primeiro;
        - possibilidade de filtrar as vendas por mês + ano.
    - adicionar um(a) cliente (store)
    - editar um(a) cliente (update)
    - excluir um(a) cliente e vendas a ele(a) (delete)

- produtos:
    - listar todos os produtos cadastrados (index)
        - apenas dados principais devem vir aqui;
        - ordenar alfabeticamente.
    - detalhar um produto (show)
    - criar um produto (store)
    - editar um produto (update)
    - exclusão lógica ("soft delete") de um produto (delete)
- vendas:
     - registrar venda de 1 produto a 1 cliente (store)
Obs: as rotas em clientes, produtos e vendas só podem ser acessadas por usuário logado.

## Requisitos
- estruturar o sistema observando o MVC (mas sem as views);
- deve usar mySQL no banco de dados;
- as respostas devem ser em JSON;
- pode usar recursos e bibliotecas que auxiliam na administração do banco de dados (Eloquent, Lucid, Knex, Bookshelf, etc.);
- documentar as instruções necessárias em um README (requisitos, como rodar, detalhamento de rotas);
- fazer um Pull Request para este repositório ao finalizar.
Obs: caso o(a) candidato(a) não consiga completar o teste até o prazo combinado com o avaliador, deve garantir que tudo que foi efetivamente feito esteja em pleno funcionamento. Relatar no README quais foram as dificuldades encontradas.

## Critérios de Avaliação
- lógica de programação;
- organização do projeto;
- legibilidade do código;
- validação necessária dos dados;
- forma adequada de utilização dos recursos; 
- seguimento dos padrões especificados;
- clareza na documentação.