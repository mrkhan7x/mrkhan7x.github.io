import { motion } from "framer-motion";
import "../styles/Skills.css";

export default function Skills() {
  return (
    <section className="why-us" id="services">
      <div className="why-us__inner">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="services__header"
        >
          <h2 className="why-us__heading">Services & Automation Systems</h2>
          <p className="services__subtitle">
            We design, build, and deploy custom AI agents and workflow automations engineered to save hours, capture demand, and scale business operations.
          </p>
        </motion.div>

        <div className="why-us__grid">
          <motion.article 
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="why-us__card"
          >
            <h3>Autonomous AI Assistants</h3>
            <p>Deploy intelligent 24/7 conversational agents powered by custom OpenAI & Voiceflow models that qualify prospects and book meetings automatically.</p>
          </motion.article>

          <motion.article 
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            viewport={{ once: true }}
            className="why-us__card"
          >
            <h3>Lead Acquisition Machines</h3>
            <p>Instant multi-channel lead response systems that scrape, enrich, score, and push inbound prospects to sales teams within seconds.</p>
          </motion.article>

          <motion.article 
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            viewport={{ once: true }}
            className="why-us__card"
          >
            <h3>Custom CRM & API Architecture</h3>
            <p>Seamless 2-way sync between HubSpot, Airtable, Supabase, and custom backend tools with standardized logging and error handling.</p>
          </motion.article>

          <motion.article 
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            viewport={{ once: true }}
            className="why-us__card"
          >
            <h3>Support & Data Triage Pipelines</h3>
            <p>Automated Slack & Email triage flows that inspect customer requests, draft contextual AI responses, and route priority tickets automatically.</p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}