//
// https://github.com/dialogflow/fulfillment-webhook-json
//

export type FulfillmentRequest = {
    responseId: string,
    queryResult: {
        queryText: string,
        action: string,
        parameters: any,
        intent: {
            name: string,
            displayName: string
        },
        intentDetectionConfidence: number,
        languageCode: string
    },
    originalDetectIntentRequest: any,
    session: string
}

export type FulfillmentResponse = {
    // speech?: string;
    // displayText?: string;
    // data?: {
    //     slack?: any
    // };
    fulfillmentText: string,
    payload?: {
        slack: any
    }
}