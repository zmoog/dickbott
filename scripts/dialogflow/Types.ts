export interface FulfillmentRequest {
    originalRequest?: OriginalRequest;
    result: Result;
}

export type FulfillmentResponse = {
    speech?: string;
    displayText?: string;
    data?: {
        slack?: any
    };
}

export type Result = {
    action: string;
    parameters?: any;
    metadata: Metadata;
}

export type Metadata = {
    intentName: string;
}

export type OriginalRequest = {
    source: Provider
    data: {
        authed_users: string[],
        event_id: string, // Ev8GL91D8U
        api_app_id: string, // A8BRxxxx
        team_id: string, // T036VJ7EH
        event: {
            event_ts: string, // 1513660587.000032
            channel: string, // D8B47US3X
            text: string, // ieri ho lavorato 30 minuti su voo facendo grafica,
            type: EventType, // message,
            user: string, // U036VJ7EV,
            ts: string //1513660587.000032
        },
        type: string, // event_callback,
        event_time: number, // 1513660587,
        token: string, // "HifH7KjUAS6suqzFFpEoyvKY"
    }
}

export enum Provider {
    Slack = "slack"
}

export enum EventType {
    Message = "message"
}
