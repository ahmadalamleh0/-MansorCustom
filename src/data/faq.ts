/**
 * Frequently asked questions (rewritten 2026-10-13 around real customer
 * concerns: customization, PPF, project scope, pricing, the build process).
 *
 * `draft: true` = describes how Mansor works and needs the client's
 * confirmation; it renders with a visible "Draft" tag until approved.
 * Never add prices, turnaround times, warranties or policies here without
 * the client's written confirmation.
 *
 * Confirmed facts used: the service list, the build request form, the
 * Instagram DM link, "full service boutique" (approved editorial copy),
 * and the brands shown on the site (XPEL, 3M, PurePPF).
 */
export type Faq = { id: string; q: string; a: string; draft: boolean }

export const faq: Faq[] = [
  {
    id: 'customization',
    q: 'Do you work on my make and model?',
    a: 'Most likely. We work on everything from daily drivers to exotics. Some modifications depend on what’s available for your specific car, so the quickest way to find out is to send us the year, make and model through the build request form.',
    draft: true,
  },
  {
    id: 'ppf',
    q: 'What’s the difference between PPF, a ceramic coating and a wrap?',
    a: 'Paint protection film is a clear, durable film that guards the paint against stone chips and light scratches. A ceramic coating is a thin layer that adds gloss and makes the car easier to clean, but it won’t stop chips. A wrap changes the colour or finish. Many owners combine them, for example PPF on the front end with a ceramic coating over the whole car.',
    draft: false,
  },
  {
    id: 'scope',
    q: 'Can you handle the whole build, or just one part?',
    a: 'Either. Some clients come in for a single job, like a wrap or tint; others plan a full build across exterior, wheels, interior and performance. We’re a full service shop, so we can plan the work in the right order and keep it under one roof.',
    draft: false,
  },
  {
    id: 'pricing',
    q: 'How much will my build cost?',
    a: 'It depends on the car, the products and the amount of work, so we don’t publish fixed prices. Send us the details through the build request form and we’ll come back with a quote for your specific project.',
    draft: true,
  },
  {
    id: 'process',
    q: 'What happens after I send a build request?',
    a: 'We review the details, then contact you by your preferred method to talk through what you want and confirm the scope. Once you approve the quote, we schedule the car in and keep you updated until it’s ready to collect.',
    draft: true,
  },
]
