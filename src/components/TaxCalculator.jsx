export const calculateTaxes = (annualIncome, state, filingStatus = "single") => {
    // Federal Tax Brackets (2023 example, adjust as needed)
    const federalBrackets = [
      { rate: 0.10, range: [0, 11000] },
      { rate: 0.12, range: [11001, 44725] },
      { rate: 0.22, range: [44726, 95375] },
      // Add more brackets...
    ];
  
    const standardDeduction = filingStatus === "single" ? 13850 : 27700; // Adjust based on filing status
  
    let federalTax = 0;
    const taxableIncome = Math.max(0, annualIncome - standardDeduction);
    for (const bracket of federalBrackets) {
      const [min, max] = bracket.range;
      const incomeInBracket = Math.min(Math.max(0, taxableIncome - min), max - min);
      federalTax += incomeInBracket * bracket.rate;
    }
  
    // State Tax Example (use actual rates per state or integrate an API)
    const stateRates = { CA: 0.05, NY: 0.06, TX: 0 }; // Example rates
    const stateTax = (stateRates[state] || 0) * taxableIncome;
  
    // FICA Taxes
    const socialSecurityTax = Math.min(annualIncome * 0.062, 160200 * 0.062); // 2023 cap
    const medicareTax = annualIncome * 0.0145;
  
    const ficaTax = socialSecurityTax + medicareTax;
  
    const totalTax = federalTax + stateTax + ficaTax;
    const afterTaxIncome = annualIncome - totalTax;
  
    return {
      afterTaxIncome,
      taxes: {
        federal: federalTax.toFixed(2),
        state: stateTax.toFixed(2),
        fica: ficaTax.toFixed(2),
        total: totalTax.toFixed(2),
      },
    };
  };
  