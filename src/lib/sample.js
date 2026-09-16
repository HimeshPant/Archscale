export const SAMPLE_CONVERSATION = `[WhatsApp - Site Group]
Rakesh (Contractor): We're stuck on the master bathroom marble. Client hasn't confirmed.
Priya (Architect): Client approved everything except the master bathroom in yesterday's call.
Priya (Architect): Use the previous marble spec there for now, don't hold up the rest.
Suresh (Supplier): FYI shade 312 is unavailable till next month. Need an alternate shade confirmed by Friday or we lose the delivery slot.
Rakesh (Contractor): Can someone send Rev 04 drawings again? Site copy is outdated.

[Email - Client thread]
Client: Please refer Rev 04 for the layout. Also, can we get the fabricator's quote for the false ceiling by next Wednesday?
Priya (Architect): Will share the Rev 05 drawings once structural sign-off comes in from the consultant.`

export const SAMPLE_RESULT = {
  summary:
    "The project team is progressing with approved areas while the master bathroom marble remains unresolved. Material availability threatens the delivery slot, site drawings require updating, and Rev 05 is awaiting structural sign-off.",
  tasks: [
    {
      task: "Confirm an alternate shade for material shade 312.",
      owner: "Unassigned",
      deadline: "Friday",
      source: "WhatsApp - Site Group · Suresh (Supplier)",
      sourceQuote: "Need an alternate shade confirmed by Friday or we lose the delivery slot.",
    },
    {
      task: "Send the Rev 04 drawings to the site team.",
      owner: "Unassigned",
      deadline: "No deadline given",
      source: "WhatsApp - Site Group · Rakesh (Contractor)",
      sourceQuote: "Can someone send Rev 04 drawings again? Site copy is outdated.",
    },
    {
      task: "Provide the fabricator's false-ceiling quote.",
      owner: "Unassigned",
      deadline: "Next Wednesday",
      source: "Email - Client thread · Client",
      sourceQuote: "Can we get the fabricator's quote for the false ceiling by next Wednesday?",
    },
  ],
  decisions: [
    {
      item: "Proceed with the previous marble specification for the master bathroom so remaining work is not delayed.",
      status: "decided",
      source: "WhatsApp - Site Group · Priya (Architect)",
      sourceQuote: "Use the previous marble spec there for now, don't hold up the rest.",
    },
    {
      item: "Master bathroom marble final confirmation is still required from the client.",
      status: "pending_approval",
      source: "WhatsApp - Site Group · Priya (Architect)",
      sourceQuote: "Client approved everything except the master bathroom in yesterday's call.",
    },
  ],
  risks: [
    {
      issue: "Shade 312 is unavailable until next month.",
      impact: "The delivery slot may be lost.",
      actionNeeded: "Confirm an alternate shade.",
      deadline: "Friday",
      source: "WhatsApp - Site Group · Suresh (Supplier)",
      sourceQuote: "Shade 312 is unavailable till next month.",
    },
    {
      issue: "The site team has an outdated Rev 04 drawing copy.",
      impact: "Work could proceed from incorrect information.",
      actionNeeded: "Send the latest applicable drawing set to site.",
      deadline: "No deadline given",
      source: "WhatsApp - Site Group · Rakesh (Contractor)",
      sourceQuote: "Site copy is outdated.",
    },
  ],
  pending: [
    {
      item: "Master bathroom marble approval.",
      waitingOn: "Client",
      source: "WhatsApp - Site Group · Rakesh (Contractor)",
      sourceQuote: "Client hasn't confirmed.",
    },
    {
      item: "Rev 05 drawings.",
      waitingOn: "Structural consultant sign-off",
      source: "Email - Client thread · Priya (Architect)",
      sourceQuote: "Will share the Rev 05 drawings once structural sign-off comes in.",
    },
  ],
}