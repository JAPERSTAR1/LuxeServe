/* ============================================================
   CHAPTER 2 · AGILE SOFTWARE ENGINEERING  (Lecture 2 + midterm bank)
   44 questions
   ============================================================ */
const CH2 = [
  {
    id: "c2-01", t: "mcq", topic: "Agile fundamentals",
    q: "Which statement best describes agile software engineering?",
    o: [
      "It focuses on delivering functionality quickly and responding to changing product specifications",
      "It focuses on producing long, detailed plans before any coding starts",
      "It removes the need for testing and documentation",
      "It requires all requirements to be fixed at the start of the project"
    ],
    a: "A",
    e: "Agile development delivers working functionality quickly and adapts as product specifications change. It does not eliminate testing or planning."
  },
  {
    id: "c2-02", t: "mcq", topic: "Agile fundamentals",
    q: "Is there one best agile method that suits every team?",
    o: [
      "No; the best method depends on the team, the development process and the type of product",
      "Yes; Scrum is always the best choice",
      "Yes; Extreme Programming is always the best choice",
      "Yes; plan-driven development is always the best choice"
    ],
    a: "A",
    e: "There is no universally best method. The appropriate approach depends on the team, the development process and the nature of the product."
  },
  {
    id: "c2-03", t: "mcq", topic: "Plan-driven development",
    q: "Plan-driven development was originally designed to support which type of system?",
    o: [
      "Small personal websites",
      "Large, long-lifetime systems such as aircraft control systems",
      "Rapid mobile-app prototypes",
      "One-day projects"
    ],
    a: "B",
    e: "Plan-driven development grew out of large, long-lifetime systems — such as aircraft control systems — where extensive up-front planning and documentation are justified."
  },
  {
    id: "c2-04", t: "mcq", topic: "Plan-driven development",
    q: "What is a main drawback of plan-driven development?",
    o: [
      "It cannot manage any documentation",
      "It involves significant overheads and documentation and does not support rapid delivery",
      "It never includes any planning",
      "It does not require a development team"
    ],
    a: "B",
    e: "Plan-driven development carries substantial process and documentation overhead, which makes rapid delivery difficult."
  },
  {
    id: "c2-05", t: "mcq", topic: "Agile values",
    q: "According to the Agile Manifesto, which is valued more?",
    o: [
      "Processes and tools over individuals and interactions",
      "Individuals and interactions over processes and tools",
      "Contract negotiation over customer collaboration",
      "Following a plan over responding to change"
    ],
    a: "B",
    e: "The Agile Manifesto values individuals and interactions more than processes and tools, while still recognising that both have value."
  },
  {
    id: "c2-06", t: "mcq", topic: "Incremental development",
    q: "All agile methods are based around which approach?",
    o: ["Waterfall phases", "Big-bang release", "Documentation-first development", "Incremental development and delivery"],
    a: "D",
    e: "Agile methods share an incremental approach: the product is developed and delivered in increments, each adding useful functionality."
  },
  {
    id: "c2-07", t: "mcq", topic: "Incremental development",
    q: "In incremental development, why are features prioritized?",
    o: [
      "So that the least important features are built first",
      "So that all features are built at once",
      "So that the most important features are implemented first",
      "So that features are built in a random order"
    ],
    a: "C",
    e: "Prioritization ensures that the most valuable features are delivered early, providing benefit to users as soon as possible."
  },
  {
    id: "c2-08", t: "mcq", topic: "Incremental development",
    q: "In incremental development, what happens after a feature is implemented and delivered?",
    o: [
      "It is archived and never used again",
      "It is removed from the system",
      "It is hidden from users",
      "Users or surrogate users try it and give feedback to the development team"
    ],
    a: "D",
    e: "Each increment is evaluated by real or surrogate users; their feedback informs the next round of development."
  },
  {
    id: "c2-09", t: "mcq", topic: "Incremental development",
    q: "How much detail is defined for each increment in incremental development?",
    o: [
      "The full system design is defined upfront",
      "All features are defined in complete detail",
      "No details are defined at all",
      "Only the details of the feature being implemented in that increment"
    ],
    a: "D",
    e: "Incremental development deliberately limits detailed planning to the feature currently being implemented, leaving later increments open to change."
  },
  {
    id: "c2-10", t: "mcq", topic: "Incremental development",
    q: "Which activity comes first in the incremental development cycle?",
    o: [
      "Deliver the system increment",
      "Integrate the feature into the system",
      "Test the feature",
      "Choose the features to be included in the increment"
    ],
    a: "D",
    e: "The cycle begins by choosing the features for the increment; implementation, integration, testing and delivery follow."
  },
  {
    id: "c2-11", t: "mcq", topic: "Incremental development",
    q: "In the incremental development cycle, what happens when all features are complete?",
    o: [
      "The team starts over from the beginning",
      "A system release is delivered",
      "The product feature list is deleted",
      "Integration is skipped"
    ],
    a: "B",
    e: "Once all planned features have been integrated and the system is complete, a release of the system is delivered."
  },
  {
    id: "c2-12", t: "mcq", topic: "Incremental development",
    q: "Why should each feature be integrated and tested with the existing system?",
    o: [
      "To remove the need for planning",
      "To delete old code",
      "To check that it works correctly together with the other features",
      "To avoid collecting customer feedback"
    ],
    a: "C",
    e: "Integration and testing confirm that a new feature interacts correctly with the existing features rather than breaking them."
  },
  {
    id: "c2-13", t: "mcq", topic: "Agile roles",
    q: "What is the role of the customer in agile development?",
    o: [
      "To write all of the code",
      "To manage the team's schedule",
      "To provide and prioritize new requirements and evaluate each increment",
      "To hire and fire the developers"
    ],
    a: "C",
    e: "The customer supplies and prioritizes requirements and evaluates each increment, keeping development focused on real value."
  },
  {
    id: "c2-14", t: "mcq", topic: "Agile principles",
    q: "What does the agile principle 'embrace change' mean?",
    o: [
      "Reject all changes after planning is complete",
      "Freeze requirements from the start",
      "Allow changes only at the end of the project",
      "Expect features to change and adapt the software as changes are made"
    ],
    a: "D",
    e: "Agile teams expect requirements and features to evolve, and they adapt the software continuously rather than resisting change."
  },
  {
    id: "c2-15", t: "mcq", topic: "Agile principles",
    q: "What does the agile principle 'maintain simplicity' mean?",
    o: [
      "Add as many features as possible",
      "Make the process as complex as possible",
      "Avoid all design work",
      "Eliminate unnecessary complexity from the system and the process wherever possible"
    ],
    a: "D",
    e: "Simplicity means removing non-essential complexity from both the software and the development process, keeping work focused on value."
  },
  {
    id: "c2-16", t: "mcq", topic: "Agile principles",
    q: "What does the agile principle 'focus on people, not things' mean?",
    o: [
      "Enforce identical processes for everyone",
      "Measure people by the number of documents they write",
      "Avoid trusting the development team",
      "Trust the team and let members develop their own ways of working"
    ],
    a: "D",
    e: "Agile trusts competent people to choose effective ways of working rather than imposing rigid processes and measuring output by artefacts."
  },
  {
    id: "c2-17", t: "mcq", topic: "Extreme Programming",
    q: "Why was the approach called Extreme Programming?",
    o: [
      "Because it was developed for very large teams only",
      "Because it removed all recognised programming practices",
      "Because it pushed recognised good practice, such as iterative development, to extreme levels",
      "Because it was designed to be completed in one day"
    ],
    a: "C",
    e: "XP takes recognised good practices — such as iterative development, testing and customer involvement — and applies them at an extreme, highly disciplined level."
  },
  {
    id: "c2-18", t: "mcq", topic: "Extreme Programming",
    q: "How many new development techniques did Extreme Programming focus on?",
    o: ["5", "8", "20", "12"],
    a: "D",
    e: "The lecture describes Extreme Programming as focusing on twelve new development techniques."
  },
  {
    id: "c2-19", t: "mcq", topic: "Extreme Programming",
    q: "Which XP practice means improving the structure, readability and efficiency of code as soon as improvements are found?",
    o: ["Refactoring", "Continuous integration", "Pair programming", "Incremental planning"],
    a: "A",
    e: "Refactoring improves the internal structure, clarity and efficiency of code without changing its intended behaviour."
  },
  {
    id: "c2-20", t: "mcq", topic: "Extreme Programming",
    q: "In continuous integration, what happens after a development task is complete?",
    o: [
      "It is integrated only once a year",
      "Tests are skipped to save time",
      "Integration happens only after release",
      "It is integrated into the whole system and all unit tests are run automatically"
    ],
    a: "D",
    e: "Continuous integration merges each completed task into the system and automatically runs all unit tests to catch regressions immediately."
  },
  {
    id: "c2-21", t: "mcq", topic: "Extreme Programming",
    q: "What does the XP practice of small releases recommend?",
    o: [
      "Releasing everything only at the end of the project",
      "Developing the minimal useful set of functionality first and releasing frequently",
      "Avoiding releases altogether",
      "Releasing once every decade"
    ],
    a: "B",
    e: "Small releases start with the smallest useful set of functionality and deliver frequent updates, allowing early feedback and reduced risk."
  },
  {
    id: "c2-22", t: "mcq", topic: "Extreme Programming",
    q: "Which XP practice involves two developers working together at one workstation?",
    o: ["Plan-driven development", "Waterfall", "Grand planning", "Pair programming"],
    a: "D",
    e: "Pair programming places two developers at one workstation so they continuously review each other's work."
  },
  {
    id: "c2-23", t: "mcq", topic: "Scrum",
    q: "Scrum is best described as which of the following?",
    o: [
      "A programming language",
      "A testing tool",
      "A hardware standard",
      "An agile method that provides a framework for agile project organization and planning"
    ],
    a: "D",
    e: "Scrum is an agile method: a lightweight framework for organizing and planning agile projects through roles, events and artefacts."
  },
  {
    id: "c2-24", t: "mcq", topic: "Scrum roles",
    q: "In Scrum, what is the main responsibility of the product owner?",
    o: [
      "Writing all of the code",
      "Running the whole company",
      "Hiring testers",
      "Ensuring the team stays focused on the product rather than on technically interesting but less relevant work"
    ],
    a: "D",
    e: "The product owner protects product value, keeping the team focused on work that matters to the product and its users."
  },
  {
    id: "c2-25", t: "mcq", topic: "Scrum roles",
    q: "How is the ScrumMaster best described?",
    o: [
      "A traditional project manager with no coaching role",
      "The customer",
      "The lead tester",
      "A Scrum expert who coaches the team in the effective use of Scrum"
    ],
    a: "D",
    e: "The ScrumMaster is a facilitator and coach: a Scrum expert who helps the team apply Scrum effectively, rather than a command-and-control project manager."
  },
  {
    id: "c2-26", t: "mcq", topic: "Scrum roles",
    q: "What is the ideal Scrum development team size?",
    o: ["1 to 2 people", "20 to 30 people", "50 or more people", "Between 5 and 8 people"],
    a: "D",
    e: "Scrum teams are small enough to communicate effectively; the lecture gives an ideal size of between five and eight people."
  },
  {
    id: "c2-27", t: "mcq", topic: "Scrum",
    q: "How long does a Scrum sprint usually last?",
    o: ["2 to 4 days", "2 to 4 months", "2 to 4 years", "2 to 4 weeks"],
    a: "D",
    e: "A sprint is a short, fixed time-box; according to the material, it usually lasts between two and four weeks."
  },
  {
    id: "c2-28", t: "mcq", topic: "Scrum events",
    q: "What happens during the daily Scrum meeting in a sprint?",
    o: [
      "No meetings take place",
      "One meeting is held at the end of the sprint only",
      "The team reviews progress and updates the list of incomplete work items",
      "Only the customer meets with the team"
    ],
    a: "C",
    e: "The daily Scrum is a short coordination meeting where the team reviews progress and updates its remaining work."
  },
  {
    id: "c2-29", t: "mcq", topic: "Scrum",
    q: "What should a sprint produce?",
    o: ["A plan only", "A test report only", "An unfinished draft only", "A potentially shippable product increment"],
    a: "D",
    e: "Every sprint should produce a product increment that is potentially shippable — complete enough to deliver without further work."
  },
  {
    id: "c2-30", t: "mcq", topic: "Product backlog",
    q: "What is a product backlog?",
    o: [
      "A list of finished features",
      "A list of team members",
      "A list of customers",
      "A prioritized to-do list of what needs to be done to complete the product"
    ],
    a: "D",
    e: "The product backlog is the single ordered list of everything the team may need to do to complete the product, with the most important items at the top."
  },
  {
    id: "c2-31", t: "mcq", topic: "Product backlog",
    q: "What does the state 'ready for consideration' mean for a product backlog item?",
    o: [
      "It is finished and released",
      "It is approved for the current sprint",
      "It is deployed to customers",
      "It is a tentative high-level idea that may change or may not be included in the final product"
    ],
    a: "D",
    e: "A 'ready for consideration' item is an early, high-level idea. It may be refined, changed, or dropped before it ever reaches implementation."
  },
  {
    id: "c2-32", t: "mcq", topic: "Product backlog",
    q: "What does the state 'ready for implementation' mean for a product backlog item?",
    o: [
      "It has no detail at all",
      "It is already finished",
      "It is archived",
      "It has enough detail for the team to estimate effort, and its dependencies have been identified"
    ],
    a: "D",
    e: "An item is ready for implementation when the team understands it well enough to estimate the work and has identified its dependencies."
  },
  {
    id: "c2-33", t: "mcq", topic: "Estimation",
    q: "What does story-point estimation measure?",
    o: [
      "Exact hours of work",
      "A fixed price for the feature",
      "The number of bugs in the feature",
      "A relative estimate of effort that considers size, complexity, technology and unknown work"
    ],
    a: "D",
    e: "Story points are a relative measure of effort, incorporating size, complexity, technology and uncertainty — not a precise count of hours."
  },
  {
    id: "c2-34", t: "mcq", topic: "Sprint planning",
    q: "What does the team decide during sprint planning?",
    o: [
      "How to deploy the product",
      "Who the ScrumMaster will be",
      "What the contract will say",
      "Which product backlog items to implement in the sprint and which sprint backlog to create"
    ],
    a: "D",
    e: "Sprint planning selects the product backlog items for the sprint and produces the sprint backlog that guides the team's work."
  },
  {
    id: "c2-35", t: "mcq", topic: "Sprint planning",
    q: "What is the output of sprint planning?",
    o: ["A final product", "A contract", "A budget", "A sprint backlog"],
    a: "D",
    e: "The sprint backlog — the set of selected items and the plan for delivering them — is the output of sprint planning."
  },
  {
    id: "c2-36", t: "mcq", topic: "Scrum",
    q: "If not all sprint backlog items can be completed, what happens to the sprint?",
    o: [
      "It is extended until all items are finished",
      "It is not extended, and the unfinished items return to the product backlog",
      "The unfinished items are deleted",
      "The product is released regardless"
    ],
    a: "B",
    e: "Sprints are fixed-length and are not extended. Unfinished items return to the product backlog to be prioritized again."
  },
  {
    id: "c2-37", t: "mcq", topic: "Sprint review",
    q: "What is included in a sprint review?",
    o: [
      "Only a payment review",
      "Removing team members",
      "No reflection on the work",
      "Reviewing whether the sprint met its goal and reflecting on how to improve the way the team works"
    ],
    a: "D",
    e: "The sprint review examines whether the sprint goal was met and reflects on how the team can improve its way of working."
  },
  {
    id: "c2-38", t: "mcq", topic: "Scrum roles",
    q: "Who has the ultimate authority to decide whether the sprint goal was achieved?",
    o: ["The developer on duty", "The ScrumMaster only", "An external reviewer only", "The product owner"],
    a: "D",
    e: "The product owner is accountable for product value and has the final say on whether the sprint goal was achieved."
  },
  {
    id: "c2-39", t: "mcq", topic: "Agile testing",
    q: "What does test automation in agile development require?",
    o: [
      "No tests at all",
      "Tests that run only once a year",
      "Tests that run only after release",
      "A suite of executable tests that can be run at any time"
    ],
    a: "D",
    e: "Agile teams rely on an executable test suite that can be run on demand, giving fast feedback on every change."
  },
  {
    id: "c2-40", t: "mcq", topic: "Self-organizing teams",
    q: "What is the main role of a self-organizing team?",
    o: [
      "To wait for orders from management",
      "To avoid discussing tasks",
      "To work without any team structure",
      "To coordinate work by discussing tasks and reaching consensus on who does what"
    ],
    a: "D",
    e: "A self-organizing team coordinates its own work through discussion and consensus, deciding together who takes on each task."
  },
  {
    id: "c2-41", t: "mcq", topic: "Self-organizing teams",
    q: "How are external interactions managed in Scrum?",
    o: [
      "Developers handle all external interactions",
      "There are no external interactions",
      "Customers handle all external interactions",
      "Team-focused interactions go to the ScrumMaster and product-focused interactions go to the product owner"
    ],
    a: "D",
    e: "External communication is split: the ScrumMaster shields the team from distractions, while the product owner handles product-related interactions."
  },
  {
    id: "c2-42", t: "tf", topic: "Agile fundamentals",
    q: "Agile development requires all requirements to be fixed at the beginning of the project.",
    a: false,
    e: "False. Agile expects requirements to change and adapts the software as understanding improves. Fixed requirements are more characteristic of plan-driven development."
  },
  {
    id: "c2-43", t: "tf", topic: "Scrum",
    q: "A sprint is extended if all of its backlog items are not completed.",
    a: false,
    e: "False. A sprint is not extended; unfinished items return to the product backlog for re-prioritization."
  },
  {
    id: "c2-44", t: "tf", topic: "Estimation",
    q: "Story points are an exact measure of the hours required to complete a feature.",
    a: false,
    e: "False. Story points are a relative estimate of effort based on size, complexity, technology and uncertainty — not exact hours."
  },
  {
    id: "c2-45", t: "fill", topic: "Extreme Programming",
    q: "The XP practice in which two developers work together at one workstation is called ________.",
    accept: ["pair programming", "pair-programming", "pairprogramming"],
    e: "Pair programming is the XP practice of two developers collaborating continuously at a single workstation."
  },
  {
    id: "c2-46", t: "short", topic: "Scrum roles",
    q: "Name the three Scrum roles and state the main responsibility of each.",
    keywords: [["product owner"], ["scrum master", "scrummaster"], ["team", "developers", "development team"]],
    model: "Product owner: maximizes product value and manages the product backlog. ScrumMaster: coaches the team in Scrum and removes impediments. Development team: self-organizing group that delivers the sprint increment.",
    e: "Scrum defines three roles: the product owner (value and backlog), the ScrumMaster (coaching and facilitation), and the development team (delivery)."
  },
  {
    id: "c2-47", t: "scenario", topic: "Plan-driven development",
    scenario: "A supplier is building flight-control software for an aircraft. The requirements are highly stable, safety certification demands extensive documentation, and the system will be supported for decades.",
    q: "Which development approach is most appropriate?",
    o: [
      "A plan-driven approach with detailed long-term planning and documentation",
      "An agile approach with no up-front planning",
      "A prototype-only approach with no formal design",
      "A single one-week sprint with no testing"
    ],
    a: "A",
    e: "Large, long-lifetime, safety-critical systems with stable requirements are the classic domain of plan-driven development, where documentation and up-front planning are essential."
  },
  {
    id: "c2-48", t: "scenario", topic: "Agile development",
    scenario: "A startup is building a mobile app in a crowded market. User needs are uncertain, competitors release new features weekly, and the team expects the requirements to change frequently.",
    q: "Which approach best fits this context?",
    o: [
      "Plan-driven development with a complete specification before coding",
      "Agile incremental development with frequent releases and customer feedback",
      "A single big-bang release after two years",
      "Freezing all requirements at the start of the project"
    ],
    a: "B",
    e: "Uncertain, fast-moving markets favour agile incremental delivery: frequent releases, continuous feedback and the ability to adapt to change."
  }
];
