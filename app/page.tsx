"use client"
import { useState } from "react";
import Placeholder from "@/placeholder/placeholder";

export default function Home() {

  const [isDataAdded, dataAdded] = useState(false)
  const [mortgageTerm, setMortgageTerm] = useState<number | ''>('')
  const [mortgageAmount, setMortgageAmount] = useState<number | ''>('')
  const [interestRate, setInterestRate] = useState<number | ''>('')
  const [selectedMortgageType, setMortgageType] = useState<string>('')
  const [totalAmount, setTotalAmount] = useState<number | ''>('')
  const [monthlyRepayment, setMonthlyRepayment] = useState<number | ''>('')
  const [totalInterest, setTotalInterest] = useState<number | ''>('')
  const [mortgageAmountInvalid, setMortgageAmountInvalid] = useState(false);
  const [mortgageTermInvalid, setMortgageTermInvalid] = useState(false);
  const [interestRateInvalid, setInterestRateInvalid] = useState(false);
  const [mortgageTypeInvalid, setMortgageTypeInvalid] = useState(false);

  const handleMortgageTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setMortgageType(e.target.value)
    setMonthlyRepayment('');
    setTotalAmount('');
    setTotalInterest('');
    dataAdded(false);
  }

  const formattedMortgageAmount =
  mortgageAmount === '' ? '' : Number(mortgageAmount).toLocaleString();

  const handleMortgageAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/,/g, '');
  if (value === '') {
    setMortgageAmount('');
    return;
  }
  const numValue = Number(value);
  if (!isNaN(numValue)) {
    setMortgageAmount(numValue);
  }
};

  const handleMortgageTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if(value === ''){
      setMortgageTerm('');
      return;
    }

    const numValue = Number(value);

    if (numValue >= 0 && numValue <=100){
      setMortgageTerm(numValue)
    }
  }

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
    setInterestRate('');
    return;
  }

    const numValue = parseFloat(value);

    if (!isNaN(numValue) && numValue >= 0 && numValue <=100){
      setInterestRate(numValue)
    }
  }

  const resetInvalidFields = () => {
    setMortgageAmountInvalid(false);
    setMortgageTermInvalid(false);
    setInterestRateInvalid(false);
    setMortgageTypeInvalid(false);
  }

  const calculateRepayments = () => { 
    resetInvalidFields();

    let hasError = false;

  if (mortgageAmount === '' || isNaN(mortgageAmount) || mortgageAmount <= 0) {
    setMortgageAmountInvalid(true);
    hasError = true;
  } else {
    setMortgageAmountInvalid(false);
  }

  if (mortgageTerm === '' || isNaN(mortgageTerm) || mortgageTerm <= 0) {
    setMortgageTermInvalid(true);
    hasError = true;
  } else {
    setMortgageTermInvalid(false);
  }

  if (interestRate === '' || isNaN(interestRate) || interestRate <= 0) {
    setInterestRateInvalid(true);
    hasError = true;
  } else {
    setInterestRateInvalid(false);
  }

  if (selectedMortgageType === '') {
    setMortgageTypeInvalid(true);
    hasError = true;
  } else {
    setMortgageTypeInvalid(false);
  }

  if (hasError) {
    return;
  }

    if (selectedMortgageType === 'repayment'){    
      const amount = Number(mortgageAmount);
      const rate = Number(interestRate);
      const term = Number(mortgageTerm);
      setTotalAmount(Number((amount * (1 + (rate / 100) * term)).toFixed(2)));
      setMonthlyRepayment(Number(((amount * (1 + (rate / 100) * term)) / (term * 12)).toFixed(2)));
      dataAdded(true);
    }
    if (selectedMortgageType === 'interest') {
      const amount = Number(mortgageAmount);
      const rate = Number(interestRate);
      const term = Number(mortgageTerm);
      const totalInterest: number = amount * (rate / 100) * term;
      setTotalAmount(Number((amount + totalInterest).toFixed(2)));
      setMonthlyRepayment(Number(((amount + totalInterest) / (term * 12)).toFixed(2)));
      setTotalInterest(Number(totalInterest.toFixed(2)));
      dataAdded(true);
    }
  }

  const resetForm = () => {
    setMortgageTerm('');
    setMortgageAmount('');
    setInterestRate('');
    setMortgageType('');
    setTotalAmount('');
    setMonthlyRepayment('');
    setTotalInterest('');
    dataAdded(false);
    setMortgageAmountInvalid(false);
    setMortgageTermInvalid(false);
    setInterestRateInvalid(false);
    setMortgageTypeInvalid(false);
   }

  return (
    <div className="w-screen flex flex-col justify-center items-center bg-slate-100 font-[family-name:var(--font-plus-jakarta-sans)] md:h-screen lg:h-screen">
      <div className="w-full flex flex-col bg-white md:w-[90%] rounded-md lg:flex-row lg:w-[65%]">
      <div className="flex flex-col w-screen pt-6 pl-5 pr-5 bg-white sm:items-start md:rounded-t-xl md:pl-10 md:pr-10 md:w-[100%] lg:w-[50%] lg:rounded-l-md">
        <div className="flex flex-col md:flex-row md:w-full">
        <h2 className="text-2xl font-bold">Mortgage Calculator</h2>
        <p className="text-slate-700 underline underline-offset-2 mb-5 mt-1 md:ml-auto cursor-pointer" onClick={() => {resetForm()}}>Clear All</p>
        </div>
        <label className="text-slate-700 mb-2" htmlFor="mortgage-amount">Mortgage Amount</label>
      <div className={`w-full border ${mortgageAmountInvalid ? "border-red-500" : "border-slate-700"} h-12 rounded-md flex items-center relative ${mortgageAmountInvalid ? "mb-1" : "mb-5"} cursor-pointer focus-within:border-lime group`}>
  <input
    className="w-full h-full pl-14 pr-14 rounded-md no-spinner focus:outline-none cursor-pointer"
    type="text"
    id="mortgage-amount"
    name="mortgage-amount"
    value={formattedMortgageAmount}
    onChange={handleMortgageAmountChange}
  />
  <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-[45px] ${mortgageAmountInvalid ? "bg-red-500" : "bg-slate-100"}  rounded-l-md group-focus-within:bg-lime`} />
  <span className={`absolute left-3 ${mortgageAmountInvalid ? "text-white" : "text-slate-700"} font-bold group-focus-within:text-slate-900`}>£</span>
</div>
    {mortgageAmountInvalid && (
  <span className="text-red-500 mb-5 text-xs mt-1">This field is required</span>
)}
    <div className="flex flex-col w-full md:flex-row">
        <div className="w-full md:w-[50%] mr-6 cursor-pointer">
        <label className="text-slate-700 mb-2" htmlFor="mortgage-term">Mortgage Term</label>
       <div className={`w-full border ${mortgageTermInvalid ? "border-red-500" : "border-slate-700"} h-12 rounded-md flex items-center relative ${mortgageTermInvalid ? "mb-1" : "mb-5"} focus-within:border-lime group`}>
        <input className="w-full focus:outline-none cursor-pointer pl-4" type="text" id="mortgage-term" name="mortgage-term" value={mortgageTerm} onChange={handleMortgageTermChange}/>
        <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-18 h-[45px] ${mortgageTermInvalid ? "bg-red-500" : "bg-slate-100"} rounded-r-md group-focus-within:bg-lime`} />
        <span className={`absolute right-3 top-3 ${mortgageTermInvalid ? "text-white" : "text-slate-700"} font-bold group-focus-within:text-slate-900 cursor-pointer`}>years</span>
        </div>
           {mortgageTermInvalid && (
  <span className="text-red-500 mb-5 text-xs mt-1">This field is required</span>
)}
        </div>
        <div className="w-full md:w-[50%]">
        <label className="text-slate-700 mb-2 cursor-pointer" htmlFor="interest-rate">Interest Rate</label>
         <div className={`w-full border  ${interestRateInvalid ? "border-red-500" : "border-slate-700"} h-12 rounded-md flex items-center relative ${interestRateInvalid ? "mb-1" : "mb-5"} focus-within:border-lime group cursor-pointer`}>
        <input className="w-full pl-4 focus:outline-none cursor-pointer" type="text" id="interest-rate" name="interest-rate" inputMode="decimal"
  pattern="^\d*\.?\d*$"  value={interestRate} onChange={handleInterestRateChange} />
        <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-[45px] ${interestRateInvalid ? "bg-red-500" : "bg-slate-100"} rounded-r-md group-focus-within:bg-lime`} />
        <span className={`absolute right-3 top-3 ${interestRateInvalid  ? "text-white" : "text-slate-700"} font-bold group-focus-within:text-slate-900`}>%</span>
        </div>
                   {mortgageTermInvalid && (
  <span className="text-red-500 mb-5 text-xs mt-1">This field is required</span>
)}
        </div>
        </div>
        <p className="text-slate-700 mb-2 mt-1">Mortgage Type</p>
<label
  className={`w-full border h-12 rounded-md flex mb-2 items-center cursor-pointer transition
    ${selectedMortgageType === 'repayment'
      ? 'border-lime bg-lime-translucent'
      : 'border-slate-700 bg-white hover:border-lime'}
  `}
>
  <input
    className="sr-only appearance-none w-5 h-5 border-2 border-gray-500 rounded-full m-4 checked:bg-lime checked:border-transparent"
    type="radio"
    id="repayment"
    name="option"
    value="repayment"
    checked={selectedMortgageType === 'repayment'}
    onChange={handleMortgageTypeChange}
  />
  <span className={`w-5 h-5 ml-4 mr-4 rounded-full border-2 ${selectedMortgageType === 'repayment' ? 'border-lime' : 'border-gray-500'}  flex items-center justify-center`}>
    {selectedMortgageType === 'repayment' && (
      <span className="w-3 h-3 bg-lime rounded-full"></span>
    )}
  </span>
  <span className="text-standard font-extrabold">Repayment</span>
</label>

<label
  className={`w-full border h-12 rounded-md flex ${interestRateInvalid ? "mb-1" : "mb-5"} items-center cursor-pointer transition
    ${selectedMortgageType === 'interest'
      ? 'border-lime bg-lime-translucent'
      : 'border-slate-700 bg-white hover:border-lime'}
  `}
>
  <input
    className="sr-only appearance-none w-5 h-5 border-2 border-gray-500 rounded-full m-4 checked:bg-lime checked:border-transparent"
    type="radio"
    id="interest"
    name="option"
    value="interest"
    checked={selectedMortgageType === 'interest'}
    onChange={handleMortgageTypeChange}
  />
  <span className={`w-5 h-5 ml-4 mr-4  rounded-full border-2 ${selectedMortgageType === 'interest' ? 'border-lime' : 'border-gray-500'} flex items-center justify-center`}>
    {selectedMortgageType === 'interest' && (
      <span className="w-3 h-3 bg-lime rounded-full"></span>
    )}
  </span>
  <span className="text-standard font-extrabold">Interest Only</span>
</label>
                   {mortgageTypeInvalid && (
  <span className="text-red-500 mb-5 text-xs mt-1">This field is required</span>
)}
<button className="w-full bg-lime button-hover-lime-translucent text-slate-900 font-bold text-standard py-3 px-4 mb-7 rounded-full flex items-center justify-center gap-2 md:w-[50%] lg:w-[75%]" onClick={() => calculateRepayments() }>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#133041" d="M18.75 2.25H5.25a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5Zm-10.5 16.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 18.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 15a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 15Zm3.75 3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm1.5-5.25a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v3.75Z"/></svg><span>Calculate Repayments</span></button>
      </div>
      { !isDataAdded ? 
      <Placeholder /> : 
      <div className="w-screen md:pl-10 md:pr-10 xl: justify-start bg-slate-900 flex flex-col font-[family-name:var(--font-plus-jakarta-sans)] pt-6 md:w-[100%] md:rounded-b-xl lg:w-[50%] xl:rounded-bl-[75px] xl:rounded">
      <p className="text-2xl font-bold text-white mb-4">Your results</p>
      <p className="text-s text-slate-300 w-60 pb-6 md:w-110 lg:w-[90%]">Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
      <div className="w-full h-[58%] bg-dark-blue bg-opacity-25 rounded-lg border-t-6"
      style={{ borderTopColor: 'var(--color-lime)' }}>
        <p className="text-slate-300 mt-6 ml-7 mb-3">Your monthly repayments</p>
        <p className="text-6xl font-bold text-lime ml-7">£
    {typeof monthlyRepayment === 'number' && !isNaN(monthlyRepayment)
      ? monthlyRepayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : monthlyRepayment}</p>
        <hr className="border-t border-slate-300 my-4 w-[84%] mx-auto" />
        <p className="text-slate-300 ml-7 mt-6 mb-2">Total youll repay over the term</p>
        <p className="text-xl font-bold text-white ml-7"> £
    {selectedMortgageType === 'repayment'
      ? (typeof totalAmount === 'number' && !isNaN(totalAmount)
          ? totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          : totalAmount)
      : (typeof totalInterest === 'number' && !isNaN(totalInterest)
          ? totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          : totalInterest)
    }</p>
      </div>
      </div>
    }
    </div>
    </div>
  );
}
