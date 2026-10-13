/**
 * Frequently asked questions. Copy supplied by the creative director
 * (2026-10-13), verbatim; the reference-photos question was removed at
 * their request. PROPOSED COPY: confirm with Mansor before launch.
 * No prices, turnaround times, warranties or policies; don't add any here
 * without the client's written confirmation.
 */
export type Faq = { id: string; q: string; a: string }

export const faq: Faq[] = [
  {
    id: 'wrap-ppf-ceramic',
    q: 'Wrap, PPF, or ceramic coating — what’s the difference?',
    a: 'A wrap changes the appearance of your car. PPF protects the paint against stone chips and light scratches, while ceramic coating helps with gloss and easier cleaning. Some coloured PPF products offer both a new finish and protection.',
  },
  {
    id: 'stance',
    q: 'Can I upgrade the wheels, suspension, and body kit together?',
    a: 'These upgrades are often best considered together. Wheel fitment, ride height, and bodywork all affect the final stance. The right combination depends on your specific vehicle.',
  },
  {
    id: 'interior',
    q: 'What can be customized inside my vehicle?',
    a: 'From upholstery and steering wheels to ambient lighting, starlight headliners, and screen upgrades, there’s plenty to explore. Available options depend on the vehicle and the direction of the build.',
  },
  {
    id: 'quote',
    q: 'What do you need to put together a quote?',
    a: 'Your vehicle’s year, make, and model, along with the work you’re considering. Reference photos help too. The selected materials, parts, and scope of work determine the pricing.',
  },
]
