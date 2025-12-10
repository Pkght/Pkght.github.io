function calculateInheritance() {
    const estateValue = parseFloat(document.getElementById('estateValue').value) || 0;
    const spouse = document.getElementById('spouse').value;
    const sons = parseInt(document.getElementById('sons').value) || 0;
    const daughters = parseInt(document.getElementById('daughters').value) || 0;
    const father = document.getElementById('father').value;
    const mother = document.getElementById('mother').value;

    if (estateValue <= 0) {
        alert("Please enter a valid estate value.");
        return;
    }

    let shares = {};
    let remainingEstate = estateValue;

    // This is a simplified model and does not cover all complex scenarios.
    // It follows some of the basic rules of Islamic inheritance.

    if (spouse === 'husband') {
        if (sons > 0 || daughters > 0) {
            shares['Husband'] = estateValue / 4;
        } else {
            shares['Husband'] = estateValue / 2;
        }
        remainingEstate -= shares['Husband'];
    } else if (spouse === 'wife') {
        if (sons > 0 || daughters > 0) {
            shares['Wife'] = estateValue / 8;
        } else {
            shares['Wife'] = estateValue / 4;
        }
        remainingEstate -= shares['Wife'];
    }

    if (father === 'yes') {
        shares['Father'] = remainingEstate / 6;
        remainingEstate -= shares['Father'];
    }

    if (mother === 'yes') {
        shares['Mother'] = remainingEstate / 6;
        remainingEstate -= shares['Mother'];
    }

    if (sons > 0 || daughters > 0) {
        const totalParts = (sons * 2) + daughters;
        const sharePerPart = remainingEstate / totalParts;
        if (sons > 0) {
            shares['Sons (each)'] = sharePerPart * 2;
            shares['Total for Sons'] = sons * shares['Sons (each)'];
        }
        if (daughters > 0) {
            shares['Daughters (each)'] = sharePerPart;
            shares['Total for Daughters'] = daughters * shares['Daughters (each)'];
        }
    }

    displayShares(shares);
}

function displayShares(shares) {
    const resultDiv = document.getElementById('result');
    const sharesDiv = document.getElementById('shares');
    sharesDiv.innerHTML = '';

    for (const heir in shares) {
        const shareValue = shares[heir];
        const p = document.createElement('p');
        p.textContent = `${heir}: ${shareValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        sharesDiv.appendChild(p);
    }

    resultDiv.style.display = 'block';
}
