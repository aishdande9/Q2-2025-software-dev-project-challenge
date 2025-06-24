const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Sample products, countries, and cities
const products = [
  { product_id: 1001, name: "Wireless Mouse", base_price: 19.99 },
  { product_id: 1002, name: "Bluetooth Headphones", base_price: 49.99 },
  { product_id: 1003, name: "Mechanical Keyboard", base_price: 89.99 },
  { product_id: 1004, name: "USB-C Cable", base_price: 9.99 },
  { product_id: 1005, name: "Webcam", base_price: 39.99 },
  { product_id: 1006, name: "Laptop Stand", base_price: 25.99 },
  { product_id: 1007, name: "4K Monitor", base_price: 229.99 },
  { product_id: 1008, name: "Portable SSD", base_price: 79.99 },
  { product_id: 1009, name: "Smartphone Case", base_price: 15.99 },
  { product_id: 1010, name: "Wireless Charger", base_price: 29.99 },
];

const countries = ["USA", "Canada", "UK", "Germany", "France", "Australia", "Japan", "Brazil", "India", "Mexico"];

const cities = {
  USA: ["New York", "Los Angeles", "Chicago", "Houston", "Seattle"],
  Canada: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
  UK: ["London", "Manchester", "Bristol", "Birmingham"],
  Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt"],
  France: ["Paris", "Lyon", "Marseille", "Toulouse"],
  Australia: ["Sydney", "Melbourne", "Brisbane", "Perth"],
  Japan: ["Tokyo", "Osaka", "Yokohama", "Nagoya"],
  Brazil: ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador"],
  India: ["Mumbai", "Delhi", "Bangalore", "Hyderabad"],
  Mexico: ["Mexico City", "Guadalajara", "Monterrey", "Puebla"],
};

function generateSyntheticEcommerceData(outputCsv = "synthetic_orders.csv", numRecords = 100000) {
  const now = new Date();
  const startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

  const writeStream = fs.createWriteStream(outputCsv, { encoding: "utf-8" });

  writeStream.write([
    "order_id",
    "order_date",
    "user_id",
    "product_id",
    "quantity",
    "price",
    "total_amount",
    "country",
    "city"
  ].join(",") + "\n");

  for (let i = 0; i < numRecords; i++) {
    const orderId = uuidv4();

    const randomDays = Math.floor(Math.random() * 365);
    const orderDate = new Date(startDate.getTime() + randomDays * 24 * 60 * 60 * 1000);
    const orderDateStr = orderDate.toISOString().split("T")[0];

    const userId = Math.floor(Math.random() * 900000) + 100000;

    const product = products[Math.floor(Math.random() * products.length)];
    const productId = product.product_id;
    const basePrice = product.base_price;

    const quantity = Math.floor(Math.random() * 5) + 1;
    const finalPrice = +(basePrice * (0.9 + Math.random() * 0.2)).toFixed(2);
    const totalAmount = +(finalPrice * quantity).toFixed(2);

    const country = countries[Math.floor(Math.random() * countries.length)];
    const cityList = cities[country];
    const city = cityList[Math.floor(Math.random() * cityList.length)];

    writeStream.write([
      orderId,
      orderDateStr,
      userId,
      productId,
      quantity,
      finalPrice,
      totalAmount,
      country,
      city
    ].join(",") + "\n");
  }

  writeStream.end(() => {
    console.log(`Successfully generated ${numRecords} synthetic records in '${outputCsv}'.`);
  });
}

if (require.main === module) {
  generateSyntheticEcommerceData();
}
