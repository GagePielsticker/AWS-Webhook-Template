export const handler = async (event, context, callback) => {
  /**
   * Since we are not batching, we can just take the 1st record delivered by SQS and read the data.body to get the web request JSON body.
   */
  let data = JSON.parse(event.Records[0].body)

  throw new Error("cannot process.")
}
