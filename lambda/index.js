export const handler = async (event, context, callback) => {
  /**
   * Since we are not batching, we can just take the 1st record delivered by SQS and read the data.body to get the web request JSON body.
   */
  let data = JSON.parse(event.Records[0].body)

  //Do Something With parsedData
  console.log(data)

  //Return 200 when done. If an error is thrown beforehand, it will be sent back to queue for retry.
  return {
    statusCode: 200,
  }
}
