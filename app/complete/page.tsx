'use client'
import { useRouter } from 'next/navigation'

export default function CompletionPage() {
  const router = useRouter()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '40px 24px',
        textAlign: 'center',
        background: '#FAF7F2',
      }}
    >
      <div
        style={{
          fontSize: '64px',
          marginBottom: '24px',
          animation: 'popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        📚
      </div>
      <h1
        style={{
          fontFamily: 'Fraunces, Georgia, serif',
          fontSize: 'clamp(32px, 6vw, 52px)',
          fontWeight: 600,
          color: '#1C1814',
          marginBottom: '16px',
          lineHeight: 1.15,
          letterSpacing: '-1px',
        }}
      >
        Your match is ready.
      </h1>
      <p
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '18px',
          color: '#9C8E82',
          maxWidth: '340px',
          lineHeight: 1.6,
          marginBottom: '40px',
        }}
      >
        We've curated a reading list just for you. Time to find your next favourite book.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <button
          style={{
            padding: '16px 48px',
            borderRadius: '100px',
            border: 'none',
            backgroundColor: '#C4622D',
            color: '#FFFFFF',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '17px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(196, 98, 45, 0.35)',
            transition: 'all 0.18s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 28px rgba(196, 98, 45, 0.45)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(196, 98, 45, 0.35)'
          }}
        >
          See my recommendations
        </button>
        <button
          onClick={() => router.push('/')}
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '14px',
            color: '#C4B8A8',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            transition: 'color 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#8B7355')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#C4B8A8')}
        >
          ← Back to home
        </button>
      </div>
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
