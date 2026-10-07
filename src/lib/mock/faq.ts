export type Faq = { question: string; answer: string; category: string };

export const mockFaq: Faq[] = [
  {
    question: "What time do gates open?",
    answer: "Gates open at 6:00 PM Friday and 11:00 AM Saturday and Sunday.",
    category: "Logistics",
  },
  {
    question: "Can I bring my own food?",
    answer:
      "Outside food and sealed water bottles are welcome. No glass containers.",
    category: "Policies",
  },
  {
    question: "Is parking free?",
    answer:
      "General parking is free. Preferred parking passes are available on request.",
    category: "Logistics",
  },
  {
    question: "Is this event kid-friendly?",
    answer:
      "Absolutely. Mutton busting signup is open to kids 4 to 7 at the Saturday event.",
    category: "Kids",
  },
  {
    question: "What if it rains?",
    answer:
      "The event runs rain or shine. Refunds are only issued if the committee cancels.",
    category: "Policies",
  },
  {
    question: "Where is the venue?",
    answer:
      "Lake Havasu Rodeo Grounds in Lake Havasu City, Arizona. See the Contact page for directions.",
    category: "Logistics",
  },
];
