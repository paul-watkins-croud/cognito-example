const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk');
const ClientId = process.env.CONGNITO_CLIENT_ID
const CognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider
const CognitoUser = AmazonCognitoIdentity.CognitoUser
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool
const IdentityPoolId = process.env.COGNITO_IDENTITY_POOL_ID
const UserPoolId = process.env.CONGNITO_USER_POOL_ID
const Region = process.env.COGNITO_POOL_REGION

AWS.config.update({
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-2:128578f9-ec64-4204-b27d-a7cfa3b2d277' // process.env.CONGNITO_USER_POOL_ID
    }),
    region: Region
});


const UserPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: UserPoolId,
    ClientId: ClientId
})

const LoginKey = `cognito-idp.${Region}.amazonaws.com/${UserPoolId}`

const GetCognitoUser = (email) => {
    return new AmazonCognitoIdentity.CognitoUser({
    Username: email,
    Pool: UserPool
    })
}

const GetAuthenticationDetails = (email, password) => {
    return new AmazonCognitoIdentity.AuthenticationDetails({
        Username: email,
        Password: password,
    })
}

const SetIdentityCredentials = (payload) => {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId,
        Logins: {
            [LoginKey]: payload.getIdToken().getJwtToken()
        }
    })
    return AWS.config.credentials
}

module.exports = {
    AmazonCognitoIdentity,
    AWS,
    ClientId,
    CognitoIdentityServiceProvider,
    CognitoUser,
    CognitoUserPool,
    GetAuthenticationDetails,
    GetCognitoUser,
    LoginKey,
    Region,
    SetIdentityCredentials,
    UserPool, 
    UserPoolId,
}
