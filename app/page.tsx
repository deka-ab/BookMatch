'use client'


import { useRouter } from 'next/navigation'
import { FEATURES, TESTIMONIALS } from '../data'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>

      {/* Nav */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px clamp(20px, 5vw, 72px)',
          borderBottom: '1px solid #EDE8E1',
          position: 'sticky',
          top: 0,
          backgroundColor: 'rgba(250, 247, 242, 0.92)',
          backdropFilter: 'blur(10px)',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: 'Fraunces, Georgia, serif',
            fontSize: '22px',
            fontWeight: 700,
            color: '#C4622D',
            letterSpacing: '-0.3px',
          }}
        >
          BookMatch
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <a
            href="#how-it-works"
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '15px',
              color: '#8B7355',
              textDecoration: 'none',
              fontWeight: 400,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#1C1814')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#8B7355')}
          >
            How it works
          </a>
          <button
            onClick={() => router.push('/onboarding')}
            style={{
              padding: '10px 24px',
              borderRadius: '100px',
              border: '1.5px solid #C4622D',
              backgroundColor: 'transparent',
              color: '#C4622D',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#C4622D'
              e.currentTarget.style.color = '#FFFFFF'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#C4622D'
            }}
          >
            Get started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          minHeight: 'calc(100vh - 65px)',
          alignItems: 'center',
        }}
      >
        {/* Left: copy */}
        <div
          style={{
            padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 72px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#F5E8DF',
              border: '1px solid #E8C9AF',
              borderRadius: '100px',
              padding: '6px 14px',
              marginBottom: '28px',
              width: 'fit-content',
            }}
          >
            <span style={{ fontSize: '12px' }}>📚</span>
            <span
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: '#A8511F',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Your next great read is waiting
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 600,
              color: '#1C1814',
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              marginBottom: '24px',
              maxWidth: '560px',
            }}
          >
            Books that{' '}
            <em style={{ color: '#C4622D', fontStyle: 'italic' }}>actually</em>{' '}
            match who you are.
          </h1>

          <p
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(16px, 2vw, 19px)',
              color: '#8B7355',
              lineHeight: 1.65,
              maxWidth: '440px',
              marginBottom: '40px',
            }}
          >
            BookMatch learns your interests, reading taste, and mood — then finds books
            you'll actually finish. No more generic bestseller lists.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => router.push('/onboarding')}
              style={{
                padding: '16px 40px',
                borderRadius: '100px',
                border: 'none',
                backgroundColor: '#C4622D',
                color: '#FFFFFF',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '17px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 24px rgba(196, 98, 45, 0.32)',
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#A8511F'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(196, 98, 45, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#C4622D'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(196, 98, 45, 0.32)'
              }}
            >
              Find my match →
            </button>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: '#C4B8A8' }}>
              Free · Takes 2 minutes
            </span>
          </div>

          {/* Social proof */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '48px' }}>
            <div style={{ display: 'flex' }}>
              {TESTIMONIALS.map((t, i) => (
                <img
                  key={i}
                  src={t.img}
                  alt={t.name}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '2px solid #FAF7F2',
                    marginLeft: i === 0 ? '0' : '-8px',
                    objectFit: 'cover',
                    backgroundColor: '#E2D9CC',
                  }}
                />
              ))}
            </div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: '#8B7355' }}>
              <strong style={{ color: '#1C1814', fontWeight: 600 }}>12,000+</strong> readers matched so far
            </span>
          </div>
        </div>

        {/* Right: image */}
        <div
          style={{
            position: 'relative',
            height: 'clamp(400px, 70vh, 680px)',
            overflow: 'hidden',
            backgroundColor: '#EDE8E1',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=900&h=1000&fit=crop&auto=format"
            alt="Colorful book spines on a library shelf"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(196,98,45,0.12) 0%, rgba(250,247,242,0.05) 100%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute', inset: '0 auto 0 0', width: '80px',
              background: 'linear-gradient(to right, #FAF7F2, transparent)',
              pointerEvents: 'none',
            }}
          />
          {/* Floating badge */}
          <div
            style={{
              position: 'absolute', bottom: '40px', right: '32px',
              backgroundColor: '#FFFFFF', borderRadius: '16px',
              padding: '16px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.14)', maxWidth: '220px',
            }}
          >
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: '#9C8E82', marginBottom: '4px' }}>
              Your match today
            </div>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '16px', fontWeight: 600, color: '#1C1814', lineHeight: 1.3 }}>
              The Hitchhiker's Guide to the Galaxy
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
              {[1,2,3,4,5].map(i => (
                <span key={i} style={{ color: '#D4924A', fontSize: '14px' }}>★</span>
              ))}
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: '#9C8E82', marginLeft: '4px' }}>4.8</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        style={{
          padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 72px)',
          borderTop: '1px solid #EDE8E1',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ marginBottom: '56px' }}>
            <span
              style={{
                fontFamily: 'Outfit, sans-serif', fontSize: '12px', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C4622D',
                display: 'block', marginBottom: '12px',
              }}
            >
              How it works
            </span>
            <h2
              style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontSize: 'clamp(30px, 4vw, 48px)',
                fontWeight: 600, color: '#1C1814',
                lineHeight: 1.15, letterSpacing: '-0.8px', maxWidth: '500px',
              }}
            >
              Three questions. A lifetime of great reads.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {[
              { step: '01', title: 'Tell us your interests', desc: "Gaming? Travel? Psychology? We map your world, not just your bookshelf.", icon: '🌍' },
              { step: '02', title: 'Pick your genres', desc: 'Fantasy, thriller, biography — mix and match. No wrong combinations.', icon: '📖' },
              { step: '03', title: 'Set your reading goal', desc: "Want to escape, learn, or just relax? We'll tune every recommendation to it.", icon: '🎯' },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  backgroundColor: '#FFFFFF', borderRadius: '20px',
                  border: '1px solid #E2D9CC', padding: '32px 28px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '20px' }}>{item.icon}</div>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '13px', color: '#C4622D', marginBottom: '8px', letterSpacing: '0.06em' }}>
                  {item.step}
                </div>
                <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '22px', fontWeight: 600, color: '#1C1814', marginBottom: '10px', lineHeight: 1.25 }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', color: '#8B7355', lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section style={{ backgroundColor: '#1C1814', padding: 'clamp(56px, 8vw, 96px) clamp(20px, 5vw, 72px)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px' }}>
            {FEATURES.map((f) => (
              <div key={f.title}>
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '24px', color: '#D4924A', marginBottom: '16px' }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '20px', fontWeight: 600, color: '#FAF7F2', marginBottom: '10px', lineHeight: 1.3 }}>
                  {f.title}
                </h3>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', color: '#9C8E82', lineHeight: 1.65 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 72px)', borderTop: '1px solid #EDE8E1' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 600, color: '#1C1814',
              letterSpacing: '-0.8px', marginBottom: '48px', maxWidth: '480px', lineHeight: 1.2,
            }}
          >
            Readers who found their match.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: i === 1 ? '#F5E8DF' : '#FFFFFF',
                  border: `1px solid ${i === 1 ? '#E8C9AF' : '#E2D9CC'}`,
                  borderRadius: '20px', padding: '28px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '17px', color: '#1C1814', lineHeight: 1.55, marginBottom: '24px', fontStyle: 'italic' }}>
                  "{t.quote}"
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={t.img} alt={t.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', backgroundColor: '#E2D9CC' }} />
                  <div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', fontWeight: 600, color: '#1C1814' }}>{t.name}</div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: '#9C8E82' }}>Age {t.age}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section
        style={{
          margin: '0 clamp(20px, 5vw, 72px) clamp(48px, 8vw, 80px)',
          borderRadius: '28px', backgroundColor: '#C4622D',
          padding: 'clamp(48px, 7vw, 80px) clamp(32px, 5vw, 72px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', gap: '28px',
          boxShadow: '0 8px 40px rgba(196, 98, 45, 0.3)',
        }}
      >
        <h2
          style={{
            fontFamily: 'Fraunces, Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 600, color: '#FFFFFF',
            lineHeight: 1.15, letterSpacing: '-1px', maxWidth: '540px',
          }}
        >
          Ready to meet your next favourite book?
        </h2>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '17px', color: 'rgba(255,255,255,0.75)', maxWidth: '380px', lineHeight: 1.6 }}>
          Answer three quick questions and we'll build your personalised reading list in seconds.
        </p>
        <button
          onClick={() => router.push('/onboarding')}
          style={{
            padding: '16px 44px', borderRadius: '100px', border: 'none',
            backgroundColor: '#FFFFFF', color: '#C4622D',
            fontFamily: 'Outfit, sans-serif', fontSize: '17px', fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.18s ease',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'
          }}
        >
          Start matching →
        </button>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid #EDE8E1',
          padding: '28px clamp(20px, 5vw, 72px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
        }}
      >
        <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '18px', fontWeight: 700, color: '#C4622D' }}>
          BookMatch
        </span>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: '#C4B8A8' }}>
          © 2026 BookMatch. Made for readers.
        </span>
      </footer>
    </div>
  )
}
