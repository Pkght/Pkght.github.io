function calculateZakat() {
    const goldRate = parseFloat(document.getElementById('goldRate').value) || 0;
    const silverRate = parseFloat(document.getElementById('silverRate').value) || 0;
    const cash = parseFloat(document.getElementById('cash').value) || 0;
    const goldGrams = parseFloat(document.getElementById('goldGrams').value) || 0;
    const silverGrams = parseFloat(document.getElementById('silverGrams').value) || 0;
    const investments = parseFloat(document.getElementById('investments').value) || 0;
    const debts = parseFloat(document.getElementById('debts').value) || 0;

    const goldValue = goldGrams * goldRate;
    const silverValue = silverGrams * silverRate;

    const totalAssets = cash + goldValue + silverValue + investments;
    const netAssets = totalAssets - debts;

    const nisabThreshold = 612.36 * silverRate;

    document.getElementById('displayTotalAssets').textContent = totalAssets.toFixed(2);
    document.getElementById('displayNisab').textContent = nisabThreshold.toFixed(2);

    document.getElementById('result').style.display = 'block';
    if (netAssets >= nisabThreshold) {
        const zakatPayable = netAssets * 0.025;
        document.getElementById('displayZakat').textContent = zakatPayable.toFixed(2);
        document.getElementById('notEligible').style.display = 'none';
    } else {
        document.getElementById('displayZakat').textContent = '0';
        document.getElementById('notEligible').style.display = 'block';
    }
}
