function calculateZakat() {
    const get = (id) => parseFloat(document.getElementById(id).value) || 0;

    // Inputs
    const goldRate     = get("goldRate");
    const silverRate   = get("silverRate");
    const cash         = get("cash");
    const goldGrams    = get("goldGrams");
    const silverGrams  = get("silverGrams");
    const investments  = get("investments");
    const debts        = get("debts");
    const nisabType    = document.getElementById("nisabType").value;

    // Asset values
    const goldValue   = goldGrams * goldRate;
    const silverValue = silverGrams * silverRate;

    const totalAssets = cash + goldValue + silverValue + investments;
    const netAssets   = Math.max(totalAssets - debts, 0);

    // Nisab
    let nisabThreshold = 0;
    if (nisabType === "silver") {
        nisabThreshold = 612.36 * silverRate;
    } else {
        nisabThreshold = 87.48 * goldRate;
    }

    // Update UI
    document.getElementById("displayTotalAssets").textContent = totalAssets.toFixed(2);
    document.getElementById("displayNisab").textContent = nisabThreshold.toFixed(2);
    document.getElementById("result").style.display = "block";

    // Zakat
    if (netAssets >= nisabThreshold) {
        const zakat = netAssets * 0.025;
        document.getElementById("displayZakat").textContent = zakat.toFixed(2);
        document.getElementById("notEligible").style.display = "none";
    } else {
        document.getElementById("displayZakat").textContent = "0.00";
        document.getElementById("notEligible").style.display = "block";
    }
}

// Optional: Auto-calculate on every change
document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", calculateZakat);
});
