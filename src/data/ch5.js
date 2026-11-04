/* ============================================================
   EXAM 5 · MIDTERM COMPREHENSIVE  (Chapters 1–5)
   Chapter 5 cloud content + integrated questions from Chapters 1–4
   56 questions
   ============================================================ */
const CH5 = [
  {
    id: "c5-01", t: "mcq", topic: "Cloud fundamentals",
    q: "According to the lecture material, what is the cloud made up of?",
    o: [
      "A very large number of remote servers offered for rent by the companies that own them",
      "A single mainframe owned by each customer",
      "A set of desktop computers in the customer's office",
      "A private network with no external servers"
    ],
    a: "A",
    e: "The cloud is built from a very large number of remote servers owned by cloud providers and rented to customers on demand."
  },
  {
    id: "c5-02", t: "mcq", topic: "Cloud fundamentals",
    q: "Which statement defines scalability?",
    o: [
      "The ability of software to cope with increasing numbers of users while system performance and response time are maintained",
      "The ability to run without any servers",
      "The ability to store data only on a user's device",
      "The ability to reduce the number of features as demand grows"
    ],
    a: "A",
    e: "Scalability is the capacity to handle growth in users or workload without sacrificing performance or response time."
  },
  {
    id: "c5-03", t: "mcq", topic: "Cloud fundamentals",
    q: "A retailer sees a large traffic spike every December and does not want to buy extra hardware that sits idle for the rest of the year. Which cloud characteristic helps most?",
    o: [
      "Elasticity, because servers can be added or removed dynamically as demand changes",
      "Centralized security, because all data is kept in one place",
      "A monolithic architecture, because it avoids communication between services",
      "A relational database, because it guarantees scalability"
    ],
    a: "A",
    e: "Elasticity allows resources to scale up during the December peak and scale back down afterwards, so the retailer pays only for what it needs."
  },
  {
    id: "c5-04", t: "mcq", topic: "Cloud fundamentals",
    q: "A company runs three copies of its software on different servers. One server fails, but customers can still use the service. Which property does this demonstrate?",
    o: ["Resilience", "Elasticity only", "Data leakage", "Cohesion"],
    a: "A",
    e: "Resilience is the ability to continue delivering service despite failures. Redundant copies allow operation to continue when one server fails."
  },
  {
    id: "c5-05", t: "mcq", topic: "Virtualisation",
    q: "What is a virtual server made up of?",
    o: [
      "An operating system plus a set of software packages providing the required server functionality, running on an underlying physical computer",
      "A physical computer with no operating system",
      "A browser tab and a user account",
      "A database table and a backup file"
    ],
    a: "A",
    e: "A virtual server packages an operating system and the required software so that it can run on a physical host, isolated from other virtual servers."
  },
  {
    id: "c5-06", t: "mcq", topic: "Virtualisation",
    q: "What does a hypervisor provide when virtual machines are used to implement virtual servers?",
    o: [
      "Hardware emulation that simulates the operation of the underlying hardware",
      "A graphical user interface for the cloud console",
      "A programming language for microservices",
      "A database consistency mechanism"
    ],
    a: "A",
    e: "The hypervisor abstracts and emulates hardware so that multiple virtual machines can run independently on the same physical computer."
  },
  {
    id: "c5-07", t: "mcq", topic: "Containers",
    q: "Which statement compares containers with virtual machines correctly?",
    o: [
      "Containers are usually megabytes in size and start in seconds, while virtual machines are gigabytes in size and take minutes to start",
      "Containers are always larger and slower than virtual machines",
      "Containers require a separate physical computer for every instance",
      "Virtual machines are lighter because they share an operating system"
    ],
    a: "A",
    e: "Containers share the host operating system and package only the application and its dependencies, making them far lighter and faster to start than full virtual machines."
  },
  {
    id: "c5-08", t: "mcq", topic: "Containers",
    q: "Containers are described as an operating-system virtualisation technology. What does this allow?",
    o: [
      "Independent servers to share a single operating system",
      "Each container to run a completely separate operating system kernel",
      "Virtual machines to avoid using any operating system",
      "Applications to run without any memory"
    ],
    a: "A",
    e: "OS virtualisation lets multiple isolated containers share one operating-system kernel, reducing overhead compared with running a full OS per virtual machine."
  },
  {
    id: "c5-09", t: "mcq", topic: "Cloud service models",
    q: "Which cloud service provides compute, network and storage services that can be used to implement virtual servers?",
    o: ["Infrastructure as a service", "Platform as a service", "Software as a service", "Function as a service only"],
    a: "A",
    e: "IaaS supplies fundamental infrastructure — compute, network and storage — on which customers build and run their own virtual servers and systems."
  },
  {
    id: "c5-10", t: "mcq", topic: "Cloud service models",
    q: "Which cloud service level provides libraries and frameworks from the provider, including access to SQL and NoSQL databases?",
    o: ["Platform as a service", "Infrastructure as a service", "Software as a service", "Hardware as a service"],
    a: "A",
    e: "PaaS provides a managed platform with libraries, frameworks and databases, so developers can focus on the application rather than infrastructure."
  },
  {
    id: "c5-11", t: "mcq", topic: "Cloud service models",
    q: "A startup wants to sell a finished accounting package that customers use in a web browser without installing anything. Which model fits best?",
    o: ["Software as a service", "Infrastructure as a service", "Platform as a service", "A private physical server for each customer"],
    a: "A",
    e: "SaaS delivers a complete application over the Internet; customers use it through a browser without installing or managing the software themselves."
  },
  {
    id: "c5-12", t: "mcq", topic: "SaaS",
    q: "Which two disadvantages of SaaS are highlighted by a customer who worries that moving data to another provider will be difficult and that security may be weak?",
    o: [
      "Data exchange and security concerns",
      "Hardware cost and energy use",
      "Programming language choice and code style",
      "Screen resolution and colour accuracy"
    ],
    a: "A",
    e: "SaaS customers may face difficulties exporting their data to another provider and may have concerns about the security of data held by the provider."
  },
  {
    id: "c5-13", t: "mcq", topic: "SaaS design",
    q: "A SaaS product runs some features in the user's browser or mobile app and others on a remote server to reduce network traffic. Which SaaS design issue is this?",
    o: ["Local or remote processing", "Information leakage", "Database normalization", "Continuous deployment"],
    a: "A",
    e: "Designers must decide which processing happens locally on the client and which happens remotely on the server, balancing responsiveness, bandwidth and security."
  },
  {
    id: "c5-14", t: "mcq", topic: "SaaS design",
    q: "Employees from one company can see records that belong to another company using the same SaaS product. Which design issue is most directly involved?",
    o: ["Information leakage", "Scaleability", "Open-source licensing", "Container size"],
    a: "A",
    e: "Information leakage occurs when data belonging to one tenant is exposed to another. Strong access control, tenant isolation and encryption are required to prevent it."
  },
  {
    id: "c5-15", t: "mcq", topic: "Multi-tenant systems",
    q: "In a multi-tenant system, how are customers served?",
    o: [
      "All customers are served by a single instance of the system and a multitenant database",
      "Each customer receives a completely separate physical data centre",
      "Customers share one user account",
      "Only one customer can use the system at a time"
    ],
    a: "A",
    e: "A multi-tenant system runs one instance of the software and a shared database for many customers, using logical isolation rather than separate deployments."
  },
  {
    id: "c5-16", t: "mcq", topic: "Multi-tenant systems",
    q: "In a multi-tenant database, what is the role of the tenant identifier?",
    o: [
      "Items are tagged with it so the database software can provide logical isolation, making users feel they have their own database",
      "It encrypts every user's password",
      "It determines which programming language the service uses",
      "It replaces the need for access control"
    ],
    a: "A",
    e: "The tenant identifier tags each record with its owning customer, allowing the database to filter data so each tenant sees only its own information."
  },
  {
    id: "c5-17", t: "mcq", topic: "Multi-tenant systems",
    q: "A bank wants the strongest possible separation of customer data and is willing to run a separate system for each client. Which approach fits best?",
    o: [
      "A multi-instance system",
      "A single multi-tenant database without isolation",
      "A shared database with no access control",
      "A monolithic application with one tenant identifier"
    ],
    a: "A",
    e: "A multi-instance system gives each customer a separate instance, providing the strongest isolation at the cost of more operational overhead."
  },
  {
    id: "c5-18", t: "mcq", topic: "Cloud architecture",
    q: "Which three architectural decisions are highlighted for cloud software engineering?",
    o: [
      "Database organization; scalability and resilience requirements; software structure as monolithic or service-oriented",
      "Logo design; office layout; staff salaries",
      "Programming language; code editor; version-control host",
      "Colour scheme; font choice; screen resolution"
    ],
    a: "A",
    e: "Cloud architects must decide how data is organized, how the system will scale and remain resilient, and whether to build a monolith or service-oriented system."
  },
  {
    id: "c5-19", t: "mcq", topic: "Scaling",
    q: "What is the difference between scaling out and scaling up?",
    o: [
      "Scaling out adds new virtual servers, while scaling up increases the power of an existing system server",
      "Scaling out increases the power of one server, while scaling up adds more servers",
      "Scaling out removes servers, while scaling up removes users",
      "They are exactly the same operation"
    ],
    a: "A",
    e: "Horizontal scaling (out) adds more servers; vertical scaling (up) makes an individual server more powerful."
  },
  {
    id: "c5-20", t: "mcq", topic: "Resilience",
    q: "In a standby system, what is the role of the system monitor?",
    o: [
      "It continually checks the system status and can switch to the standby system automatically if the active system fails",
      "It stores backups of the user interface",
      "It compiles the application source code",
      "It encrypts the database schema"
    ],
    a: "A",
    e: "The monitor watches the active system and triggers a failover to the standby system when it detects a failure."
  },
  {
    id: "c5-21", t: "mcq", topic: "Resilience",
    q: "Where should redundant virtual servers be placed to support resilience?",
    o: [
      "On different physical computers, ideally in different data centres, so operation can switch if a server or whole data centre fails",
      "On the same physical computer to reduce cost",
      "In one data centre with a single network connection",
      "On the user's device instead of in the cloud"
    ],
    a: "A",
    e: "Redundancy must be physically separated; otherwise a single hardware or data-centre failure can take down all copies at once."
  },
  {
    id: "c5-22", t: "mcq", topic: "Software structure",
    q: "What is the alternative to a monolithic approach to software organization, according to the slides?",
    o: [
      "Decomposing the system into fine-grain, stateless services in a service-oriented approach",
      "Combining all functionality into a single executable",
      "Running the entire system on one physical server",
      "Removing all network communication"
    ],
    a: "A",
    e: "Service-oriented architecture decomposes the system into fine-grained, stateless services that can be deployed and scaled independently."
  },
  {
    id: "c5-23", t: "mcq", topic: "Cloud platforms",
    q: "Which of these is given as an example of a general-purpose cloud platform?",
    o: ["Amazon Web Services", "Microsoft Word", "A relational database table", "A printed manual"],
    a: "A",
    e: "Amazon Web Services is the example given of a general-purpose cloud platform offering infrastructure and managed services."
  },
  {
    id: "c5-24", t: "mcq", topic: "Software services",
    q: "Which statement describes a software service according to the slides?",
    o: [
      "A software component that can be accessed from remote computers over the Internet and gives a corresponding output for a given input without side effects",
      "A hardware device installed in a data centre",
      "A user interface that stores session state on the client",
      "A database schema with no API"
    ],
    a: "A",
    e: "A software service is a remotely accessible component with a defined input/output behaviour and no side effects on the rest of the system."
  },
  {
    id: "c5-25", t: "mcq", topic: "Software services",
    q: "A service needs to keep track of a user's shopping basket between requests. Which approach do the slides describe?",
    o: [
      "Store the state in a database or with the service requestor, or include the state in the request and return the updated state in the result",
      "Store the state permanently in the service's memory",
      "Ask the user to re-enter the basket after every request",
      "Use a different server for every request without storing state"
    ],
    a: "A",
    e: "Services should be stateless. State can be externalized to a database or the requestor, or passed in the request and returned in the response."
  },
  {
    id: "c5-26", t: "mcq", topic: "Web services",
    q: "Which pair of protocols were used by big web services in the early 2000s?",
    o: [
      "SOAP for service interaction and WSDL for interface description",
      "HTTP for encryption and JSON for authentication",
      "TCP for storage and XML for rendering",
      "HTML for messaging and CSS for service discovery"
    ],
    a: "A",
    e: "Early big web services used SOAP for message exchange and WSDL to describe the service interface."
  },
  {
    id: "c5-27", t: "mcq", topic: "Microservices",
    q: "Which description matches a microservice?",
    o: [
      "A small-scale, stateless service with a single responsibility that is combined with other services to create applications",
      "A large monolithic application with many responsibilities",
      "A hardware driver that runs inside the operating system",
      "A database that stores all application data"
    ],
    a: "A",
    e: "Microservices are small, independently deployable, stateless services, each focused on a single business capability."
  },
  {
    id: "c5-28", t: "mcq", topic: "Microservices",
    q: "A team gives each microservice its own database and its own user-interface management code. What does this aim to achieve?",
    o: [
      "Complete independence of each microservice from the others",
      "A single shared database for all services",
      "Tighter coupling between services",
      "A larger monolithic deployment unit"
    ],
    a: "A",
    e: "Giving each service its own data and UI logic minimizes dependencies, allowing teams to develop, deploy and scale services independently."
  },
  {
    id: "c5-29", t: "mcq", topic: "Microservices",
    q: "One microservice is written in Java and uses a relational database, while another is written in Python and uses a document database. Which characteristic does this illustrate?",
    o: ["Implementation independence", "High coupling", "A shared database", "A monolithic architecture"],
    a: "A",
    e: "Implementation independence lets each microservice use the language, libraries and data store that best fit its responsibility."
  },
  {
    id: "c5-30", t: "mcq", topic: "Microservices",
    q: "A team wants to update the payment service without stopping the rest of the system. Which characteristic makes this possible?",
    o: ["Independently deployable", "Strongly coupled", "Monolithic", "Stateful"],
    a: "A",
    e: "Independently deployable services can be changed and redeployed on their own, without taking down unrelated parts of the system."
  },
  {
    id: "c5-31", t: "mcq", topic: "Microservices",
    q: "Which microservice characteristic says that services should implement business capabilities and needs, rather than simply provide a technical service?",
    o: ["Business-oriented", "Stateless", "Containerized", "Synchronous"],
    a: "A",
    e: "Microservices should be organized around business capabilities — such as payments or inventory — rather than around technical layers."
  },
  {
    id: "c5-32", t: "mcq", topic: "Microservices",
    q: "What does high cohesion mean for a microservice?",
    o: [
      "All the parts needed to deliver its functionality are included in the component",
      "It shares as much data as possible with other services",
      "It has many unrelated responsibilities",
      "It depends on every other service"
    ],
    a: "A",
    e: "High cohesion means a service contains everything needed for one well-defined capability, with closely related responsibilities kept together."
  },
  {
    id: "c5-33", t: "mcq", topic: "Microservices",
    q: "What does low coupling mean for a microservice?",
    o: [
      "The component has few relationships with other components",
      "The component is tightly connected to every other service",
      "The component shares its database with all services",
      "The component cannot be deployed independently"
    ],
    a: "A",
    e: "Low coupling minimizes dependencies between services, so changes to one service have little impact on the others."
  },
  {
    id: "c5-34", t: "mcq", topic: "Microservices",
    q: "What does a message sent between microservices normally include?",
    o: [
      "Administrative information, a service request and the data required to deliver the requested service",
      "Only a username and password",
      "Only a database backup",
      "Only an HTTP status code"
    ],
    a: "A",
    e: "A service request message carries the administrative metadata, the operation requested and the payload needed to fulfil it."
  },
  {
    id: "c5-35", t: "mcq", topic: "Microservices",
    q: "Which two problems with monolithic applications does the microservices architecture address?",
    o: [
      "Any change requires rebuilding, retesting and redeploying the whole system, and scaling applies to the whole system even when demand is localized",
      "Monoliths are too small and have too many independent services",
      "Monoliths cannot store any data",
      "Monoliths always use too many programming languages"
    ],
    a: "A",
    e: "Monoliths force whole-system redeployment and whole-system scaling; microservices allow localized changes and targeted scaling."
  },
  {
    id: "c5-36", t: "mcq", topic: "Microservices",
    q: "An online shop finds that its search feature receives most of the traffic while other features are quiet. Which statement best applies the lecture?",
    o: [
      "In a monolithic design the whole system must be scaled, whereas in a microservices design the busy service can be replicated on its own",
      "The search feature should be removed from the system",
      "The database should be shut down during quiet periods",
      "The whole system must run on a single server"
    ],
    a: "A",
    e: "Microservices allow the search service to be replicated independently, avoiding the cost of scaling the entire application for one hot feature."
  },
  {
    id: "c5-37", t: "mcq", topic: "Microservices",
    q: "In a cloud-based system, each microservice may be deployed in its own container. What does this allow?",
    o: [
      "A microservice can be stopped and restarted without affecting other parts of the system",
      "All services must share one process",
      "Services can no longer communicate over a network",
      "The system must be deployed as a monolith"
    ],
    a: "A",
    e: "Container isolation means each service has its own runtime environment and can be deployed, restarted or scaled without disrupting the others."
  },
  {
    id: "c5-38", t: "mcq", topic: "Microservice communication",
    q: "What three key decisions must be made when designing communication between microservices?",
    o: [
      "Synchronous or asynchronous; direct or through a message broker; which message protocol to use",
      "Database type; programming language; operating system",
      "Screen size; colour scheme; font",
      "Office location; team size; salary"
    ],
    a: "A",
    e: "Communication design must choose the interaction style (sync/async), the routing mechanism (direct/broker) and the message protocol."
  },
  {
    id: "c5-39", t: "mcq", topic: "Microservice communication",
    q: "In a synchronous interaction, what does service A do while service B processes its request?",
    o: [
      "It suspends processing and waits until B returns the information",
      "It continues with unrelated work and checks a queue later",
      "It shuts down",
      "It sends the request to every service in the system"
    ],
    a: "A",
    e: "Synchronous calls block the caller until the response arrives; asynchronous calls allow the caller to continue and collect the result later."
  },
  {
    id: "c5-40", t: "mcq", topic: "Microservice communication",
    q: "How does indirect communication work between microservices?",
    o: [
      "A service names the service it needs and sends the request to a message broker, which finds a service that can fulfil it",
      "A service must know the exact IP address of every other service",
      "Services communicate only through shared memory",
      "Services cannot communicate at all"
    ],
    a: "A",
    e: "A message broker decouples services: the sender specifies the required service, and the broker routes the request to a suitable provider."
  },
  {
    id: "c5-41", t: "mcq", topic: "Microservice data",
    q: "What does the lecture recommend for sharing data between microservices?",
    o: [
      "Isolate data within each service, share as little as possible, and make most sharing read-only",
      "Use one shared database for every service",
      "Let every service write to every other service's database",
      "Store all data in the user interface"
    ],
    a: "A",
    e: "Data isolation reduces coupling. Where sharing is unavoidable, read-only access limits the risk of inconsistent updates."
  },
  {
    id: "c5-42", t: "mcq", topic: "Microservice data",
    q: "Replica services each use a copy of a database. What must the design include?",
    o: [
      "A mechanism that keeps the database copies used by the replica services consistent",
      "A rule that only one replica may ever run",
      "A shared user interface for all replicas",
      "A guarantee that the database never changes"
    ],
    a: "A",
    e: "Replicated data can diverge; the architecture must include synchronization or reconciliation so that all copies remain consistent."
  },
  {
    id: "c5-43", t: "mcq", topic: "HTTP services",
    q: "Which HTTP verb is used to create a new resource?",
    o: ["POST", "GET", "DELETE", "HEAD"],
    a: "A",
    e: "POST creates a new resource; GET retrieves, PUT updates or replaces, and DELETE removes a resource."
  },
  {
    id: "c5-44", t: "mcq", topic: "HTTP services",
    q: "Why are incidents organized hierarchically in the URI, for example by road, location, direction and incident number?",
    o: [
      "So that each incident can be accessed through its own structured URI",
      "Because HTTP requires URIs to be longer than 100 characters",
      "To hide the incident from users",
      "To avoid using any HTTP methods"
    ],
    a: "A",
    e: "A hierarchical URI gives every resource a unique, predictable address, making it easy to retrieve or manipulate a specific incident."
  },
  {
    id: "c5-45", t: "mcq", topic: "Continuous deployment",
    q: "What is continuous deployment?",
    o: [
      "As soon as a change to a service has been made and validated, the modified service is redeployed",
      "Deploying the entire system once a year",
      "Writing all deployment scripts by hand",
      "Preventing any change from reaching production"
    ],
    a: "A",
    e: "Continuous deployment automatically releases validated changes, allowing frequent small updates and faster feedback."
  },
  {
    id: "c5-46", t: "mcq", topic: "Cloud service models",
    q: "What payment model is usually used for software as a service?",
    o: [
      "Users pay a recurring fee, such as monthly, to use the software rather than buying it outright",
      "Users pay once for a perpetual licence and own the software",
      "Users pay only for the hardware they install",
      "The software is always free with no limits"
    ],
    a: "A",
    e: "SaaS typically uses subscription pricing, so customers pay a recurring fee for continued access rather than purchasing a perpetual licence."
  },
  {
    id: "c5-47", t: "mcq", topic: "Multi-tenant systems",
    q: "What problem is highlighted when a multi-tenant database is extended by using separate tables to hold customer field names and values?",
    o: [
      "It adds complexity because the extra tables must be managed and their information integrated into the database",
      "It removes the need for a tenant identifier",
      "It guarantees stronger security than any other design",
      "It makes the database schema completely static"
    ],
    a: "A",
    e: "The extra tables increase schema complexity and require additional logic to manage and integrate, making the database harder to maintain."
  },
  {
    id: "c5-48", t: "mcq", topic: "Virtualisation",
    q: "Why is a virtual server able to run on any hardware in the cloud?",
    o: [
      "Because it has no external dependencies",
      "Because it is physically identical to one specific server",
      "Because it requires a dedicated data centre",
      "Because it cannot be moved once started"
    ],
    a: "A",
    e: "A virtual server packages its operating system and application dependencies, so it does not rely on the specific physical host and can be moved across the cloud."
  },
  {
    id: "c5-49", t: "mcq", topic: "Integrated · Chapter 1",
    q: "A company sells a generic accounting package to many firms, then adapts it for each customer's tax rules. Which concept best describes this?",
    o: [
      "A software product line",
      "A project-based one-off system",
      "A stand-alone prototype",
      "A plan-driven contract"
    ],
    a: "A",
    e: "A product line shares a common core across related products while allowing customer-specific adaptations — exactly what the company is doing."
  },
  {
    id: "c5-50", t: "mcq", topic: "Integrated · Chapter 1",
    q: "A product vision says: 'Our app will help small clinics manage appointments.' Which fundamental vision question is still unanswered?",
    o: [
      "Why should customers buy this product?",
      "What is the product?",
      "Who are the target users?",
      "What is the product called?"
    ],
    a: "A",
    e: "The statement identifies the product and its users, but it does not explain the benefit or reason customers would choose it over alternatives."
  },
  {
    id: "c5-51", t: "mcq", topic: "Integrated · Chapter 2",
    q: "A manager asks an agile team to produce a complete, detailed specification for every future increment before any coding begins. Which agile principle does this conflict with most directly?",
    o: [
      "Develop and deliver incrementally, defining detail only for the current increment",
      "Pair programming",
      "Maintain simplicity by removing all documentation",
      "Focus on people by removing all planning"
    ],
    a: "A",
    e: "Agile limits detailed planning to the increment being built and expects later requirements to evolve; specifying everything upfront contradicts incremental delivery."
  },
  {
    id: "c5-52", t: "mcq", topic: "Integrated · Chapter 3",
    q: "Which statement best distinguishes a scenario from a user story?",
    o: [
      "A scenario is a narrative that provides richer context, while a user story is a short statement of a role and a goal",
      "A scenario is always written in code, while a user story is written in English",
      "A user story contains more context than a scenario",
      "They are exactly the same artefact"
    ],
    a: "A",
    e: "Scenarios read as narratives with context about the user's situation; user stories are concise statements of who wants what and why."
  },
  {
    id: "c5-53", t: "mcq", topic: "Integrated · Chapter 4",
    q: "A payment provider must keep processing transactions even if one server fails. Which architectural choice best addresses this requirement?",
    o: [
      "Redundant components with failure detection and automatic switching",
      "A single centralized server with no backup",
      "Removing all security layers to reduce complexity",
      "A monolithic design with no monitoring"
    ],
    a: "A",
    e: "Availability and resilience are achieved through redundancy, failure detection and failover, so service continues when a component fails."
  },
  {
    id: "c5-54", t: "tf", topic: "Containers",
    q: "Containers are usually larger than virtual machines and take minutes to start.",
    a: false,
    e: "False. Containers are typically megabytes in size and start in seconds, while virtual machines are gigabytes in size and take minutes to boot."
  },
  {
    id: "c5-55", t: "tf", topic: "Multi-tenant systems",
    q: "In a multi-tenant system, all customers are served by a single instance of the system and a multitenant database.",
    a: true,
    e: "True. Multi-tenancy shares one application instance and database across customers, isolating each customer's data logically."
  },
  {
    id: "c5-56", t: "fill", topic: "HTTP services",
    q: "The HTTP verb used to create a new resource is ________.",
    accept: ["post"],
    e: "POST creates a new resource; GET retrieves it, PUT updates or replaces it, and DELETE removes it."
  },
  {
    id: "c5-57", t: "short", topic: "Microservice communication",
    q: "Name the three key decisions that must be made when designing communication between microservices.",
    keywords: [["synchron", "asynchron"], ["direct", "broker"], ["protocol"]],
    model: "Whether interaction is synchronous or asynchronous, whether services communicate directly or through a message broker, and which message protocol to use.",
    e: "These three decisions determine coupling, latency and resilience of the communication between services."
  },
  {
    id: "c5-58", t: "scenario", topic: "Integrated · Chapter 5",
    scenario: "A ticket-selling platform expects an enormous surge when concert tickets go on sale, followed by long quiet periods. The company does not want to own extra hardware for the rest of the year.",
    q: "Which cloud property is most directly relevant?",
    o: [
      "Elasticity — resources can scale up and down dynamically with demand",
      "A centralized security architecture",
      "A multi-instance deployment for every customer",
      "A relational database that never changes"
    ],
    a: "A",
    e: "Elasticity matches capacity to demand: additional servers are added for the surge and removed afterwards, avoiding idle hardware costs."
  },
  {
    id: "c5-59", t: "scenario", topic: "Integrated · Chapter 5",
    scenario: "A bank is choosing a cloud deployment for its core customer records. It insists that no software bug or attack in one customer's environment can expose another customer's data, even if that means running separate systems.",
    q: "Which deployment approach best satisfies the bank's requirement?",
    o: [
      "A multi-instance system with a separate instance for each customer",
      "A single multi-tenant database with a shared tenant identifier",
      "A monolithic application shared by all customers",
      "A public database with no access control"
    ],
    a: "A",
    e: "Multi-instance deployment gives each customer a separate application instance, providing the strongest isolation and limiting the impact of any single compromise."
  },
  {
    id: "c5-60", t: "scenario", topic: "Integrated · Chapters 3–4",
    scenario: "A team is designing a feature that lets users export a report. The feature must work without relying on the order in which other features are activated, and it must not change any other feature's behaviour.",
    q: "Which feature qualities are being required?",
    o: [
      "Independence and coherence",
      "Feature creep and coupling",
      "Scalability and availability",
      "Personalization and relevance"
    ],
    a: "A",
    e: "Independent features do not depend on other features' implementation or activation order; coherent features perform one function without side effects."
  }
];
