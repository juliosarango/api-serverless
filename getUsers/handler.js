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


const getUsers = async(event, context) => {

  let userId = event.pathParameters.id
  const params = {
    ExpressionAttributeValues: { ':pk': userId },
    KeyConditionExpression: 'pk = :pk',
    TableName: 'usersTable'
  }

  return dynamodb.query(params)
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
  getUsers
}