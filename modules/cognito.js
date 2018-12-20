require('dotenv').config()
const request = require('request-promise-native');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const AWS = require('./aws')

global.fetch = require('node-fetch');

/**
 * register the user with email and password
 */
exports.registerUser = (email, password) => {    
    return AWS.CognitoIdentityServiceProvider.signUp({
        ClientId: AWS.ClientId,
        Password: password,
        Username: email,
        UserAttributes: [
            {
                Name: 'email', /* required */
                Value: email
            },
        ],
    }).promise()
}

/**
 * confirm registration with email and code
 */
exports.confirmRegistration = (email, code) => {
    return AWS.CognitoIdentityServiceProvider.confirmSignUp({
        ClientId: AWS.ClientId,
        Username: email,
        ConfirmationCode: code
    }).promise()
} 

/**
 * Log the user in 
 */
exports.authenticate = (email, password) => {
    return new Promise((resolve, reject) => {
        AWS.GetCognitoUser(email).authenticateUser(AWS.GetAuthenticationDetails(email, password), {
            onSuccess: result => {
                AWS.SetIdentityCredentials(result).refresh(error => {
                    if (error) {
                        return reject(error.message || JSON.stringify(error))
                    }
                    resolve(result)
                })
            },
            onFailure: error => {
                reject(error.message || JSON.stringify(error))
            }  
        })
    })
}

exports.validateToken = (token) => {
    return new Promise((resolve, reject) => {
        request(`https://${AWS.LoginKey}/.well-known/jwks.json`, {json: true}).then(response => {

            const pems = {}
            response.keys.forEach(element => {
                pems[element.kid] = jwkToPem(element)
            })
            
            const decodedJwt = jwt.decode(token, { complete: true })
            if (!decodedJwt) {
                return reject('invalid token')
            }

            const pem = pems[decodedJwt.header.kid]
            if (!pem) {
                return reject('invalid token')
            }

            jwt.verify(token, pem, function (err, payload) {
                if (err) {
                    return reject('invalid token')
                } else {
                    resolve(payload)
                }
            })

        }).catch(error => {
            return reject('invalid token')
        })
    })
}

/**
 * confirm the authentication
 */
exports.confiirmAuthenticate = (response) => {

    console.log('here')


}