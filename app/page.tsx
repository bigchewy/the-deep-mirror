'use client';

import { useState, FormEvent } from 'react';
import JsonLd from '../components/content/JsonLd';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error — please try again');
    }
  }

  return (
    <>
      <JsonLd data={{"@context":"https://schema.org","@type":"Organization","name":"The Deep Mirror","url":"https://the-deep-mirror.vercel.app"}} />
      <JsonLd data={{"@context":"https://schema.org","@type":"WebSite","name":"The Deep Mirror","url":"https://the-deep-mirror.vercel.app"}} />
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How is this different from every other Enneagram test?","acceptedAnswer":{"@type":"Answer","text":"We don't use surveys. At all. Instead of asking you to pick A, B, or C, we have a conversation. When your answers seem to conflict, we notice and dig deeper. When you describe who you want to be instead of who you are, we redirect. Static surveys can't do this because they can't think."}},{"@type":"Question","name":"Why don't you give me a type immediately?","acceptedAnswer":{"@type":"Answer","text":"Because honest typing takes time. You might finish your first session hearing you show strong Type 8 tendencies with meaningful 6 and 2 patterns. That's not failure to type you—that's honesty about how personality actually works. Come back in two weeks after observing yourself, and your next session builds on what we already know."}},{"@type":"Question","name":"What if I've already taken other Enneagram tests?","acceptedAnswer":{"@type":"Answer","text":"Perfect. Tell us what types you've gotten and why they felt incomplete. That gives us crucial data about what resonates and what doesn't. We're not starting from scratch—we're starting from your existing self-knowledge and making it more precise."}},{"@type":"Question","name":"Can I upload my journal entries or notes from other conversations?","acceptedAnswer":{"@type":"Answer","text":"Yes. The more context you give us about how you actually think and behave, the more accurate your result becomes. Upload anything that shows your real patterns—journal entries, notes from therapy, even transcripts from conversations with ChatGPT about yourself."}},{"@type":"Question","name":"How long does a session take?","acceptedAnswer":{"@type":"Answer","text":"Your first conversation typically runs 20-30 minutes. Follow-up sessions are shorter because we already know your patterns. But we never rush. If you're in the middle of exploring something important, we don't cut you off because a timer says stop."}},{"@type":"Question","name":"Do you identify wings and subtypes?","acceptedAnswer":{"@type":"Answer","text":"Yes, with strength indicators. You don't just learn you're an 8—you learn you're an 8 wing 7 with strong self-preservation instincts. We show you how strongly each tendency appears in your responses, so you understand the nuances of how your type manifests."}},{"@type":"Question","name":"What happens to the information I share?","acceptedAnswer":{"@type":"Answer","text":"Your conversations and uploaded content stay with your account and make your future sessions more accurate. We don't share personal information, obviously. The whole point is building a detailed, private model of how your mind works."}},{"@type":"Question","name":"Is this just ChatGPT with Enneagram prompts?","acceptedAnswer":{"@type":"Answer","text":"No. We've trained specifically on Enneagram patterns, typing methodologies, and thousands of hours of actual typing conversations. We know when to push back on your self-description, when to follow a thread deeper, and how to spot the subtle patterns that reveal core motivations."}}]}} />

      <header className="border-b border-border bg-background-elevated">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/" className="text-xl font-bold text-primary" style={{ fontFamily: "'Work Sans', sans-serif" }}>
            The Deep Mirror
          </a>
          <div className="flex items-center gap-6 text-sm">
            <a href="/blog" className="text-text-muted hover:text-text transition-colors">Blog</a>
            <a href="/comparisons" className="text-text-muted hover:text-text transition-colors">Comparisons</a>
            <a href="/faq" className="text-text-muted hover:text-text transition-colors">FAQ</a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <div className="bg-background-elevated">
        {/* Hero */}
        <section aria-label="Hero" className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text mb-4 leading-tight">
            AI Enneagram Assessment
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Your type gets more accurate every time you use it. No surveys, just conversation.
          </p>

          {/* Email Signup */}
          <div className="max-w-md mx-auto">
            {status === 'success' ? (
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <p className="text-primary font-medium">Thanks for signing up! We&apos;ll be in touch.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-background-elevated border border-border text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : `Start Assessment`}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-2">{errorMsg}</p>
            )}
          </div>
        </section>
        </div>

        {/* Problem */}
        <section aria-label="Problem" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-4">
            Most Enneagram tests give you a number, not insight
          </h2>
          <p className="text-text-secondary text-center leading-relaxed">
            You take a survey, answer 144 questions about hypothetical scenarios, and get a type based on whoever scored highest. But real personality doesn't work in multiple choice. The best surveys use basic conditional logic to branch questions, but they still can't follow up when your answers contradict each other or dig deeper when you're clearly describing who you want to be instead of who you are.
          </p>
        </section>

        <div className="bg-background-elevated">
        {/* Features */}
        <section aria-label="Features" className="mx-auto max-w-5xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">How The Deep Mirror works differently</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <section aria-label="Dynamic interviewing replaces static surveys" className="shadow-lg bg-background-elevated rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Dynamic interviewing replaces static surveys</h3>
            <p className="text-text-secondary text-sm leading-relaxed">The AI asks follow-up questions when your answers conflict or seem rehearsed. It probes deeper when you describe who you want to be instead of who you are, something no survey can catch.</p>
          </section>
          <section aria-label="Your context shapes your results" className="shadow-lg bg-background-elevated rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Your context shapes your results</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Upload journal entries, performance reviews, or notes from other AI conversations. The assessment incorporates real examples of how you think and behave, not just how you summarize yourself under pressure.</p>
          </section>
          <section aria-label="Nuanced output beyond just a number" className="shadow-lg bg-background-elevated rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Nuanced output beyond just a number</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Get your type, wing, and strength of each tendency. An Eight wing Seven operates completely differently from an Eight wing Nine, and you'll see exactly where you fall on the spectrum.</p>
          </section>
          <section aria-label="Results refine over time" className="shadow-lg bg-background-elevated rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Results refine over time</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Each session builds on previous conversations. The AI remembers inconsistencies to explore and patterns to verify, creating a living model of your personality that sharpens with use.</p>
          </section>
          <section aria-label="Handles complexity that breaks surveys" className="shadow-lg bg-background-elevated rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Handles complexity that breaks surveys</h3>
            <p className="text-text-secondary text-sm leading-relaxed">When you show strong patterns of multiple types, the AI explores the tension instead of forcing a single answer. It maps how different types show up in different contexts of your life.</p>
          </section>
          <section aria-label="Built for professional application" className="shadow-lg bg-background-elevated rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Built for professional application</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Designed for executives who need accurate self-knowledge for leadership decisions and coaches who require reliable typing for client work. The depth matches the stakes of professional development.</p>
          </section>
          </div>
        </section>
        </div>

        {/* How It Works */}
        <section aria-label="How it works" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">Three steps to your most accurate Enneagram result</h2>
          <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Start a conversation</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The AI interviewer asks about your patterns and motivations. When your answers conflict or seem incomplete, it follows up with better questions. No multiple choice, no predetermined paths.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Upload your context</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Feed in journals, notes, or conversations from other AI tools. The more material that reflects how you actually think and behave, the more precise your result becomes.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Return for refinement</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Your assessment evolves as you do. Each session builds on previous conversations, sharpening your type, wing, and subtype accuracy over time.</p>
            </div>
          </div>
          </div>
        </section>

        <div className="bg-background-elevated">
        {/* Audience */}
        <section aria-label="Audience" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-4">
            Built for people who know themselves well enough to know they don't
          </h2>
          <p className="text-text-secondary text-center leading-relaxed">
            You've taken personality tests before. Maybe you got different results each time, or the right answer felt like none of the above. The Deep Mirror works differently because it knows that self-knowledge isn't multiple choice. Whether you're leading teams, coaching executives, or committed to understanding what drives your decisions, you deserve a tool that matches the complexity of who you actually are.
          </p>
        </section>
        </div>

        {/* Final CTA */}
        <section aria-label="Final CTA" className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-text mb-4">Start your first conversation</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">No surveys to game. No multiple choice to second-guess. Just you, the AI, and the kind of conversation that actually reveals how you operate.</p>
          <div className="max-w-md mx-auto">
            {status === 'success' ? (
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <p className="text-primary font-medium">Thanks for signing up! We&apos;ll be in touch.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-background-elevated border border-border text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : `Begin Assessment`}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-2">{errorMsg}</p>
            )}
          </div>
        </section>

        <div className="bg-background-elevated">
        {/* FAQ */}
        <section aria-label="Frequently Asked Questions" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">Your questions, straight answers</h2>
          <div className="space-y-6">
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                How is this different from every other Enneagram test?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                We don't use surveys. At all. Instead of asking you to pick A, B, or C, we have a conversation. When your answers seem to conflict, we notice and dig deeper. When you describe who you want to be instead of who you are, we redirect. Static surveys can't do this because they can't think.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                Why don't you give me a type immediately?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Because honest typing takes time. You might finish your first session hearing you show strong Type 8 tendencies with meaningful 6 and 2 patterns. That's not failure to type you—that's honesty about how personality actually works. Come back in two weeks after observing yourself, and your next session builds on what we already know.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                What if I've already taken other Enneagram tests?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Perfect. Tell us what types you've gotten and why they felt incomplete. That gives us crucial data about what resonates and what doesn't. We're not starting from scratch—we're starting from your existing self-knowledge and making it more precise.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                Can I upload my journal entries or notes from other conversations?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Yes. The more context you give us about how you actually think and behave, the more accurate your result becomes. Upload anything that shows your real patterns—journal entries, notes from therapy, even transcripts from conversations with ChatGPT about yourself.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                How long does a session take?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Your first conversation typically runs 20-30 minutes. Follow-up sessions are shorter because we already know your patterns. But we never rush. If you're in the middle of exploring something important, we don't cut you off because a timer says stop.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                Do you identify wings and subtypes?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Yes, with strength indicators. You don't just learn you're an 8—you learn you're an 8 wing 7 with strong self-preservation instincts. We show you how strongly each tendency appears in your responses, so you understand the nuances of how your type manifests.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                What happens to the information I share?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Your conversations and uploaded content stay with your account and make your future sessions more accurate. We don't share personal information, obviously. The whole point is building a detailed, private model of how your mind works.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                Is this just ChatGPT with Enneagram prompts?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                No. We've trained specifically on Enneagram patterns, typing methodologies, and thousands of hours of actual typing conversations. We know when to push back on your self-description, when to follow a thread deeper, and how to spot the subtle patterns that reveal core motivations.
              </p>
            </details>
          </div>
        </section>
        </div>
      </main>

      <footer className="border-t border-border bg-background-elevated mt-auto">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">&copy; 2026 The Deep Mirror. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="/" className="text-text-muted hover:text-text transition-colors">Home</a>
              <a href="/blog" className="text-text-muted hover:text-text transition-colors">Blog</a>
              <a href="/comparisons" className="text-text-muted hover:text-text transition-colors">Comparisons</a>
              <a href="/faq" className="text-text-muted hover:text-text transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
