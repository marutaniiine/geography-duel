export interface Country {
  name: string;
  emoji: string;
  population: number;   // 万人
  area: number;         // km²
  gdp: number;          // 億USD
  lifeExpectancy: number; // 年
  coastline: number;    // km
  elevation: number;    // 最高地点 m
}

export const COUNTRIES: Country[] = [
  { name: '日本', emoji: '🇯🇵', population: 12400, area: 377975, gdp: 42400, lifeExpectancy: 84, coastline: 29751, elevation: 3776 },
  { name: '中国', emoji: '🇨🇳', population: 140000, area: 9596960, gdp: 177350, lifeExpectancy: 77, coastline: 14500, elevation: 8849 },
  { name: 'アメリカ', emoji: '🇺🇸', population: 33200, area: 9833517, gdp: 255500, lifeExpectancy: 79, coastline: 19924, elevation: 6194 },
  { name: 'インド', emoji: '🇮🇳', population: 143000, area: 3287263, gdp: 35500, lifeExpectancy: 70, coastline: 7516, elevation: 8849 },
  { name: 'ドイツ', emoji: '🇩🇪', population: 8400, area: 357114, gdp: 40800, lifeExpectancy: 81, coastline: 2389, elevation: 2962 },
  { name: 'フランス', emoji: '🇫🇷', population: 6800, area: 551695, gdp: 27900, lifeExpectancy: 82, coastline: 4853, elevation: 4808 },
  { name: 'イギリス', emoji: '🇬🇧', population: 6700, area: 242495, gdp: 31400, lifeExpectancy: 81, coastline: 12429, elevation: 1345 },
  { name: 'ブラジル', emoji: '🇧🇷', population: 21500, area: 8515767, gdp: 20800, lifeExpectancy: 75, coastline: 7491, elevation: 2994 },
  { name: 'カナダ', emoji: '🇨🇦', population: 3800, area: 9984670, gdp: 21300, lifeExpectancy: 83, coastline: 202080, elevation: 5959 },
  { name: 'ロシア', emoji: '🇷🇺', population: 14400, area: 17098242, gdp: 18620, lifeExpectancy: 73, coastline: 37653, elevation: 5642 },
  { name: 'オーストラリア', emoji: '🇦🇺', population: 2600, area: 7692024, gdp: 17000, lifeExpectancy: 83, coastline: 25760, elevation: 2228 },
  { name: 'メキシコ', emoji: '🇲🇽', population: 12800, area: 1964375, gdp: 13600, lifeExpectancy: 75, coastline: 9330, elevation: 5610 },
  { name: '韓国', emoji: '🇰🇷', population: 5200, area: 100210, gdp: 16640, lifeExpectancy: 83, coastline: 2413, elevation: 1950 },
  { name: 'インドネシア', emoji: '🇮🇩', population: 27800, area: 1904569, gdp: 13000, lifeExpectancy: 68, coastline: 54716, elevation: 4884 },
  { name: 'トルコ', emoji: '🇹🇷', population: 8500, area: 783562, gdp: 9050, lifeExpectancy: 77, coastline: 7200, elevation: 5137 },
  { name: 'サウジアラビア', emoji: '🇸🇦', population: 3600, area: 2149690, gdp: 10620, lifeExpectancy: 76, coastline: 2640, elevation: 3133 },
  { name: 'アルゼンチン', emoji: '🇦🇷', population: 4600, area: 2780400, gdp: 6300, lifeExpectancy: 77, coastline: 4989, elevation: 6961 },
  { name: 'スペイン', emoji: '🇪🇸', population: 4700, area: 505990, gdp: 14420, lifeExpectancy: 84, coastline: 4964, elevation: 3718 },
  { name: 'オランダ', emoji: '🇳🇱', population: 1750, area: 41543, gdp: 10090, lifeExpectancy: 82, coastline: 451, elevation: 322 },
  { name: 'スイス', emoji: '🇨🇭', population: 870, area: 41285, gdp: 8070, lifeExpectancy: 84, coastline: 0, elevation: 4634 },
  { name: 'スウェーデン', emoji: '🇸🇪', population: 1050, area: 450295, gdp: 5930, lifeExpectancy: 83, coastline: 3218, elevation: 2111 },
  { name: 'ノルウェー', emoji: '🇳🇴', population: 540, area: 323802, gdp: 4820, lifeExpectancy: 83, coastline: 25148, elevation: 2469 },
  { name: 'フィンランド', emoji: '🇫🇮', population: 555, area: 338145, gdp: 2810, lifeExpectancy: 82, coastline: 1250, elevation: 1328 },
  { name: 'デンマーク', emoji: '🇩🇰', population: 590, area: 42924, gdp: 3940, lifeExpectancy: 81, coastline: 7314, elevation: 171 },
  { name: 'ポーランド', emoji: '🇵🇱', population: 3800, area: 312696, gdp: 6880, lifeExpectancy: 78, coastline: 440, elevation: 2499 },
  { name: 'イタリア', emoji: '🇮🇹', population: 5900, area: 301340, gdp: 21700, lifeExpectancy: 83, coastline: 7600, elevation: 4748 },
  { name: 'ポルトガル', emoji: '🇵🇹', population: 1030, area: 92212, gdp: 2440, lifeExpectancy: 81, coastline: 1793, elevation: 1993 },
  { name: 'ギリシャ', emoji: '🇬🇷', population: 1040, area: 131957, gdp: 2160, lifeExpectancy: 82, coastline: 13676, elevation: 2918 },
  { name: 'エジプト', emoji: '🇪🇬', population: 10500, area: 1001449, gdp: 4870, lifeExpectancy: 72, coastline: 2450, elevation: 2629 },
  { name: 'ナイジェリア', emoji: '🇳🇬', population: 22000, area: 923768, gdp: 4720, lifeExpectancy: 54, coastline: 853, elevation: 2419 },
  { name: '南アフリカ', emoji: '🇿🇦', population: 6000, area: 1219090, gdp: 3990, lifeExpectancy: 64, coastline: 2798, elevation: 3450 },
  { name: 'フィリピン', emoji: '🇵🇭', population: 11500, area: 300000, gdp: 4040, lifeExpectancy: 69, coastline: 36289, elevation: 2954 },
  { name: 'ベトナム', emoji: '🇻🇳', population: 9800, area: 331210, gdp: 4490, lifeExpectancy: 74, coastline: 3444, elevation: 3143 },
  { name: 'タイ', emoji: '🇹🇭', population: 7000, area: 513120, gdp: 5220, lifeExpectancy: 77, coastline: 3219, elevation: 2565 },
  { name: 'マレーシア', emoji: '🇲🇾', population: 3300, area: 329847, gdp: 4360, lifeExpectancy: 76, coastline: 4675, elevation: 4095 },
  { name: 'バングラデシュ', emoji: '🇧🇩', population: 16700, area: 147570, gdp: 4600, lifeExpectancy: 73, coastline: 580, elevation: 1230 },
  { name: 'パキスタン', emoji: '🇵🇰', population: 23000, area: 881913, gdp: 3760, lifeExpectancy: 67, coastline: 1046, elevation: 8611 },
  { name: 'イラン', emoji: '🇮🇷', population: 8600, area: 1648195, gdp: 3680, lifeExpectancy: 77, coastline: 2440, elevation: 5671 },
  { name: 'コロンビア', emoji: '🇨🇴', population: 5200, area: 1141748, gdp: 3440, lifeExpectancy: 77, coastline: 3208, elevation: 5775 },
  { name: 'チリ', emoji: '🇨🇱', population: 1950, area: 756102, gdp: 3170, lifeExpectancy: 80, coastline: 6435, elevation: 6893 },
  { name: 'ペルー', emoji: '🇵🇪', population: 3300, area: 1285216, gdp: 2680, lifeExpectancy: 77, coastline: 2414, elevation: 6768 },
  { name: 'ウクライナ', emoji: '🇺🇦', population: 4400, area: 603550, gdp: 1780, lifeExpectancy: 73, coastline: 2782, elevation: 2061 },
  { name: 'ニュージーランド', emoji: '🇳🇿', population: 520, area: 268838, gdp: 2500, lifeExpectancy: 82, coastline: 15134, elevation: 3724 },
  { name: 'シンガポール', emoji: '🇸🇬', population: 590, area: 719, gdp: 4670, lifeExpectancy: 84, coastline: 193, elevation: 164 },
  { name: 'アイスランド', emoji: '🇮🇸', population: 37, area: 103000, gdp: 254, lifeExpectancy: 83, coastline: 4988, elevation: 2110 },
  { name: 'モンゴル', emoji: '🇲🇳', population: 330, area: 1564116, gdp: 172, lifeExpectancy: 69, coastline: 0, elevation: 4374 },
  { name: 'カザフスタン', emoji: '🇰🇿', population: 1930, area: 2724900, gdp: 2200, lifeExpectancy: 74, coastline: 0, elevation: 7010 },
  { name: 'カメルーン', emoji: '🇨🇲', population: 2800, area: 475440, gdp: 470, lifeExpectancy: 60, coastline: 402, elevation: 4095 },
  { name: 'ケニア', emoji: '🇰🇪', population: 5600, area: 580367, gdp: 1180, lifeExpectancy: 67, coastline: 536, elevation: 5199 },
  { name: 'エチオピア', emoji: '🇪🇹', population: 12700, area: 1104300, gdp: 1270, lifeExpectancy: 68, coastline: 0, elevation: 4533 },
];

export type Category = 'population' | 'area' | 'gdp' | 'lifeExpectancy' | 'coastline' | 'elevation';

export const CATEGORIES: { key: Category; label: string; unit: string; description: string; emoji: string }[] = [
  { key: 'population', label: '人口', unit: '万人', description: '人口が多い国はどっち？', emoji: '👥' },
  { key: 'area', label: '面積', unit: 'km²', description: '面積が広い国はどっち？', emoji: '🗺️' },
  { key: 'gdp', label: 'GDP', unit: '億USD', description: 'GDPが大きい国はどっち？', emoji: '💰' },
  { key: 'lifeExpectancy', label: '平均寿命', unit: '歳', description: '平均寿命が長い国はどっち？', emoji: '🏥' },
  { key: 'coastline', label: '海岸線の長さ', unit: 'km', description: '海岸線が長い国はどっち？', emoji: '🌊' },
  { key: 'elevation', label: '最高地点の標高', unit: 'm', description: '最高地点が高い国はどっち？', emoji: '⛰️' },
];

export function formatValue(key: Category, val: number): string {
  if (key === 'population') return val.toLocaleString() + '万人';
  if (key === 'area') return val.toLocaleString() + ' km²';
  if (key === 'gdp') return val.toLocaleString() + '億USD';
  if (key === 'lifeExpectancy') return val + '歳';
  if (key === 'coastline') return val === 0 ? '海に面していない' : val.toLocaleString() + ' km';
  if (key === 'elevation') return val.toLocaleString() + ' m';
  return String(val);
}
