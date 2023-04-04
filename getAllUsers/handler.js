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


const getAllUsers = async(event, context) => {
  
  const params = {    
    TableName: 'usersTable'
  }

  return dynamodb.scan(params)
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
  getAllUsers
}