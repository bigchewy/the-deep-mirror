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
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How is this different from other Enneagram tests?","acceptedAnswer":{"@type":"Answer","text":"We don't use surveys. Our AI interviewer asks follow-up questions based on your specific answers, probes inconsistencies, and explores patterns that emerge during your conversation. Static surveys can't adapt when your first answer reveals something worth investigating deeper."}},{"@type":"Question","name":"How accurate is AI compared to a human typing session?","acceptedAnswer":{"@type":"Answer","text":"The AI processes thousands of Enneagram patterns simultaneously and doesn't get tired or distracted. It catches contradictions between your answers that humans might miss and asks the uncomfortable questions a human interviewer might avoid. Plus, it builds a more complete picture over multiple sessions."}},{"@type":"Question","name":"What if I get a different result than other tests gave me?","acceptedAnswer":{"@type":"Answer","text":"That's common. Most people have been mistyped by survey-based tools because surveys can't detect when you're describing who you want to be instead of who you actually are. Our conversational approach surfaces these blind spots through follow-up questions."}},{"@type":"Question","name":"Do I need to know anything about the Enneagram beforehand?","acceptedAnswer":{"@type":"Answer","text":"No. The AI explains concepts as they become relevant to your specific patterns. If you do have prior knowledge, it will probe whether your self-assessment aligns with how you actually behave in the situations you describe."}},{"@type":"Question","name":"How long does the assessment take?","acceptedAnswer":{"@type":"Answer","text":"Your first session typically runs 15-25 minutes, depending on how much the AI needs to explore. Unlike surveys that rush you through predetermined questions, the conversation continues until the AI has enough information to provide a confident assessment."}},{"@type":"Question","name":"Can I use this for my team or coaching clients?","acceptedAnswer":{"@type":"Answer","text":"Yes. You can purchase assessments for team members or clients. Each person gets their own private conversation with the AI, and you receive a summary report of their type, wing, and key behavioral patterns without seeing their personal responses."}},{"@type":"Question","name":"What if the AI gets my type wrong?","acceptedAnswer":{"@type":"Answer","text":"The assessment improves over time as you add more context. If the initial result doesn't feel accurate, you can return with specific examples of situations where you behaved differently than the type description suggests, and the AI will refine its assessment."}},{"@type":"Question","name":"How does this handle sensitive or personal topics?","acceptedAnswer":{"@type":"Answer","text":"The AI focuses on behavioral patterns, not personal details. It might ask about how you handle conflict at work or what motivates your decision-making, but it won't probe traumatic experiences or private relationships unless you voluntarily bring them up as relevant examples."}}]}} />

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
            AI Enneagram assessment
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
            Get your type through conversation, not surveys. Our AI interviewer adapts questions based on your answers, delivering accuracy no static test can match.
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
                  {status === 'loading' ? 'Sending...' : `Start assessment`}
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
            Every Enneagram test gives you different results
          </h2>
          <p className="text-text-secondary text-center leading-relaxed">
            Static surveys can't adapt when your answers contradict each other or when you're describing who you want to be instead of who you are. They ask fixed questions, accept your first response, and force you into a single type based on limited data. Even the most sophisticated tools like Integrative 9 rely on basic conditional logic that breaks down when human complexity doesn't fit neat categories.
          </p>
        </section>

        <div className="bg-background-elevated">
        {/* Features */}
        <section aria-label="Features" className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold text-text text-center mb-10">How conversational AI delivers what surveys can't</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <section aria-label="Dynamic questioning that follows your contradictions" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Dynamic questioning that follows your contradictions</h3>
            <p className="text-text-secondary text-sm leading-relaxed">When your answers conflict, our AI notices and explores deeper. No static survey can ask follow-up questions or catch when you're describing who you want to be instead of who you are.</p>
          </section>
          <section aria-label="Context integration from your existing work" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Context integration from your existing work</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Upload journals, notes, or AI conversations you've already had about yourself. Your assessment builds on material that reflects how you actually think, not just how you summarize yourself under pressure.</p>
          </section>
          <section aria-label="Wing and subtype precision, not just a number" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Wing and subtype precision, not just a number</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Get your core type, wing tendency, and instinctual variant with confidence scores. An 8w7 self-preservation operates completely differently than an 8w9 social — we surface those distinctions.</p>
          </section>
          <section aria-label="Results that sharpen over time" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Results that sharpen over time</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Your first session delivers a complete assessment. Return visits refine accuracy as the AI learns your patterns. The Enneagram becomes a living model of how you operate, not a frozen quiz result.</p>
          </section>
          <section aria-label="Handles executive-level complexity" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Handles executive-level complexity</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Leadership roles create behavioral masks that fool simple surveys. Our conversational approach distinguishes between stress responses, learned behaviors, and core motivational patterns.</p>
          </section>
          <section aria-label="Team typing without group sessions" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Team typing without group sessions</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Generate accurate team profiles without scheduling conflicts or group dynamics affecting individual results. Each person gets private, in-depth assessment that reveals authentic patterns.</p>
          </section>
          </div>
        </section>
        </div>

        {/* How It Works */}
        <section aria-label="How it works" className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-bold text-text text-center mb-10">How it works</h2>
          <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Start the conversation</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Our AI interviewer asks about specific situations from your work and life. No multiple choice questions. No rating scales. Just real scenarios that reveal how you actually think and react.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Dynamic follow-up questions</h3>
              <p className="text-text-secondary text-sm leading-relaxed">When your answers reveal patterns or contradictions, we probe deeper. The AI adapts each question based on everything you've shared, pursuing threads that a static survey would miss completely.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Get your detailed type profile</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Receive your Enneagram type, wing, and strength indicators in your first session. Unlike other tools that force a single number, we show you the nuanced picture of how different tendencies show up in your behavior.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">4</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Refine over time</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Return for follow-up sessions or upload journal entries and notes from other AI conversations. Your profile becomes more precise as we learn more about how you actually operate, not just how you describe yourself.</p>
            </div>
          </div>
          </div>
        </section>

        <div className="bg-background-elevated">
        {/* Audience */}
        <section aria-label="Audience" className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-bold text-text text-center mb-6">
            For anyone who knows surface-level answers aren't enough
          </h2>
          <p className="text-text-secondary text-center leading-relaxed">
            You've probably taken an Enneagram test before. Maybe you got Type 8 one day and Type 3 the next, depending on your mood or how you interpreted the questions. The problem isn't you — it's that surveys can't have real conversations. They can't notice when your answers contradict each other, can't dig deeper when you're clearly describing who you want to be rather than who you are, and can't adapt when they hit something worth exploring. You deserve better than multiple choice.
          </p>
        </section>
        </div>

        {/* Final CTA */}
        <section aria-label="Final CTA" className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-text mb-6">Ready for your actual type?</h2>
          <p className="text-text-secondary mb-10 max-w-xl mx-auto">Stop settling for conflicting results from static surveys. Get the conversational assessment that adapts to how you actually think.</p>
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
                  {status === 'loading' ? 'Sending...' : `Start assessment`}
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
          <h2 className="text-2xl font-bold text-text text-center mb-10">Questions about The Deep Mirror</h2>
          <div className="space-y-8">
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                How is this different from other Enneagram tests?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                We don't use surveys. Our AI interviewer asks follow-up questions based on your specific answers, probes inconsistencies, and explores patterns that emerge during your conversation. Static surveys can't adapt when your first answer reveals something worth investigating deeper.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                How accurate is AI compared to a human typing session?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                The AI processes thousands of Enneagram patterns simultaneously and doesn't get tired or distracted. It catches contradictions between your answers that humans might miss and asks the uncomfortable questions a human interviewer might avoid. Plus, it builds a more complete picture over multiple sessions.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                What if I get a different result than other tests gave me?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                That's common. Most people have been mistyped by survey-based tools because surveys can't detect when you're describing who you want to be instead of who you actually are. Our conversational approach surfaces these blind spots through follow-up questions.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                Do I need to know anything about the Enneagram beforehand?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                No. The AI explains concepts as they become relevant to your specific patterns. If you do have prior knowledge, it will probe whether your self-assessment aligns with how you actually behave in the situations you describe.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                How long does the assessment take?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Your first session typically runs 15-25 minutes, depending on how much the AI needs to explore. Unlike surveys that rush you through predetermined questions, the conversation continues until the AI has enough information to provide a confident assessment.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                Can I use this for my team or coaching clients?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Yes. You can purchase assessments for team members or clients. Each person gets their own private conversation with the AI, and you receive a summary report of their type, wing, and key behavioral patterns without seeing their personal responses.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                What if the AI gets my type wrong?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                The assessment improves over time as you add more context. If the initial result doesn't feel accurate, you can return with specific examples of situations where you behaved differently than the type description suggests, and the AI will refine its assessment.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                How does this handle sensitive or personal topics?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                The AI focuses on behavioral patterns, not personal details. It might ask about how you handle conflict at work or what motivates your decision-making, but it won't probe traumatic experiences or private relationships unless you voluntarily bring them up as relevant examples.
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
