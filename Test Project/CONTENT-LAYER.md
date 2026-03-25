# Content Layer Draft

Review and edit this before building. This becomes `/src/data/slides.ts`.

## Deck Config

```ts
export const deckConfig = {
  title: "Crowe Consulting AI Strategy",
  theme: "dark",
  accentColor: "crowe-blue",
  slideCount: 11,
} as const
```

## Slides

```ts
export const slides = [
  {
    id: "hero",
    type: "hero",
    headline: "Crowe Consulting AI Strategy",
    subheadline: "Simple. Focused. Built to win.",
    eyebrow: "CLIENT PITCH · CROWE CONSULTING · MARCH 2026",
    background: "/images/hero-bg.jpg",
    overlayOpacity: 0.58,
  },
  {
    id: "why-now",
    type: "two-column",
    eyebrow: "Why now",
    headline: "The window is open, but not forever",
    leftContent: [
      "\"If we did nothing different for 18 months, how would AI change our competitive position?\"",
      "Competitors are embedding AI and will begin setting the price, talent, and delivery standard.",
      "Clients are asking different questions and now want help defending automated decisions, not just passing the exam.",
      "Smaller, AI-augmented teams will outperform larger traditional teams as the talent model shifts.",
      "Pricing pressure is coming as AI-enabled firms undercut on cost and outperform on outcomes.",
    ],
    rightContent: [
      "AI utilization across our offerings today averages about 12 percent and most areas remain below 20 percent.",
      "Current use is concentrated in internal productivity rather than client differentiation.",
      "Teams expect 3 to 4 times growth in AI utilization within 12 months but, without a unified approach, enthusiasm becomes fragmentation.",
      "Crowe already has the domain expertise, client trust, and industry credibility that competitors cannot easily replicate.",
      "AI does not replace that advantage. It amplifies it, if we act with structure, speed, and intent.",
    ],
  },
  {
    id: "ai-opportunity",
    type: "tabs",
    headline: "Three things we will do with AI",
    tabs: [
      {
        label: "Sell AI",
        headline: "Turn capability into revenue",
        body: [
          "Bring AI products, tools, and expertise to market.",
          "Embed forward-deployed AI resources in client engagements.",
          "Package offerings as assessments, implementation, and managed services.",
        ],
      },
      {
        label: "Improve",
        headline: "Make delivery faster and better",
        body: [
          "Use AI to reduce time, increase precision, and expand coverage in core delivery processes.",
          "Apply build-versus-buy discipline across tools and accelerators.",
          "Set measurable improvement targets across offerings.",
        ],
      },
      {
        label: "Create Value",
        headline: "Transform how clients win",
        body: [
          "Focus on how AI changes the client value chain, not just how it fits into an existing offering.",
          "Create new offerings, platforms, and managed services where gaps exist.",
          "Translate value lift into revenue lift through better outcomes.",
        ],
      },
    ],
  },
  {
    id: "sell-ai",
    type: "two-column",
    eyebrow: "Pillar 1",
    headline: "Turn our AI capability into revenue",
    leftContent: [
      "Forward-deployed AI resources embedded in client engagements.",
      "AI tools and accelerators developed with Consulting and Studio.",
      "AI governance frameworks and strategy advisory.",
      "Crowe-built platforms and managed AI services.",
    ],
    rightContent: [
      "Lead with industry-specific use cases across Financial Services, Life Sciences, and Government.",
      "Position Crowe as the trusted AI implementation partner, not just an advisor.",
      "Build a joint development pipeline with Studio and TBT.",
      "Create sales plays and proposal templates that put AI into more than 70 percent of proposals within 18 months.",
    ],
  },
  {
    id: "improve-delivery",
    type: "two-column",
    eyebrow: "Pillar 2",
    headline: "Use AI to make our own delivery better",
    leftContent: [
      "Decompose core delivery processes such as IA, SI, Review Services, and Data Governance.",
      "Identify specific steps where AI can reduce time, increase precision, or expand coverage.",
      "Apply build-versus-buy discipline with a clear evaluation framework.",
      "Develop reusable accelerators including prompts, templates, and automation scripts.",
      "Set measurable improvement targets per offering.",
    ],
    rightContent: [
      "Target 20 to 30 percent efficiency gains across Audit and Assessment.",
      "Target a 10 percent increase in revenue per employee.",
      "Target a 5-point margin expansion attributable to AI.",
      "Stand up one AI Champion per competency center for adoption and coaching.",
      "Support adoption with training, a shared competency center, and governance standards.",
    ],
  },
  {
    id: "create-value",
    type: "step-sequence",
    headline: "Transform how we serve clients",
    steps: [
      {
        number: "01",
        headline: "Understand the transformation",
        description: "Host AI workshops, map how AI changes roles, processes, risks, and opportunities, and define what clients need during and after the transition.",
      },
      {
        number: "02",
        headline: "Ask the right question",
        description: "Shift from asking how AI fits an existing offering to asking where AI can materially improve outcomes across the client value chain.",
      },
      {
        number: "03",
        headline: "Create structural advantage",
        description: "Move beyond incremental improvements and deliver lower risk, faster growth, reduced cost, and better decisions at scale.",
      },
      {
        number: "04",
        headline: "Evolve the offering set",
        description: "Modify current services and launch new offerings, platforms, subscriptions, managed services, or performance-based engagements where needed.",
      },
      {
        number: "05",
        headline: "Retool the people model",
        description: "Shift work from manual execution to AI-augmented judgment and develop hybrid roles such as solution architects, prompt engineers, and automation designers.",
      },
      {
        number: "06",
        headline: "Update the market message",
        description: "Position Crowe as delivering AI-enabled outcomes, not just services, and reinforce that expertise plus AI creates greater impact faster.",
      },
    ],
  },
  {
    id: "what-good-looks-like",
    type: "comparison",
    headline: "What good looks like when all three pillars work together",
    beforeLabel: "Before",
    afterLabel: "After",
    rows: [
      {
        label: "Review coverage",
        before: "Sample-based review of 15 to 20 percent of transactions",
        after: "100 percent transaction coverage",
      },
      {
        label: "Insight cadence",
        before: "Insights delivered quarterly",
        after: "Insights delivered weekly",
      },
      {
        label: "Operating effort",
        before: "Higher analyst effort and longer cycle times",
        after: "Fewer manual hours per cycle with AI-supported execution",
      },
      {
        label: "Risk posture",
        before: "Reactive compliance posture",
        after: "Predictive risk intelligence",
      },
    ],
  },
  {
    id: "demos",
    type: "full-bleed",
    headline: "See it in action",
    subheadline: "Lead with the Alert Review Analyst demo, then extend into additional competency-center use cases. Showing, not just telling, is how we win.",
    background: "/images/demo-surface.jpg",
    overlayOpacity: 0.56,
    position: "bottom-left",
  },
  {
    id: "operating-model",
    type: "tabs",
    headline: "How we activate: the operating model",
    tabs: [
      {
        label: "Start now",
        headline: "Four immediate priorities",
        body: [
          "Organize for scale by aligning AI Champions and integrating with Studio and TBT.",
          "Focus on what matters by confirming the top 3 to 5 growth platforms for AI investment.",
          "Activate market intelligence by applying AI to CRM, pursuit activity, and proposals.",
          "Operationalize excellence by decomposing processes and building scalable use cases.",
        ],
      },
      {
        label: "Build toward",
        headline: "Four strategic enablers",
        body: [
          "Align AI investment to named market platforms so focus beats breadth.",
          "Establish an AI bench of prompt libraries, analytics templates, copilots, and proposal accelerators.",
          "Shift the talent model toward AI-augmented consultants and hybrid roles.",
          "Use AI to support fixed-fee, value-based, and shared-savings pricing models.",
        ],
      },
      {
        label: "Execution model",
        headline: "What makes the system work",
        body: [
          "AI Champions embedded in every competency center.",
          "Shared governance, prompt standards, and build-versus-buy discipline.",
          "Reusable assets that compound across proposals and engagements.",
          "A coordinated pipeline from market signal to delivery accelerator to client value.",
        ],
      },
    ],
  },
  {
    id: "goals",
    type: "stat-grid",
    headline: "How we will know it is working in 18 months",
    columns: 3,
    stats: [
      {
        value: "30%",
        label: "Revenue from AI-enabled offerings",
        source: "Crowe Consulting AI Strategy",
      },
      {
        value: "10%",
        label: "Increase in revenue per employee",
        source: "Crowe Consulting AI Strategy",
      },
      {
        value: "5 pts",
        label: "Margin expansion from AI efficiency",
        source: "Crowe Consulting AI Strategy",
      },
      {
        value: "70%+",
        label: "Proposals referencing AI",
        source: "Crowe Consulting AI Strategy",
      },
      {
        value: "30%",
        label: "Engagements under outcome-based pricing",
        source: "Crowe Consulting AI Strategy",
      },
      {
        value: "All",
        label: "Competency centers with active AI Champions",
        source: "Crowe Consulting AI Strategy",
      },
    ],
  },
  {
    id: "closing",
    type: "cta",
    headline: "Define the AI use case and we can help build the advantage",
    subheadline: "If you can define where AI should improve outcomes, Crowe can help imagine the solution, build it, and operationalize it into measurable business value.",
    ctaText: "Schedule a strategy and use-case activation session",
  },
] as const
```

## Content Notes

- All metrics and claims above are sourced from `Crowe Consulting AI Strategy.md`.
- The representative client story remains intentionally generic because no named client was provided.
- Slides 3, 8, and 9 should have interactive HTML states and deterministic static PDF states.
- No client logo, partner logo slide, team slide, or testimonial slide is required in the current scope.
