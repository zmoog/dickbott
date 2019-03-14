import { inject, interfaces } from "inversify";
import { Intent } from "../core/intent/Intent";
import { SlackMessage } from "../slack/Types";
import * as _ from "lodash";
import { IntentDefinition, IntentMetadataExtractor } from "../core/intent/IntentDecorator";

@IntentDefinition({
    name: "IntroduceYourselfIntent",
    description: "",
    examples: {
        Simple: "Introduce yourself",
        Elegant: "Please, can you introduce yourself?"
    },
    docs_url: "https://bitbucket.tierratelematics.com"
})
export class IntroduceYourselfIntent implements Intent<IntroduceYourselfEntities, SlackMessage> {
    constructor(@inject("Container") private container: interfaces.Container) {
    }

    async execute(executionId: string, entities: IntroduceYourselfEntities): Promise<SlackMessage> {
        let intents = this.container.getAll<Intent<any, any>>("Intent");
        let attachments = _(intents)
            .map(intent => IntentMetadataExtractor.extract(intent.constructor))
            .map(intentMetadata => {
                return ({
                attachment_type: "default",
                title: intentMetadata.name,
                title_link: intentMetadata.docs_url,
                text: intentMetadata.description,
                fields: _(intentMetadata.examples).map((value, key) => ({
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
            })})
            .value();

        return {
            text: "I am a chatbot designed to help you with your infrastructure duties.\n\nThis is the list of what I'm capable of doing today for you.",
            attachments: attachments
        };
    }
}

export interface IntroduceYourselfEntities {
}
