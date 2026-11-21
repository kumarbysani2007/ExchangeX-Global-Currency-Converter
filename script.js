
"use strict";

const BASE_URL = "https://api.frankfurter.dev/v1";

const dropdowns = document.querySelectorAll(".dropdown select");
const form = document.querySelector("form");
const button = document.querySelector("form button");
const amount = document.querySelector(".amount input");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

let controller = null;
let requestId = 0;

const TIMEOUT = 10000;

async function getSupportedCurrencies() {
    try {
        const response = await fetch(`${BASE_URL}/currencies`);

        if (!response.ok) {
            throw new Error("Unable to fetch supported currencies.");
        }

        return await response.json();

    } catch (error) {
        console.error("Currency loading error:", error);
        msg.innerText = "Unable to load currencies. Please refresh.";
        return null;
    }
}

function updateFlag(element) {
    const currCode = element.value;
    const countryCode = countryList[currCode];

    const img = element.parentElement.parentElement.querySelector("img");

    if (!countryCode) {
        img.removeAttribute("src");
        img.alt = "Flag unavailable";
        return;
    }

    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    img.alt = `${currCode} flag`;
    img.onerror = () => {
        img.removeAttribute("src");
        img.alt = "Flag unavailable";
    };
}

function formatAmount(value) {
    return new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

async function updateExchangeRate() {
    const currentRequest = ++requestId;

    if (controller) {
        controller.abort();
        controller = null;
    }

    const amtVal = Number(amount.value.trim());

    if (
        amount.value.trim() === "" ||
        !Number.isFinite(amtVal) ||
        amtVal <= 0
    ) {
        msg.innerText = "Please enter a valid amount greater than zero.";
        button.disabled = false;
        button.innerText = "Get Exchange Rate";
        return;
    }

    const fromCode = fromCurr.value;
    const toCode = toCurr.value;

    if (fromCode === toCode) {
        msg.innerText = `${formatAmount(amtVal)} ${fromCode} = ${formatAmount(amtVal)} ${toCode}`;
        button.disabled = false;
        button.innerText = "Get Exchange Rate";
        return;
    }

    const URL = `${BASE_URL}/latest?base=${encodeURIComponent(fromCode)}&symbols=${encodeURIComponent(toCode)}`;

    controller = new AbortController();

    const currentController = controller;
    let timedOut = false;

    button.disabled = true;
    button.innerText = "Loading...";
    msg.innerText = "Getting exchange rate...";

    const timeoutId = setTimeout(() => {
        timedOut = true;
        currentController.abort();
    }, TIMEOUT);

    try {
        const response = await fetch(URL, {
            signal: currentController.signal
        });

        if (!response.ok) {
            throw new Error(`Unable to get exchange rate. HTTP ${response.status}`);
        }

        const data = await response.json();

        if (currentRequest !== requestId) {
            return;
        }

        const rate = data?.rates?.[toCode];

        if (
            typeof rate !== "number" ||
            !Number.isFinite(rate) ||
            rate <= 0
        ) {
            throw new Error("Exchange rate is not available.");
        }

        const finalAmount = amtVal * rate;

        if (!Number.isFinite(finalAmount)) {
            throw new Error("Converted amount is too large.");
        }

        msg.innerText = `${formatAmount(amtVal)} ${fromCode} = ${formatAmount(finalAmount)} ${toCode}`;

        console.log("API Response:", data);
        console.log("Exchange Rate:", rate);
        console.log("Converted Amount:", finalAmount);

    } catch (error) {
        if (currentRequest !== requestId) {
            return;
        }

        if (error.name === "AbortError" && timedOut) {
            msg.innerText = "Request timed out. Please try again.";
        } else if (error.name === "AbortError") {
            return;
        } else {
            console.error("Conversion error:", error);
            msg.innerText = error.message || "Something went wrong.";
        }

    } finally {
        clearTimeout(timeoutId);

        if (currentRequest === requestId) {
            button.disabled = false;
            button.innerText = "Get Exchange Rate";
            controller = null;
        }
    }
}

async function populateDropdowns() {
    button.disabled = true;

    const currencies = await getSupportedCurrencies();

    if (!currencies) {
        button.disabled = true;
        return;
    }

    for (const select of dropdowns) {
        select.innerHTML = "";

        for (const currCode in currencies) {
            const option = document.createElement("option");

            option.value = currCode;
            option.innerText = `${currCode} - ${currencies[currCode]}`;

            if (select.name === "from" && currCode === "USD") {
                option.selected = true;
            }

            if (select.name === "to" && currCode === "INR") {
                option.selected = true;
            }

            select.append(option);
        }

        select.addEventListener("change", (event) => {
            updateFlag(event.target);
            updateExchangeRate();
        });
    }

    updateFlag(fromCurr);
    updateFlag(toCurr);

    button.disabled = false;

    await updateExchangeRate();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    updateExchangeRate();
});

populateDropdowns();
