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
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How is this different from free Enneagram tests online?","acceptedAnswer":{"@type":"Answer","text":"We have conversations. Free tests ask fixed questions. When your answers conflict, we notice and dig deeper. When you describe who you want to be instead of who you are, we redirect. Static surveys can't do this."}},{"@type":"Question","name":"How long does the assessment take?","acceptedAnswer":{"@type":"Answer","text":"Your first conversation runs 15-25 minutes. Unlike surveys that rush you through 200+ questions, we take the time needed to understand your actual patterns. You can pause and return anytime."}},{"@type":"Question","name":"How accurate is AI compared to working with a human expert?","acceptedAnswer":{"@type":"Answer","text":"Our AI interviewer is available 24/7, trained on thousands of typing sessions, and doesn't get influenced by personal biases. It catches patterns consistently that humans might miss. You get expert-level analysis whenever you want to deepen your understanding."}},{"@type":"Question","name":"What if I get a different result than I expected?","acceptedAnswer":{"@type":"Answer","text":"That's often a good sign. Most people have some attachment to a particular type, which skews survey answers. We show you the specific patterns that led to your result. You might discover you've been mistyped for years."}},{"@type":"Question","name":"Can I use this for my team or coaching clients?","acceptedAnswer":{"@type":"Answer","text":"Yes. Each person gets their own private assessment. You can invite team members or clients to complete their assessments, and we provide compiled insights that respect individual privacy."}}]}} />

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
        <section aria-label="Hero" className="mx-auto max-w-5xl px-6 py-28 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text mb-6 leading-tight">
            Finally know your real Enneagram type
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
            Our AI asks follow-up questions that surveys can't, revealing your actual type instead of generic results that mostly fit.
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
                  {status === 'loading' ? 'Sending...' : `Start the conversation`}
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
        <section aria-label="Problem" className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-bold text-text text-center mb-6">
            You're making leadership decisions without knowing your actual patterns
          </h2>
          <p className="text-text-secondary text-center leading-relaxed">
            You've taken three different Enneagram tests and gotten three different results. Each one claims to reveal your 'true type' but none explain why your answers keep shifting or why the results feel only partially right. Survey-based tools force nuanced behavioral patterns into rigid multiple choice, missing the contradictions and context that reveal how you actually operate under pressure.
          </p>
        </section>

        <div className="bg-background-elevated">
        {/* Features */}
        <section aria-label="Features" className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold text-text text-center mb-10">How conversational AI catches what surveys miss</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <section aria-label="Uncover contradictions surveys can\'t catch" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Uncover contradictions surveys can't catch</h3>
            <p className="text-text-secondary text-sm leading-relaxed">When you describe yourself as calm but mention explosive anger episodes, we dig deeper instead of averaging conflicting answers. Discover the gap between who you think you are and how you actually behave under pressure.</p>
          </section>
          <section aria-label="Get sharper results every time you return" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Get sharper results every time you return</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Upload journals or notes from other AI conversations to refine your profile continuously. Your Enneagram result becomes more accurate as we learn your actual patterns, not just how you summarize yourself in one sitting.</p>
          </section>
          <section aria-label="See your complete type profile with precision" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">See your complete type profile with precision</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Get core type, wing, and instinctual variant with strength indicators for each. An 8w7 social type operates differently than an 8w9 self-preservation type — we surface those meaningful distinctions instead of giving you just a number.</p>
          </section>
          </div>
        </section>
        </div>

        {/* How It Works */}
        <section aria-label="How it works" className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-bold text-text text-center mb-10">How your assessment gets more accurate over time</h2>
          <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Dynamic interview</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Our AI interviewer asks follow-up questions when your answers conflict, probes deeper when responses seem rehearsed, and follows threads that static surveys miss entirely.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Upload your context</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Feed in journals, notes, or written reflections. Your existing self-reflection work becomes part of your assessment, creating a richer picture than any single session could capture.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Refine over time</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Return weeks or months later. The AI remembers your previous responses and asks different questions based on what you've already revealed, making your type assessment more precise with each conversation.</p>
            </div>
          </div>
          </div>
        </section>

        <div className="bg-background-elevated">
        {/* Audience */}
        <section aria-label="Audience" className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-bold text-text text-center mb-6">
            For leaders and coaches who need accurate personality insights
          </h2>
          <p className="text-text-secondary text-center leading-relaxed">
            Whether you're an executive making leadership decisions, a coach guiding clients, or an HR leader building teams, you've likely encountered the frustration of Enneagram results that feel almost right but miss something crucial. Static surveys force complex behavioral patterns into multiple choice answers, losing the contradictions and context that reveal actual types. Our conversational AI catches these nuances, delivering the reliable personality insights you need for effective leadership and coaching decisions.
          </p>
        </section>
        </div>

        {/* Final CTA */}
        <section aria-label="Final CTA" className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-text mb-6">Get your actual Enneagram type in one conversation</h2>
          <p className="text-text-secondary mb-10 max-w-xl mx-auto">Stop guessing. Our AI interviewer adapts to your responses in real-time, catching the nuances that determine your real type.</p>
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
                  {status === 'loading' ? 'Sending...' : `Start the conversation`}
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
        <section aria-label="Frequently Asked Questions" className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-bold text-text text-center mb-10">Common questions about AI Enneagram typing</h2>
          <div className="space-y-8">
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                How is this different from free Enneagram tests online?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                We have conversations. Free tests ask fixed questions. When your answers conflict, we notice and dig deeper. When you describe who you want to be instead of who you are, we redirect. Static surveys can't do this.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                How long does the assessment take?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Your first conversation runs 15-25 minutes. Unlike surveys that rush you through 200+ questions, we take the time needed to understand your actual patterns. You can pause and return anytime.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                How accurate is AI compared to working with a human expert?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Our AI interviewer is available 24/7, trained on thousands of typing sessions, and doesn't get influenced by personal biases. It catches patterns consistently that humans might miss. You get expert-level analysis whenever you want to deepen your understanding.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                What if I get a different result than I expected?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                That's often a good sign. Most people have some attachment to a particular type, which skews survey answers. We show you the specific patterns that led to your result. You might discover you've been mistyped for years.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                Can I use this for my team or coaching clients?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Yes. Each person gets their own private assessment. You can invite team members or clients to complete their assessments, and we provide compiled insights that respect individual privacy.
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
