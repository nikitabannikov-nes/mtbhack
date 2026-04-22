import { CATEGORIES } from '../data'

export default function CategoriesScreen({ selected, onSelect }) {
  function toggle(id) {
    if (selected.includes(id)) {
      onSelect(selected.filter(s => s !== id))
    } else if (selected.length < 3) {
      onSelect([...selected, id])
    }
  }

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1A1A2E' }}>Мои категории</h2>
        <p style={{ fontSize: 14, color: '#666', marginTop: 6, lineHeight: 1.5 }}>
          Выбери до&nbsp;<strong>3 категорий</strong> — они определяют, какие бонусы выпадают в&nbsp;игре
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {CATEGORIES.map(cat => {
          const isSelected = selected.includes(cat.id)
          const locked     = !isSelected && selected.length >= 3
          return (
            <button
              key={cat.id}
              onClick={() => toggle(cat.id)}
              style={{
                background: isSelected ? `${cat.color}12` : 'white',
                border: `2px solid ${isSelected ? cat.color : '#E0E6F0'}`,
                borderRadius: 18, padding: '16px 14px',
                cursor: locked ? 'not-allowed' : 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                gap: 8, textAlign: 'left', position: 'relative',
                opacity: locked ? 0.45 : 1,
                transition: 'all 0.15s',
                boxShadow: isSelected ? `0 4px 14px ${cat.color}25` : '0 2px 6px rgba(0,0,0,0.05)',
              }}
            >
              {isSelected && (
                <div style={{
                  position: 'absolute', top: 10, right: 10,
                  background: cat.color, color: 'white',
                  borderRadius: '50%', width: 22, height: 22,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800,
                }}>
                  ✓
                </div>
              )}
              <span style={{ fontSize: 36 }}>{cat.icon}</span>
              <div>
                <div style={{ fontWeight: 800, color: '#1A1A2E', fontSize: 15 }}>{cat.name}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 3 }}>{cat.desc}</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Status bar */}
      <div style={{
        background: selected.length >= 3 ? '#E8F5E9' : '#F0F4FF',
        borderRadius: 18, padding: '14px 16px',
        border: `1px solid ${selected.length >= 3 ? '#C8E6C9' : '#D0DBFF'}`,
      }}>
        <div style={{
          fontWeight: 700, fontSize: 14, marginBottom: 8,
          color: selected.length >= 3 ? '#2E7D32' : '#0033A0',
        }}>
          {selected.length >= 3 ? '✅ Все категории заполнены!' : `Выбрано ${selected.length} из 3`}
        </div>
        {selected.length === 0 ? (
          <p style={{ fontSize: 13, color: '#888' }}>Выбери категории чтобы получать тематические бонусы</p>
        ) : (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {selected.map(id => {
              const cat = CATEGORIES.find(c => c.id === id)
              return (
                <span key={id} style={{
                  background: `${cat.color}18`, color: cat.color,
                  borderRadius: 20, padding: '4px 12px',
                  fontSize: 13, fontWeight: 700,
                }}>
                  {cat.icon} {cat.name}
                </span>
              )
            })}
          </div>
        )}
      </div>

      {/* Hint block */}
      <div style={{
        background: 'white', borderRadius: 18, padding: '14px 16px',
        display: 'flex', gap: 12, alignItems: 'flex-start',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}>
        <span style={{ fontSize: 22, flexShrink: 0 }}>💡</span>
        <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>
          Категории обновляются каждый месяц. Чем выше твой уровень в МТБанке,
          тем более редкие предметы могут выпасть.
        </p>
      </div>
    </div>
  )
}
