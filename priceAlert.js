const axios = require("axios");

// CONFIG
const TOKEN_ID = "ethereum"; // coingecko token id (eth, bitcoin, etc)
const TARGET_PRICE = 3500;   // alert price in USD
const CHECK_INTERVAL = 30_000; // 30 seconds

async function checkPrice() {
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price`,
      {
        params: {
          ids: TOKEN_ID,
          vs_currencies: "usd",
        },
      }
    );

    const price = res.data[TOKEN_ID].usd;
    console.log(`Price: $${price}`);

    if (price >= TARGET_PRICE) {
      console.log("🚨 PRICE ALERT TRIGGERED 🚨");
      process.exit(0); // stop script after alert
    }
  } catch (err) {
    console.error("Error fetching price", err.message);
  }
}

setInterval(checkPrice, CHECK_INTERVAL);
