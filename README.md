# Winterfell
Rede Social para Compartilhamento de Imagens

### Documentação Back-end

#### Rest
* /authentication/newuser
    * Cadastro de novo usuário;
    * POST com Json;
    * Retorna true ou false;
    * Content-Type: application/json 
    * Body: 
   ```json
        {
          "name": "Samuel Brati Favarin",
          "login": "samuelbfav",
          "pass": "666666",
          "email": "a@b.com.br",
          "photopath": "./avatar.jpg"
        }
   ```
   
* /services/winteruser
   * Login de usuário e obtenção de dados do usuário
   * GET
   * Header necessário `Authorization: Basic btoa(login:pass)`
      * btoa: Conversão para base64 no JavaScript
   * Retorna dados do usuário:
   ```json
      {
          "email": "teste2@teste2.br",
          "id": 102,
          "login": "teste 2",
          "nFollowing": 0,
          "name": "Teste 2",
          "photopath": "./teste.jpg"
      }
   ```
   
* /services/winteruser/{otherID}
   * Obtenção de dados de outro usuário de acordo com ID
   * GET
   * Header necessário `Authorization: Basic btoa(login:pass)`
      * btoa: Conversão para base64 no JavaScript
   * Retorna dados do usuário:
   ```json
      {
          "email": "teste2@teste2.br",
          "id": 102,
          "isFollowing": false,
          "login": "teste 2",
          "nFollowing": 0,
          "nPublications": 1,
          "name": "Teste 2",
          "photopath": "./teste.jpg"
      }
   ```
   
 * /services/winteruser/\<action\>
   * action: changename|changephoto|changelogin|changepass|changeemail
   * Header necessário `Authorization: Basic btoa(login:pass)`
      * btoa: Conversão para base64 no JavaScript
   * Alteração de dados do Usuário;
   * PUT com text/plain:
   * Return true ou false;
   * Content-Type: text/plain 

* /services/publications
   * Cadastro de nova publicação;
   * Header necessário `Authorization: Basic btoa(login:pass)`
      * btoa: Conversão para base64 no JavaScript
   * POST com Json;
   * Retorna true ou false;
   * Content-Type: application/json 
   * Body: 
   ```json
        {
          "imagepath": "./path.png",
          "title": "Minha publicação"
        }
   ```

* /services/publications[/{offset}/{limit}]
   * GET
   * Header necessário `Authorization: Basic btoa(login:pass)`
      * btoa: Conversão para base64 no JavaScript
   * Retorna uma lista de publicações do usuário:
   ```json
      [
          {
              "author": {
                  "email": "a@b",
                  "id": 51,
                  "login": "viniciusas",
                  "nFollowing": 1,
                  "nPublications": 1,
                  "name": "Vinicius",
                  "photopath": "/"
              },
              "id": 1,
              "imagepath": "/image.png",
              "moment": "2017-06-19T22:29:56.134-03:00",
              "reactions": [],
              "title": "TITULO"
          }
      ]
   ```
* /services/publications/otherID[/{offset}/{limit}]
   * GET
   * Header necessário `Authorization: Basic btoa(login:pass)`
      * btoa: Conversão para base64 no JavaScript
   * Retorna uma lista de publicações do outro usuário:
   ```json
      [
          {
              "author": {
                  "email": "a@b",
                  "id": 51,
                  "isFollowing": true,
                  "login": "viniciusas",
                  "nFollowing": 1,
                  "nPublications": 1,
                  "name": "Vinicius",
                  "photopath": "/"
              },
              "id": 1,
              "imagepath": "/image.png",
              "moment": "2017-06-19T22:29:56.134-03:00",
              "reactions": [],
              "title": "TITULO"
          }
      ]
   ```

* /services/feed/{offset}/{limit}
   * GET
   * Header necessário `Authorization: Basic btoa(login:pass)`
      * btoa: Conversão para base64 no JavaScript
   * Retorna uma lista de publicações que compõe o feed:
   ```json
      [
          {
              "author": {
                  "email": "a@b",
                  "id": 51,
                  "isFollowing": true,
                  "login": "viniciusas",
                  "nFollowing": 1,
                  "nPublications": 1,
                  "name": "Vinicius",
                  "photopath": "/"
              },
              "id": 1,
              "imagepath": "/image.png",
              "moment": "2017-06-19T22:29:56.134-03:00",
              "reactions": [],
              "title": "TITULO"
          }
      ]
   ```
* inserir reação -- somente documentação
* buscar pessoas que está seguindo





