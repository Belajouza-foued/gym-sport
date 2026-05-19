"use client";

import { useState } from "react";

const faqs = [
  {
    question: "L'expérience est-elle gratuite ?",
    answer:
      "La séance d'essai dure 30 minutes. Veuillez vérifier les disponibilités via contact ou réservation.",
  },
  {
    question: "Quels objets dois-je apporter ?",
    answer:
      "Pour la musculation, veuillez apporter des chaussures d'intérieur, une serviette et de l'eau.",
  },
  {
    question:
      "Puis-je recevoir des soins après mon accouchement ? Est-il possible d’amener mon enfant ?",
    answer:
      "Nous proposons des soins post-partum. Les enfants sont les bienvenus à certaines heures selon réservation.",
  },
  {
    question: "Est-ce adapté aux débutants ?",
    answer:
      "Oui, nous adaptons l’intensité à votre niveau pour une expérience confortable et personnalisée.",
  },
  {
    question: "Combien de temps faut-il pour voir des résultats ?",
    answer:
      "En général, les résultats apparaissent après quelques semaines de pratique régulière.",
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer:
      "Nous acceptons espèces, cartes bancaires et virements.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-white py-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          FAQ | Foire aux questions
        </h2>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-2xl p-5 cursor-pointer"
              onClick={() => toggle(index)}
            >
              {/* QUESTION */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">
                  {faq.question}
                </h3>

                <span className="text-2xl text-green-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>

              {/* ANSWER */}
              {openIndex === index && (
                <p className="mt-4 text-gray-400 leading-7">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}