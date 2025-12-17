'use client'
import { calculateLoan } from "@/actions/calculatorAction";
import React, { useState, FormEvent } from "react";

type Property = {
  id: number;
  address: string;
  title: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  categories: string;
  type: string;
  price: number;
};

export default function Calculator({ property }: { property: Property }) {
  const [totalAmount, setTotalAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("60");
  const [downPayment, setDownPayment] = useState("");
  
  const [monthlyPayment, setMonthlyPayment] = useState("0.00");
  const [totalInterest, setTotalInterest] = useState("0.00");
  const [totalLoan, setTotalLoan] = useState("0.00");

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();
    
    // Parse inputs
    const total = parseFloat(totalAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const down = parseFloat(downPayment) || 0;
    const months = parseInt(loanTerm); // Now loanTerm is just the number
    
    // Calculate loan amount after down payment
    const loanAmount = total - down;
    
    if (loanAmount <= 0 || rate <= 0 || months <= 0) {
      alert("الرجاء إدخال قيم صحيحة");
      return;
    }
    
    // Calculate monthly interest rate
    const monthlyRate = (rate / 100) / 12;
    
    // Calculate monthly payment using amortization formula
    const payment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
      (Math.pow(1 + monthlyRate, months) - 1);
    
    // Calculate totals
    const totalPaid = payment * months;
    const interest = totalPaid - loanAmount;
    
    setMonthlyPayment(payment.toFixed(2));
    setTotalInterest(interest.toFixed(2));
    setTotalLoan(totalPaid.toFixed(2));
  };

  return (
    <div>
      <h5 className="properties-title mb_20 text-2xl lg:text-3xl font-bold">حاسبة القرض</h5>
      <div className="wrap-form">
        <form className="form-calculator" onSubmit={handleCalculate}>
          <div className="tf-grid-layout xl-col-4 md-col-2">
            <fieldset>
              <label
                htmlFor="total"
                className="text-body-default text_primary-color mb_8"
              >
                المبلغ الإجمالي:
              </label>
              <input
                id="total"
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                tabIndex={2}
                placeholder=" مثلا:450000 "
                aria-required="true"
                 min={0}
                required
              />
            </fieldset>
            <fieldset>
              <label
                htmlFor="interest"
                className="text-body-default text_primary-color mb_8"
              >
              معدل الفائدة %
              </label>
              <input
                id="interest"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                tabIndex={2}
                placeholder=" مثلا:5 "
                min={0}
                aria-required="true"
                required
                step="0.1"
              />
            </fieldset>
            <div>
              <label className="text-body-default text_primary-color mb_8">
                مدة القرض (بالأشهر)
              </label>
              <select 
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full px-3 border border-gray-300 rounded-2xl bg-white h-20"
                required
              >
                <option value="60">60 شهرًا</option>
                <option value="40">40 شهرًا</option>
                <option value="30">30 شهرًا</option>
                <option value="360">360 شهرًا</option>
              </select>
            </div>
            <fieldset>
              <label
                htmlFor="payment"
                className="text-body-default text_primary-color mb_8"
              >
                الدفعة الأولى
              </label>
              <input
                id="payment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                tabIndex={2}
                placeholder=" مثلا:400 "
                aria-required="true"
                min={0}
                required
              />
            </fieldset>
          </div>
          <button
            className="tf-btn btn-bg-1 btn-px-28 w-full"
            type="submit"
          >
            <span>احسب</span>
            <span className="bg-effect"></span>
          </button>
        </form>
        <ul className="info tf-grid-layout sm-col-3 gap_8">
          <li>
            <p className="mb_4">القسط الشهري:</p>
            <div className="text-button text_primary-color fw-7">
              ‎ {monthlyPayment} / الشهر
            </div>
          </li>
          <li>
            <p className="mb_4">إجمالي الفوائد:</p>
            <div className="text-button text_primary-color fw-7">
              ‎ {totalInterest}
            </div>
          </li>
          <li>
            <p className="mb_4">إجمالي القرض التقديري:</p>
            <div className="text-button text_primary-color fw-7">
              ‎ {totalLoan}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}