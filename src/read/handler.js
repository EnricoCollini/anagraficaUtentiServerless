'use strict';
const { DynamoDB } = require("aws-sdk");
const AWS = require("aws-sdk")

module.exports = {
    list: async (event, context) => {
        let scanParams = {
            TableName: "anagraficaUtentiTable"
        }
        let scanResult = {}
        try {
            let dynamodb = new AWS.DynamoDB.DocumentClient()
            scanResult = await dynamodb.scan(scanParams).promise()
        } catch (scanError) {
            console.log("C'è stato un errore scansionando gli utenti")
            console.log("scanParams", scanParams)
            return {
                statusCode: 500
            }
        }

        if (scanResult.Item === null || !Array.isArray(scanResult.Items) || scanResult.Items.length === 0) {
            return {
                statusCode: 404
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify(scanResult.Items.map(utente => {
                return {
                    codicefiscale: utente.codicefiscale,
                    nome: utente.nome,
                    cognome: utente.cognome,
                    email: utente.email,
                    recapitoTelefonico: utente.recapitoTelefonico
                }
            }))
        }
    },
    get: async (event, context) => {
        let getParams = {
            TableName:  "anagraficaUtentiTable",
            Key: {
                codicefiscale: event.pathParameters.codicefiscale
            }
        }
        let getResult = {}
        try {
            let dynamodb = new AWS.DynamoDB.DocumentClient()
            getResult = await dynamodb.get(getParams).promise()
        } catch (getError) {
            console.log("c'è stato un errore nel prendere l'utente")
            console.log(getError)
            return {
                statusCode: 500
            }
        }

        if (getResult.Item === null) {
            return {
                statusCode: 404
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                codicefiscale: getResult.Item.codicefiscale,
                nome: getResult.Item.nome,
                cognome: getResult.Item.cognome,
                email: getResult.Item.email,
                recapitoTelefonico: getResult.Item.recapitoTelefonico
            })
        }
    }
}