/**
 * SHARED ENDISPUTE CONTENT
 * Single source of truth for all 3 dynamic sites.
 * Pulled directly from /home/fivelidz/projects/Endispute_site/COMPREHENSIVE_ORIGINAL_CONTENT.md
 *
 * Client requirements honoured:
 *  - No "family law" mention
 *  - No "expert mediator" mention
 *  - No use of the word "neutral" applied to people
 *  - Use original site language
 *  - Focus on management & dispute resolution services
 *  - Emphasise assessment, registration, and follow-up
 */

export const company = {
  name: "Endispute",
  tagline: "End Your Dispute With Endispute",
  shortPitch: "Leaders in Conflict Resolution",
  about:
    "Endispute is a leading provider of dispute resolution, dispute advisory and dispute management services in respect of complex disputes. The dispute processes are tailored to meet the needs of various industry, commercial corporations and all who do business with them, within Australia and internationally.",
  mission:
    "The mission of Endispute is to provide the highest quality dispute resolution services in respect of complex disputes. We accomplish our mission by ensuring that a professional approach is adopted and ensuring that our highly regarded Panel and processes are effective, efficient and respected.",
  whatWeDo:
    "We offer dispute resolution, advisory and management services working with industry and businesses to preserve commercial relationships. We offer a multitude of dispute resolution processes including evaluation, expert appraisal, private judging, arbitration and mediation to serve your unique needs.",
  workingWithUs:
    "When you contact Endispute you have access to a professional dispute advisory service that enables you to save costs and minimise risks. Our complimentary intake and assessment process ensures that the processes used are designed to effectively finalise disputes.",
  whoWeAre:
    "We work with government, industry and business to preserve commercial relationships and maintain confidentiality. With experience in telecommunications, financial, commercial and construction industries we offer our services to local and global industries of any size and geography.",
};

export const contact = {
  phone: "+61 2 8006 0425",
  email: "tsourdin@endispute.com.au",
  responseWindow: "promptly & in confidence",
  reach: "Australia & internationally",
};

export const benefits = [
  {
    title: "Preserve commercial relationships",
    detail:
      "Resolve disputes without burning the bridges that took years to build.",
  },
  {
    title: "Protect corporate reputation",
    detail:
      "Confidential processes keep sensitive matters out of the public record.",
  },
  {
    title: "Minimise costs and save executive time",
    detail:
      "Cost-efficient resolutions free executives to focus on running the business.",
  },
  {
    title: "Focus on business, not conflict",
    detail:
      "Tailored processes resolve issues without becoming a long-running distraction.",
  },
  {
    title: "Achieve durable, effective outcomes",
    detail:
      "High resolution rates with binding options when parties need certainty.",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Assessment & Registration",
    summary:
      "Intake and assessment service. Complimentary one-hour consultation. Brief dispute management plan and basic costing structures.",
    details: [
      "Provide an intake and assessment service for your dispute",
      "Offer a one-hour complimentary consultation to discuss options for your dispute process and panel composition",
      "In complex matters we will discuss multi-layered processes to suit your needs",
      "Prepare a brief dispute management plan in consultation with you",
      "Provide basic costing structures to manage the dispute",
    ],
  },
  {
    number: "02",
    title: "Initiation of the Dispute Resolution Process",
    summary:
      "Resource preparation, detailed timetabling, panel availability, venues across Australia and internationally, confidentiality agreements, transparent costing.",
    details: [
      "Assist with preparation of resources to commence the dispute resolution process efficiently and easily",
      "Prepare a detailed timetable for all parties in the dispute",
      "Ensure availability of the panel and expert panel members as necessary",
      "Arrange meeting venues around Australia and internationally within our network of providers",
      "Provide a stand-alone sample confidentiality agreement and guidelines that can be modified to suit all parties",
      "Provide a cost-efficient budget and effective timeline",
      "Finalise your dispute resolution management plan with careful regard to the complexity of your dispute",
    ],
  },
  {
    number: "03",
    title: "Management of the Dispute",
    summary:
      "Active management between meetings, information exchange support, material validation, tracking, and process monitoring to keep matters moving.",
    details: [
      "Manage any steps between meetings to save costs while supporting panel members",
      "Support exchange of information between parties and dispute resolution panel experts",
      "Validate that preparatory material is available for all parties prior to the dispute",
      "Assist with tracking of all information relevant to the dispute",
      "Monitor the dispute to ensure the process unfolds efficiently with adequate time to resolve",
    ],
  },
  {
    number: "04",
    title: "Follow Up",
    summary:
      "Ongoing support after resolution, detailed memorandum, safeguard processes such as binding appellate review, and follow-up on outstanding issues.",
    details: [
      "Continue to provide support to ensure the process has met your procedural interests",
      "Provide a detailed memorandum of your dispute resolution process",
      "Provide double check and safeguard processes such as binding appellate arbitral processes where necessary",
      "Follow up with any additional processes required to finalise outstanding issues",
    ],
  },
] as const;

export const processes = [
  {
    name: "Facilitation",
    short: "An impartial chair to clarify issues and move parties towards a defined conclusion.",
    description:
      "The facilitator is a person whose role is to assist parties to clarify issues in dispute and move matters to a pre-stated conclusion with the assistance of an agenda. Panel members who facilitate may also assist parties to develop options and suggest the inclusion of other dispute resolution processes where appropriate. Increasingly facilitators have been employed in assisting in public policy disputes, in the land and environment context, and the large-scale organisational change context.",
  },
  {
    name: "Structured Mediation",
    short: "Facilitative, issue-based and evaluative mediation tailored to the matter.",
    description:
      "Endispute uses a range of different forms of mediation – facilitative, issue and evaluative mediation. In facilitative mediation, the process is directed at ensuring that all issues are explored before options are developed by the parties and interest-based negotiation is supported. In issue and evaluative mediation, the panel mediator is an experienced and highly regarded authority figure who evaluates the case and offers recommendations on how it should be resolved.",
  },
  {
    name: "Evaluative Processes",
    short: "Expert opinion on the likely outcome should the matter proceed to trial.",
    description:
      "Evaluation in all of its forms will usually involve the giving of an opinion by an evaluator as to the likely outcome of a dispute should it proceed to trial. In most instances at Endispute the evaluation process will only bind the parties to the outcome if the parties agree to be bound. Some types of mini-trial can offer a similar process. These approaches are agreed with the client before entry into the panel process.",
  },
  {
    name: "Expert Referral",
    short: "Specialist subject expertise applied to particular issues in dispute.",
    description:
      "There is clearly a tendency, particularly in Australian commercial courts, to refer all or part of a dispute out to a referee. The referee may determine the dispute or issues in dispute in such manner as is appropriate, having regard to the rules of natural justice. Expert panel members can also be used – they are not paid by any one party, are likely to be impartial, and their early reports often result in early resolution of the dispute.",
  },
  {
    name: "Arbitration",
    short: "The longest-standing form of ADR — flexible procedure, parties shape the rules.",
    description:
      "Arbitration is the longest-standing form of Alternative Dispute Resolution (ADR) and the one that most closely mirrors litigation. The advantage of arbitration is that the parties have greater freedom to mould the procedure to suit their dispute and needs. In some circumstances, an arbitrator can adopt inquisitorial processes, arbitrate without pleadings, or on documents alone without a hearing.",
  },
] as const;

export const conflictResolutionCategories = [
  {
    type: "Facilitative",
    description:
      "A third party, often with no advisory or determinative role, providing assistance in managing the process of dispute resolution. Includes mediation, conciliation and facilitation.",
  },
  {
    type: "Advisory",
    description:
      "A third party who investigates the dispute and provides advice on the facts and possible outcomes. Includes investigation, case appraisal, dispute counselling, mini trial and early neutral evaluation.",
  },
  {
    type: "Determinative",
    description:
      "A third party investigating the dispute, which may include a formal hearing, and making a determination that is potentially enforceable. Includes adjudication and arbitration.",
  },
] as const;

export const panels = {
  intro:
    "Endispute has panels of specialist experts to assist with disputes. They include dispute resolution advisors, lawyers and retired judiciary from the High Court, Supreme Courts and the Federal Court. Our panel members are known for their analytical and reasoning skills and their commercial knowledge and understanding.",
  expertise: [
    "Banking and Finance",
    "Legal and Government",
    "Telecommunications and Broadband",
    "Information Technology",
    "Environmental",
    "Engineering",
    "Tax",
    "Construction",
  ],
  expertNote:
    "Expert panel members focus on conflicts in specialist subject areas. They are highly regarded for their common sense, business acumen and extensive subject expertise, and will often conduct a dispute resolution process alongside a member of the primary panel.",
};

export const clients = {
  featured: {
    name: "National Broadband Network (NBN)",
    relation: "Industry Dispute Resolution Providers",
    detail:
      "Endispute has been appointed the Resolution Advisor for NBN industry disputes under the Terms of Appointment.",
  },
  privacy:
    "As a matter of confidentiality we have preserved the identities of our other clients.",
};

export const team = [
  {
    name: "Professor Tania Sourdin",
    role: "Director & Co-Founder",
    photo: "/Endispute-V1Taniafinal.jpg",
    short:
      "Internationally-renowned scholar, researcher and practitioner in the conflict resolution field.",
    credentials: [
      "Foundation Chair & Director, Australian Centre for Justice Innovation (ACJI), Monash University",
      "Advanced Accredited Mediator (Australia)",
      "NBN Dispute Advisor (appointed 2014)",
      "Winner, LEADR Practitioner Excellence Award 2014",
      "Author, Alternative Dispute Resolution (Thomson Reuters, 4th ed., 2012)",
      "Author, The Multi-Tasking Judge (Thomson Reuters, 2013)",
      "General Editor, Thomson's Looseleaf Service on Alternative Dispute Resolution",
      "Wrote the Australian National Mediator Accreditation Standards (in use since 2008)",
      "Two Australian Research Council Research Projects on Technology, AI and Dispute Resolution",
    ],
    bio: "Professor Sourdin has practised across Australia, New Zealand, Hong Kong, Canada, the United States, the UK, the United Arab Emirates and the Pacific. She has worked throughout the Pacific for the IMF and World Bank, and was previously Director of the Conflict Resolution Research Centre at La Trobe University. Her conflict resolution practice focuses on complex dispute resolution and management — including executive, workplace, commercial, intergovernmental, interpersonal and complex conflict situations.",
  },
] as const;

export const inMemoriam = {
  name: "The Hon. Andrew John Rogers AO KC",
  years: "1933 – 2024",
  note: "Co-founder of Endispute. Foundation Chief Judge of the NSW Supreme Court Commercial Division. Andrew was dedicated to improving legal procedures and supported a generation of lawyers, who will continue to benefit from his achievements. — Prof. Tania Sourdin.",
};

export const faqs = [
  {
    q: "What does the Endispute process offer that litigation does not?",
    a: "Conflict Resolution processes can offer many advantages compared to litigation – they can be confidential, flexible, cost-effective and time-effective processes that can also assist parties to maintain commercial relationships and reduce executive and management costs. Endispute provides conflict resolution services that are managed to ensure that the process options are more likely to work. The Panel process and the dispute management service produce outcomes that are valued by clients and can save time and cost.",
  },
  {
    q: "What if we don't agree on an outcome?",
    a: "Most facilitative forms of conflict resolution are consensual processes that rely upon the parties to work towards a mutually beneficial outcome. These forms of conflict resolution, when conducted by skilled and experienced panel members, have high rates of resolution. In complex disputes, careful planning also supports the decision-making process of the parties. Endispute also offers Panel Review processes and determinative processes where the parties can agree to be contractually bound by the outcome.",
  },
  {
    q: "What will it cost?",
    a: "Costs are usually split equally between the parties involved in the conflict resolution process. These generally include the cost of the Panel Member, the venue and any associated costs. Endispute also charges a registration fee for each party if after your initial consultation you decide to use the services of Endispute. Endispute has on file indicative fee ranges of the Panel members (between $3,000 – $13,000 per day) as well as biographies and can provide you with an indicative costing. Costs can be dealt with as part of an agreement and an estimation of the costs of the process will be provided to parties as part of the registration service.",
  },
  {
    q: "Where does Endispute operate?",
    a: "Endispute operates around Australia and internationally. We arrange meeting venues throughout Australia and through our international network of providers. Please send us a message and we will respond within 48 hours.",
  },
  {
    q: "Is the process confidential?",
    a: "Yes. We provide a stand-alone sample confidentiality agreement and guidelines that can be modified to suit all parties to the dispute. Confidentiality is one of the key advantages of working with Endispute compared to public litigation, and is a particular focus of our process management.",
  },
] as const;

export const news = [
  {
    date: "Feb 2015",
    title: "Prof Andrew Rogers QC honoured on Australia Day",
    summary:
      "Awarded an Officer (AO) of the Order of Australia for distinguished service to the judiciary, the law, and reforms to commercial dispute resolution and case management.",
  },
  {
    date: "Oct 2009",
    title: "Tackling the costs of resolving disputes",
    summary:
      "Andrew Rogers writing in The Australian on the federal Access to Justice report's recommendations for cost allocation in public-interest cases.",
  },
  {
    date: "Oct 2009",
    title: "AFR: a new alternative to inefficient litigation",
    summary:
      "The Australian Financial Review profiles Endispute as a new corporate enterprise managing alternative dispute resolution of complex commercial matters.",
  },
  {
    date: "May 2009",
    title: "Australian first: Endispute launches",
    summary:
      "Billed by AFR as an Australian first — Endispute matches clients with legal, commercial and government sector experts using flexible ADR processes.",
  },
] as const;

// Convenient stats for hero / number callouts
export const stats = [
  { value: "Independent", label: "senior panel members" },
  { value: "Out of court", label: "confidential & without prejudice" },
  { value: "AU + INT'L", label: "venues arranged" },
  { value: "ACJI", label: "Foundation Chair, Monash" },
] as const;
