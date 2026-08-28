import { motion } from "framer-motion";
import "../styles/WeBuild.css";

export default function WeBuild() {
  const cards = [
    {
      title: "Built for real business outcomes",
      description:
        "We create AI agents, chatbots, and automations designed to save time, capture demand, and move your business forward."
    },
    {
      title: "Fixed scope or hourly support",
      description:
        "Choose a clearly scoped, fixed-price project or flexible hourly support for ongoing improvements, strategy, and technical help."
    },
    {
      title: "Proven in the field",
      description:
        "Our work is shaped by real client needs across industries, with systems built to perform reliably beyond the demo."
    },
    {
      title: "Systems we stand behind",
      description:
        "We build practical tools you can own, understand, and improve—so your team can keep getting value long after launch."
    }
  ];

  return (
    <section className="we-build-section" id="about-preview">
      <div className="we-build__inner">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="we-build__heading"
        >
          We don&apos;t just advise. We build.
        </motion.h2>

        {/* 4 Cards Grid - Matches Image 2 perfectly */}
        <div className="we-build__grid">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="we-build__card"
            >
              <h3 className="we-build__card-title">{card.title}</h3>
              <p className="we-build__card-text">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
