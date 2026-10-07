import Link from "next/link";
import { mockFaq } from "@/lib/mock/faq";

export function FaqTeaser() {
  return (
    <section className="bg-cream border-b-2 border-charcoal py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="font-body text-sm uppercase tracking-widest">
          Common Questions
        </p>
        <h2 className="font-display text-5xl md:text-7xl mt-4 mb-12">FAQ</h2>
        <div className="divide-y-2 divide-charcoal border-y-2 border-charcoal">
          {mockFaq.slice(0, 5).map((item) => (
            <details key={item.question} className="group py-6">
              <summary className="flex justify-between items-start cursor-pointer list-none">
                <span className="font-display text-2xl md:text-3xl flex-1 pr-6">
                  {item.question.toUpperCase()}
                </span>
                <span className="font-display text-3xl group-open:rotate-45 transition-transform leading-none">
                  +
                </span>
              </summary>
              <p className="font-body text-base mt-4 pr-10">{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="font-display text-xl underline underline-offset-4"
          >
            SEE ALL FAQS →
          </Link>
        </div>
      </div>
    </section>
  );
}
