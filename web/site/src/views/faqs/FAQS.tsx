import React, { useState, useRef, useEffect } from "react";
import "./faqs.scss";

const faqData = [ 
  {
    question: "¿Delivery Aldama cobra por usar la app?",
    answer:
      "No. El uso de la app para los clientes es completamente gratuito. Los cobros solo se hacen a los negocios que desean registrarse y promocionar sus productos o servicios.",
  },
  {
    question: "¿Cómo se realiza el pago de un mandado?",
    answer:
      "El pago se acuerda directamente entre el cliente y el negocio o repartidor. Delivery Aldama no interfiere en el proceso de pago.",
  },
  {
    question: "¿Puedo pagar en efectivo?",
    answer:
      "Sí. Como los pagos son independientes de la plataforma, puedes acordar pagar en efectivo o mediante el método que el negocio acepte.",
  },
  {
    question: "¿Qué tipo de negocios pueden registrarse?",
    answer:
      "Cualquier negocio local que ofrezca productos o servicios de entrega puede registrarse: tiendas, farmacias, taquerías, etc.",
  },
  {
    question: "¿Qué pasa si hay un problema con el servicio?",
    answer:
      "Puedes reportar cualquier situación directamente desde la app para que el equipo de Delivery Aldama dé seguimiento y mejore la experiencia.",
  },
];

const FaqItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpen]);

  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <button className="faq-question" onClick={onClick}>
        {question}
        <span className="icon">{isOpen ? "−" : "+"}</span>
      </button>
      <div className="faq-answer-wrapper" ref={contentRef}>
        <div className="faq-answer">{answer}</div>
      </div>
    </div>
  );
};

export default function FaqScreen() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-screen">
      <h1>❓ Preguntas Frecuentes</h1>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <FaqItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}