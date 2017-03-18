# Funcionalidades:

### PÁGINA PRINCIPAL
* Deverá haver um botão de Login e um botão de Cadastro. Deverá haver uma breve descrição do site, com imagens (simples) e elementos textuais, possivelmente contendo um slider (carousel).

### PERFIL DE USUÁRIO:
* Imagem de perfil e nome próprio deverão ser bem visíveis. Deverá haver uma barra de pesquisa de usuários. Deverá haver uma maneira de ver quais pessoas o usuário está seguindo.
* Caso a página seja o perfil próprio, também deverá haver a opção de editar a foto de perfil e o nome. Além disso, deverá haver um feed de publicações e a opção de realizar uma nova publicação. Deve haver uma opção para ver apenas as próprias publicações.
* Caso a página seja o perfil de outra pessoa, a opção de realizar uma publicação será substituída por "Seguir"/"Parar de seguir" e o feed será substituído pelas imagens publicadas pelo usuário.

### RESULTADOS DA PESQUISA:
* Deverá conter uma barra de pesquisa e um botão de busca, caso o usuário queira realizar outra busca. Deverá conter uma lista com as pessoas que correspondem com termo pesquisado, ordenadas por um critério a ser definido (qtd. pessoas seguindo/publicações?). Cada elemento da lista deve apresentar a imagem pessoal do usuário, seu nome e um indicador caso o utilizador atual esteja seguindo o usuário em questão. (Em discussão: apresentar a quantidade de pessoas que o usuário segue e quantas publicações ele realizou.)

### PUBLICAÇÃO (componente):
* Deverá conter o título da imagem (caso exista), a imagem em si, a data de publicação (formato a definir), a imagem e o nome do autor da publicaçã e a reação mais popular. Deverá haver uma opção para reagir/ver reações, e também deverá explicitar quantas pessoas reagiram. 
* Caso a publicação seja DO USUÁRIO, não será possível reagir, apenas ver reações. Deverá ser possível excluir a publicação (com confirmação).

### REAÇÕES (componente):
* Deverá apresentar uma quantia (a definir) de emojis (a definir) que representem reações. Cada reação será associada à porcentagem de pessoas que reagiram daquela maneira. A reação selecionada (caso aplicável) deverá ser realçada de alguma maneira.

### CADASTRO (modal):
* Acessível a partir da página principal. Deverá conter campos para inserção de nome próprio, e-mail, nome de usuário e senha. Haverá validação nos campos de e-mail (sintaxe inválida), nome de usuário (apenas letras, números, hífen e underscore) e senha (6 a 20 caracteres). Nenhum campo poderá estar vazio. Caso alguma validação falhe, uma mensagem informativa deverá aparecer abaixo do campo apropriado.

### LOGIN (modal):
* Acessível a partir da página principal. Deverá conter campos para inserção do nome de usuário ou e-mail e a senha. Caso a autenticação falhe (nome de usuário inválido, senha errada, etc), uma mensagem informativa deverá aparecer abaixo dos campos.

