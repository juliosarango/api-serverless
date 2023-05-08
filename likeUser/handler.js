const AWS = require("aws-sdk")

let DBClientParams = {};

const dynamoDB = new AWS.DynamoDB.DocumentClient(DBClientParams);


const likeUser = async (event, context) => {
  const body = event.Records[0].body;
  const userId = JSON.parse(body).id;

  const params = {
    TableName: 'userTable',
    Key: { pk: userId },
    UpdateExpression: "ADD likes :inc",
    ExpressionAttributeValues: {
      ':inc': 1
    },
    ReturnValues: 'ALL_NEW'
  }

  const result = await dynamoDB.update(params).promise();
  console.log(result);
}

module.exports = {
  likeUser
}