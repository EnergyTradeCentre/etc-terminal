import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Zap, Lock } from 'lucide-react';

const theme = {
    bg: '#050505',
    surface: '#0f0f0f',
    border: '#222',
    gb: '#00ff41',
    jp: '#ff3131',
    text: '#e0e0e0',
    mono: '"IBM Plex Mono", monospace',
    serif: '"Cormorant Garamond", serif'
};

function Gate({ onVerify }) {
    return (
          <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
                  <div style={{ border: `1px solid ${theme.border}`, padding: '50px', textAlign: 'center', maxWidth: '400px' }}>
                            <Lock size={40} color={theme.gb} style={{ marginBottom: '20px' }} />
                            <h1 style={{ fontFamily: theme.serif, fontSize: '2rem', marginBottom: '10px', color: '#fff' }}>Institutional Access</h1>
                            <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '30px' }}>ETC Deal Intelligence Terminal v7.3</p>
                            <input type="email" placeholder="Institutional Email" style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: `1px solid ${theme.border}`, color: '#fff', marginBottom: '15px', boxSizing: 'border-box' }} />
                            <button onClick={onVerify} style={{ width: '100%', padding: '12px', background: theme.gb, color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>REQUEST ACCESS</button>
                  </div>
          </div>
        );
}

function JapanEXP({ data }) {
    return (
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', overflowY: 'auto' }}>
                  <div style={{ border: `1px solid ${theme.jp}`, padding: '30px' }}>
                            <h2 style={{ fontFamily: theme.serif, fontSize: '2rem', color: theme.jp }}>Regional Curtailment Engine</h2>
                            <p style={{ fontSize: '0.8rem', color: '#888' }}>Probability of OCCTO intervention by area (2025-2030)</p>
                            <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                              {Object.entries(data.regions || {}).map(([name, r]) => (
                        <div key={name}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                          <span style={{ fontSize: '0.9rem', color: theme.text }}>{name.toUpperCase()}</span>
                                                          <span style={{ color: theme.jp }}>{(r.curtailment * 100).toFixed(1)}% RISK</span>
                                        </div>
                                        <div style={{ height: '2px', background: '#222' }}>
                                                          <div style={{ height: '100%', background: theme.jp, width: `${r.curtailment * 100}%` }}></div>
                                        </div>
                        </div>
                      ))}
                            </div>
                  </div>
                  <div style={{ border: `1px solid ${theme.border}`, padding: '30px', background: 'rgba(255,49,49,0.02)' }}>
                            <h2 style={{ fontFamily: theme.serif, fontSize: '2rem', color: '#fff' }}>PPA Settlement Forecast</h2>
                            <div style={{ fontSize: '3rem', margin: '20px 0', fontWeight: 'bold', color: '#fff' }}>
                              {data.benchmarks ? `$${data.benchmarks.jkm.toFixed(2)}` : '--'}
                                        <span style={{ fontSize: '1rem', color: '#666' }}> Synthetic JKM</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#aaa', lineHeight: '1.6' }}>
                                        Synthetic JKM pricing provides a stable floor for Kansai-based assets. NFC Certificates estimated at +$0.30/kWh additional upside.
                            </p>
                            <div style={{ marginTop: '40px', padding: '20px', border: '1px dashed #444', fontSize: '0.7rem', color: '#888' }}>
                                        [ANALYSIS]: High correlation with Brent crude observed. Curtailment in Kyushu suggests shifting development pipeline to Tohoku for grid stability.
                            </div>
                  </div>
          </div>
        );
}

function Dashboard({ market, data }) {
    const color = market === 'gb' ? theme.gb : theme.jp;
    return (
          <>
                <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ flex: 1, border: `1px solid ${theme.border}`, padding: '15px' }}>
                                  <h3 style={{ fontSize: '0.7rem', color: '#888', marginBottom: '15px' }}>GENERATION_MIX</h3>
                                  <div style={{ height: '150px', border: `1px solid ${theme.border}`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                              <Activity color={color} size={40} style={{ opacity: 0.2 }} />
                                              <div style={{ position: 'absolute', textAlign: 'center' }}>
                                                            <div style={{ fontSize: '1.2rem', color: '#fff' }}>{market === 'gb' ? '42.1%' : '18.4%'}</div>
                                                            <div style={{ fontSize: '0.5rem', color: '#666' }}>RENEWABLE_CAPTURE</div>
                                              </div>
                                  </div>
                                  <div style={{ marginTop: '20px' }}>
                                              <h3 style={{ fontSize: '0.7rem', color: '#888' }}>RISK_SIGNALS</h3>
                                    {['Liquidity Tail', 'Curtailment Spike', 'Grid Imbalance'].map(risk => (
                          <div key={risk} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #111', fontSize: '0.7rem' }}>
                                          <span style={{ color: theme.text }}>{risk}</span>
                                          <span style={{ color: theme.jp }}>CRITICAL</span>
                          </div>
                        ))}
                                  </div>
                        </div>
                </div>
                <div style={{ flex: 1, border: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', background: '#000' }}>
                        <div style={{ flex: 1, padding: '20px', fontSize: '0.85rem', color: '#aaa', overflowY: 'auto' }}>
                                  <div style={{ color: color }}>[SYSTEM_READY] ... Initializing Intelligence Bridge</div>
                                  <div style={{ marginTop: '10px' }}>[MARKET_AWARENESS]: Analysis of the {market.toUpperCase()} forward curve indicates spread compression in Q4. Merchant tail risks are currently priced at a 12% discount to historical fundamental value.</div>
                                  <div style={{ marginTop: '20px', borderLeft: `2px solid ${theme.border}`, paddingLeft: '15px', fontStyle: 'italic' }}>
                                              ETC Intelligence: &quot;Given the current forward curve trajectory, the {market === 'gb' ? 'UK ETS' : 'Kyushu area price'} is likely to face a 15% curtailment haircut during peak hours. Recommend shifting PPA tenor to 12 years.&quot;
                                  </div>
                        </div>
                        <div style={{ padding: '15px', borderTop: `1px solid ${theme.border}`, display: 'flex', gap: '10px' }}>
                                  <span style={{ color: color }}>{'>'}</span>
                                  <input type="text" placeholder="Query deal intelligence..." style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', width: '100%', fontFamily: theme.mono }} />
                        </div>
                </div>
                <div style={{ width: '320px', border: `1px solid ${theme.border}`, padding: '15px' }}>
                        <h3 style={{ fontSize: '0.7rem', color: '#888', marginBottom: '15px' }}>BANKABLE_FORWARD_CURVE</h3>
                        <div style={{ height: '250px' }}>
                                  <ResponsiveContainer width="100%" height="100%">
                                              <AreaChart data={data.curve || []}>
                                                            <defs>
                                                                            <linearGradient id="colorCurve" x1="0" y1="0" x2="0" y2="1">
                                                                                              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                                                                              <stop offset="95%" stopColor={color} stopOpacity={0} />
                                                                            </linearGradient>
                                                            </defs>
                                                            <XAxis dataKey="year" stroke="#444" fontSize={10} />
                                                            <YAxis stroke="#444" fontSize={10} />
                                                            <Tooltip contentStyle={{ background: '#000', border: '1px solid #222' }} />
                                                            <Area type="monotone" dataKey="value" stroke={color} fillOpacity={1} fill="url(#colorCurve)" />
                                              </AreaChart>
                                  </ResponsiveContainer>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                                  <button style={{ width: '100%', padding: '12px', background: color, color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.7rem' }}>
                                              BOOK_DEAL_REVIEW
                                  </button>
                        </div>
                </div>
          </>>
        );
}

export default function App() {
    const [verified, setVerified] = useState(!!localStorage.getItem('etc_session'));
    const [market, setMarket] = useState('gb');
    const [showJapanEXP, setShowJapanEXP] = useState(false);
    const [data, setData] = useState({ curve: [], regions: {}, benchmarks: null });
  
    useEffect(() => {
          const fetchMarketData = async () => {
                  try {
                            const res = await fetch(market === 'gb' ? '/api/prices' : '/api/japan-prices');
                            const json = await res.json();
                            setData(json);
                  } catch (e) {
                            console.error('Market data sync failed', e);
                  }
          };
          fetchMarketData();
          const interval = setInterval(fetchMarketData, 120000);
          return () => clearInterval(interval);
    }, [market]);
  
    if (!verified) {
          return <Gate onVerify={() => { localStorage.setItem('etc_session', 'true'); setVerified(true); }} />;
    }
                              
    const color = market === 'gb' ? theme.gb : theme.jp;
  
    return (
          <div style={{ backgroundColor: theme.bg, color: theme.text, height: '100vh', fontFamily: theme.mono, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <header style={{ height: '60px', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', padding: '0 25px', justifyContent: 'space-between', background: theme.surface }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                                  <div style={{ fontFamily: theme.serif, fontSize: '1.6rem', fontWeight: 'bold', color: '#fff' }}>
                                              ETC <span style={{ fontSize: '0.8rem', fontFamily: theme.mono, color: theme.gb }}>INTEL_TERMINAL</span>
            </div>
                                  <div style={{ display: 'flex', background: '#000', border: `1px solid ${theme.border}`, borderRadius: '2px', padding: '2px' }}>
                                              <button onClick={() => { setMarket('gb'); setShowJapanEXP(false); }} style={{ padding: '5px 15px', background: market === 'gb' ? theme.gb : 'transparent', color: market === 'gb' ? '#000' : '#fff', border: 'none', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}>GB_MARKET</button>
                                              <button onClick={() => setMarket('japan')} style={{ padding: '5px 15px', background: market === 'japan' ? theme.jp : 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}>JAPAN_SYNTH</button>
                                  </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                          {market === 'japan' && (
                        <button onClick={() => setShowJapanEXP(!showJapanEXP)} style={{ background: 'transparent', border: `1px solid ${theme.jp}`, color: theme.jp, padding: '6px 15px', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 'bold' }}>
                          {showJapanEXP ? '[ CLOSE_EXP_ENGINE ]' : '[ RUN_JAPAN_EXP_DEEP_DIVE ]'}
                        </button>
                                  )}
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', color: theme.gb }}>
                                              <div style={{ width: '8px', height: '8px', background: theme.gb, borderRadius: '50%', boxShadow: `0 0 10px ${theme.gb}` }}></div>
                                              LIVE_FEED_ACTIVE
                                  </div>
                        </div>
                </header>
                <div style={{ height: '30px', background: '#000', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                        <div style={{ whiteSpace: 'nowrap', fontSize: '0.7rem', animation: 'marquee 30s linear infinite', color: '#666', paddingLeft: '100%' }}>
                                  MARKET_STATE: {market.toUpperCase()} // BRENT: $78.21 // TTF: {'\u20AC'}34.12 // UK_ETS: {'\u00A3'}42.50 // JKM_SYNTH: $12.45 // JEPX_BASE: {'\u00A5'}14.2 // PPA_SENSITIVITY: HIGH &nbsp;&nbsp;&nbsp; MARKET_STATE: {market.toUpperCase()} // BRENT: $78.21 // TTF: {'\u20AC'}34.12 // UK_ETS: {'\u00A3'}42.50 // JKM_SYNTH: $12.45
                        </div>
                </div>
                <main style={{ flex: 1, display: 'flex', padding: '15px', gap: '15px', overflow: 'hidden' }}>
                  {showJapanEXP ? <JapanEXP data={data} /> : <Dashboard market={market} data={data} />}
                </main>
          </div>
        );
}</>
