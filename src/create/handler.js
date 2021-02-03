'use strict';
const { DynamoDB } = require("aws-sdk");
const AWS = require("aws-sdk");

module.exports.create = async (event, context) => {
    let bodyObj = {}
    try {
        bodyObj = JSON.parse(event.body)
    } catch (jsonError) {
        console.log("Errore", jsonError)
        return {
            statusCode: 400
        }
    }
    if (typeof bodyObj.codicefiscale === 'undefined' ||
        typeof bodyObj.nome === 'undefined' ||
        typeof bodyObj.cognome === 'undefined' || 
        typeof bodyObj.email === 'undefined' ||  
        typeof bodyObj.recapitoTelefonico === "undefined") {
        console.log("Missing parameters")
        return {
            statusCode: 400
        }
    }

    let putParams = {
        TableName: "anagraficaUtentiTable",
        Item: {
            codicefiscale: bodyObj.codicefiscale,
            nome: bodyObj.nome,
            cognome: bodyObj.cognome,
            email: bodyObj.email,
            recapitoTelefonico: bodyObj.recapitoTelefonico
        }
    }
    let putResult = {}
    try {
        let dynamodb = new AWS.DynamoDB.DocumentClient()
        putResult = await dynamodb.put(putParams).promise()
    } catch (putError) {
        console.log("C'è un errore nell'inserimento dell'utente")
        console.log("putParams", putParams)
        return {
            statusCode: 500
        }
    }

    return {
        statusCode: 201
    }
}
