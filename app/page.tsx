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
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How is this different from other Enneagram tests?","acceptedAnswer":{"@type":"Answer","text":"Every other test uses fixed surveys with predetermined questions. We use conversational AI that adapts its questions based on your specific answers. When you contradict yourself or seem to be describing your ideal self rather than your actual behavior, we notice and dig deeper. Static surveys can't do this."}},{"@type":"Question","name":"What if I get a different result than other tests?","acceptedAnswer":{"@type":"Answer","text":"That's often a sign we're getting closer to accuracy. Most people have taken multiple Enneagram tests and gotten different results because surveys can only capture surface-level responses. Our conversational approach reveals patterns that fixed questionnaires miss, especially when your conscious self-perception differs from your actual behavioral patterns."}},{"@type":"Question","name":"How long does the assessment take?","acceptedAnswer":{"@type":"Answer","text":"Your first session typically takes 20-30 minutes, but the length varies based on your responses. If you give short answers, we'll ask follow-up questions. If you contradict yourself, we'll explore that. The AI adapts the conversation length to what's needed for accurate typing rather than rushing you through predetermined questions."}},{"@type":"Question","name":"Do you determine wing and instinctual variant?","acceptedAnswer":{"@type":"Answer","text":"Yes. We identify your core type, wing, and provide strength indicators for each. Unlike surveys that force you into a single category, we show the nuanced picture of how strongly different patterns show up in your behavior. An 8w7 operates very differently from an 8w9, and we surface that distinction."}},{"@type":"Question","name":"What happens to my conversation data?","acceptedAnswer":{"@type":"Answer","text":"Your responses are used solely to improve the accuracy of your typing. We don't sell your data or use it for marketing. The AI learns from the patterns in your specific answers to ask better follow-up questions and identify contradictions that reveal your true type rather than your aspirational self-image."}},{"@type":"Question","name":"Can I retake the assessment?","acceptedAnswer":{"@type":"Answer","text":"You don't retake it, you continue it. Each time you return, the AI remembers your previous responses and asks different questions to refine your typing. This is the key advantage over static tests: your result gets more accurate over time as we gather more behavioral data points."}},{"@type":"Question","name":"What if the AI gets my type wrong?","acceptedAnswer":{"@type":"Answer","text":"The AI flags uncertainty when your responses don't clearly point to one type. Rather than forcing you into a category, we'll tell you which types you're showing strong patterns for and suggest specific things to watch for in your behavior before your next session. Accurate typing often takes multiple conversations."}},{"@type":"Question","name":"Is this suitable for team assessments?","acceptedAnswer":{"@type":"Answer","text":"Yes, but each person takes their individual assessment. We don't do group surveys or team reports. Each team member gets their own conversational typing session, and you can compare results afterward. The individual accuracy is what makes team applications valuable."}}]}} />

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
            Skip the surveys. Get typed through dynamic conversation that adapts to your responses and reveals contradictions most tests miss.
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
            Survey-Based Enneagram Tests Give You Generic Results
          </h2>
          <p className="text-text-secondary text-center leading-relaxed">
            Traditional Enneagram assessments force you to pick A, B, or C from predetermined questions that can't adapt to your actual responses. Even the best tools rely on basic conditional logic that treats complex personality patterns like a flowchart. When your answers contradict each other or reveal nuance, these static surveys can't dig deeper or ask the follow-up questions that would clarify your actual type.
          </p>
        </section>

        <div className="bg-background-elevated">
        {/* Features */}
        <section aria-label="Features" className="mx-auto max-w-5xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">How The Deep Mirror Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <section aria-label="Dynamic Interview Adapts to Your Responses" className="shadow-lg bg-background-elevated rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Dynamic Interview Adapts to Your Responses</h3>
            <p className="text-text-secondary text-sm leading-relaxed">The AI asks follow-up questions based on what you've already said, probing deeper when your answers seem contradictory or surface-level. No predetermined question paths.</p>
          </section>
          <section aria-label="Catches Social Desirability Bias in Real Time" className="shadow-lg bg-background-elevated rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Catches Social Desirability Bias in Real Time</h3>
            <p className="text-text-secondary text-sm leading-relaxed">When you describe who you want to be instead of who you actually are, the AI notices and redirects the conversation to reveal your authentic patterns.</p>
          </section>
          <section aria-label="Handles Contradictions Instead of Ignoring Them" className="shadow-lg bg-background-elevated rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Handles Contradictions Instead of Ignoring Them</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Static surveys can't resolve conflicting responses. The AI explores these contradictions directly, often leading to your most accurate type identification.</p>
          </section>
          <section aria-label="Delivers Wing and Subtype Specificity" className="shadow-lg bg-background-elevated rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Delivers Wing and Subtype Specificity</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Get your core type, wing direction, and instinctual variant in a single session. Most tools give you a number and stop there.</p>
          </section>
          <section aria-label="Integrates Your External Context" className="shadow-lg bg-background-elevated rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Integrates Your External Context</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Upload journal entries, reflection notes, or conversations from other AI tools to deepen the assessment accuracy over time.</p>
          </section>
          <section aria-label="Refines Results Through Return Visits" className="shadow-lg bg-background-elevated rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Refines Results Through Return Visits</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Your type assessment gets more precise each time you use it, building a richer picture of your behavioral patterns and motivations.</p>
          </section>
          </div>
        </section>
        </div>

        {/* How It Works */}
        <section aria-label="How it works" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">Three Steps to Accurate Typing</h2>
          <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Dynamic Interview</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Answer open-ended questions in your own words. The AI follows up on inconsistencies, explores contradictions, and asks better questions based on what you've already shared.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Pattern Recognition</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Your responses are analyzed for underlying motivations, not just surface behaviors. The system identifies your core fears, desires, and defense mechanisms across multiple contexts.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Refined Results</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Receive your type, wing, and strength indicators with specific behavioral examples. Return anytime to refine your profile as you gain new self-awareness or life experiences.</p>
            </div>
          </div>
          </div>
        </section>

        <div className="bg-background-elevated">
        {/* Audience */}
        <section aria-label="Audience" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-4">
            Built for People Who Need Accurate Results
          </h2>
          <p className="text-text-secondary text-center leading-relaxed">
            If you've taken an Enneagram test before and felt the result was close but not quite right, you're not alone. Static surveys force complex personality patterns into simple multiple choice answers, missing the nuances that matter. The Deep Mirror is designed for executives, coaches, and anyone serious about self-knowledge who recognizes that understanding yourself requires more than picking A, B, or C.
          </p>
        </section>
        </div>

        {/* Final CTA */}
        <section aria-label="Final CTA" className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-text mb-4">Ready for an Enneagram result that actually fits?</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">Stop settling for survey results that feel half-right. Get typed through AI conversation that catches what static questions miss.</p>
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
                  {status === 'loading' ? 'Sending...' : `Start your assessment`}
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
          <h2 className="text-2xl font-bold text-text text-center mb-8">Questions About AI-Powered Typing</h2>
          <div className="space-y-6">
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                How is this different from other Enneagram tests?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Every other test uses fixed surveys with predetermined questions. We use conversational AI that adapts its questions based on your specific answers. When you contradict yourself or seem to be describing your ideal self rather than your actual behavior, we notice and dig deeper. Static surveys can't do this.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                What if I get a different result than other tests?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                That's often a sign we're getting closer to accuracy. Most people have taken multiple Enneagram tests and gotten different results because surveys can only capture surface-level responses. Our conversational approach reveals patterns that fixed questionnaires miss, especially when your conscious self-perception differs from your actual behavioral patterns.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                How long does the assessment take?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Your first session typically takes 20-30 minutes, but the length varies based on your responses. If you give short answers, we'll ask follow-up questions. If you contradict yourself, we'll explore that. The AI adapts the conversation length to what's needed for accurate typing rather than rushing you through predetermined questions.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                Do you determine wing and instinctual variant?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Yes. We identify your core type, wing, and provide strength indicators for each. Unlike surveys that force you into a single category, we show the nuanced picture of how strongly different patterns show up in your behavior. An 8w7 operates very differently from an 8w9, and we surface that distinction.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                What happens to my conversation data?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Your responses are used solely to improve the accuracy of your typing. We don't sell your data or use it for marketing. The AI learns from the patterns in your specific answers to ask better follow-up questions and identify contradictions that reveal your true type rather than your aspirational self-image.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                Can I retake the assessment?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                You don't retake it, you continue it. Each time you return, the AI remembers your previous responses and asks different questions to refine your typing. This is the key advantage over static tests: your result gets more accurate over time as we gather more behavioral data points.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                What if the AI gets my type wrong?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                The AI flags uncertainty when your responses don't clearly point to one type. Rather than forcing you into a category, we'll tell you which types you're showing strong patterns for and suggest specific things to watch for in your behavior before your next session. Accurate typing often takes multiple conversations.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                Is this suitable for team assessments?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Yes, but each person takes their individual assessment. We don't do group surveys or team reports. Each team member gets their own conversational typing session, and you can compare results afterward. The individual accuracy is what makes team applications valuable.
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
