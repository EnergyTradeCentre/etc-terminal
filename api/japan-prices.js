export default function handler(req, res) {
    // Global commodity benchmarks (simulated)
  const brent = 78.50;
    const ttf = 32.20;
    const hh = 2.45;

  // Synthetic JKM (Japan Korea Marker) - regression model
  // JKM = (Brent * 0.12) + (TTF * 0.15) + constant
  const jkm = (brent * 0.12) + (ttf * 0.15) + 1.5;

  // JEPX area price base (~ 2.2x JKM conversion)
  const baseJepx = jkm * 2.2;

  // Regional area prices with curtailment risk
  const regions = {
        "Tokyo":  { spot: parseFloat((baseJepx * 1.05).toFixed(2)), curtailment: 0.02, nfc: 0.3 },
        "Kyushu": { spot: parseFloat((baseJepx * 0.82).toFixed(2)), curtailment: 0.18, nfc: 0.3 },
        "Kansai": { spot: parseFloat((baseJepx * 0.98).toFixed(2)), curtailment: 0.05, nfc: 0.3 },
        "Tohoku": { spot: parseFloat((baseJepx * 1.10).toFixed(2)), curtailment: 0.03, nfc: 0.3 }
  };

  // Generate 20-year bankable forward curve
  // Uses exponential decay from liquid years to fundamental value
  const curve = Array.from({ length: 20 }, (_, i) => {
        const year = i + 1;
        const liquidYears = 3;
        const lambda = 0.35;
        const weight = year <= liquidYears ? 1.0 : Math.exp(-lambda * (year - liquidYears));
        const marketPrice = baseJepx * Math.pow(1.02, year);
        const fundamentalFloor = 65 * Math.pow(1.01, year);
        const bankablePrice = (weight * marketPrice) + ((1 - weight) * fundamentalFloor);
        return {
                year: 2024 + year,
                value: parseFloat(bankablePrice.toFixed(2))
        };
  });

  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');
    res.status(200).json({
          timestamp: new Date().toISOString(),
          benchmarks: {
                  brent,
                  ttf,
                  hh,
                  jkm: parseFloat(jkm.toFixed(2)),
                  baseJepx: parseFloat(baseJepx.toFixed(2))
          },
          regions,
          curve
    });
}
