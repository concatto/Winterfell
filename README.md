# Winterfell
Rede Social para Compartilhamento de Imagens

### Documentação Back-end

#### Rest
* /authentication/newuser
    * Cadastro de novo usuário;
    * Post com Json;
    * Retorna true ou false;
    * Content-Type: application/json 
    * Body: 
   ```json
        {
          "name": "Samuel Brati Favarin",
          "login": "samuelbfav",
          "pass": "666666",
          "email": "a@b.com.br",
          "photoPath": "./avatar.jpg"
        }
   ```

* /authenticatin/login
   * Login de usuário;
   * Post com Json;
   * Retorna Id;
   * Content-Type: application/json 
   * Body: 
   ```json
           {
             "login": "samuelbfav",
             "pass": "666666",
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

* /services/winteruser
   * GET 
   * Header necessário `Authorization: Basic btoa(login:pass)`
      * btoa: Conversão para base64 no JavaScript
   * Retorna Json com os dados do usuário 
      
 
 
   






