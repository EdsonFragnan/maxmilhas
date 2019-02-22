# MaxMilhas APP

APP para verificação de situação de CPF.

# Testes Unitários + Coverage
- Comandos
- npm run coverage (Testes + Coverage)
- npm start (Rodar a Aplicação)
- npm test (Apenas o teste do MochaJs)

# Rotas
- GET - Consultar um CPF
http://localhost:3000/consult?cpf=41321794860

- GET - Recuperar todos os CPF's na blacklist
http://localhost:3000/blacklist

- GET - Recuperar todos os CPF's
http://localhost:3000/clients

- GET - Verificar status das requisições
http://localhost:3000/status

- POST - Cadastrar CPF e status
http://localhost:3000/register
- body:
{
    "cpf": 14310205235,
    "blacklist": true
}

- PATCH - Alterar o status do CPF
http://localhost:3000/update/14310205235
- body:
{
	"blacklist": true
}

- DELETE - Deletar um CPF
http://localhost:3000/delete/79267161890

- POST - Cadastrar muitos CPF's (Criação de Massa) 
http://localhost:3000/createMass
- body:
{
	"cpfs": [
	    { "cpf": 82192230818, "blacklist": false},
	    { "cpf": 41321794860, "blacklist": true},
	    { "cpf": 40164820892, "blacklist": true},
	    { "cpf": 58463054820, "blacklist": false},
	    { "cpf": 79267161890, "blacklist": true},
	    { "cpf": 77593454886, "blacklist": false},
	    { "cpf": 38221510840, "blacklist": true},
	    { "cpf": 95210334872, "blacklist": false},
	    { "cpf": 98379555899, "blacklist": false},
	    { "cpf": 19818927885, "blacklist": true}
	]
}