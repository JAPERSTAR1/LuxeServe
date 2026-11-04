/* ============================================================
   CHAPTER 4 · SOFTWARE ARCHITECTURE  (Lecture 4 + midterm bank)
   43 questions
   ============================================================ */
const CH4 = [
  {
    id: "c4-01", t: "mcq", topic: "Architecture fundamentals",
    q: "According to the IEEE definition, what is software architecture?",
    o: [
      "The fundamental organization of a software system, embodied in its components, their relationships, and the principles guiding its design and evolution",
      "A list of programming languages used by the team",
      "A schedule of testing activities",
      "A user manual for the system"
    ],
    a: "A",
    e: "The IEEE definition describes architecture as the fundamental organization of the system, expressed through its components, their relationships and the principles that guide design and evolution."
  },
  {
    id: "c4-02", t: "mcq", topic: "Architectural design",
    q: "Which of the following is NOT part of architectural design?",
    o: [
      "The overall organization of the system",
      "How the software is decomposed into components",
      "How servers are organized",
      "Writing the user manual"
    ],
    a: "D",
    e: "Architectural design is concerned with system organization, component decomposition and deployment infrastructure. Writing a user manual is documentation, not architectural design."
  },
  {
    id: "c4-03", t: "mcq", topic: "Quality attributes",
    q: "Which product properties are affected by software architecture?",
    o: [
      "Only colour and font",
      "Only the product's price",
      "Only the marketing name",
      "Performance, usability, security, reliability and maintainability"
    ],
    a: "D",
    e: "Architecture has a direct influence on quality attributes including performance, usability, security, reliability and maintainability."
  },
  {
    id: "c4-04", t: "mcq", topic: "Architecture fundamentals",
    q: "How can the term 'software architecture' be interpreted?",
    o: [
      "Only as a noun",
      "Only as a verb",
      "As a programming language",
      "As a noun meaning the structure of a system, and as a verb meaning the process of defining that structure"
    ],
    a: "D",
    e: "Used as a noun, architecture is the structure of the system; used as a verb, it is the activity of designing and defining that structure."
  },
  {
    id: "c4-05", t: "mcq", topic: "Components",
    q: "What is a software component?",
    o: [
      "A single line of code",
      "A user account",
      "An element that implements a coherent set of functionality or features",
      "A database backup"
    ],
    a: "C",
    e: "A component is a coherent unit of software that implements a set of related functionality and exposes services to other components."
  },
  {
    id: "c4-06", t: "mcq", topic: "Components",
    q: "How can a software component be considered?",
    o: [
      "As a physical printer",
      "As a hardware sensor only",
      "As a collection of one or more services that other components may use",
      "As a user account"
    ],
    a: "C",
    e: "Components provide services through a defined interface or API; other components access those services without needing to know the internal implementation."
  },
  {
    id: "c4-07", t: "mcq", topic: "Components",
    q: "When designing software architecture, what should you do about implementation?",
    o: [
      "Implement every component before defining interfaces",
      "Ignore all interfaces",
      "Write all test cases first",
      "Design the component interface and leave the implementation to a later stage"
    ],
    a: "D",
    e: "Architectural design focuses on interfaces and responsibilities first, deferring implementation details so that components can evolve independently."
  },
  {
    id: "c4-08", t: "mcq", topic: "Architecture fundamentals",
    q: "Why is minimizing complexity an important goal for architectural designers?",
    o: [
      "Complexity makes systems faster",
      "Complexity removes bugs",
      "Complex systems are more difficult and expensive to understand and change",
      "Complexity guarantees security"
    ],
    a: "C",
    e: "As complexity grows, understanding, modifying and testing the system become harder and more expensive, and the risk of defects increases."
  },
  {
    id: "c4-09", t: "mcq", topic: "Security",
    q: "Why do complex systems increase security risk?",
    o: [
      "Complex systems never contain bugs",
      "Complexity guarantees security",
      "Developers are more likely to introduce bugs and vulnerabilities when modifying complex systems",
      "Complexity reduces the need for testing"
    ],
    a: "C",
    e: "Complexity increases the chance that changes introduce bugs or vulnerabilities, because developers cannot easily understand all the interactions involved."
  },
  {
    id: "c4-10", t: "mcq", topic: "Quality attributes",
    q: "Which of the following is a non-functional quality attribute?",
    o: ["A login button", "A print feature", "A search feature", "Maintainability"],
    a: "D",
    e: "Maintainability describes how easily the system can be changed; it is a quality attribute. Buttons, printing and search are functional features."
  },
  {
    id: "c4-11", t: "mcq", topic: "Quality attributes",
    q: "Which quality attribute asks whether the system can deliver its services when requested by users?",
    o: ["Usability", "Responsiveness", "Availability", "Maintainability"],
    a: "C",
    e: "Availability measures whether the system is operational and able to deliver its services when users need them."
  },
  {
    id: "c4-12", t: "mcq", topic: "Quality attributes",
    q: "Which quality attribute asks whether users can access the features they need quickly and without errors?",
    o: ["Security", "Resilience", "Reliability", "Usability"],
    a: "D",
    e: "Usability concerns how easily and efficiently users can access features and complete their tasks without errors."
  },
  {
    id: "c4-13", t: "mcq", topic: "Quality attributes",
    q: "Which quality attribute asks whether the system can continue to deliver services despite partial failure or external attack?",
    o: ["Responsiveness", "Usability", "Maintainability", "Resilience"],
    a: "D",
    e: "Resilience is the ability to continue operating and delivering services in the face of partial failures, attacks or other disruptions."
  },
  {
    id: "c4-14", t: "mcq", topic: "Security architecture",
    q: "What does a centralized security architecture mean?",
    o: [
      "Information is spread across many locations",
      "There is no security at all",
      "Security is enforced only at the user level",
      "All information is kept in one highly secure place"
    ],
    a: "D",
    e: "A centralized security architecture keeps information in one strongly protected location, making protection easier to design and manage."
  },
  {
    id: "c4-15", t: "mcq", topic: "Security architecture",
    q: "What is the main risk of a centralized security architecture?",
    o: [
      "Information cannot be accessed at all",
      "It is slow to design",
      "It has no protection",
      "If security is breached, everything stored there may be exposed"
    ],
    a: "D",
    e: "Centralization creates a single high-value target: a breach at that location can expose all of the information it holds."
  },
  {
    id: "c4-16", t: "mcq", topic: "Security architecture",
    q: "What does a distributed security architecture mean?",
    o: [
      "All assets are stored in one place",
      "There are no security layers",
      "Only one server is used",
      "Assets are stored in different places so that one breach does not expose all of them"
    ],
    a: "D",
    e: "Distributed security spreads assets across locations so that compromising one location does not automatically expose everything."
  },
  {
    id: "c4-17", t: "mcq", topic: "Security architecture",
    q: "What is the trade-off of distributing information across many locations?",
    o: [
      "It is always faster",
      "It removes all security costs",
      "It is suitable only for small systems",
      "It takes longer to access all the information and costs more to protect it"
    ],
    a: "D",
    e: "Distribution reduces the impact of a single breach, but accessing all the information is slower and protecting multiple locations costs more."
  },
  {
    id: "c4-18", t: "mcq", topic: "Component design",
    q: "What is the trade-off between maintainability and performance when decomposing a system into fine-grain components?",
    o: [
      "Fine-grain components always make software faster",
      "Fine-grain components remove all communication",
      "Fine-grain components have no effect on either quality",
      "Fine-grain components improve maintainability, but communication between them can slow the software"
    ],
    a: "D",
    e: "Smaller components are easier to understand and replace, but more communication between them can add overhead and reduce performance."
  },
  {
    id: "c4-19", t: "mcq", topic: "Component design",
    q: "How is maintainability best improved?",
    o: [
      "By building one large block of code",
      "By avoiding modular design",
      "By removing all interfaces",
      "By building the system from small, self-contained parts that can be replaced or enhanced"
    ],
    a: "D",
    e: "Small, self-contained parts with clear interfaces can be replaced or enhanced independently, which makes maintenance easier."
  },
  {
    id: "c4-20", t: "mcq", topic: "Security architecture",
    q: "What does a layered security approach achieve?",
    o: [
      "Only one layer is needed for security",
      "Layers reduce security",
      "Layers are never needed",
      "An attacker must penetrate all layers before the system is compromised"
    ],
    a: "D",
    e: "Layered security (defence in depth) means multiple independent controls must be defeated, raising the effort required to compromise the system."
  },
  {
    id: "c4-21", t: "mcq", topic: "Quality attributes",
    q: "How is availability normally expressed?",
    o: [
      "As the number of users",
      "As the number of lines of code",
      "As the colour of the interface",
      "As a percentage of the time that the system is available to deliver user services"
    ],
    a: "D",
    e: "Availability is typically expressed as a percentage of time — for example, 99.9% — during which the system can deliver its services."
  },
  {
    id: "c4-22", t: "mcq", topic: "Availability",
    q: "How is availability achieved architecturally?",
    o: [
      "By using a single component",
      "By removing backups",
      "By avoiding failure detection",
      "By having redundant components with sensors and switching components"
    ],
    a: "D",
    e: "Redundancy provides spare capacity, sensors detect failures, and switching components redirect work to the spare components."
  },
  {
    id: "c4-23", t: "mcq", topic: "Architectural design",
    q: "Which questions should architectural design answer?",
    o: [
      "What colour the logo should be",
      "How many developers should be hired",
      "Which room the team should meet in",
      "How the system is organized into components, how they communicate and which technologies to use"
    ],
    a: "D",
    e: "Architecture decides the component structure, the communication mechanisms between components, and the technologies used to build the system."
  },
  {
    id: "c4-24", t: "mcq", topic: "Design principles",
    q: "What does abstraction in software design mean?",
    o: [
      "Focusing on every line of code in detail",
      "Ignoring all components",
      "Writing tests before code",
      "Focusing on the essential elements of a component without concern for its implementation details"
    ],
    a: "D",
    e: "Abstraction hides implementation detail and exposes only the essential behaviour needed to understand and use a component."
  },
  {
    id: "c4-25", t: "mcq", topic: "Design principles",
    q: "What does decomposition involve?",
    o: [
      "Merging all components into one",
      "Removing components from the system",
      "Deploying the system to production",
      "Analysing large-scale components and representing them as a set of finer-grain components"
    ],
    a: "D",
    e: "Decomposition breaks a large system or component into smaller, more manageable components with clearer responsibilities."
  },
  {
    id: "c4-26", t: "mcq", topic: "Layered architecture",
    q: "How should components within the same layer relate to each other?",
    o: [
      "They should duplicate each other's functionality",
      "They should depend on every other component",
      "They must always run on one server",
      "They should be independent and not overlap in functionality"
    ],
    a: "D",
    e: "Components in the same layer should have distinct responsibilities and avoid overlapping functionality, keeping the layer coherent."
  },
  {
    id: "c4-27", t: "mcq", topic: "Layered architecture",
    q: "How should components in a layered architecture ideally interact?",
    o: [
      "Every component communicates with every layer",
      "There is no interaction at all",
      "Only the top layer communicates",
      "Components at one level interact through the APIs of the level below, not across layers"
    ],
    a: "D",
    e: "Strict layering keeps dependencies controlled: a layer uses the API of the layer beneath it rather than reaching across multiple layers."
  },
  {
    id: "c4-28", t: "mcq", topic: "Cross-cutting concerns",
    q: "What are cross-cutting concerns?",
    o: [
      "Concerns that affect only the user interface",
      "Concerns unrelated to architecture",
      "Concerns that are the same thing as layers",
      "Concerns that affect the whole system, such as security, performance and reliability"
    ],
    a: "D",
    e: "Cross-cutting concerns affect many or all parts of the system, so they cannot be confined to a single layer or component."
  },
  {
    id: "c4-29", t: "mcq", topic: "Cross-cutting concerns",
    q: "What is the best approach to security as a cross-cutting concern?",
    o: [
      "Use a single security component",
      "Apply security only at the top layer",
      "Treat security as unnecessary",
      "Distribute security across layers so the system is more resilient to attacks and failure"
    ],
    a: "D",
    e: "Since security affects every layer, distributing controls across layers provides defence in depth and avoids a single point of failure."
  },
  {
    id: "c4-30", t: "mcq", topic: "Client-server",
    q: "In a client-server architecture, what normally runs on the user's device?",
    o: ["Nothing at all", "The user interface", "Only the database", "The entire system"],
    a: "B",
    e: "The client typically runs the user interface and communicates with server-side components that provide business logic and data services."
  },
  {
    id: "c4-31", t: "mcq", topic: "Client-server",
    q: "Which protocol does client-server communication normally use?",
    o: ["USB cables", "Paper forms", "Voice calls", "HTTP"],
    a: "D",
    e: "HTTP is the standard protocol for communication between web clients and servers, carrying requests and responses."
  },
  {
    id: "c4-32", t: "mcq", topic: "Data formats",
    q: "What is the difference between XML and JSON?",
    o: [
      "Both are binary formats",
      "Neither is a text format",
      "JSON uses tags and XML does not",
      "XML uses tags to identify each data item, while JSON is a simpler representation based on JavaScript objects"
    ],
    a: "D",
    e: "XML marks up data with tags, while JSON represents data as lightweight objects and arrays based on JavaScript syntax."
  },
  {
    id: "c4-33", t: "mcq", topic: "MVC",
    q: "What does the model-view-controller pattern do?",
    o: [
      "Merges all parts into one component",
      "Removes the need for a server",
      "Is a type of database",
      "Separates the data model, the presentation of data and the handling of user input"
    ],
    a: "D",
    e: "MVC separates the data model, the view that presents it, and the controller that handles user input, improving modularity."
  },
  {
    id: "c4-34", t: "mcq", topic: "Service-oriented architecture",
    q: "What are the services in a service-oriented architecture?",
    o: [
      "Stateful components that cannot be replicated",
      "Services that must stay on one computer",
      "Services that run on one server only",
      "Stateless components that can be replicated and moved between computers"
    ],
    a: "D",
    e: "SOA services are stateless, which allows them to be replicated and relocated across machines as demand changes."
  },
  {
    id: "c4-35", t: "mcq", topic: "Service-oriented architecture",
    q: "Why is a service-oriented architecture usually easier to scale?",
    o: [
      "It needs only one server",
      "It is harder to scale",
      "It is less resilient to failure",
      "Its stateless services can be replicated as demand increases"
    ],
    a: "D",
    e: "Because services hold no session state, additional replicas can be started and requests distributed among them as load grows."
  },
  {
    id: "c4-36", t: "mcq", topic: "Databases",
    q: "How should you choose between a relational and a NoSQL database?",
    o: [
      "NoSQL is always better",
      "Relational databases have no tables",
      "Databases are never needed",
      "Relational databases suit transaction management with simple predictable structures, while NoSQL offers flexible organization"
    ],
    a: "D",
    e: "Relational databases excel at structured, transactional data; NoSQL databases are useful when the data model needs flexibility or scale."
  },
  {
    id: "c4-37", t: "mcq", topic: "Mobile architecture",
    q: "What is a key architectural issue for mobile products?",
    o: [
      "Mobile devices always have unlimited battery",
      "Mobile products never face network problems",
      "There are no mobile-specific issues",
      "Intermittent connectivity, so a limited service must work without a network connection"
    ],
    a: "D",
    e: "Mobile connectivity can drop at any time, so a well-designed mobile product provides useful offline functionality and synchronizes later."
  },
  {
    id: "c4-38", t: "mcq", topic: "Open source",
    q: "What is the main trade-off of reusing open-source software?",
    o: [
      "Open source gives full control with no constraints",
      "Open source has no licence issues",
      "Open source is always slower",
      "Reuse reduces development cost and time to market, but you do not control its evolution"
    ],
    a: "D",
    e: "Open-source reuse can accelerate development and cut costs, but the project's future direction, quality and compatibility are controlled by its community, not by your team."
  },
  {
    id: "c4-39", t: "tf", topic: "Quality attributes",
    q: "Software architecture affects performance, security and maintainability.",
    a: true,
    e: "True. Architectural decisions strongly influence these quality attributes, often more than later implementation choices."
  },
  {
    id: "c4-40", t: "tf", topic: "Design principles",
    q: "Abstraction means focusing on every implementation detail of a component.",
    a: false,
    e: "False. Abstraction does the opposite: it focuses on essential behaviour and hides implementation details."
  },
  {
    id: "c4-41", t: "fill", topic: "MVC",
    q: "The model-view-controller pattern separates the data ________, the presentation of data, and the handling of user input.",
    accept: ["model"],
    e: "MVC's three parts are the Model (data), the View (presentation) and the Controller (user input)."
  },
  {
    id: "c4-42", t: "fill", topic: "Data formats",
    q: "________ uses tags to identify each data item, while JSON represents data as JavaScript-style objects.",
    accept: ["xml"],
    e: "XML is tag-based markup; JSON is a lighter, object-based data-interchange format."
  },
  {
    id: "c4-43", t: "short", topic: "Quality attributes",
    q: "Name four quality attributes that software architecture can affect.",
    keywords: [["performance"], ["security"], ["usability"], ["reliab", "maintain", "availability", "resilien"]],
    model: "Performance, usability, security, reliability and maintainability are all affected by architecture (availability and resilience are also valid quality attributes).",
    e: "Architecture shapes many quality attributes; the lecture highlights performance, usability, security, reliability and maintainability."
  },
  {
    id: "c4-44", t: "scenario", topic: "Security architecture",
    scenario: "A hospital must store patient records. Management wants the strongest possible overall protection, accepts that access from remote clinics may be slower, and is prepared to fund protection at several sites.",
    q: "Which security architecture best matches these priorities?",
    o: [
      "A centralized architecture, because all data is then in one place",
      "A distributed architecture, because one breach does not expose everything",
      "No security architecture, because doctors need fast access",
      "A single shared database with no access control"
    ],
    a: "B",
    e: "Distributed security limits the blast radius of a breach at the cost of slower access and higher protection costs — exactly the trade-off management has accepted."
  },
  {
    id: "c4-45", t: "scenario", topic: "Component design",
    scenario: "A team decomposes a reporting system into many very small components. Each component is easy to understand and replace, but report generation has become noticeably slower.",
    q: "Which architectural trade-off does this illustrate?",
    o: [
      "Centralized versus distributed security",
      "Fine-grain components improve maintainability but communication overhead can reduce performance",
      "Availability versus redundancy",
      "Relational versus NoSQL databases"
    ],
    a: "B",
    e: "Fine-grained decomposition improves maintainability, but the additional communication between components can slow the system. The team must balance the two qualities."
  }
];
