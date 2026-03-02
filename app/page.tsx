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
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How is this different from other Enneagram tests?","acceptedAnswer":{"@type":"Answer","text":"Static surveys ask predetermined questions and force you to pick from limited options. We conduct actual conversations. When your answers seem inconsistent or reveal something worth exploring, we follow that thread. The AI interviewer adapts its questions based on what you've already shared, just like a skilled human interviewer would."}},{"@type":"Question","name":"Why three sessions instead of one quick test?","acceptedAnswer":{"@type":"Answer","text":"Because personality is complex and people don't reveal everything about themselves in a single sitting. Your first session gives us an initial read. Between sessions, you observe yourself with new awareness. Session two builds on what you've noticed. Session three refines the result with everything we've learned about how you actually operate."}},{"@type":"Question","name":"What if I get different results each time?","acceptedAnswer":{"@type":"Answer","text":"That's not a bug, it's accuracy. If you're genuinely between types or showing mixed patterns, we'll tell you that instead of forcing a single number. Real personality assessment acknowledges nuance. You might be a clear 8 with 7-wing, or you might be genuinely torn between 3 and 8 depending on context. We give you the honest picture."}},{"@type":"Question","name":"How accurate is conversational AI compared to human typing?","acceptedAnswer":{"@type":"Answer","text":"Conversational AI has advantages human interviewers don't: perfect memory of everything you've said, no personal bias affecting interpretation, and the ability to cross-reference patterns across thousands of responses. It can't read body language, but it can analyze speech patterns, word choices, and response styles that humans often miss."}},{"@type":"Question","name":"Can I upload my journal entries or other reflective writing?","acceptedAnswer":{"@type":"Answer","text":"Yes. If you've done reflective work in other AI tools, kept journals, or have notes from coaching sessions, you can feed that context directly into your assessment. This gives us a much richer picture of how you think and behave when you're not trying to answer assessment questions."}},{"@type":"Question","name":"What do I get besides my type number?","acceptedAnswer":{"@type":"Answer","text":"You get your core type, wing, and how strongly each pattern shows up in your responses. More importantly, you get specific insights about how these patterns affect your decision-making, leadership style, and stress responses. It's not just a label, it's a working model of how you operate."}},{"@type":"Question","name":"How long does each conversation take?","acceptedAnswer":{"@type":"Answer","text":"Usually 15-25 minutes per session. The AI moves at your pace. If you give short answers, it adjusts with more direct questions. If you elaborate, it explores those details. There's no timer pushing you toward quick responses that might not reflect how you actually think."}},{"@type":"Question","name":"What happens to my conversation data?","acceptedAnswer":{"@type":"Answer","text":"Your responses are used only to refine your individual assessment. We don't aggregate your data with others or use it for training. Each conversation builds your personal profile, which gets more accurate as we learn more about your specific patterns and context."}}]}} />

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
            AI Enneagram Assessment
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
            Dynamic conversations that adapt to your responses, not static surveys with predetermined paths. Get your type, wing, and strength patterns.
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
        <section aria-label="Problem" className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-bold text-text text-center mb-6">
            Static surveys can't capture the complexity of human personality
          </h2>
          <p className="text-text-secondary text-center leading-relaxed">
            Traditional Enneagram assessments lock you into predetermined questions that can't adapt when your answers reveal contradictions or nuance. You answer A, B, or C, but your real patterns exist in the spaces between those choices. Even the most sophisticated tests rely on branching logic that assumes human behavior fits neat categories. It doesn't.
          </p>
        </section>

        <div className="bg-background-elevated">
        {/* Features */}
        <section aria-label="Features" className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold text-text text-center mb-10">How conversational AI delivers what static surveys cannot</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <section aria-label="Dynamic interviewing adapts to your responses" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Dynamic interviewing adapts to your responses</h3>
            <p className="text-text-secondary text-sm leading-relaxed">The AI follows threads that surveys miss. When your answers conflict or seem rehearsed, it probes deeper. No predetermined question paths.</p>
          </section>
          <section aria-label="Continuous refinement through uploaded context" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Continuous refinement through uploaded context</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Feed in journal entries, notes from coaching sessions, or reflections from other AI conversations. Your result sharpens as we learn how you actually think and behave.</p>
          </section>
          <section aria-label="Nuanced output beyond basic type numbers" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Nuanced output beyond basic type numbers</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Get your type, wing, and strength of each tendency. An 8w7 operates differently than an 8w9. We surface those distinctions that matter for real application.</p>
          </section>
          <section aria-label="Preemptive objection handling during assessment" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Preemptive objection handling during assessment</h3>
            <p className="text-text-secondary text-sm leading-relaxed">When responses suggest social desirability bias or self-image protection, the AI redirects to behavioral questions. No more results that reflect who you want to be instead of who you are.</p>
          </section>
          <section aria-label="Context-aware follow-up sessions" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Context-aware follow-up sessions</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Return sessions build on previous conversations. The AI remembers inconsistencies to explore and patterns that need clarification. Your assessment evolves as your self-awareness grows.</p>
          </section>
          </div>
        </section>
        </div>

        {/* How It Works */}
        <section aria-label="How it works" className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-bold text-text text-center mb-10">Three sessions. One accurate result. No multiple choice.</h2>
          <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Start the conversation</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The AI interviewer asks open-ended questions about how you actually behave in specific situations. No A, B, or C options. Just real answers about real scenarios.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Upload your context</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Add journals, notes, or reflections from other AI conversations. The more context you provide, the sharper your assessment becomes. Your data stays private and secure.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Return for refinement</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Come back in two weeks with new observations about yourself. The AI builds on previous sessions, asking different questions based on what it learned about your patterns.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">4</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Get your complete profile</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Receive your type, wing, and strength indicators with explanations of how each shows up in your leadership style and decision-making patterns.</p>
            </div>
          </div>
          </div>
        </section>

        <div className="bg-background-elevated">
        {/* Audience */}
        <section aria-label="Audience" className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-bold text-text text-center mb-6">
            For leaders who need accurate insights, not just quick answers
          </h2>
          <p className="text-text-secondary text-center leading-relaxed">
            If you're making decisions that affect teams, careers, or organizations, personality assessments matter. You've likely tried multiple Enneagram tests and gotten different results, leaving you uncertain about which is actually correct. The Deep Mirror serves executives, executive coaches, HR leaders, and anyone committed to understanding themselves at a deeper level than static surveys can provide.
          </p>
        </section>
        </div>

        {/* Final CTA */}
        <section aria-label="Final CTA" className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-text mb-6">Get your accurate Enneagram result in three conversations</h2>
          <p className="text-text-secondary mb-10 max-w-xl mx-auto">No more wondering if you got the right type. No more retaking tests that give different answers. Start your first session and discover what conversational AI reveals about your core patterns.</p>
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

        <div className="bg-background-elevated">
        {/* FAQ */}
        <section aria-label="Frequently Asked Questions" className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-bold text-text text-center mb-10">Questions about how this actually works</h2>
          <div className="space-y-8">
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                How is this different from other Enneagram tests?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Static surveys ask predetermined questions and force you to pick from limited options. We conduct actual conversations. When your answers seem inconsistent or reveal something worth exploring, we follow that thread. The AI interviewer adapts its questions based on what you've already shared, just like a skilled human interviewer would.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                Why three sessions instead of one quick test?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Because personality is complex and people don't reveal everything about themselves in a single sitting. Your first session gives us an initial read. Between sessions, you observe yourself with new awareness. Session two builds on what you've noticed. Session three refines the result with everything we've learned about how you actually operate.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                What if I get different results each time?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                That's not a bug, it's accuracy. If you're genuinely between types or showing mixed patterns, we'll tell you that instead of forcing a single number. Real personality assessment acknowledges nuance. You might be a clear 8 with 7-wing, or you might be genuinely torn between 3 and 8 depending on context. We give you the honest picture.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                How accurate is conversational AI compared to human typing?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Conversational AI has advantages human interviewers don't: perfect memory of everything you've said, no personal bias affecting interpretation, and the ability to cross-reference patterns across thousands of responses. It can't read body language, but it can analyze speech patterns, word choices, and response styles that humans often miss.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                Can I upload my journal entries or other reflective writing?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Yes. If you've done reflective work in other AI tools, kept journals, or have notes from coaching sessions, you can feed that context directly into your assessment. This gives us a much richer picture of how you think and behave when you're not trying to answer assessment questions.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                What do I get besides my type number?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                You get your core type, wing, and how strongly each pattern shows up in your responses. More importantly, you get specific insights about how these patterns affect your decision-making, leadership style, and stress responses. It's not just a label, it's a working model of how you operate.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                How long does each conversation take?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Usually 15-25 minutes per session. The AI moves at your pace. If you give short answers, it adjusts with more direct questions. If you elaborate, it explores those details. There's no timer pushing you toward quick responses that might not reflect how you actually think.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                What happens to my conversation data?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Your responses are used only to refine your individual assessment. We don't aggregate your data with others or use it for training. Each conversation builds your personal profile, which gets more accurate as we learn more about your specific patterns and context.
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
