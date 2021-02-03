'use strict';
const { DynamoDB } = require("aws-sdk");
const AWS = require("aws-sdk")

module.exports.delete = async (event, context) => {
    let deleteParams = {
        TableName: "anagraficaUtentiTable",
        Key: {
            codicefiscale: event.pathParameters.codicefiscale
        }
    }
    let deleteResult = {}
    try {
        let dynamodb = new AWS.DynamoDB.DocumentClient()
        await dynamodb.delete(deleteParams).promise()
    } catch (deleteError) {
        console.log("c'è stato un errore nell'eliminare l'utente")
        console.log(deleteError)
        return {
            statusCode: 500
        }
    }

    return {
        statusCode: 200,
    }
}