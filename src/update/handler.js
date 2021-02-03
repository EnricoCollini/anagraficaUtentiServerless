'use strict';
const { DynamoDB } = require("aws-sdk");
const AWS = require("aws-sdk")

module.exports.update = async (event, context) => {
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

    let updateParams = {
        TableName: "anagraficaUtentiTable",
        Key: {
            codicefiscale: event.pathParameters.codicefiscale
        },
        ExpressionAttributeValues: {
            ':nome': bodyObj.nome,
            ':cognome': bodyObj.cognome,
            ':email': bodyObj.email,
            ':recapitoTelefonico': bodyObj.recapitoTelefonico
        },
        UpdateExpression:   'SET nome = :nome , cognome = :cognome , email =  :email , recapitoTelefonico = :recapitoTelefonico' 
    }

    try {
        let dynamodb = new AWS.DynamoDB.DocumentClient()
        await dynamodb.update(updateParams).promise()
    } catch (updateError) {
        console.log("c'è stato un errore nell'aggiornare l'utente")
        console.log(updateError)
        return {
            statusCode: 500
        }
    }

    return {
        statusCode: 200,
    }
}