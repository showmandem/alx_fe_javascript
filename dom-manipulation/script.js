const quote = document.getElementById('quoteDisplay');
const btn = document.getElementById('newQuote');

let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Do what you can, with what you have, where you are.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
  { text: "Stay hungry, stay foolish.", category: "Success" }
];

// localStorage.setItem("quotes", JSON.stringify(quotes));
// let quotess = JSON.parse(localStorage.getItem("quotes")) || [];


function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <small>Category: ${randomQuote.category}</small>
  `;
}
function createAddQuoteForm() {
  const formContainer = document.createElement('div');

  const quoteInput = document.createElement('input');
  quoteInput.placeholder = "Enter quote text";

  const categoryInput = document.createElement('input');
  categoryInput.placeholder = "Enter category";

  const addButton = document.createElement('button');
  addButton.textContent = "Add Quote";

  addButton.addEventListener('click', () => {
    const newText = quoteInput.value.trim();
    const newCategory = categoryInput.value.trim();

    if (newText === '' || newCategory === '') {
      alert("Please fill in both fields.");
      return;
    }

    const newQuote = { text: newText, category: newCategory };
    quotes.push(newQuote);

    alert("Quote added successfully!");
    quoteInput.value = '';
    categoryInput.value = '';
    localStorage.setItem("quotes", JSON.stringify(quotes));

  });
  quotes.push(newQuote);
  localStorage.setItem("quotes", JSON.stringify(quotes));



  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);
  document.body.appendChild(formContainer);
}
function exportQuotesToJSON() {
  // Convert your quotes array to a JSON string
  const dataStr = JSON.stringify(quotes, null, 2); // (null, 2) makes it pretty-formatted

  // Create a Blob from the string
  const blob = new Blob([dataStr], { type: "application/json" });

  //A temporary download link
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json"; // filename for download
  document.body.appendChild(a);
  a.click();

  // Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function importFromJsonFile(event) {
  const file = event.target.files[0]; // get the selected file
  if (!file) return; // stop if no file was selected

  const reader = new FileReader(); // create a new file reader

  reader.onload = function(e) {
    try {
      // Parse the uploaded file’s contents
      const importedQuotes = JSON.parse(e.target.result);

      // Validate the structure (optional)
      if (!Array.isArray(importedQuotes)) {
        alert("Invalid file format. Expected an array of quotes.");
        return;
      }

      // Merge with existing quotes
      quotes.push(...importedQuotes);

      // Save back to localStorage
      localStorage.setItem("quotes", JSON.stringify(quotes));

      alert("Quotes imported successfully!");
    } catch (error) {
      alert("Error importing file: " + error.message);
    }
  };

  reader.readAsText(file); // Read file as text
}
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  // Get unique categories
  const categories = [...new Set(quotes.map(q => q.category))];

  // Add each category to the dropdown
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const quoteDisplay = document.getElementById("quoteDisplay");

  quoteDisplay.innerHTML = ""; // Clear previous quotes

  // Filter based on category
  const filtered = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  // Display filtered quotes
  filtered.forEach(q => {
    const p = document.createElement("p");
    p.textContent = `"${q.text}" - ${q.category}`;
    quoteDisplay.appendChild(p);
  });
}
async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

    // Simulate mapping API data to quote structure
    const serverQuotes = data.slice(0, 5).map(item => ({
      text: item.title,
      category: "Server Data"
    }));

    // Add to your existing quotes array
    quotes.push(...serverQuotes);
    saveQuotes(); // Save to localStorage
    console.log("Fetched quotes from server:", serverQuotes);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function postQuoteToServer(quote) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quote)
    });
    const result = await response.json();
    console.log("Quote successfully posted to server:", result);
  } catch (error) {
    console.error("Error posting data:", error);
  }
}
function addQuote() {
  const text = document.getElementById("quoteInput").value;
  const category = document.getElementById("categoryInput").value;

  if (text && category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    saveQuotes();
    postQuoteToServer(newQuote); // Simulate sending to backend
  }
}

// Fetch new data every 30 seconds
setInterval(fetchQuotesFromServer, 30000);


newQuote.addEventListener('click', showRandomQuote);
createAddQuoteForm();
loadQuotes();           // Load from local storage
fetchQuotesFromServer(); // Simulate fetching from API
populateCategories();   // Populate dropdowns dynamically
filterQuotes();         // Display quotes on screen

document.getElementById("exportQuotes").addEventListener("click", exportQuotesToJSON);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);


