const aws = require("aws-sdk")
const random = require("crypto")

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


const createUsers = async(event, context) => {

  const id = random.randomUUID()

  let userBody = JSON.parse(event.body)
  userBody.pk = id

  const params = {    
    TableName: 'usersTable',
    Item: userBody
  }

  console.log(params.Item)

  return dynamodb.put(params)
    .promise()
    .then(res => {
      console.log(res)
      return {        
          "statusCode": 201,
          "body": JSON.stringify({"user": params.Item})        
      }
    })
}


module.exports = {  
  createUsers
}