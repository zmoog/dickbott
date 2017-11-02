export interface PostMessageRequest extends SlackMessage {
    /**
     * You can either pass the channel's name (#mururoa) or encoded ID (C024BE91L), and the message will be posted to that channel.
     */
    channel?: string;
    /**
     * Text of the message to send. This field is usually required, unless you're providing only attachments instead.
     */
    text?: string;
    /**
     * A JSON-based array of structured attachments, presented as a URL-encoded string.
     */
    attachments?: Attachment[];

    as_user?: boolean;
}

export interface SlackWebAPIResponse {

    ok: boolean;

    warning?: string;

    error?: string;
}

export interface SlackMessage {
    text?: string;
    attachments?: Attachment[];
}

export type Attachment = {
    color?: string,
    title?: string,
    text?: string,
    fallback?: string,
    callback_id?: string,
    attachment_type?: string,
    author_name?: string,
    fields?: Field[],
    actions?: Action[],
    footer?: string,
    ts?: number
};

export type Field = {
    title: string,
    value: string,
    short?: boolean
};

export type Action = {
    name: string,
    text: string,
    type: string,
    value: string,
    style?: string,
    confirm?: Confirm
};

export type Confirm = {
    title: string,
    text: string,
    ok_text: string,
    dismiss_text: string
}

export type SlackConfig = {
    botUserOAuthAccessToken: string,
    defaultChannel: string
}

export type InteractiveComponentRequest = {}
export type InteractiveComponentResponse = {}
