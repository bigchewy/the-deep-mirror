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
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How is this different from taking the iEQ9 or other Enneagram tests?","acceptedAnswer":{"@type":"Answer","text":"Static surveys ask predetermined questions in a fixed order. We adapt our questions based on your previous responses. When you describe a leadership challenge, we probe deeper into that specific area. When your answers seem contradictory, we explore why. The iEQ9's conditional logic is impressive for a survey, but conversational AI can follow threads that no predetermined branching logic can anticipate."}},{"@type":"Question","name":"What if I get a different result than I expected?","acceptedAnswer":{"@type":"Answer","text":"That's often where the real insight lives. We don't force you into a single type on your first session. You might hear: 'You're showing strong Type 8 patterns, with meaningful 6 and 2 tendencies. Come back in two weeks and watch for these specific behaviors.' The goal isn't to give you a number. It's to give you a more accurate picture of how you actually operate."}},{"@type":"Question","name":"Can I upload my journal entries or notes from other AI conversations?","acceptedAnswer":{"@type":"Answer","text":"Yes. Context from your existing reflective work makes the assessment more precise. Upload journal entries, notes from coaching sessions, or transcripts from AI conversations where you've explored your patterns. The more material we have about how you actually think and behave, the sharper your result becomes."}},{"@type":"Question","name":"How long does the initial assessment take?","acceptedAnswer":{"@type":"Answer","text":"Plan for 30-45 minutes if you want a thorough result. You can pause and return anytime. Unlike surveys that rush you through predetermined questions, we follow the conversation wherever it needs to go. Some patterns emerge quickly. Others require deeper exploration."}},{"@type":"Question","name":"Do I need to know anything about the Enneagram beforehand?","acceptedAnswer":{"@type":"Answer","text":"No. We'll explain concepts as they become relevant to your specific patterns. If you're already familiar with the system, we can dive deeper into subtypes, wings, and integration paths. The conversation adapts to your level of knowledge."}},{"@type":"Question","name":"How does the result get more accurate over time?","acceptedAnswer":{"@type":"Answer","text":"Each conversation builds on previous sessions. You might initially test as a Type 3 under work stress, then show clear Type 6 patterns during a period of uncertainty. Instead of contradicting your previous result, this adds nuance. You're not switching types. You're revealing the full complexity of your motivational structure."}},{"@type":"Question","name":"Is this suitable for team assessments?","acceptedAnswer":{"@type":"Answer","text":"Individual assessments first, team insights second. Each person needs their own thorough typing before we can analyze team dynamics. We can generate team reports showing interaction patterns, potential conflicts, and communication preferences, but only after everyone has completed their individual assessment process."}},{"@type":"Question","name":"What happens to my conversation data?","acceptedAnswer":{"@type":"Answer","text":"Your responses are stored securely and used only to refine your individual assessment. We don't share personal details or use your data to train models for other users. You own your psychological profile and can export or delete it at any time."}}]}} />

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
            Your Enneagram result gets sharper over time
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
            AI-powered assessment that adapts its questions based on your responses, delivering nuanced typing that refines with each conversation.
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
                  {status === 'loading' ? 'Sending...' : `Start your assessment`}
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
            Enneagram assessments give you a number, not understanding
          </h2>
          <p className="text-text-secondary text-center leading-relaxed">
            You take the test, answer 144 questions, get typed as a 3 or an 8, and then what? Static surveys can't probe when your answers contradict each other. They can't ask follow-up questions when you're clearly describing who you want to be instead of who you are. They give you a type based on a single snapshot, but your deepest patterns don't reveal themselves in one sitting.
          </p>
        </section>

        <div className="bg-background-elevated">
        {/* Features */}
        <section aria-label="Features" className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold text-text text-center mb-10">How conversational AI delivers what surveys cannot</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <section aria-label="Adaptive questioning that follows your responses" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Adaptive questioning that follows your responses</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Instead of fixed questions, the AI probes deeper when your answers reveal contradictions or patterns worth exploring. If you describe yourself as decisive but then explain how you agonize over choices, it asks follow-up questions that static surveys skip entirely.</p>
          </section>
          <section aria-label="Context integration from your existing reflective work" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Context integration from your existing reflective work</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Upload journal entries, meeting notes, or AI conversations from other tools to give the assessment material that reflects how you actually think and behave. Your typing becomes based on real examples, not just how you summarize yourself under pressure.</p>
          </section>
          <section aria-label="Wing and subtype precision beyond basic typing" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Wing and subtype precision beyond basic typing</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Get your core type plus wing tendencies and instinctual variant, with strength indicators for each. An 8w7 social variant operates differently than an 8w9 self-preservation variant, and the assessment captures those meaningful distinctions.</p>
          </section>
          <section aria-label="Continuous refinement with each conversation" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Continuous refinement with each conversation</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Your result sharpens over time as you return with new experiences and insights. The AI remembers your previous responses and asks different questions based on what it learned about your patterns, building a more accurate picture with each session.</p>
          </section>
          <section aria-label="Objection handling for conflicting self-perceptions" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Objection handling for conflicting self-perceptions</h3>
            <p className="text-text-secondary text-sm leading-relaxed">When you describe behaviors that don't align with your stated motivations, the assessment notices and explores the discrepancy. It helps distinguish between who you are, who you think you are, and who you want to be.</p>
          </section>
          <section aria-label="Professional application guidance for teams" className="shadow-lg bg-background-elevated rounded-xl p-8">
            <h3 className="text-lg font-semibold text-text mb-2">Professional application guidance for teams</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Understand how your type shows up in leadership decisions, conflict resolution, and team dynamics. Each result includes specific implications for professional relationships and management approaches based on your unique type combination.</p>
          </section>
          </div>
        </section>
        </div>

        {/* How It Works */}
        <section aria-label="How it works" className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-bold text-text text-center mb-10">How The Deep Mirror works</h2>
          <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Dynamic conversation begins</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The AI interviewer asks an open-ended question and listens to your full response. No multiple choice, no forced categories. When your answer reveals complexity or contradiction, it follows that thread with a more specific question.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Context shapes the dialogue</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Upload journals, notes, or reflections from other AI conversations. The interviewer integrates this material into your session, asking questions that connect patterns across your actual thoughts and behaviors.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Nuanced results emerge</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Receive your type, wing, and strength of tendency after your first session. Instead of forcing you into a single box, the assessment acknowledges when multiple types show up strongly in your responses.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">4</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Understanding deepens over time</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Return weeks or months later. The AI remembers your previous responses and asks different questions based on what it learned about you. Your type clarity improves as more context accumulates.</p>
            </div>
          </div>
          </div>
        </section>

        <div className="bg-background-elevated">
        {/* Audience */}
        <section aria-label="Audience" className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-bold text-text text-center mb-6">
            Built for people who know the difference between a quiz and real assessment
          </h2>
          <p className="text-text-secondary text-center leading-relaxed">
            Executives making high-stakes decisions need accurate self-knowledge, not multiple choice guesswork. Executive coaches stake their credibility on tools that deliver genuine insight. HR leaders implementing team development programs require assessments that actually differentiate between people. If you've taken an Enneagram test before and felt the result was partially right but missing something crucial, you understand why conversational AI matters.
          </p>
        </section>
        </div>

        {/* Final CTA */}
        <section aria-label="Final CTA" className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-text mb-6">Get your real Enneagram type</h2>
          <p className="text-text-secondary mb-10 max-w-xl mx-auto">Static surveys gave you a number. The Deep Mirror gives you understanding that deepens every time you return.</p>
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
          <h2 className="text-2xl font-bold text-text text-center mb-10">Questions about how this actually works</h2>
          <div className="space-y-8">
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                How is this different from taking the iEQ9 or other Enneagram tests?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Static surveys ask predetermined questions in a fixed order. We adapt our questions based on your previous responses. When you describe a leadership challenge, we probe deeper into that specific area. When your answers seem contradictory, we explore why. The iEQ9's conditional logic is impressive for a survey, but conversational AI can follow threads that no predetermined branching logic can anticipate.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                What if I get a different result than I expected?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                That's often where the real insight lives. We don't force you into a single type on your first session. You might hear: 'You're showing strong Type 8 patterns, with meaningful 6 and 2 tendencies. Come back in two weeks and watch for these specific behaviors.' The goal isn't to give you a number. It's to give you a more accurate picture of how you actually operate.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                Can I upload my journal entries or notes from other AI conversations?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Yes. Context from your existing reflective work makes the assessment more precise. Upload journal entries, notes from coaching sessions, or transcripts from AI conversations where you've explored your patterns. The more material we have about how you actually think and behave, the sharper your result becomes.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                How long does the initial assessment take?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Plan for 30-45 minutes if you want a thorough result. You can pause and return anytime. Unlike surveys that rush you through predetermined questions, we follow the conversation wherever it needs to go. Some patterns emerge quickly. Others require deeper exploration.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                Do I need to know anything about the Enneagram beforehand?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                No. We'll explain concepts as they become relevant to your specific patterns. If you're already familiar with the system, we can dive deeper into subtypes, wings, and integration paths. The conversation adapts to your level of knowledge.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                How does the result get more accurate over time?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Each conversation builds on previous sessions. You might initially test as a Type 3 under work stress, then show clear Type 6 patterns during a period of uncertainty. Instead of contradicting your previous result, this adds nuance. You're not switching types. You're revealing the full complexity of your motivational structure.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                Is this suitable for team assessments?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Individual assessments first, team insights second. Each person needs their own thorough typing before we can analyze team dynamics. We can generate team reports showing interaction patterns, potential conflicts, and communication preferences, but only after everyone has completed their individual assessment process.
              </p>
            </details>
            <details className="border-b border-border pb-4">
              <summary className="cursor-pointer font-medium text-text py-2">
                What happens to my conversation data?
              </summary>
              <p className="text-text-secondary text-sm leading-relaxed mt-2 pl-0">
                Your responses are stored securely and used only to refine your individual assessment. We don't share personal details or use your data to train models for other users. You own your psychological profile and can export or delete it at any time.
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
