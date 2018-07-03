interface FulfillmentRequest {
    responseId: String
    session: String
    queryResult: {
        queryText: String
        parameters: { [key: string]: string[] }
        allRequiredParamsPresent: Boolean
        fulfillmentText: String
        fulfillmentMessages: {}
        outputContexts?: {}
        intent: {}
        intentDetectionConfidence: number
        diagnosticInfo: {}
        languageCode: String
    },
    originalDetectIntentRequest: {},
}
export interface Recipe {
    input: {[item: string]: number},
    output: {[item: string]: number},
}