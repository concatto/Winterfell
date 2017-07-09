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


* /services/publications[?[limit=<lim>][&offset=<off>]]
   * Observação sobre os query params: Se não houver offset, será setado para zero, se não houver limit ou for zero, retornará todas as publicações utilizando o offset, se não houver nenhum, retornará todas as publicaçes
   * GET
   * Header necessário `Authorization: Basic btoa(login:pass)`
      * btoa: Conversão para base64 no JavaScript
   * Retorna uma lista de publicações do usuário:
   ```json
      [
          {
              "reactionResume": {
                  "reactions": [
                      0,
                      0,
                      2,
                      0,
                      0,
                      0,
                      1,
                      0,
                      1
                  ],
                  "userReaction": 1
              },
              "author": {
                  "email": "a@b",
                  "id": 51,
                  "login": "viniciusas",
                  "nFollowing": 1,
                  "nPublications": 5,
                  "name": "Vinícius Almeida dos Santos",
                  "photopath": "assets/149954145233651.png"
              },
              "id": 501,
              "imagepath": "/test.png",
              "moment": "2017-07-08T18:53:54.266-03:00",
              "title": "Experimentação"
          }
      ]
   ```
** userReaction só existirá se o usuário fez alguma reação **
**Diferença entre com e sem otherID no JSon de resposta: se for otherID, haverá o dado isFollowing em author**
* /services/publications/<otherID>[?[limit={lim}][&offset={off}]]
   * Observação sobre os query params: Se não houver offset, será setado para zero, se não houver limit ou for zero, retornará todas as publicações utilizando o offset, se não houver nenhum, retornará todas as publicaçes
   * GET
   * Header necessário `Authorization: Basic btoa(login:pass)`
      * btoa: Conversão para base64 no JavaScript
   * Retorna uma lista de publicações do outro usuário:
   ```json
      [
          {
              "reactionResume": {
                  "reactions": [
                      0,
                      0,
                      2,
                      0,
                      0,
                      0,
                      1,
                      0,
                      1
                  ],
                  "userReaction": 1
              },
              "author": {
                  "email": "a@b",
                  "id": 51,
                  "isFollowing": false,
                  "login": "viniciusas",
                  "nFollowing": 1,
                  "nPublications": 5,
                  "name": "Vinícius Almeida dos Santos",
                  "photopath": "assets/149954145233651.png"
              },
              "id": 501,
              "imagepath": "/test.png",
              "moment": "2017-07-08T18:53:54.266-03:00",
              "title": "Experimentação"
          }
      ]
   ```

* /services/feed[?[limit={lim}][&offset={off}]]
   * GET
   * Header necessário `Authorization: Basic btoa(login:pass)`
      * btoa: Conversão para base64 no JavaScript
   * Retorna uma lista de publicações que compõe o feed:
   ```json
      [
          {
              "reactionResume": {
                  "reactions": [
                      0,
                      0,
                      1,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0
                  ],
                  "userReaction": 1
              },
              "author": {
                  "email": "a@b",
                  "id": 51,
                  "isFollowing": false,
                  "login": "viniciusas",
                  "nFollowing": 1,
                  "nPublications": 5,
                  "name": "Vinícius Almeida dos Santos",
                  "photopath": "assets/149954145233651.png"
              },
              "id": 1,
              "imagepath": "/image.png",
              "moment": "2017-06-19T22:29:56.134-03:00",
              "title": "TITULO"
          }
      ]
   ```
* /services/reaction
    * Cadastro de nova reação;
    * POST com Json;
    * Retorna true ou false;
    * Content-Type: application/json 
    * Body: 
   ```json
         {
            "type": 3,
            "publication": 23
         }
   ```



