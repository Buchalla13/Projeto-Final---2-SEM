Conceito do projeto: Site de loja de itens esportivos criado como projeto final da matéria de desenvolvimento web do 2º ano de informática do IFSP campus Jacareí, ano 2025.

Autores: 
Arthur Pereira de Souza -> Parte lógica; 
Guilherme de Siqueira Prado -> Parte lógica; 
João Pedro Buchalla Santos -> Banco de dados; 
Leonardo Aleixo Salgado da Silva -> Front-end e implementação da API.

OBS: Todos contribuíram mutualmente em todas as áreas, apesar de terem suas funções majoritárias.

Descrição do projeto: O projeto consiste em um simulador de um sistema de loja virtual (como um mercado livre), a loja possui a ideia de mercado esportivo, tendo o nome de "GOAT'store", vindo da nomeclatura: GOAT = "Greatest Of All Time", popular forma de chamar grandes esportistas e "store", que vem de "loja" em inglês. O funcionamento consiste em uma página inicial de recepção, com opções de cadastro e login. Ao adentrar o cadastro, o usuário deve, além de fornecer informações na criação de conta, escolher entre 2 tipos de conta: "funcionário" e "cliente", esta informação será usada no login, de forma que cada tipo levará o usuário até páginas com funcionalidades diferentes. Caso o usuário acesse como cliente, ele terá acesso às compras disponíveis em formato de cards, que renderiza todos os registros da tabela de produtos, e ao carrinho de compras, que armazena os produtos comprados. Diferentemente, no acesso a página de funcionário, o usuário terá acesso a uma rede mais ampla, podendo realizar funções como: criar, editar e excluir os produtos, além de gerenciar os dados de clientes e de vendas, tudo isso através de sub-abas dentro de sua página. Além disso, o sistema possui alguns elementos de teste dos desenvolvedores, como o gerenciamento dos status, as informações notificadas no console para debug e até mesmo páginas completas de teste, como por exemplo a página "uploadteste.ejs".

Instruções de instalação e execução: Recomendamos utilizar a plataforma Visual Studio Code, com download da extensão EJS e do node, que pode ser baixado pelo navegador, além do server e do workbench (ou command line client) do MYSQL baixados e configurados. Também é necessário criar uma conta no imagekit.com para utilizar a API ImageKit, responsável por salvar as imagens na nuvem. Feito isso, segue os passos para a execução do código:
1. Acesso ao link do GitHub
2. No botão "<> Code", acessar o painel "Local" e fazer o download do arquivo ZIP.
3. Extrair os arquivos e abrir no VS code
4. Configurar o MYSQL, criando usuário, senha, escolhendo a instância, etc. 
5. No arquivo ".env" localizado na pasta "src", insira as informações referentes a API (como URL e api_key) e informações do MYSQL, como o usuário, nome da instância e senha. OBS: Certifique-se que todas essas informações estejam corretas para permitir um funcionamento eficiente
6. Abra o terminal do VS code
7. Para acessar a pasta "app" necessária para execução do server, utilize "cd app"
8. Para configurar o banco de dados, dentro da pasta app, utilize o comando "node sincronizar-banco.js"
9. Para iniciar o servidor, após a configuração do banco de dados, utilize o comando "node server.js", esperando que ao final o terminal notifique a mensagem: "Servidor rodando na porta 2000"
10. No navegador, digite a URL: "localhost:2000"
11. Feito isso, deverá aparecer a página inicial, com opção de cadastro e login.
