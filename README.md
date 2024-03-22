# AWS-Webhook-Template

### Preface

> I created this due to a need of a webhook that can processes large amounts of bursty POST request without overloading our database. To do so we are using amazons SQS FIFO queues. This ensures no message duplication and will let us process all the incoming request at a rate that we control and wont overwhelm any underlying systems. This also will re-attempt any failed messages, and if the re-attempts fail store them in a dead letter queue for inspection or redrive.

### Architecture Diagram

The architecture is entirely serverless based, uses REST api's hooked up to sqs directly, & WAF standard rulesets.

<img src="./assets/diagram.png" alt="Architecture Diagram" width="500"/>

### Example call to webhook

`POST` `/`

Headers

```json
"Content-Type": "application/json"
```

Body

```json
{
  "my": {
    "cool": "data"
  }
}

You can see how the above is parsed in /lambda/index.js
```

### Notes

- Defaultly this delivers 1 message to 1 lambda execution, you can configure batching but need to handle it in the code as well.

- The current throughput limit defaultly is ~300 messages per second. This can be increased by modifying the SQS to use high throughput mode but requires you to specify specific message groups based on properties in the data.

- You can optionally throttle the amount of concurrent lambdas processing the messages via the lambdas trigger event in the template. Currently I have concurrency throttled to `50` lambdas.

- Built in are the following rulesets for the WAF are as follows:

```
- - AWSManagedRulesCommonRuleSet
- - AWSManagedRulesKnownBadInputsRuleSet
- - AWSManagedRulesAmazonIpReputationList
- - AWSManagedRulesAnonymousIpList
```

- If the lambda errors or its undeliverable, the SQS currently will retry sending the message to `2` times before sending it to the dead letter queue, you can change this in the template with the `maxReceiveCount` policy.
- Defaultly there is a dummy email in the template, change this to an email you would like to be alerted on message failures as well as change limits appropriately.
