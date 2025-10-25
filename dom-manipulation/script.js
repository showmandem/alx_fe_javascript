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
newQuote.addEventListener('click', showRandomQuote);
createAddQuoteForm();

