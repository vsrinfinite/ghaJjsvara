// accentrules.js

function processAccent() { 
    console.log("processAccent called"); // Debug message

    const input = document.getElementById('userInput').value.trim();
    const outputDiv = document.getElementById('output');

    if (!input) {
        outputDiv.innerHTML = "<p>Please enter a valid query.</p>";
        console.log("No input provided");
        return;
    }

    let processed = "";
    let outputHTML = "";

    // Helper functions to add an accent (simplified)
    function accentInitial(word) {
        // Accent on the first character
        return word[0] + "́" + word.slice(1);
    }
    function accentFinal(word) {
        // Accent on the last character
        return word.slice(0, -1) + "́" + word[word.length - 1];
    }

    // 1. Rule 6.1.216: For words that have optional accentuation.
    if (["tyAga", "rAga", "hAsa", "kuha", "zvaTha", "kratha"].includes(input)) {
        // Option 1: Accent on the initial syllable
        const option1 = `${input[0]}́${input.slice(1)}`;
        // Option 2: Accent on the final syllable
        const option2 = `${input.slice(0, -1)}́${input[input.length - 1]}`;
        outputHTML = `<p>Accented Forms: ${option1} (initial accent) or ${option2} (final accent)</p>
                      <p>Rule Applied: tyāgarāgahāsakuhaśvaṭhakrathānām (AA 6.1.216)</p>`;
    }
    // 2. Rule 6.1.203: For vṛṣādigaṇa words
    else if (["vRSa", "kAma", "yAma", "pAda"].includes(input)) {
        console.log("Matched rule 6.1.203");
        processed = accentInitial(input);
        outputHTML = `<p>Accented Form: ${processed}</p>
                      <p class="rule">Rule Applied: vṛṣādīnāṃ ca (AA 6.1.203)</p>`;
    }
    // 3. Rule 6.1.159: For words formed with long a or stems dervide from kṛṣ (of bhvādigaṇa)
    else if ( (["karSa", "pAka"].includes(input)) || (input.includes("A") && !["tyAga", "rAga", "hAsa", "kuha", "zvaTha", "kratha"].includes(input)) ) {
        console.log("Matched rule 6.1.159");
        processed = accentFinal(input);
        outputHTML = `<p>Accented Form: ${processed}</p>
                      <p class="rule">Rule Applied: karṣātvato ghaño'nta udāttaḥ (AA 6.1.159)</p>`;
    }
    // 4. Rule 6.2.144: For compounds (use a hyphen between the members of the compund)
    else if (input.includes("-")) {
        console.log("Matched rule 6.2.144");
        const parts = input.split("-");
        processed = parts[0] + "-" + accentFinal(parts[1]);
        outputHTML = `<p>Accented Form: ${processed}</p>
                      <p class="rule">Rule Applied: thāthaghañktājabitrakāṇām (AA 6.2.144)</p>`;
    }
    // 5. Default Rule: default rule
    else {
        console.log("Matched default rule 6.1.197");
        processed = accentInitial(input);
        outputHTML = `<p>Accented Form: ${processed}</p>
                      <p class="rule">Rule Applied: ñnityādirnityam (AA 6.1.197)</p>`;
    }

    console.log("Output HTML:", outputHTML); // Debug message
    outputDiv.innerHTML = outputHTML;
}

