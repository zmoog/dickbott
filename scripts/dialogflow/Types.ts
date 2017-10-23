export interface FulfillmentRequest {
    result: Result;
}

export interface FulfillmentResponse {
    speech?: string;
    displayText?: string;
    data?: {
        slack?: any
    };
}

export interface Result {
    action: string;
    parameters?: any;
    metadata: Metadata;
}

export interface Metadata {
    intentName: string;
}
