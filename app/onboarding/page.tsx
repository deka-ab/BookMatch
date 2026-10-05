'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Chip } from '@/components/Chip'
import { GoalCard } from '@/components/GoalCard'
import { ProgressBar } from '@/components/ProgressBar'
import { INTERESTS, GENRES, GOALS } from '@/data'



const STEP_CONFIG = [
  {
    eyebrow: 'Step 1 · Interests',
    heading: "What's on your mind?",
    sub: "Pick the things you love. We'll find books that speak your language.",
  },
  {
    eyebrow: 'Step 2 · Genres',
    heading: 'What do you like to read?',
    sub: 'No wrong answers here — mix and match as you like.',
  },
  {
    eyebrow: 'Step 3 · Goals',
    heading: 'What are you looking for in your next book?',
    sub: 'This helps us tune your recommendations perfectly.',
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set())
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set())
  const [selectedGoals, setSelectedGoals] = useState<Set<string>>(new Set())
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')

  const toggle = (set: Set<string>, setFn: (s: Set<string>) => void, id: string) => {
    const next = new Set(set)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setFn(next)
  }

  const canContinue = () => {
    if (step === 1) return selectedInterests.size > 0
    if (step === 2) return selectedGenres.size > 0
    if (step === 3) return selectedGoals.size > 0
    return false
  }

  const goToStep = (dir: 'forward' | 'back') => {
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      if (dir === 'forward') {
        if (step === 3) {
          router.push('/complete')
        } else {
          setStep(step + 1)
        }
      } else {
        if (step === 1) {
          router.push('/')
        } else {
          setStep(step - 1)
        }
      }
      setAnimating(false)
    }, 220)
  }

  const current = STEP_CONFIG[step - 1]
  const totalSelections = selectedInterests.size + selectedGenres.size + selectedGoals.size

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FAF7F2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
    >
      {/* Background glows */}
      <div
        aria-hidden
        style={{
          position: 'fixed', top: '-120px', right: '-120px',
          width: '480px', height: '480px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,146,74,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'fixed', bottom: '-80px', left: '-80px',
          width: '360px', height: '360px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,98,45,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ width: '100%', maxWidth: '680px' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <span
            style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontSize: '22px', fontWeight: 700, color: '#C4622D', letterSpacing: '-0.3px',
            }}
          >
            BookMatch
          </span>
          <ProgressBar step={step} total={3} />
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #E2D9CC',
            padding: 'clamp(28px, 5vw, 52px)',
            boxShadow: '0 2px 32px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${direction === 'forward' ? '-20px' : '20px'})`
              : 'translateX(0)',
            transition: 'opacity 0.22s ease, transform 0.22s ease',
          }}
        >
          <div
            style={{
              fontFamily: 'Outfit, sans-serif', fontSize: '12px', fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C4622D', marginBottom: '12px',
            }}
          >
            {current.eyebrow}
          </div>

          <h1
            style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontSize: 'clamp(26px, 4.5vw, 40px)',
              fontWeight: 600, color: '#1C1814',
              lineHeight: 1.2, marginBottom: '10px', letterSpacing: '-0.5px',
            }}
          >
            {current.heading}
          </h1>

          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', color: '#9C8E82', lineHeight: 1.6, marginBottom: '32px', maxWidth: '440px' }}>
            {current.sub}
          </p>

          {step === 1 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {INTERESTS.map((item) => (
                <Chip
                  key={item.id}
                  label={item.label}
                  emoji={item.emoji}
                  selected={selectedInterests.has(item.id)}
                  onClick={() => toggle(selectedInterests, setSelectedInterests, item.id)}
                />
              ))}
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {GENRES.map((item) => (
                <Chip
                  key={item.id}
                  label={item.label}
                  selected={selectedGenres.has(item.id)}
                  onClick={() => toggle(selectedGenres, setSelectedGenres, item.id)}
                />
              ))}
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '10px' }}>
              {GOALS.map((item) => (
                <GoalCard
                  key={item.id}
                  label={item.label}
                  desc={item.desc}
                  selected={selectedGoals.has(item.id)}
                  onClick={() => toggle(selectedGoals, setSelectedGoals, item.id)}
                />
              ))}
            </div>
          )}

          {/* Actions */}
          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginTop: '36px', paddingTop: '28px', borderTop: '1px solid #F0EBE3',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button
                onClick={() => goToStep('back')}
                style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: '15px', fontWeight: 500,
                  color: '#9C8E82', background: 'none', border: 'none', cursor: 'pointer',
                  padding: '4px 0', display: 'flex', alignItems: 'center', gap: '6px',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#1C1814')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9C8E82')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {step === 1 ? 'Home' : 'Back'}
              </button>
              <button
                onClick={() => goToStep('forward')}
                style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: '14px', fontWeight: 400,
                  color: '#C4B8A8', background: 'none', border: 'none', cursor: 'pointer',
                  padding: '4px 0', transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#9C8E82')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#C4B8A8')}
              >
                Skip
              </button>
            </div>

            <button
              onClick={() => goToStep('forward')}
              disabled={!canContinue()}
              style={{
                padding: '14px 36px', borderRadius: '100px', border: 'none',
                backgroundColor: canContinue() ? '#C4622D' : '#E2D9CC',
                color: canContinue() ? '#FFFFFF' : '#B5A898',
                fontFamily: 'Outfit, sans-serif', fontSize: '16px', fontWeight: 600,
                cursor: canContinue() ? 'pointer' : 'not-allowed',
                transition: 'all 0.18s ease',
                boxShadow: canContinue() ? '0 4px 16px rgba(196, 98, 45, 0.28)' : 'none',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
              onMouseEnter={(e) => {
                if (canContinue()) {
                  e.currentTarget.style.backgroundColor = '#A8511F'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(196, 98, 45, 0.38)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseLeave={(e) => {
                if (canContinue()) {
                  e.currentTarget.style.backgroundColor = '#C4622D'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(196, 98, 45, 0.28)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              {step === 3 ? 'Find my books' : 'Continue'}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: '#C4B8A8', marginTop: '20px' }}>
          {totalSelections > 0
            ? `${totalSelections} selection${totalSelections !== 1 ? 's' : ''} so far`
            : 'Select at least one to continue'}
        </p>
      </div>
    </div>
  )
}
