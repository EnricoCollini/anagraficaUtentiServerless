# anagraficaUtentiServerless

Back-End per un gestionale di un calendario di un dentista.
Architettura serverless framework + AWS + DynamoDB

Use Case CRUD Anagrafica Utenti.

 codicefiscale | nome | cognome | email | recapitoTelefonico


# RestEndpoints:
### createUtente
POST  https://------...us-east-1.amazonaws.com/dev/v1/createUtente

{
    "codicefiscale": "CDLLDKKDKD",
    "nome": "ilnome",
    "cognome": "ilcbognome",
    "email": "lamail",
    "recapitoTelefonico": "366123456"
}

### getAllUtenti
GET https://------...us-east-1.amazonaws.com/dev/v1/getAllUtenti

### getUtente {codicefiscale}
GET  https://------...us-east-1.amazonaws.com/dev/v1/getUtente/CLLLDKKDKD

### updateUtente {codicefiscale}
PUT  https://------...us-east-1.amazonaws.com/dev/v1/updateUtente/CLLDDKKDKD

{
    "codicefiscale": "CLLDDKKDKD",
    "nome": "newname",
    "cognome": "ilcognome",
    "email": "lamail",
    "recapitoTelefonico": "366123456"
}

### deleteUtente {codiefiscale}
DELETE  https://------...us-east-1.amazonaws.com/dev/v1/deleteUtente/CLLDDKKDKD

