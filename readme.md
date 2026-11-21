# ExchangeX – Global Currency Converter

ExchangeX is a modern, responsive currency converter that allows users to convert amounts between different currencies using the latest available reference exchange rates.

The application fetches supported currencies and exchange rates from the **Frankfurter API** and displays corresponding country flags using **FlagsAPI**.

##  Features

- **Currency Conversion:** Convert amounts between supported currencies.
- **Dynamic Currency Dropdowns:** Automatically fetches and displays supported currencies from the API.
- **Country Flags:** Displays corresponding flags based on the selected currency.
- **Automatic Conversion:** Updates the conversion result when the user changes a currency.
- **Input Validation:** Prevents empty, invalid, zero, and negative amounts.
- **Error Handling:** Handles API failures and unavailable exchange rates.
- **Request Timeout:** Cancels requests that take longer than 10 seconds.
- **Request Cancellation:** Uses AbortController to cancel previous requests when a new conversion starts.
- **Responsive Design:** Works on desktop and mobile devices.
- **Number Formatting:** Displays amounts using Indian number formatting.

##  Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structures the application |
| CSS3 | Styling and responsive design |
| JavaScript (ES6+) | Application logic and DOM manipulation |
| Fetch API | Fetches data from external APIs |
| Async/Await | Handles asynchronous operations |
| Frankfurter API | Provides supported currencies and exchange rates |
| FlagsAPI | Displays country flag images |

##  APIs Used

### 1. Frankfurter API

Used to fetch supported currencies and exchange rates.

**Currencies Endpoint:**

```text
https://api.frankfurter.dev/v1/currencies
```

Fetches supported currency codes and their full names to populate the From and To dropdowns.

**Exchange Rates Endpoint:**

```text
https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR
```

Fetches the latest available reference exchange rate from USD to INR.

The application dynamically changes the base and target currencies according to the user's selection.

API Documentation: https://frankfurter.dev/

### 2. FlagsAPI

Used to display country flags corresponding to the selected currencies.

Example:

```text
https://flagsapi.com/IN/flat/64.png
```

The application uses currency-to-country code mappings stored in `codes.js` to generate flag image URLs.

Website: https://flagsapi.com/

##  Project Structure

```text
ExchangeX/
│
├── index.html
├── style.css
├── script.js
├── codes.js
└── README.md
```

| File | Description |
|---|---|
| `index.html` | Contains the structure of the currency converter |
| `style.css` | Contains the styling and responsive layout |
| `script.js` | Handles API requests, conversion logic, validation, and DOM manipulation |
| `codes.js` | Maps currency codes to country or region codes for displaying flags |
| `README.md` | Project documentation |

##  How It Works

1. When the application loads, JavaScript fetches the supported currencies from the Frankfurter API.
2. The currency data is used to dynamically populate both dropdown menus.
3. The default currencies are set to USD (From) and INR (To).
4. The corresponding country flags are displayed using FlagsAPI.
5. The user enters an amount and selects the currencies.
6. JavaScript constructs a dynamic API URL based on the selected currencies.
7. The Fetch API retrieves the exchange rate.
8. The converted amount is calculated by multiplying the entered amount by the exchange rate.
9. The result is displayed on the screen.

**Conversion Formula:**

```text
Converted Amount = Entered Amount × Exchange Rate
```

##  Getting Started

Follow these steps to run the project locally.

**1. Clone the repository**

```bash
git clone https://github.com/YOUR-USERNAME/exchangex-currency-converter.git
```

**2. Open the project folder**

```bash
cd exchangex-currency-converter
```

**3. Run the application**

Open `index.html` in your browser or use the **Live Server** extension in VS Code.

No additional installation or package manager is required.

##  JavaScript Concepts Practiced

This project helped me practice the following JavaScript concepts:

- Variables (`let` and `const`)
- DOM Manipulation
- Event Handling
- Fetch API
- Promises
- Async/Await
- Try, Catch, and Finally
- Arrow Functions
- Template Literals
- Array and Object Iteration
- Optional Chaining
- AbortController
- setTimeout and clearTimeout
- Input Validation
- Intl.NumberFormat()

##  Note About Exchange Rates

ExchangeX uses reference exchange rates provided by the Frankfurter API. These are not necessarily the same as real-time bank, card, or money-exchange transaction rates. Actual conversion rates and fees may vary by provider.

## Future Improvements

- Add a currency swap feature.
- Display historical exchange rates.
- Add a conversion history section.
- Add a copy-result button.
- Improve accessibility and user preferences.

##  Author

**Kumar Bysani**

GitHub: https://github.com/kumarbysani2007

---

If you find this project useful, consider giving the repository a star!