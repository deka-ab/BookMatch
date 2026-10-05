type ProgressBarProps = {
  step: number
  total: number
}

export function ProgressBar({ step, total }: ProgressBarProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            height: '3px',
            borderRadius: '2px',
            width: i < step ? '28px' : '14px',
            backgroundColor: i < step ? '#C4622D' : '#E2D9CC',
            transition: 'all 0.3s ease',
          }}
        />
      ))}
      <span
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '13px',
          color: '#9C8E82',
          marginLeft: '4px',
          fontWeight: 500,
        }}
      >
        {step} of {total}
      </span>
    </div>
  )
}
