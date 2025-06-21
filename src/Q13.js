const checkout = {
    items: [],
    total: 0,
  
    addItem(item) {
      // Convert string price to number if needed
      const price = Number(item.price);
  
      // Validate: must be a finite positive number
      if (!item.name || isNaN(price) || price <= 0) {
        console.log("❌ Invalid item or price.");
        return;
      }
  
      // Push valid item with corrected price
      this.items.push({ ...item, price });
      this.total += price;
      console.log(`✅ Added "${item.name}" for $${price.toFixed(2)}`);
    },
  
    getTotal() {
      return `Total: $${this.total.toFixed(2)}`;
    }
  };
  
  // 🧪 Test cases
  checkout.addItem({ name: "Coffee Maker", price: "99.95" }); // Coerces string
  checkout.addItem({ name: "Milk", price: 3.50 });            // Valid number
  checkout.addItem({ name: "Invalid", price: "abc" });        // Invalid string
  
  console.log(checkout.getTotal()); // Output: Total: $103.45
  