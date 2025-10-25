// ✅ Load quotes from localStorage or start with default ones
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Do what you can, with what you have, where you are.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
  { text: "Stay hungry, stay foolish.", category: "Success" }
];

// ✅ Reference HTML elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const quoteTextInput = document.getElementById("newQuoteText");
const quoteCategoryInput = document.getElementById("newQuoteCategory");

// ✅ Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <small>Category: ${randomQuote.category}</small>
  `;
}

// ✅ Function to add a new quote
function addQuote() {
  const newText = quoteTextInput.value.trim();
  const newCategory = quoteCategoryInput.value.trim();

  if (newText && newCategory) {
    const newQuote = { text: newText, category: newCategory };
    quotes.push(newQuote);

    // ✅ Save updated quotes array to localStorage
    localStorage.setItem("quotes", JSON.stringify(quotes));

    alert("✅ New quote added successfully!");
    quoteTextInput.value = "";
    quoteCategoryInput.value = "";
  } else {
    alert("⚠️ Please fill in both fields.");
  }
}

// ✅ Event listener for showing a random quote
newQuoteBtn.addEventListener("click", showRandomQuote);

// ✅ Automatically show one random quote when page loads
window.onload = showRandomQuote;
