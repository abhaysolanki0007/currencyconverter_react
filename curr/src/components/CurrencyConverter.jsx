import { useEffect, useState } from "react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [rates, setRates] = useState({});
  const [result, setResult] = useState(0);

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
      .then((res) => res.json())
      .then((data) => setRates(data.rates));
  }, [from]);

  useEffect(() => {
    if (rates[to]) {
      setResult((amount * rates[to]).toFixed(2));
    }
  }, [amount, to, rates]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-80">
      <h2 className="text-xl font-bold mb-4 text-center">
        Currency Converter 💱
      </h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />

      <div className="flex justify-between mb-3">
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 rounded w-1/2 mr-2"
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency}>{currency}</option>
          ))}
        </select>

        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 rounded w-1/2 ml-2"
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency}>{currency}</option>
          ))}
        </select>
      </div>

      <div className="text-center font-semibold">
        Converted Amount:
        <div className="text-lg text-green-600">
          {result} {to}
        </div>
      </div>
    </div>
  );
}
