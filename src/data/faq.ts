/**
 * Frequently asked questions. `draft: true` = not yet confirmed by Mansor:
 * the answer renders with a visible "Draft" tag until it's approved.
 * Confirmed facts used: the build request form on this site, the Instagram
 * DM link, the service list, and the shop address (creative director,
 * 2026-10-09).
 */
export type Faq = { id: string; q: string; a: string; draft: boolean }

export const faq: Faq[] = [
  {
    id: 'quote',
    q: 'How do I request a quote?',
    a: 'Use the build request form on this page: tell us what you drive and what you have in mind, and we’ll follow up by your preferred contact method. You can also message us on Instagram at @mansor.customs.',
    draft: false,
  },
  {
    id: 'options',
    q: 'What can you customize?',
    a: 'Wraps, bespoke interiors, wheels and suspension, starlight headliners, paint protection and finishing, body kits, tuning and performance steering wheels.',
    draft: false,
  },
  {
    id: 'timeline',
    q: 'How long does a project take?',
    a: 'It depends on the vehicle and the scope of work. We’ll give you an estimated timeline together with your quote.',
    draft: true,
  },
  {
    id: 'consultation',
    q: 'Can I book a consultation?',
    a: 'Yes. Start with the build request form and we’ll arrange a time to go through your project, at the shop at 19 Saddle River Ave, Garfield, NJ, or by phone.',
    draft: true,
  },
  {
    id: 'protection',
    q: 'How can I protect my paint?',
    a: 'Paint protection film guards against stone chips and light scratches; a ceramic coating adds gloss and makes the car easier to keep clean. We’ll recommend the right combination for how you drive.',
    draft: true,
  },
]
