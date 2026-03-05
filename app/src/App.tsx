import { useState, useCallback } from 'react';
import { COUNTRIES, CATEGORIES, formatValue } from './countries';
import type { Category, Country } from './countries';

type Phase = 'home' | 'playing' | 'gameover';

interface Pair {
  a: Country;
  b: Country;
  category: Category;
}

function pickPair(usedPairs: Set<string>, category: Category): Pair | null {
  const pool = [...COUNTRIES];
  for (let attempt = 0; attempt < 100; attempt++) {
    const i = Math.floor(Math.random() * pool.length);
    let j = Math.floor(Math.random() * (pool.length - 1));
    if (j >= i) j++;
    const key = [pool[i].name, pool[j].name].sort().join('|') + '|' + category;
    if (!usedPairs.has(key) && pool[i][category] !== pool[j][category]) {
      return { a: pool[i], b: pool[j], category };
    }
  }
  return null;
}

const FUNFACTS: Record<Category, (winner: Country, loser: Country) => string> = {
  population: (w, l) => `${w.name}の人口は${w.population.toLocaleString()}万人。${l.name}（${l.population.toLocaleString()}万人）の${(w.population / l.population).toFixed(1)}倍！`,
  area: (w, l) => `${w.name}の面積は${w.area.toLocaleString()}km²。${l.name}（${l.area.toLocaleString()}km²）の${(w.area / l.area).toFixed(1)}倍！`,
  gdp: (w, l) => `${w.name}のGDPは${w.gdp.toLocaleString()}億USD。${l.name}（${l.gdp.toLocaleString()}億USD）の${(w.gdp / l.gdp).toFixed(1)}倍！`,
  lifeExpectancy: (w, l) => `${w.name}の平均寿命は${w.lifeExpectancy}歳。${l.name}（${l.lifeExpectancy}歳）より${w.lifeExpectancy - l.lifeExpectancy}歳長い！`,
  coastline: (w, l) => l.coastline === 0
    ? `${l.name}は内陸国で海に面していない。${w.name}の海岸線は${w.coastline.toLocaleString()}km！`
    : `${w.name}の海岸線は${w.coastline.toLocaleString()}km。${l.name}（${l.coastline.toLocaleString()}km）の${(w.coastline / l.coastline).toFixed(1)}倍！`,
  elevation: (w, l) => `${w.name}の最高地点は${w.elevation.toLocaleString()}m。${l.name}（${l.elevation.toLocaleString()}m）より${(w.elevation - l.elevation).toLocaleString()}m高い！`,
};

export default function App() {
  const [phase, setPhase] = useState<Phase>('home');
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestScore, setBestScore] = useState(() => Number(localStorage.getItem('gd-best') || '0'));
  const [pair, setPair] = useState<Pair | null>(null);
  const [usedPairs] = useState(new Set<string>());
  const [selectedCategory, setSelectedCategory] = useState<Category | 'random'>('random');
  const [chosen, setChosen] = useState<'a' | 'b' | null>(null);
  const [correct, setCorrect] = useState<'a' | 'b' | null>(null);
  const [funFact, setFunFact] = useState('');

  const getCategory = useCallback((): Category => {
    if (selectedCategory !== 'random') return selectedCategory;
    return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].key;
  }, [selectedCategory]);

  const startGame = useCallback(() => {
    usedPairs.clear();
    const cat = getCategory();
    const p = pickPair(usedPairs, cat);
    setPair(p);
    setScore(0);
    setCombo(0);
    setChosen(null);
    setCorrect(null);
    setFunFact('');
    setPhase('playing');
  }, [usedPairs, getCategory]);

  const nextPair = useCallback(() => {
    const cat = getCategory();
    const p = pickPair(usedPairs, cat);
    setPair(p);
    setChosen(null);
    setCorrect(null);
    setFunFact('');
  }, [usedPairs, getCategory]);

  const handleChoice = useCallback((choice: 'a' | 'b') => {
    if (!pair || chosen !== null) return;
    const cat = pair.category;
    const aVal = pair.a[cat] as number;
    const bVal = pair.b[cat] as number;
    const isCorrect = (choice === 'a' && aVal > bVal) || (choice === 'b' && bVal > aVal);
    const winner: Country = aVal > bVal ? pair.a : pair.b;
    const loser: Country = aVal > bVal ? pair.b : pair.a;
    const pairKey = [pair.a.name, pair.b.name].sort().join('|') + '|' + cat;
    usedPairs.add(pairKey);

    setChosen(choice);
    setCorrect(aVal > bVal ? 'a' : 'b');
    setFunFact(FUNFACTS[cat](winner, loser));

    if (isCorrect) {
      const newCombo = combo + 1;
      const bonus = newCombo >= 3 ? Math.floor(newCombo / 3) : 0;
      const points = 1 + bonus;
      setCombo(newCombo);
      setScore(s => {
        const ns = s + points;
        if (ns > bestScore) {
          setBestScore(ns);
          localStorage.setItem('gd-best', String(ns));
        }
        return ns;
      });
    } else {
      setCombo(0);
      // Game over after 3 wrong - tracked via a different state
      // For simplicity, end game on wrong answer
      setTimeout(() => setPhase('gameover'), 2000);
    }
  }, [pair, chosen, combo, usedPairs, bestScore]);

  const bg = 'linear-gradient(135deg, #0d1f3c 0%, #0a0a1a 60%, #1a0a2e 100%)';
  const font = "'Segoe UI','Hiragino Sans',sans-serif";
  const catInfo = pair ? CATEGORIES.find(c => c.key === pair.category)! : null;

  if (phase === 'home') return (
    <div style={{ minHeight: '100vh', background: bg, color: 'white', fontFamily: font, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', fontSize: '16px' }}>
      <div style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '60px', marginBottom: '12px' }}>🌍</div>
        <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 900, margin: '0 0 10px', background: 'linear-gradient(135deg, #4fc3f7, #81c784)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          地理デュエル
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '28px', fontSize: '15px' }}>
          2カ国が提示される。<strong style={{ color: '#4fc3f7' }}>どちらが大きい？</strong><br />
          直感で当てろ！間違えたらゲームオーバー。
        </p>

        {bestScore > 0 && (
          <div style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '10px', padding: '10px', marginBottom: '20px', color: '#ffd700' }}>
            🏆 ベストスコア: {bestScore}問正解
          </div>
        )}

        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>カテゴリ選択</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              onClick={() => setSelectedCategory('random')}
              style={{
                padding: '6px 14px', borderRadius: '20px',
                border: `2px solid ${selectedCategory === 'random' ? '#4fc3f7' : 'rgba(255,255,255,0.2)'}`,
                background: selectedCategory === 'random' ? 'rgba(79,195,247,0.2)' : 'transparent',
                color: selectedCategory === 'random' ? '#4fc3f7' : 'rgba(255,255,255,0.6)',
                fontWeight: selectedCategory === 'random' ? 700 : 400, fontSize: '13px', cursor: 'pointer', fontFamily: font,
              }}>🎲 ランダム</button>
            {CATEGORIES.map(cat => (
              <button key={cat.key} onClick={() => setSelectedCategory(cat.key)}
                style={{
                  padding: '6px 14px', borderRadius: '20px',
                  border: `2px solid ${selectedCategory === cat.key ? '#4fc3f7' : 'rgba(255,255,255,0.2)'}`,
                  background: selectedCategory === cat.key ? 'rgba(79,195,247,0.2)' : 'transparent',
                  color: selectedCategory === cat.key ? '#4fc3f7' : 'rgba(255,255,255,0.6)',
                  fontWeight: selectedCategory === cat.key ? 700 : 400, fontSize: '13px', cursor: 'pointer', fontFamily: font,
                }}>{cat.emoji} {cat.label}</button>
            ))}
          </div>
        </div>

        <button onClick={startGame} style={{
          padding: '14px 48px', borderRadius: '12px', border: 'none',
          background: 'linear-gradient(135deg, #4fc3f7, #26a69a)',
          color: 'white', fontSize: '18px', fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 6px 24px rgba(79,195,247,0.35)', fontFamily: font,
        }}>ゲームスタート！</button>

        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginTop: '16px' }}>
          50カ国のデータ · 6カテゴリ · コンボボーナスあり
        </p>
      </div>
    </div>
  );

  if (phase === 'gameover') return (
    <div style={{ minHeight: '100vh', background: bg, color: 'white', fontFamily: font, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <div style={{ fontSize: '64px', marginBottom: '12px' }}>💥</div>
        <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '8px' }}>ゲームオーバー</h2>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '48px', fontWeight: 900, color: '#4fc3f7' }}>{score}</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px' }}>問正解</div>
        </div>
        {score >= bestScore && score > 0 && (
          <div style={{ background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.4)', borderRadius: '10px', padding: '12px', marginBottom: '20px', color: '#ffd700', fontSize: '15px' }}>
            🎉 新記録！ベストスコア更新！
          </div>
        )}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={() => setPhase('home')} style={{
            padding: '12px 24px', borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.2)', background: 'transparent',
            color: 'white', fontSize: '15px', cursor: 'pointer', fontFamily: font,
          }}>🏠 ホームへ</button>
          <button onClick={startGame} style={{
            padding: '12px 32px', borderRadius: '10px', border: 'none',
            background: 'linear-gradient(135deg, #4fc3f7, #26a69a)',
            color: 'white', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: font,
          }}>🔁 もう一度</button>
        </div>
      </div>
    </div>
  );

  // playing
  if (!pair) return null;
  const revealed = chosen !== null;

  return (
    <div style={{ minHeight: '100vh', background: bg, color: 'white', fontFamily: font, padding: '16px', fontSize: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '600px', margin: '0 auto 16px' }}>
        <div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>スコア</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#4fc3f7' }}>{score}</div>
        </div>
        {combo >= 2 && (
          <div style={{ background: 'rgba(255,159,67,0.2)', border: '1px solid #ff9f43', borderRadius: '20px', padding: '4px 14px', color: '#ff9f43', fontWeight: 700, fontSize: '14px' }}>
            🔥 {combo}コンボ
          </div>
        )}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>ベスト</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#ffd700' }}>{bestScore}</div>
        </div>
      </div>

      {/* Question */}
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ background: 'rgba(79,195,247,0.1)', border: '1px solid rgba(79,195,247,0.3)', borderRadius: '12px', padding: '12px 20px', display: 'inline-block' }}>
          <span style={{ fontSize: '20px', marginRight: '8px' }}>{catInfo?.emoji}</span>
          <span style={{ fontWeight: 700, color: '#4fc3f7' }}>{catInfo?.description}</span>
        </div>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '12px', alignItems: 'center' }}>
        {(['a', 'b'] as const).map((side, sideIdx) => {
          const country = pair[side];
          const isChosen = chosen === side;
          const isCorrectSide = correct === side;
          let border = '2px solid rgba(255,255,255,0.1)';
          let bgCard = 'rgba(255,255,255,0.05)';
          if (revealed) {
            if (isCorrectSide) { border = '2px solid #4caf50'; bgCard = 'rgba(76,175,80,0.15)'; }
            else if (isChosen) { border = '2px solid #f44336'; bgCard = 'rgba(244,67,54,0.15)'; }
          }
          const card = (
            <button
              key={side}
              onClick={() => handleChoice(side)}
              disabled={revealed}
              style={{
                padding: '20px 16px', borderRadius: '16px', background: bgCard, border,
                color: 'white', cursor: revealed ? 'default' : 'pointer',
                textAlign: 'center', transition: 'all 0.3s', fontFamily: font,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
              }}
              onMouseEnter={e => { if (!revealed) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(79,195,247,0.12)'; }}
              onMouseLeave={e => { if (!revealed) (e.currentTarget as HTMLButtonElement).style.background = bgCard; }}
            >
              <div style={{ fontSize: '48px' }}>{country.emoji}</div>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>{country.name}</div>
              {revealed ? (
                <div style={{ fontSize: '20px', fontWeight: 900, color: isCorrectSide ? '#4caf50' : '#f44336' }}>
                  {formatValue(pair.category, country[pair.category] as number)}
                </div>
              ) : (
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.08)', padding: '4px 12px', borderRadius: '8px' }}>
                  タップして選択
                </div>
              )}
              {revealed && (
                <div style={{ fontSize: '24px' }}>{isCorrectSide ? '✓' : isChosen ? '✗' : ''}</div>
              )}
            </button>
          );
          // Insert VS between the two cards
          if (sideIdx === 0) return [
            card,
            <div key="vs" style={{ textAlign: 'center', fontSize: '24px', fontWeight: 900, color: 'rgba(255,255,255,0.3)' }}>VS</div>
          ];
          return card;
        })}
      </div>

      {/* Fun fact & next */}
      {revealed && (
        <div style={{ maxWidth: '600px', margin: '20px auto 0', animation: 'fadeIn 0.4s ease' }}>
          <div style={{
            background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px',
            marginBottom: '16px', fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7,
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            💡 {funFact}
          </div>
          {chosen === correct && (
            <button onClick={nextPair} style={{
              width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
              background: 'linear-gradient(135deg, #4fc3f7, #26a69a)',
              color: 'white', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: font,
            }}>次の問題へ →</button>
          )}
        </div>
      )}

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; } }`}</style>
    </div>
  );
}
