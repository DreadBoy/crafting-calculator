export interface FulfillmentRequest {
    responseId: String
    session: String
    queryResult: {
        queryText: String
        parameters: { [key: string]: any }
        allRequiredParamsPresent: Boolean
        fulfillmentText: String
        fulfillmentMessages: {}
        outputContexts?: {}
        intent: {
            name: string,
            displayName: string,
        }
        intentDetectionConfidence: number
        diagnosticInfo: {}
        languageCode: String
    },
    originalDetectIntentRequest: {},
}

export interface FulfillmentResponse {
    fulfillmentText: string
}
export interface Recipe {
    input: {[item: string]: number},
    output: {[item: string]: number},
}