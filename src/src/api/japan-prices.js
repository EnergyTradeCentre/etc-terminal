export default function handler(req, res) {
      const brent = 78.50;
        const ttf = 32.20;
          const jkm = (brent * 0.12) + (ttf * 0.15) + 1.5;
            const baseJepx = jkm * 2.2;

              const regions = {
                  "Tokyo":  { spot: baseJepx * 1.05, curtailment: 0.02 },
                      "Kyushu": { spot: baseJepx * 0.82, curtailment: 0.18 },
                          "Kansai": { spot: baseJepx * 0.98, curtailment: 0.05 },
                              "Tohoku": { spot: baseJepx * 1.10, curtailment: 0.03 }
                                };

                                  const curve = Array.from({ length: 20 }, (_, i) => {
                                      const year = i + 1;
                                          const weight = year <= 3 ? 1.0 : Math.exp(-0.35 * (year - 3));
                                              const val = (weight * (baseJepx * Math.pow(1.02, year))) + ((1 - weight) * 65);
                                                  return { year: 2024 + year, value: parseFloat(val.toFixed(2)) };
                                                    });

                                                      res.setHeader('Cache-Control', 's-maxage=600');
                                                        res.status(200).json({
                                                            timestamp: new Date().toISOString(),
                                                                benchmarks: { brent, ttf, jkm },
                                                                    regions,
                                                                        curve
                                                                          });
                                                                          }
}