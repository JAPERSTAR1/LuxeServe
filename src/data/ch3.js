/* ============================================================
   CHAPTER 3 · FEATURES, SCENARIOS AND STORIES  (Lecture 3)
   35 questions
   ============================================================ */
const CH3 = [
  {
    id: "c3-01", t: "mcq", topic: "Software features",
    q: "What is a software feature?",
    o: [
      "A complete operating system",
      "A hardware component",
      "A fragment of functionality, such as a print feature",
      "A user manual"
    ],
    a: "C",
    e: "A feature is a distinct fragment of product functionality — for example, printing a document or changing the background of a screen."
  },
  {
    id: "c3-02", t: "mcq", topic: "Software features",
    q: "Which of the following is an example of a software feature?",
    o: ["A developer laptop", "A project budget", "A change-background feature", "A customer office"],
    a: "C",
    e: "Changing the background is behaviour provided by the software, so it is a feature. The other options are physical or organisational items."
  },
  {
    id: "c3-03", t: "mcq", topic: "Product design",
    q: "What should you aim to create before you start programming a product?",
    o: [
      "A final invoice",
      "A marketing video",
      "A list of features to be included in the product",
      "A server-room layout"
    ],
    a: "C",
    e: "Before programming, you should establish the list of features the product will include; this list guides design, estimation and development."
  },
  {
    id: "c3-04", t: "mcq", topic: "Product design",
    q: "Which of the following is one of the three factors that drive the design of software products?",
    o: [
      "Random choices made by developers",
      "Lowest hardware cost only",
      "Business and consumer needs that current products do not meet",
      "The location of the company office"
    ],
    a: "C",
    e: "Product design is driven by unmet business and consumer needs, by changes in technology, and by the need to compete in the market."
  },
  {
    id: "c3-05", t: "mcq", topic: "Product design",
    q: "Which factor can drive the design of a completely new type of software product?",
    o: [
      "A reduction in the number of users",
      "The removal of all competitors",
      "Changes in technology that make new types of product possible",
      "Fixed contracts only"
    ],
    a: "C",
    e: "Technological change can enable products that were previously impossible, creating opportunities for entirely new product categories."
  },
  {
    id: "c3-06", t: "mcq", topic: "Personas",
    q: "What is a persona?",
    o: [
      "A real customer invoice",
      "A software bug report",
      "A server log",
      "An imagined character portrait of a type of user"
    ],
    a: "D",
    e: "A persona is an imagined but realistic character representing a type of user, used to help the team design with that user in mind."
  },
  {
    id: "c3-07", t: "mcq", topic: "Personas",
    q: "A product for managing dentist appointments might use which personas?",
    o: [
      "A compiler, a database and a server",
      "A printer, a router and a scanner",
      "A dentist, a receptionist and a patient",
      "A bank manager, a driver and a pilot"
    ],
    a: "C",
    e: "The relevant user types are the people involved in the appointment process: the dentist, the receptionist and the patient."
  },
  {
    id: "c3-08", t: "mcq", topic: "Personas",
    q: "Which persona aspect covers the persona's name and personal circumstances?",
    o: ["Relevance", "Job-related", "Education", "Personalization"],
    a: "D",
    e: "Personalization gives the persona a name and personal circumstances, making it feel like a real individual rather than an abstract role."
  },
  {
    id: "c3-09", t: "mcq", topic: "Personas",
    q: "Which persona aspect explains why the user might be interested in the product?",
    o: ["Relevance", "Personalization", "Education", "Job-related"],
    a: "A",
    e: "Relevance explains the user's connection to the product and why the product matters in their situation."
  },
  {
    id: "c3-10", t: "mcq", topic: "Personas",
    q: "Which persona aspect describes the user's educational background and technical skills?",
    o: ["Personalization", "Relevance", "Job-related", "Education"],
    a: "D",
    e: "The education aspect captures the user's educational background and technical competence, which influence how they will use the product."
  },
  {
    id: "c3-11", t: "mcq", topic: "Personas",
    q: "What is the main benefit of using personas?",
    o: [
      "They reduce the cost of hardware",
      "They replace all testing",
      "They help developers empathize with potential users",
      "They remove the need for features"
    ],
    a: "C",
    e: "Personas make abstract user groups concrete, helping developers empathize with users' needs, constraints and goals."
  },
  {
    id: "c3-12", t: "mcq", topic: "Personas",
    q: "What is a proto-persona?",
    o: [
      "A persona based on detailed, long-term user studies",
      "A persona used only for hardware design",
      "A persona that is removed after release",
      "A persona created from limited user information"
    ],
    a: "D",
    e: "A proto-persona is an early, lightweight persona built from limited information; it is refined as the team learns more about users."
  },
  {
    id: "c3-13", t: "mcq", topic: "Scenarios",
    q: "What is a scenario?",
    o: [
      "A formal system specification",
      "A list of software bugs",
      "A hardware diagram",
      "A narrative that describes how a user or group of users might use the system"
    ],
    a: "D",
    e: "A scenario is a narrative describing a user's interaction with the system in a particular situation, including their goal and context."
  },
  {
    id: "c3-14", t: "mcq", topic: "Scenarios",
    q: "From whose perspective should scenarios be written?",
    o: ["The developer's perspective", "The manager's perspective", "The hardware vendor's perspective", "The user's perspective"],
    a: "D",
    e: "Scenarios are written from the user's perspective so they reflect real goals and real ways of working, not implementation concerns."
  },
  {
    id: "c3-15", t: "mcq", topic: "Scenarios",
    q: "Which of the following is an element of a scenario description?",
    o: [
      "Only source code",
      "Only test cases",
      "Only the project budget",
      "The overall objective and the problem that the existing system cannot address"
    ],
    a: "D",
    e: "A useful scenario states the overall objective and the problem with the current system, then describes how the user would interact with the proposed system."
  },
  {
    id: "c3-16", t: "mcq", topic: "Scenarios",
    q: "What is a good way to involve users in writing scenarios?",
    o: [
      "Publish the scenario without review",
      "Avoid users entirely",
      "Ask users to write every scenario in full detail",
      "Write an imaginary scenario and ask users to explain what has been got wrong"
    ],
    a: "D",
    e: "Writing a draft scenario and asking users to correct it is effective: users recognise mistakes in a concrete narrative more easily than they can write detailed scenarios from scratch."
  },
  {
    id: "c3-17", t: "mcq", topic: "Scenarios",
    q: "Why are users often not good at writing scenarios themselves?",
    o: [
      "Their scenarios are always too short",
      "Their scenarios are always technically correct",
      "Their scenarios are based on how they work now and are too detailed",
      "Their scenarios are random and unrelated to their work"
    ],
    a: "C",
    e: "Users tend to describe their current process in exhaustive detail, rather than imagining how a new product could change the way they work."
  },
  {
    id: "c3-18", t: "mcq", topic: "User stories",
    q: "What is the standard format of a user story?",
    o: [
      "As a developer, I must write code",
      "As the system, it shall run",
      "As a manager, I approve the budget",
      "As a role, I want to do something"
    ],
    a: "D",
    e: "The standard form is 'As a [role], I want to [do something]', focusing on a user's goal rather than a technical requirement."
  },
  {
    id: "c3-19", t: "mcq", topic: "User stories",
    q: "Which of the following is a valid user story?",
    o: [
      "As a developer, I will write code",
      "As the system, I shall send emails",
      "As a parent, I pay the fees",
      "As a teacher, I want to tell all members of my group when new information is available"
    ],
    a: "D",
    e: "A valid user story names a user role and a goal that delivers value. The teacher story does this; the others describe implementation tasks or system behaviour."
  },
  {
    id: "c3-20", t: "mcq", topic: "User stories",
    q: "What is a user story that is too large to implement in one sprint called?",
    o: ["A persona", "A scenario", "Feature creep", "An epic"],
    a: "D",
    e: "An epic is a large user story that cannot be completed in a single sprint and must be broken into smaller stories."
  },
  {
    id: "c3-21", t: "mcq", topic: "Feature description",
    q: "Which element is NOT part of the feature description template?",
    o: ["Input", "Activation", "Action", "Cost"],
    a: "D",
    e: "The template describes activation, input and action. Cost is not one of its elements."
  },
  {
    id: "c3-22", t: "mcq", topic: "Feature qualities",
    q: "What does it mean for features to be independent?",
    o: [
      "They must all run at the same time",
      "They share all of their data",
      "They cannot be tested",
      "They do not depend on how other features are implemented or on the order of activation"
    ],
    a: "D",
    e: "Independence means a feature can be understood, implemented and activated without relying on the implementation details or activation order of other features."
  },
  {
    id: "c3-23", t: "mcq", topic: "Feature qualities",
    q: "What does coherence of a feature mean?",
    o: [
      "It performs many unrelated tasks at once",
      "It changes the behaviour of other features",
      "It has no description",
      "It is linked to a single item of functionality and has no side effects"
    ],
    a: "D",
    e: "A coherent feature has one clear purpose and does not create unexpected side effects in other parts of the product."
  },
  {
    id: "c3-24", t: "mcq", topic: "Feature creep",
    q: "What is feature creep?",
    o: [
      "Removing features from a product",
      "Reducing features to save money",
      "Stopping development of the product",
      "Adding features in response to requests without checking whether they are generally useful"
    ],
    a: "D",
    e: "Feature creep is the uncontrolled accumulation of features requested by particular users, without evaluating whether they benefit the product's wider user base."
  },
  {
    id: "c3-25", t: "mcq", topic: "Feature design",
    q: "What is domain knowledge in feature design?",
    o: [
      "Knowledge of printers and cables",
      "Knowledge of colour theory",
      "Knowledge of programming languages",
      "Knowledge of the work area the product supports, such as finance or event booking"
    ],
    a: "D",
    e: "Domain knowledge is understanding of the business or work area the product serves — for example finance, healthcare or event booking."
  },
  {
    id: "c3-26", t: "mcq", topic: "Feature design",
    q: "From where can product features be identified directly?",
    o: [
      "Only from invoices",
      "Only from hardware specifications",
      "Only from customer complaints",
      "From the product vision or from scenarios"
    ],
    a: "D",
    e: "The product vision establishes the product's purpose, and scenarios reveal the user's goals; both are direct sources of feature ideas."
  },
  {
    id: "c3-27", t: "mcq", topic: "Scenarios",
    q: "Why are scenarios often preferred over user stories?",
    o: [
      "Because they are always shorter",
      "Because they replace user stories completely",
      "Because they are used only for hardware",
      "Because they read more naturally and provide more context"
    ],
    a: "D",
    e: "Scenarios read as natural narratives and include richer context about the user's situation, which helps the team understand the problem."
  },
  {
    id: "c3-28", t: "mcq", topic: "Feature design",
    q: "Which knowledge sources are used in feature design?",
    o: [
      "Hardware knowledge only",
      "Financial knowledge only",
      "Legal knowledge only",
      "User, product, domain and technology knowledge"
    ],
    a: "D",
    e: "Good feature design draws on knowledge of users, the existing product, the business domain and the available technology."
  },
  {
    id: "c3-29", t: "tf", topic: "Personas",
    q: "A persona is always a real, named customer.",
    a: false,
    e: "False. A persona is an imagined character portrait of a type of user, although it may be based on real user research."
  },
  {
    id: "c3-30", t: "tf", topic: "User stories",
    q: "An epic is a user story small enough to fit easily into one sprint.",
    a: false,
    e: "False. An epic is too large for one sprint and must be decomposed into smaller user stories."
  },
  {
    id: "c3-31", t: "tf", topic: "Feature creep",
    q: "Feature creep means adding requested features without checking whether they are generally useful.",
    a: true,
    e: "True. Feature creep occurs when requests are added one by one without evaluating their value to the product's wider audience."
  },
  {
    id: "c3-32", t: "fill", topic: "User stories",
    q: "A user story that is too large to implement in a single sprint is called an ________.",
    accept: ["epic", "epics"],
    e: "An epic is a large story that must be broken down into smaller, sprint-sized stories."
  },
  {
    id: "c3-33", t: "short", topic: "Feature design",
    q: "Name the four knowledge sources used in feature design.",
    keywords: [["user"], ["product"], ["domain"], ["technolog"]],
    model: "User knowledge, product knowledge, domain knowledge and technology knowledge.",
    e: "Feature design combines understanding of users, the product itself, the business domain and the technologies available to implement the feature."
  },
  {
    id: "c3-34", t: "scenario", topic: "Feature creep",
    scenario: "A product manager receives a stream of feature requests from individual customers. Wanting to keep everyone happy, the manager adds each request to the roadmap without checking whether other customers would benefit.",
    q: "What risk does this behaviour illustrate?",
    o: [
      "Feature creep, because features are added without evaluating their general usefulness",
      "Refactoring, because the code is being restructured",
      "An epic, because the requests are large user stories",
      "Prototyping, because the product is being tested early"
    ],
    a: "A",
    e: "Accepting every request without evaluating its general value causes feature creep. The product grows in complexity and may become harder to use, while unrequested features consume development effort."
  },
  {
    id: "c3-35", t: "scenario", topic: "Personas",
    scenario: "A team is designing a hospital appointment system. They create a persona named 'Mariam', a 42-year-old receptionist who manages bookings under time pressure and has moderate computer skills.",
    q: "Which persona aspect is illustrated by Mariam's age, occupation and personal circumstances?",
    o: ["Personalization", "Relevance", "Education", "Domain knowledge"],
    a: "A",
    e: "Personalization gives the persona a name, age, occupation and personal context. Education covers her skill level, relevance explains her interest in the product, and domain knowledge is a separate design input."
  }
];
