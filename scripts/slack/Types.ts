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
    ts?: number,
    mrkdwn_in?: string[],
    image_url?: string
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

export type Team = {
    id: string
    domain: string
}

export type Channel = {
    id: string
    name: string
}

export type User = {
    id: string
    name: string
}

/**
 * Most of the settings come from the Slack App configuration page. See https://api.slack.com/ for more details.
 */
export type SlackConfig = {

    /**
     * Settings > Basic information > App Credentials
     *
     * These tokens were automatically generated when you installed the app to your team. You can use these to
     * authenticate your app.
     *
     * To learn more see https://api.slack.com/docs/oauth.
     *
     */
    botUserOAuthAccessToken: string,

    /**
     * Features > OAuth & Permissions > OAuth Tokens & Redirect URLs > Tokens for Your Workspace
     *
     * For interactive messages and events, use this token to verify that requests are actually coming from Slack.
     * Slash commands and interactive messages will both use this verification token.
     *
     */
    verificationToken: string,

    /**
     * The Slack Web API will send the messages to this channel when no channel is specified.
     */
    defaultChannel: string
}

export type InteractiveComponentActions = {
    actions: Action[]
    callback_id: string
    team: Team
    channel: Channel
    user: User
    token: string
    type: string
    original_message: SlackMessage
}
