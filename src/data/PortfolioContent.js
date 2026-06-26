export const PortfolioContent = {
  about: {
    tag: "About Me",
    title: "We design and build",
    titleHighlight: "intelligent systems",
    paragraphs: [
      "I am an AI & Workflow Automation Expert specializing in creating custom solutions that streamline business operations. Using advanced tools like n8n, Make.com, and Python, I build reliable automation systems that run 24/7.",
      "My mission is to eliminate manual chores, optimize lead generation, deploy intelligent AI agents, and save businesses 10 to 20+ hours every week. Every integration is built with robust error handling, detailed logging, and custom API connections."
    ],
    stats: [
      { number: "100+", label: "Tools Integrated" },
      { number: "20+", label: "Hours Saved/Week" },
      { number: "100+", label: "Custom Built" }
    ],
    skills: [
      { name: "n8n Automation", level: 98 },
      { name: "Make.com (Integromat)", level: 96 },
      { name: "AI & LLM Integration (OpenAI/Claude)", level: 95 },
      { name: "Python Scripting", level: 90 },
      { name: "Custom API Integrations", level: 94 },
      { name: "Zapier", level: 85 }
    ]
  },

  hero: {
    badge: "Available for Projects",
    greeting: "Hey, I'm",
    name: "MrKhanServices",
    title: "AI & Workflow Automation Expert",
    description:
      "Stop wasting time on manual tasks. I design custom automation workflows and AI agents that capture leads, manage customer support, and scale operations on autopilot.",
    buttons: {
      primary: "Schedule a Consultation",
      secondary: "View My Work"
    },
    stats: [
      { number: "100+", label: "Tools Integrated" },
      { number: "20+", label: "Hours Saved/Week" },
      { number: "100+", label: "Custom Built" },
      { number: "100%", label: "Client Satisfaction" }
    ],
    technologies: [
      "n8n",
      "Make.com",
      "OpenAI",
      "Claude",
      "Zapier",
      "Python",
      "APIs",
      "LangChain",
      "HubSpot",
      "Slack",
      "WhatsApp API",
      "Airtable"
    ]
  },

  skills: {
    tag: "Expertise",
    title: "My Services &",
    titleHighlight: "Specialties",
    description:
      "From lead generation to AI chatbots — I build reliable automation systems that work 24/7 so you don't have to.",
    categories: [
      { id: "all", label: "All Skills" },
      { id: "automation", label: "Workflow Automation" },
      { id: "ai", label: "AI & Agents" },
      { id: "data", label: "Data Pipelines" }
    ],
    skills: {
      automation: [
        {
          name: "n8n Workflows",
          icon: "./icons/n8n.svg",
          level: 98,
          description: "Advanced node setups, sub-workflows, custom JavaScript nodes"
        },
        {
          name: "Make.com (Integromat)",
          icon: "./icons/make.svg",
          level: 96,
          description: "Complex routers, custom JSON modules, error handling"
        },
        {
          name: "Zapier",
          icon: "https://www.vectorlogo.zone/logos/zapier/zapier-icon.svg",
          level: 88,
          description: "Multi-step Zaps, webhooks, formatter tools"
        },
        {
          name: "Custom API Integration",
          icon: "./icons/javascript.svg",
          level: 94,
          description: "REST APIs, Webhooks, OAuth2 authentication, webhooks listeners"
        }
      ],
      ai: [
        {
          name: "AI Agents (OpenAI/Claude)",
          icon: "./icons/openai.svg",
          level: 95,
          description: "Assistant APIs, prompt engineering, structured outputs"
        },
        {
          name: "RAG & Vector Databases",
          icon: "./icons/pinecone.svg",
          level: 90,
          description: "Knowledge bases, Pinecone, Supabase PGVector"
        },
        {
          name: "Chatbot Deployment",
          icon: "https://www.vectorlogo.zone/logos/whatsapp/whatsapp-icon.svg",
          level: 92,
          description: "WhatsApp Cloud API, Telegram Bot API, website widgets"
        }
      ],
      data: [
        {
          name: "Python Scripting",
          icon: "https://www.vectorlogo.zone/logos/python/python-icon.svg",
          level: 90,
          description: "Data parsing, automation scripts, BeautifulSoup/Scrapy"
        },
        {
          name: "Database Systems",
          icon: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg",
          level: 86,
          description: "Airtable, Supabase, PostgreSQL, MongoDB, Google Sheets"
        },
        {
          name: "Web Scraping & Enrichment",
          icon: "./icons/chrome.svg",
          level: 92,
          description: "Google Maps scraping, data extraction, email finder automation"
        }
      ]
    },
    summary: [
      { number: "100+", label: "Integrations Built" },
      { number: "20+", label: "Hours Saved Weekly" },
      { number: "100%", label: "Delivery Rate" }
    ]
  },

  projects: {
    tag: "Workflow Library",
    title: "Custom Built",
    titleHighlight: "Workflows",
    description:
      "A showcase of custom, production-ready automation workflows and AI applications designed to streamline businesses.",
    categories: [
      { id: "all", label: "All Workflows" },
      { id: "ai", label: "AI & Chatbots" },
      { id: "lead", label: "Lead Gen" },
      { id: "social", label: "Social Media" },
      { id: "ecommerce", label: "E-Commerce" },
      { id: "data", label: "Data Pipelines" },
      { id: "email", label: "Email Marketing" }
    ],
    items: [
      {
        id: 1,
        title: "RAG-Powered Customer Support Agent",
        description: "Intelligent chatbot with retrieval-augmented generation (RAG) that answers questions using a private knowledge base, deployed on WhatsApp & Telegram.",
        emoji: "🤖",
        category: "ai",
        tags: ["n8n", "OpenAI", "Pinecone", "WhatsApp API", "Telegram API"],
        liveUrl: "",
        githubUrl: "https://github.com/mrkhanservices"
      },
      {
        id: 2,
        title: "Multi-Agent Task Orchestrator",
        description: "Collaboration network where specialized AI agents collaborate on research, content creation, and lead generation tasks automatically.",
        emoji: "🧠",
        category: "ai",
        tags: ["n8n", "GPT-4", "LangChain", "Supabase"],
        liveUrl: "",
        githubUrl: "https://github.com/mrkhanservices"
      },
      {
        id: 3,
        title: "AI Email Response Generator",
        description: "Drafts highly contextual, brand-aligned email replies using GPT-4, matches your communication style, and routes drafts to your inbox.",
        emoji: "✉️",
        category: "ai",
        tags: ["Make.com", "OpenAI", "Gmail API", "Outlook", "Slack"],
        liveUrl: "",
        githubUrl: "https://github.com/mrkhanservices"
      },
      {
        id: 4,
        title: "Google Maps Lead Scraper + CRM Sync",
        description: "Scrapes business listings from Google Maps by category & location, enriches details using AI, and syncs qualified leads to your CRM.",
        emoji: "🗺️",
        category: "lead",
        tags: ["n8n", "Google Maps API", "Apify", "HubSpot", "Google Sheets"],
        liveUrl: "",
        githubUrl: "https://github.com/mrkhanservices"
      },
      {
        id: 5,
        title: "LinkedIn Auto-Outreach Pipeline",
        description: "Automated prospecting campaign that sends personalized LinkedIn messages, schedules follow-ups, and logs interest inside CRM.",
        emoji: "💼",
        category: "lead",
        tags: ["n8n", "LinkedIn API", "GPT-4", "Pipedrive CRM"],
        liveUrl: "",
        githubUrl: "https://github.com/mrkhanservices"
      },
      {
        id: 6,
        title: "AI Lead Qualification Engine",
        description: "Scores incoming leads based on custom criteria, routes high-intent leads to Slack for instant callback, and enters others into nurture flows.",
        emoji: "🎯",
        category: "lead",
        tags: ["Make.com", "OpenAI API", "Slack Webhooks", "Mailchimp"],
        liveUrl: "",
        githubUrl: "https://github.com/mrkhanservices"
      },
      {
        id: 7,
        title: "Multi-Platform Content Publisher",
        description: "AI workflow that drafts platform-specific social captions, creates matching visual assets, and auto-publishes to multiple networks.",
        emoji: "📱",
        category: "social",
        tags: ["n8n", "GPT-4", "DALL-E 3", "Buffer API", "LinkedIn", "Instagram"],
        liveUrl: "",
        githubUrl: "https://github.com/mrkhanservices"
      },
      {
        id: 8,
        title: "YouTube Shorts Auto-Creator",
        description: "Generates vertical video scripts from blog URLs, overlays ElevenLabs voiceovers, compiles stock assets, and schedules uploads.",
        emoji: "🎬",
        category: "social",
        tags: ["n8n", "ElevenLabs API", "FFmpeg Script", "YouTube Data API", "TikTok API"],
        liveUrl: "",
        githubUrl: "https://github.com/mrkhanservices"
      },
      {
        id: 9,
        title: "Shopify Order Processing Pipeline",
        description: "Automatically creates invoices, formats shipping labels, adjusts supplier inventories, and updates clients via SMS & Email on new orders.",
        emoji: "🛍️",
        category: "ecommerce",
        tags: ["n8n", "Shopify API", "Stripe API", "Twilio SMS", "SendGrid"],
        liveUrl: "",
        githubUrl: "https://github.com/mrkhanservices"
      },
      {
        id: 10,
        title: "WooCommerce Inventory Sync",
        description: "Keeps e-commerce inventories, warehouse stocks, and supplier feeds perfectly aligned in real-time, with low stock notifications.",
        emoji: "🔄",
        category: "ecommerce",
        tags: ["Make.com", "WooCommerce API", "Google Sheets API", "Slack Alerts"],
        liveUrl: "",
        githubUrl: "https://github.com/mrkhanservices"
      },
      {
        id: 11,
        title: "Competitor Price Monitor",
        description: "Scrapes target competitor websites daily, logs price differences, and alerts your team of significant price updates or stock changes.",
        emoji: "📊",
        category: "data",
        tags: ["n8n", "Puppeteer", "Google Sheets", "Email Notifications"],
        liveUrl: "",
        githubUrl: "https://github.com/mrkhanservices"
      },
      {
        id: 12,
        title: "AI Data Enrichment Pipeline",
        description: "Takes list of raw domains, scrapes websites, matches company data via enrichment APIs, and outputs highly qualified B2B contacts.",
        emoji: "💾",
        category: "data",
        tags: ["n8n", "OpenAI", "Clearbit API", "Airtable API"],
        liveUrl: "",
        githubUrl: "https://github.com/mrkhanservices"
      },
      {
        id: 13,
        title: "AI Newsletter Generator",
        description: "Curates relevant industry articles via RSS, summarizes contents using GPT-4, layouts a beautiful newsletter, and schedules via Mailchimp.",
        emoji: "📰",
        category: "email",
        tags: ["Make.com", "GPT-4 API", "Mailchimp API", "RSS Reader"],
        liveUrl: "",
        githubUrl: "https://github.com/mrkhanservices"
      },
      {
        id: 14,
        title: "Drip Campaign Automator",
        description: "Custom email marketing sequences with advanced behavior-based logic, click tracking, and lead-status updates in your database.",
        emoji: "✉️",
        category: "email",
        tags: ["n8n", "SendGrid API", "Airtable DB", "Webhooks"],
        liveUrl: "",
        githubUrl: "https://github.com/mrkhanservices"
      }
    ]
  },

  testimonials: [
    {
      stars: "★★★★★",
      text: "Saved our team 20+ hours every week. The lead generation system runs completely on autopilot — exactly what we needed.",
      author: "Marketing Agency",
      title: "Lead Generation Client"
    },
    {
      stars: "★★★★★",
      text: "The AI chatbot handles 80% of our support tickets now. Response time went from hours to instant. Game changer.",
      author: "SaaS Company",
      title: "AI Chatbot Client"
    },
    {
      stars: "★★★★★",
      text: "We post daily on 4 platforms without lifting a finger. The content quality is amazing — our engagement tripled.",
      author: "E-Commerce Brand",
      title: "Social Media Client"
    }
  ],

  contact: {
    tag: "Contact",
    title: "Let's automate",
    titleHighlight: "your business",
    description:
      "Tell me what's eating your time, and I'll show you how to eliminate it. The first consultation is completely free.",
    info: [
      {
        icon: "email",
        title: "Email Me",
        value: "mrkhan.officialsite@gmail.com"
      },
      {
        icon: "location",
        title: "Location",
        value: "Remote / Worldwide"
      },
      {
        icon: "availability",
        title: "Availability",
        value: "Available for new projects"
      }
    ],
    social: [
      {
        name: "WhatsApp",
        icon: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/whatsapp.svg",
        url: "https://wa.me/923285792098"
      },
      {
        name: "LinkedIn",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
        url: "https://www.linkedin.com/in/muhammad-roman-khan-8245a0328"
      },
      {
        name: "GitHub",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        url: "https://github.com/mrkhanservices"
      }
    ],
    form: {
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "Tell me about your manual bottlenecks...",
      submitText: "Send Message"
    }
  },

  footer: {
    brand: "MrKhanServices",
    text: "Building reliable, scalable, and intelligent workflow automation systems.",
    links: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Workflows", href: "#projects" },
      { label: "Contact", href: "#contact" }
    ],
    copyright: "All rights reserved.",
    heart: "Made with ❤️ By MrKhanServices"
  },

  navbar: {
    brand: "MrKhanServices",
    links: [
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Workflows", href: "#projects" },
      { label: "Contact", href: "#contact" }
    ],
    cta: "Contact Me"
  }
};

export default PortfolioContent;
