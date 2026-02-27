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
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How is this different from other Enneagram assessments?","acceptedAnswer":{"@type":"Answer","text":"Traditional assessments use static surveys that accept your first answer, even when you're lying to yourself. Our AI conducts dynamic interviews, probing deeper when your responses conflict or seem socially desirable. Instead of multiple choice, you get real questions that adapt based on your actual answers."}},{"@type":"Question","name":"How accurate is AI-powered typing compared to human practitioners?","acceptedAnswer":{"@type":"Answer","text":"Our conversational AI uses the same probing techniques that master practitioners employ in clinical typing interviews, but without the $150 hourly rate or scheduling constraints. The AI doesn't get tired, doesn't have off days, and consistently applies professional-grade interview methods that most human typists only use occasionally."}},{"@type":"Question","name":"What if I get a different result than previous assessments?","acceptedAnswer":{"@type":"Answer","text":"If you've gotten different types on different surveys, that's exactly the problem we solve. Static questionnaires can't catch self-deception patterns or probe beneath surface-level responses. Our dynamic interviewing process is designed to get past the contradictory answers that confuse traditional surveys."}},{"@type":"Question","name":"How long does a typing session take?","acceptedAnswer":{"@type":"Answer","text":"Initial sessions typically run 15-25 minutes, depending on how deeply the AI needs to probe to reach clarity. Unlike surveys that rush you through predetermined questions, our AI takes the time needed to understand your actual patterns, not just your self-perception."}},{"@type":"Question","name":"Do you provide wing and instinctual variant information?","acceptedAnswer":{"@type":"Answer","text":"Yes. You receive your core type, dominant wing, and instinctual stacking, along with confidence levels for each determination. We don't just give you a number – you get a complete psychological profile that explains how these elements interact in your specific case."}},{"@type":"Question","name":"Can I use this for team development or coaching clients?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Many executive coaches and HR leaders use The Deep Mirror for leadership development programs. Each person gets their individual typing session, and you can request team summary reports that maintain confidentiality while highlighting team dynamics and communication patterns."}},{"@type":"Question","name":"What if I disagree with my results?","acceptedAnswer":{"@type":"Answer","text":"The AI provides detailed explanations for its typing decisions, including specific examples from your interview responses. If something doesn't resonate, you can engage in follow-up conversations to explore discrepancies. Remember: the goal isn't validation of who you think you are, but accurate insight into who you actually are."}},{"@type":"Question","name":"Is my interview data secure and confidential?","acceptedAnswer":{"@type":"Answer","text":"All interview sessions are encrypted and stored securely. Your personal information is never shared, sold, or used for any purpose other than providing your Enneagram analysis. You can request data deletion at any time, and we maintain enterprise-grade security standards throughout our infrastructure."}}]}} />

      <header className="border-b border-border bg-background-elevated">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/" className="text-xl font-bold text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>
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
        {/* Hero */}
        <section aria-label="Hero" className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text mb-4 leading-tight">
            Stop Getting Different Enneagram Results
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            AI-powered typing that catches what surveys miss through dynamic conversation
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
                  {status === 'loading' ? 'Sending...' : `Get Your Type`}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-2">{errorMsg}</p>
            )}
          </div>
        </section>

        {/* Problem */}
        <section aria-label="Problem" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-4">
            Stop getting different Enneagram results every time you test
          </h2>
          <p className="text-text-secondary text-center leading-relaxed">
            Static questionnaires accept your first answer, even when you're lying to yourself. They can't probe deeper when your responses contradict each other or catch when you're describing your ideal self rather than your actual patterns. The result is inconsistent typing that leaves executives questioning which assessment got it right.
          </p>
        </section>

        {/* Features */}
        <section aria-label="Features" className="mx-auto max-w-5xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">AI-powered assessment that catches what surveys miss</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <section aria-label="Dynamic conversational interviewing" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Dynamic conversational interviewing</h3>
            <p className="text-text-secondary text-sm leading-relaxed">We probe beneath surface answers and follow contradictions that static questionnaires ignore. When your responses conflict, we dig deeper.</p>
          </section>
          <section aria-label="Nuanced typing with wing and strength indicators" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Nuanced typing with wing and strength indicators</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Get your core type, wing, and tendency strength rather than a single number. An 8w7 operates differently than an 8w9.</p>
          </section>
          <section aria-label="Continuous refinement through uploaded context" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Continuous refinement through uploaded context</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Upload journals, notes, or AI conversations to sharpen your profile over time. Your assessment evolves as we learn more about how you actually think and behave.</p>
          </section>
          <section aria-label="Professional-grade accuracy for high-stakes decisions" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Professional-grade accuracy for high-stakes decisions</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Built for executives making leadership development investments and coaches conducting client assessments. Clinical precision for consequential applications.</p>
          </section>
          </div>
        </section>

        {/* How It Works */}
        <section aria-label="How it works" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">How The Deep Mirror Works</h2>
          <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Dynamic Interview</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Our AI conducts a real conversation, not a multiple-choice survey. When your answers conflict or seem socially desirable, we probe deeper with follow-up questions that adapt to what you've already revealed.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Context Integration</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Upload journals, notes, or reflections from other AI conversations. We analyze this authentic material to understand how you actually think and behave, not just how you describe yourself under pressure.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Precise Typing Results</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Receive your Enneagram type, wing, and strength indicators in your first session. Unlike static tests that force oversimplified classifications, we surface the nuanced patterns that define your specific psychological profile.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">4</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Continuous Refinement</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Return with new experiences or insights to deepen your profile. Each session builds on previous conversations, creating an evolving psychological model that grows more accurate over time.</p>
            </div>
          </div>
          </div>
        </section>

        {/* Audience */}
        <section aria-label="Audience" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-4">
            For leaders who know shallow assessments waste time
          </h2>
          <p className="text-text-secondary text-center leading-relaxed">
            You've taken personality tests before. Multiple choice questions that force artificial choices, delivering results that feel partially right but miss something essential. The Deep Mirror serves executives, coaches, and HR professionals who need precision, not guesswork. Through dynamic AI conversations that adapt to your actual responses, we deliver the nuanced Enneagram insights that static surveys simply cannot capture.
          </p>
        </section>

        {/* Final CTA */}
        <section aria-label="Final CTA" className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-text mb-4">Get your definitive Enneagram type in one conversation</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">Stop cycling through static surveys that give you different results every time. Our AI interviewer probes deeper than any questionnaire can, catching the self-deception patterns that surveys miss entirely.</p>
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
                  {status === 'loading' ? 'Sending...' : `Start typing session`}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-2">{errorMsg}</p>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section aria-label="Frequently Asked Questions" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">How is this different from other Enneagram assessments?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Traditional assessments use static surveys that accept your first answer, even when you're lying to yourself. Our AI conducts dynamic interviews, probing deeper when your responses conflict or seem socially desirable. Instead of multiple choice, you get real questions that adapt based on your actual answers.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">How accurate is AI-powered typing compared to human practitioners?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Our conversational AI uses the same probing techniques that master practitioners employ in clinical typing interviews, but without the \$150 hourly rate or scheduling constraints. The AI doesn't get tired, doesn't have off days, and consistently applies professional-grade interview methods that most human typists only use occasionally.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">What if I get a different result than previous assessments?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">If you've gotten different types on different surveys, that's exactly the problem we solve. Static questionnaires can't catch self-deception patterns or probe beneath surface-level responses. Our dynamic interviewing process is designed to get past the contradictory answers that confuse traditional surveys.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">How long does a typing session take?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Initial sessions typically run 15-25 minutes, depending on how deeply the AI needs to probe to reach clarity. Unlike surveys that rush you through predetermined questions, our AI takes the time needed to understand your actual patterns, not just your self-perception.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Do you provide wing and instinctual variant information?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Yes. You receive your core type, dominant wing, and instinctual stacking, along with confidence levels for each determination. We don't just give you a number – you get a complete psychological profile that explains how these elements interact in your specific case.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Can I use this for team development or coaching clients?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Absolutely. Many executive coaches and HR leaders use The Deep Mirror for leadership development programs. Each person gets their individual typing session, and you can request team summary reports that maintain confidentiality while highlighting team dynamics and communication patterns.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">What if I disagree with my results?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The AI provides detailed explanations for its typing decisions, including specific examples from your interview responses. If something doesn't resonate, you can engage in follow-up conversations to explore discrepancies. Remember: the goal isn't validation of who you think you are, but accurate insight into who you actually are.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Is my interview data secure and confidential?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">All interview sessions are encrypted and stored securely. Your personal information is never shared, sold, or used for any purpose other than providing your Enneagram analysis. You can request data deletion at any time, and we maintain enterprise-grade security standards throughout our infrastructure.</p>
            </div>
          </div>
        </section>
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
