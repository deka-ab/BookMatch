type GoalCardProps = {
  label: string
  desc: string
  selected: boolean
  onClick: () => void
}

export function GoalCard({ label, desc, selected, onClick }: GoalCardProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        padding: '16px 20px',
        borderRadius: '14px',
        border: selected ? '1.5px solid #C4622D' : '1.5px solid #E2D9CC',
        backgroundColor: selected ? '#F5E8DF' : '#FFFFFF',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.18s ease',
        boxShadow: selected ? '0 0 0 3px rgba(196, 98, 45, 0.08)' : '0 1px 4px rgba(0,0,0,0.05)',
        outline: 'none',
        width: '100%',
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = '#C4B8A8'
          e.currentTarget.style.backgroundColor = '#FDFAF7'
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = '#E2D9CC'
          e.currentTarget.style.backgroundColor = '#FFFFFF'
        }
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: selected ? '2px solid #C4622D' : '2px solid #D5C9BD',
          backgroundColor: selected ? '#C4622D' : 'transparent',
          flexShrink: 0,
          marginTop: '2px',
          transition: 'all 0.18s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {selected && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div>
        <div
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: selected ? '#C4622D' : '#1C1814',
            marginBottom: '2px',
            transition: 'color 0.18s ease',
          }}
        >
          {label}
        </div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: '#9C8E82' }}>
          {desc}
        </div>
      </div>
    </button>
  )
}
