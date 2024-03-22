export const handler = async (event, context, callback) => {
  /**
   * Since we are not batching, we can just take the 1st record delivered by SQS and read the data.body to get the web request JSON body.
   */
  let data = JSON.parse(event.Records[0].body)

  //console.log(data?.my?.cool)

  throw new Error("cannot process.") //sends it back to queue for retry if function errors like so...

  return {
    status: 200
  }
}
