import React from 'react'
import styles from "./../styles/Converter.module.css"
import { FaArrowRightArrowLeft } from 'react-icons/fa6'
import { useState, useEffect } from 'react'

function Converter() {
        const apiKey = import.meta.env.VITE_APIKEY;
        const [conversionResult, setConversionResult] = useState(null)
        
        const [selectedCurrency1, setSelectedCurrency1] = useState('');
        const handleSelectChange1 = (event) => {
          setSelectedCurrency1(event.target.value);
          setConversionResult(null)
        }
        const [selectedCurrency2, setSelectedCurrency2] = useState('');
        const handleSelectChange2 = (event) => {
          setSelectedCurrency2(event.target.value);
          setConversionResult(null)
        }
        const [amount, setAmount] = useState('');
        const handleInputChange = (event) =>{
          setAmount(event.target.value);
          setConversionResult(null)
        }
       async function Convert(){
        try {
          const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${selectedCurrency1}`)
          const data = await response.json()
          //console.log(data);
          const rates = data.conversion_rates
          //console.log(rates);
          const selectedRate = rates[selectedCurrency2]
          console.log(selectedRate);
          const result = amount * selectedRate
          setConversionResult(result)
          //const answer = `${amount}${selectedCurrency1} is equal to ${amount * selectedRate}${selectedCurrency2}`
          
          
          if (!response) {
            throw new Error('error fetching data')
          }
          
        } catch (error) {
          console.log(error.message);
          }
        }
        
  return (
    <div className={styles.Converter}>
      <h2 className={styles.title}>Currency Converter</h2>
      <form>
        <select value={selectedCurrency1} onChange={handleSelectChange1} className={styles.input1}>
          <option value="">Select a currency from</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="CHF">CHF</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="NGN">NGN</option>
          <option value="QAR">QAR</option>
          <option value="USD">USD</option>
        </select>
        <br className={styles.breaker}/>
        <FaArrowRightArrowLeft className={styles.arrow}/>
        <br className={styles.breaker}/>
        <select value={selectedCurrency2} onChange={handleSelectChange2} className={styles.input1}>
          <option value="">Select a currency to</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="CHF">CHF</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="NGN">NGN</option>
          <option value="QAR">QAR</option>
          <option value="USD">USD</option>
        </select> <br />
        <input type="text" placeholder="Amount" value={amount} onChange={handleInputChange} className={styles.amount}/>
      </form>
      <button onClick={Convert} className={styles.button}>Calculate</button>
      {conversionResult !== null ? (
        <p className={styles.answer}>
          {amount} {selectedCurrency1} is equal to {conversionResult.toFixed(4)}{' '}
          {selectedCurrency2}
        </p>
      ): ('')}
    </div>
  )};

export default Converter
