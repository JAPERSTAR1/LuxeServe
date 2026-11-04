/* ============================================================
   CHAPTER 1 · SOFTWARE PRODUCTS  (Lecture 1 + midterm bank)
   37 questions
   ============================================================ */
const CH1 = [
  {
    id: "c1-01", t: "mcq", topic: "Software products",
    q: "Which statement best defines a software product?",
    o: [
      "A one-off system built under a single client contract",
      "A generic software system whose functionality is useful to a range of customers",
      "A collection of hardware drivers bundled with an operating system",
      "A temporary script written for a single experiment"
    ],
    a: "B",
    e: "A software product provides generic functionality that is useful to many customers. A one-off system commissioned by a single client belongs to project-based software engineering."
  },
  {
    id: "c1-02", t: "mcq", topic: "Software products",
    q: "Which simple mobile game is used in the lecture as an example of a software product?",
    o: ["MS Excel", "Evernote", "Sudoku", "A payroll system"],
    a: "C",
    e: "Sudoku is the lecture's example of a simple mobile game that is a product. Excel and Evernote are larger products, while a payroll system is typically a custom business system."
  },
  {
    id: "c1-03", t: "mcq", topic: "Custom systems",
    q: "According to the lecture, which group still commonly needs custom software systems?",
    o: [
      "Individual gamers",
      "Large businesses, government and public bodies",
      "Students only",
      "App-store developers"
    ],
    a: "B",
    e: "Large businesses, government departments and public bodies often require bespoke systems tailored to their own processes and constraints."
  },
  {
    id: "c1-04", t: "mcq", topic: "Project-based engineering",
    q: "In project-based software engineering, what generates the requirements?",
    o: [
      "The software itself",
      "The code written by the developer",
      "The problem owned by the customer",
      "The execution model of the product"
    ],
    a: "C",
    e: "Project-based development is driven by a problem that the customer owns. The requirements express that problem and are owned by the external client."
  },
  {
    id: "c1-05", t: "mcq", topic: "Project-based engineering",
    q: "Where does development start in project-based software engineering?",
    o: [
      "With a business opportunity identified by developers",
      "With a set of software requirements owned by an external client",
      "With a product vision created by the company",
      "With an experimental prototype"
    ],
    a: "B",
    e: "Project-based development begins with requirements supplied by an external client; the contractor then designs and implements the system."
  },
  {
    id: "c1-06", t: "mcq", topic: "Project-based engineering",
    q: "In project-based software engineering, who designs and implements the system?",
    o: ["The customer", "A software company acting as the contractor", "The product manager", "The government"],
    a: "B",
    e: "The customer owns the problem, while a software company — the contractor — is responsible for designing and implementing the system."
  },
  {
    id: "c1-07", t: "mcq", topic: "Project-based engineering",
    q: "A customer changes the requirements during a project-based contract. What must the contractor do?",
    o: [
      "Ignore the changes because the contract is fixed",
      "Change the software to reflect the requirement changes",
      "Terminate the contract immediately",
      "Start a new company to handle the changes"
    ],
    a: "B",
    e: "In project-based development the contractor is expected to adapt the software so that it reflects the customer's changed requirements."
  },
  {
    id: "c1-08", t: "mcq", topic: "Custom systems",
    q: "According to the lecture, how long may custom software have to be supported?",
    o: ["Less than one year", "Two to three years", "Ten years or more", "Exactly five years"],
    a: "C",
    e: "Custom software can remain in service for a long time — often ten years or more — which makes maintenance and long-term support important."
  },
  {
    id: "c1-09", t: "mcq", topic: "Product-based engineering",
    q: "In product software engineering, what inspires the features of the product?",
    o: ["A customer contract", "A requirements document", "A hardware specification", "A business opportunity"],
    a: "D",
    e: "Product development begins with a business opportunity identified by individuals or a company. That opportunity inspires the product's features."
  },
  {
    id: "c1-10", t: "mcq", topic: "Product-based engineering",
    q: "In product software engineering, who decides the development timescale and the set of features?",
    o: ["The external customer", "A regulator", "The software development company", "The government"],
    a: "C",
    e: "Because there is no external client commissioning the work, the software development company itself decides the features and the timescale."
  },
  {
    id: "c1-11", t: "mcq", topic: "Product-based engineering",
    q: "Why is rapid delivery of software products essential?",
    o: [
      "To reduce the amount of documentation",
      "To capture the market for that type of product before competitors",
      "To avoid testing the product",
      "To lower the requirements"
    ],
    a: "B",
    e: "A product company must reach the market quickly to capture demand before competitors. Speed is therefore a commercial advantage, not merely a technical preference."
  },
  {
    id: "c1-12", t: "mcq", topic: "Product-based engineering",
    q: "What is the key feature of product development?",
    o: [
      "There is no external customer who generates requirements and pays for the software",
      "There is always a fixed contract with a client",
      "Requirements are always written by the developer's customers before coding",
      "Products are built only for government bodies"
    ],
    a: "A",
    e: "Product development is funded and directed by the company itself. No external customer supplies the requirements or pays directly for the software."
  },
  {
    id: "c1-13", t: "mcq", topic: "Product lines",
    q: "What is a software product line?",
    o: [
      "A single product sold to one customer",
      "A set of software products that share a common core, with customer-specific adaptations",
      "A list of hardware components used by a product",
      "A platform that no customer is allowed to extend"
    ],
    a: "B",
    e: "A product line reuses a common core across several related products, adding adaptations for particular customers or market segments."
  },
  {
    id: "c1-14", t: "mcq", topic: "Execution models",
    q: "In the stand-alone execution model, where does the software execute?",
    o: [
      "On the developer's servers",
      "Through a browser only",
      "Entirely on the customer's computers",
      "In a cloud service only"
    ],
    a: "C",
    e: "A stand-alone product runs entirely on the customer's own computers; it does not depend on the developer's servers at run time."
  },
  {
    id: "c1-15", t: "mcq", topic: "Execution models",
    q: "In the hybrid execution model, where are the product's features implemented?",
    o: [
      "Only on the vendor's servers",
      "Partly on the customer's computer and partly on the product developer's servers",
      "Only on the customer's phone",
      "In a separate hardware device"
    ],
    a: "B",
    e: "Hybrid products split functionality: some features run locally on the customer's computer, while others are provided by the developer's servers."
  },
  {
    id: "c1-16", t: "mcq", topic: "Execution models",
    q: "In the software service model, how do customers normally access the product?",
    o: ["Installed from a disk", "Through a browser or a mobile app", "Through a USB connection", "Through a printed manual"],
    a: "B",
    e: "Software services are accessed over the Internet through a browser or mobile app; the functionality and data live on the vendor's servers."
  },
  {
    id: "c1-17", t: "mcq", topic: "Product vision",
    q: "Which of the following is NOT one of the three fundamental questions a product vision should answer?",
    o: [
      "What is the product to be developed?",
      "Who are the target customers and users?",
      "Why should customers buy this product?",
      "How many lines of code will be written?"
    ],
    a: "D",
    e: "A product vision answers what the product is, who it is for, and why customers would buy it. The number of lines of code is an implementation detail, not a vision question."
  },
  {
    id: "c1-18", t: "mcq", topic: "Product vision",
    q: "In the Moore vision template, what does the word FOR introduce?",
    o: ["The target customer", "The product name", "The key benefit", "The primary competitor"],
    a: "A",
    e: "In Moore's template, FOR introduces the target customer — the person or organization the product is intended to serve."
  },
  {
    id: "c1-19", t: "mcq", topic: "Product vision",
    q: "In the Moore vision template, what does UNLIKE state?",
    o: [
      "The target customer",
      "The key benefit",
      "The primary competitive alternative",
      "The product category"
    ],
    a: "C",
    e: "UNLIKE identifies the main competing alternative that customers might use instead of the proposed product."
  },
  {
    id: "c1-20", t: "mcq", topic: "Product vision",
    q: "In the Moore vision template, what does OUR PRODUCT state?",
    o: ["The need or opportunity", "The primary differentiation", "The product name only", "The target customer"],
    a: "B",
    e: "OUR PRODUCT explains the key benefit or differentiation that makes the product preferable to the competitive alternative."
  },
  {
    id: "c1-21", t: "mcq", topic: "Product management",
    q: "The product manager acts as the interface between which parties?",
    o: [
      "Developers only",
      "The organization, its customers and the software development team",
      "Competitors and regulators",
      "Hardware vendors and testers only"
    ],
    a: "B",
    e: "A product manager connects the business, its current and prospective customers, and the development team, translating customer needs into product direction."
  },
  {
    id: "c1-22", t: "mcq", topic: "Product management",
    q: "Which of the following is NOT one of the three product management concerns shown in the lecture?",
    o: ["Business needs", "Technology constraints", "Customer experience", "Hardware cost"],
    a: "D",
    e: "The three concerns are business needs, technology constraints and customer experience. Hardware cost is not one of the three."
  },
  {
    id: "c1-23", t: "mcq", topic: "Product management",
    q: "Which of the following is NOT a technical interaction of the product manager shown in the lecture?",
    o: ["Product vision management", "Product backlog management", "Acceptance testing", "Salary negotiation"],
    a: "D",
    e: "Salary negotiation is a human-resources matter, not one of the product manager's technical interactions with the development process."
  },
  {
    id: "c1-24", t: "mcq", topic: "Product management",
    q: "What is the product manager's responsibility for product vision management?",
    o: [
      "Writing all of the source code",
      "Assessing proposed changes against the product vision and preventing vision drift",
      "Designing the hardware platform",
      "Hiring customers to test the product"
    ],
    a: "B",
    e: "The product manager evaluates proposed changes against the vision, ensuring the product does not gradually drift away from its intended purpose."
  },
  {
    id: "c1-25", t: "mcq", topic: "Product management",
    q: "Acceptance testing verifies that a software release:",
    o: [
      "Meets the goals in the product roadmap and is efficient and reliable",
      "Has the lowest possible price",
      "Uses the newest hardware available",
      "Has no users yet"
    ],
    a: "A",
    e: "Acceptance testing checks the release against the roadmap goals and confirms that it is efficient and reliable before it is accepted."
  },
  {
    id: "c1-26", t: "mcq", topic: "Prototyping",
    q: "Product prototyping is the process of:",
    o: [
      "Deploying the final release to all customers",
      "Writing the legal contracts for a product",
      "Developing an early version of a product to test ideas and convince yourself and funders that it has market potential",
      "Hiring a development team"
    ],
    a: "C",
    e: "A prototype is an early, experimental version used to test ideas and demonstrate to the team and funders that the product could succeed in the market."
  },
  {
    id: "c1-27", t: "mcq", topic: "Prototyping",
    q: "After development, what should happen to the prototype?",
    o: [
      "It should be released unchanged as the final product",
      "It should be thrown away, and the software re-implemented with security and reliability in mind",
      "It should be archived forever without reuse",
      "It should be sold as a separate product"
    ],
    a: "B",
    e: "The lecture recommends discarding the prototype and re-implementing the product properly, with security and reliability designed in from the start."
  },
  {
    id: "c1-28", t: "mcq", topic: "Professional ethics",
    q: "Which of the following is a core purpose of a professional code of conduct for software engineers?",
    o: [
      "To make software products more expensive",
      "To guide the professional behaviour and responsibilities of practitioners",
      "To replace all legal contracts",
      "To remove the need for testing"
    ],
    a: "B",
    e: "A code of conduct sets out the standards of professional behaviour and the responsibilities practitioners owe to users, employers and the public."
  },
  {
    id: "c1-29", t: "tf", topic: "Software products",
    q: "A software product is built for only one client.",
    a: false,
    e: "False. A software product provides generic functionality useful to a range of customers. A system built for a single client is project-based (custom) software."
  },
  {
    id: "c1-30", t: "tf", topic: "Product-based engineering",
    q: "Product-based development starts with a business opportunity identified by individuals or a company.",
    a: true,
    e: "True. Product development is inspired by a perceived business opportunity rather than by requirements supplied by an external client."
  },
  {
    id: "c1-31", t: "tf", topic: "Security & privacy",
    q: "Security is a concern that only needs to be addressed after a product has been released.",
    a: false,
    e: "False. Security should be considered throughout the software life cycle, from requirements through design, implementation, deployment and operation."
  },
  {
    id: "c1-32", t: "fill", topic: "Project-based engineering",
    q: "In project-based software engineering, development starts with a set of software ________ owned by an external client.",
    accept: ["requirements", "requirement"],
    e: "The external client owns the requirements; the contractor designs and implements the system that satisfies them."
  },
  {
    id: "c1-33", t: "fill", topic: "Product vision",
    q: "In the Moore vision template, the word ________ introduces the target customer.",
    accept: ["for"],
    e: "FOR identifies the target customer, for example: 'FOR project managers who need to track distributed teams…'."
  },
  {
    id: "c1-34", t: "short", topic: "Software products",
    q: "Name the three fundamental questions that a product vision should answer.",
    keywords: [["what"], ["who"], ["why"]],
    model: "What is the product to be developed? Who are the target customers and users? Why should customers buy this product?",
    e: "A strong vision states the product, its intended users, and the reason customers would choose it. All three questions must be answerable from the vision statement."
  },
  {
    id: "c1-35", t: "scenario", topic: "Product-based engineering",
    scenario: "A small team notices that independent fitness coaches struggle to manage client programmes. No client has commissioned any work. The team decides which features to build, sets its own launch date, and plans to sell the app to many coaches.",
    q: "Which type of software engineering does this situation describe?",
    o: [
      "Project-based software engineering",
      "Product-based software engineering",
      "Bespoke government contracting",
      "Outsourced maintenance of a legacy system"
    ],
    a: "B",
    e: "The team is responding to a business opportunity, controls the features and timescale, and has no external customer paying for the software. These are the defining characteristics of product-based engineering."
  },
  {
    id: "c1-36", t: "scenario", topic: "Professional ethics",
    scenario: "Shortly before a release, a developer discovers a defect that could affect the safety of users. The release date is fixed and the team is under pressure.",
    q: "What is the most professional course of action?",
    o: [
      "Hide the defect to protect the release date",
      "Report it to the team and make sure it is addressed before release",
      "Wait until users report the problem",
      "Delete the defect report to avoid blame"
    ],
    a: "B",
    e: "Professional conduct requires honesty and a duty of care to users. The defect must be reported and resolved before release, even if that delays the schedule."
  },
  {
    id: "c1-37", t: "scenario", topic: "Professional ethics",
    scenario: "A colleague asks you to copy a licensed third-party library into the product without obtaining permission or paying for the required licence.",
    q: "Which professional principle applies most directly?",
    o: [
      "Speed of delivery",
      "Respect for intellectual property and licensing terms",
      "Customer experience",
      "Team seating arrangements"
    ],
    a: "B",
    e: "Using licensed software outside the terms of its licence violates intellectual-property rights. Engineers must respect licensing terms and obtain permission where required."
  }
];
