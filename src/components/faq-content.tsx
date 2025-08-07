'use client';

import React, { useState, useRef, useEffect } from 'react';
import faqData from '../data/faq-data';

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
    <>
      <button
        onClick={toggleAccordion}
        className="mt-3 flex w-full cursor-pointer items-center justify-between space-y-3 text-left font-semibold text-warm-red focus:outline-none"
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
        className="space-y-3 overflow-hidden transition-[max-height] duration-500 ease-in-out"
      >
        <div
          className="mt-2 text-sm text-maroon"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </>
  );
}

export default function FaqContent() {
  return (
    <div className="mt-8 min-h-[300px] w-full bg-warm-red px-5 pb-8 pt-6 text-white shadow-lg sm:mt-12 sm:px-8">
      <h2 className="mb-4 text-center text-xl text-white sm:text-2xl">
        Frequently Asked Questions (FAQs)
      </h2>
      <div className="mx-auto w-full rounded-2xl bg-white px-4 py-2 shadow sm:max-w-5xl sm:px-8 sm:py-4 md:max-w-6xl">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.question}
            content={item.answer}
          />
        ))}
      </div>
    </div>
  );
}
