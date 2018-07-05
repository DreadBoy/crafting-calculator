export interface Parameters {
    [key: string]: any
}

export interface FulfillmentRequest {
    responseId: String
    session: String
    queryResult: {
        queryText: String
        parameters: Parameters
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
export type ShapeReduce = { [id: number]: number };

export type ItemStack = {
    id: number
    displayName: string
    amount: number
}