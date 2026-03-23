export default function handler(req, res) {
        const brent = 78.50;
        const ttf = 32.20;
        const ukEts = 42.50;
        const basePrice = 45.0;

  const curve = Array.from({ length: 20 }, (_, i) => {
            const year = i + 1;
            const weight = year <= 4 ? 1.0 : Math.exp(-0.30 * (year - 4));
            const val = (weight * (basePrice * Math.pow(1.02, year))) + ((1 - weight) * 65);
            return { year: 2024 + year, value: parseFloat(val.toFixed(2)) };
  });

  res.setHeader('Cache-Control', 's-maxage=600');
        res.status(200).json({
                  timestamp: new Date().toISOString(),
                  benchmarks: { brent, ttf, ukEts },
                  daAvg: 42.1,
                  imbalance: 2.4,
                  curve
        });
}
