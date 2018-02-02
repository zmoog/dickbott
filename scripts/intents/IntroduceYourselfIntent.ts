import { inject, injectable, interfaces } from "inversify";
import { Container } from "inversify";
import { Intent } from "../core/intent/Intent";
import { SlackMessage } from "../slack/Types";
import * as _ from "lodash";


@injectable()
export class IntroduceYourselfIntent implements Intent<IntroduceYourselfEntities, SlackMessage> {

    name = "Introduce Yourself";
    description = "I will introduce myself describing what I am, what is my value proposition is and what I'm capable of doing right now."
    examples = {
        Simple: "Introduce yourself",
        Elegant: "Please, can you introduce yourself?"
    }
    docs_url = "https://bitbucket.tierratelematics.com"

    constructor( @inject("Container") private container: interfaces.Container) {
    }

    async execute(executionId: string, entities: IntroduceYourselfEntities): Promise<SlackMessage> {

        let intents = this.container.getAll<Intent<any, any>>("Intent");

        let attachments = _(intents)
            .map(intent => ({
                attachment_type: "default",
                title: intent.name,
                title_link: intent.docs_url,
                text: intent.description,
                fields: _(intent.examples).map((value, key) => ({
                    short: true,
                    title: key,
                    value: `"${value}"`
                })).value(),
                color: "#d2dde1",
                mrkdwn_in: [
                    "text",
                    "pretext",
                    "fields"
                ]
            }))
            .value();

        return {
            text: "I am a chatbot designed to help you with your infrastructure duties.\n\nThis is the list of what I'm capable of doing today for you.",
            attachments: attachments
        };
    }
}

export interface IntroduceYourselfEntities {
}
