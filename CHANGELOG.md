## 0.5.0 (Unreleased)

FEATURES:

ENHANCEMENTS:

BUG FIXES:


## 0.4.0 (January 22, 2018)

FEATURES:

* core/intent: Add introspection capabilities to discover the intents available. This is a BREAKING CHANGE becouse we use a different method to regiter the intents with Inversify.

ENHANCEMENTS:

* core/intent: The default `IntentRepository` now is the `InMemoryIntentRepository`.
* provider/dialogflow: Add the `originalRequest` attribute to the entities sent to the Intents during the execution.
