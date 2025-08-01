'use client';

import React, { useState, useRef, useEffect } from 'react';
import faqData from './faq-data';

interface AccordionItemProps {
  title: string;
  content: string;
}

function AccordionItem({ title, content }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('0px');

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  return (
    <div className="py-3">
      <button
        onClick={toggleAccordion}
        className="flex w-full cursor-pointer items-center justify-between text-left font-semibold text-[#8a2a2b] focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title}`}
      >
        <span className="flex-1 pr-4">{title}</span>
        <svg
          className={`h-5 w-5 flex-shrink-0 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        id={`accordion-content-${title}`}
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
      >
        <div className="mt-2 text-sm text-muted-foreground">{content}</div>
      </div>
    </div>
  );
}

export default function Accordion() {
  return (
    <div className="mx-auto mt-2 max-w-5xl rounded-2xl bg-white p-4 shadow">
      {faqData.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.question}
          content={item.answer}
        />
      ))}
    </div>
  );
}
