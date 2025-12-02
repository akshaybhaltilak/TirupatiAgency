import React, { useState, useMemo, useEffect } from 'react';

function EmiCalculator({ visible, onClose, initialAmount = 500000, initialRate = 8.5, initialTenure = 60 }) {
  const [amount, setAmount] = useState(initialAmount);
  const [rate, setRate] = useState(initialRate);
  const [tenure, setTenure] = useState(initialTenure); // months

  useEffect(() => {
    if (!visible) {
      return;
    }
    // When modal becomes visible, ensure inputs prefill from initial props
    setAmount(initialAmount);
    setRate(initialRate);
    setTenure(initialTenure);

    const onEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [visible, initialAmount, initialRate, initialTenure, onClose]);

  const monthlyRate = useMemo(() => (rate / 12) / 100, [rate]);
  const emi = useMemo(() => {
    if (!amount || !monthlyRate || !tenure) return 0;
    const n = parseFloat(tenure);
    const r = parseFloat(monthlyRate);
    const p = parseFloat(amount);
    if (r === 0) return p / n;
    const numerator = p * r * Math.pow(1 + r, n);
    const denominator = Math.pow(1 + r, n) - 1;
    return numerator / denominator;
  }, [amount, monthlyRate, tenure]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center px-4 sm:px-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 transform transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">EMI Calculator</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 rounded-lg px-2 py-1">✕</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-xs text-gray-500">Loan Amount</label>
            <input
              type="number"
              value={amount}
              min={0}
              onChange={(e) => setAmount(+e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Interest Rate (annual %)</label>
            <input
              type="number"
              value={rate}
              step="0.1"
              min={0}
              onChange={(e) => setRate(+e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Tenure (months)</label>
            <input
              type="number"
              value={tenure}
              min={1}
              onChange={(e) => setTenure(+e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">Estimated EMI</div>
              <div className="text-2xl font-bold text-gray-900">₹ {isNaN(emi) ? '0' : emi.toFixed(0)}</div>
            </div>

            <div className="text-right text-sm text-gray-600">
              <div>Principal: <span className="font-semibold text-gray-900">₹ {Number(amount).toLocaleString()}</span></div>
              <div>Interest: <span className="font-semibold text-gray-900">{rate}%</span></div>
              <div>Tenure: <span className="font-semibold text-gray-900">{tenure} mo</span></div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:shadow">Close</button>
          <a
            href={`tel:9850366753`}
            className="px-5 py-2 text-sm rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:opacity-95"
          >
            Talk to advisor
          </a>
        </div>
      </div>
    </div>
  );
}

export default EmiCalculator;
