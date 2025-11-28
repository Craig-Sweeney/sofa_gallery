interface Props {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

const ColorSwatchSelector = ({ options, value, onChange }: Props) => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    {options.map((option) => (
      <button
        key={option.value}
        className="button secondary"
        style={{
          borderColor: value === option.value ? '#111827' : 'var(--border)',
          background: value === option.value ? '#111827' : '#fff',
          color: value === option.value ? '#fff' : 'var(--text)'
        }}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </button>
    ))}
  </div>
);

export default ColorSwatchSelector;
