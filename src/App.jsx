import { useState } from 'react'
import GameScreen from './screens/GameScreen'
import CategoriesScreen from './screens/CategoriesScreen'
import ProfileScreen from './screens/ProfileScreen'

const TABS = [
  { id: 'categories', label: 'Категории', icon: '🏷️' },
  { id: 'game',       label: 'Игра',      icon: '🎮' },
  { id: 'profile',    label: 'Профиль',   icon: '👤' },
]

export default function App() {
  const [tab, setTab]               = useState('game')
  const [categories, setCategories] = useState(['food', 'shopping'])
  const [energy, setEnergy]         = useState(8)
  const [mtballs, setMtballs]       = useState(1250)
  const [cells, setCells]           = useState(() => Array(12).fill(null))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 72 }}>
        {tab === 'categories' && (
          <CategoriesScreen selected={categories} onSelect={setCategories} />
        )}
        {tab === 'game' && (
          <GameScreen
            categories={categories}
            energy={energy}
            setEnergy={setEnergy}
            mtballs={mtballs}
            setMtballs={setMtballs}
            cells={cells}
            setCells={setCells}
          />
        )}
        {tab === 'profile' && (
          <ProfileScreen
            mtballs={mtballs}
            energy={energy}
            setEnergy={setEnergy}
          />
        )}
      </div>

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        background: 'white',
        borderTop: '1px solid #E0E0E0',
        display: 'flex',
        padding: '8px 0 env(safe-area-inset-bottom, 8px)',
        zIndex: 50,
      }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              padding: '4px 0',
              color: tab === t.id ? '#0033A0' : '#9E9E9E',
              transition: 'color 0.15s',
            }}
          >
            <span style={{ fontSize: 24 }}>{t.icon}</span>
            <span style={{ fontSize: 11, fontWeight: tab === t.id ? 700 : 400 }}>{t.label}</span>
            {tab === t.id && (
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#0033A0', marginTop: 2 }} />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
