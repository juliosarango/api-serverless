const aws = require("aws-sdk")

let dynamoDbClientParams = {}

if (process.env.IS_OFFLINE) {
  dynamoDbClientParams = {
    region: 'localhost',	
    endpoint: 'http://localhost:8000',	
    accessKeyId: 'DEFAULT_ACCESS_KEY',
    secretAccessKey: 'DEFAULT_SECRET'
  }

}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDbClientParams)


const updateUsers = async(event, context) => {

  let userId = event.pathParameters.id

  const body = JSON.parse(event.body)
  const params = {
    TableName: 'usersTable',
    Key: { pk: userId },
    UpdateExpression: "set #name = :name, #lastname = :lastname, #age = :age, #email = :email",
    ExpressionAttributeNames : {"#name":"name", "#lastname": "lastname", "#age": "age", "#email":"email"},
    ExpressionAttributeValues: { ':name': body.name, ":lastname": body.lastname, ":age": body.age, ":email": body.email },
    ReturnValues: "ALL_NEW"
  }

  return dynamodb.update(params)
    .promise()
    .then(res => {
      console.log(res)
      return {        
          "statusCode": 200,
          "body": JSON.stringify({"user": res})        
      }
    })
}


module.exports = {
  updateUsers
}