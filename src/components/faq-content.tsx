import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';
import faqData from '../data/faq-data';

export default function FaqContent() {
  return (
    <div className="mt-8 min-h-[300px] w-full bg-warm-red px-5 pb-8 pt-6 text-white shadow-lg sm:mt-12 sm:px-8">
      <h2 className="mb-4 text-center text-xl text-white sm:text-2xl">
        Frequently Asked Questions (FAQs)
      </h2>

      <div className="mx-auto w-full rounded-2xl bg-white px-4 py-2 shadow sm:max-w-5xl sm:px-8 sm:py-4 md:max-w-6xl">
        <Accordion type="multiple" className="w-full py-1">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="h-fit border-none p-0"
            >
              <AccordionTrigger className="mt-2 flex w-full cursor-pointer items-center justify-between space-y-3 p-0 text-left font-semibold text-warm-red focus:outline-none">
                <span className="flex-1 pr-4">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 overflow-hidden border-none transition-[max-height] duration-500 ease-in-out">
                <div
                  className="mt-2 text-sm text-maroon"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
