type ChipProps = {
  label: string
  emoji?: string
  selected: boolean
  onClick: () => void
}

export function Chip({ label, emoji, selected, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 18px',
        borderRadius: '100px',
        border: selected ? '1.5px solid #C4622D' : '1.5px solid #E2D9CC',
        backgroundColor: selected ? '#F5E8DF' : '#FFFFFF',
        color: selected ? '#C4622D' : '#1C1814',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '15px',
        fontWeight: selected ? 600 : 400,
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        boxShadow: selected ? '0 0 0 3px rgba(196, 98, 45, 0.08)' : '0 1px 3px rgba(0,0,0,0.05)',
        outline: 'none',
        whiteSpace: 'nowrap',
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
      {emoji && <span style={{ fontSize: '16px' }}>{emoji}</span>}
      {label}
      {selected && <span style={{ fontSize: '14px', marginLeft: '2px' }}>✓</span>}
    </button>
  )
}
