// ===== SORT FROM HIGHEST TO LOWEST (ADD-ON ONLY) =====

// Convert "250,000" → 250000
function parseValue(valueStr) {
    return Number(valueStr.replace(/,/g, ""));
}

// Return units sorted by BASE VALUE (highest → lowest)
function sortUnitsHighestToLowest() {
    return Object.values(unitDatabase).sort((a, b) => {
        return parseValue(b.baseStats.value) - parseValue(a.baseStats.value);
    });
}
