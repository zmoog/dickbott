## 0.8.0
FEATURES:

* change registration of intent adding metadata

## 0.5.0 (Unreleased)

FEATURES:

ENHANCEMENTS:

* provider/slack: **BREAKING CHANGE** changing the service identifier for SlackWebAPI from `ISlackWebAPI` to `SlackWebAPI`. This was the last one with the `I` prefix.

BUG FIXES:


## 0.4.1 (February 2nd, 2018)

BUG FIXES:

* core/intent: Fix wrong attribute `description` in  `IntroduceYourself` intent.


## 0.4.0 (January 22nd, 2018)

FEATURES:

* core/intent: Add introspection capabilities to discover the intents available. This is a **BREAKING CHANGE** becouse we use a different method to regiter the intents with Inversify.

ENHANCEMENTS:

* core/intent: The default `IntentRepository` now is the `InMemoryIntentRepository`.
* provider/dialogflow: Add the `originalRequest` attribute to the entities sent to the Intents during the execution.
