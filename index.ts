type Rule = {
  key: string;
  price: number;
  special?: {
    price: number;
    quantity: number;
  };
};

class Checkout {
  rules: Rule[];
  items: string[];

  constructor(rules: Rule[]) {
    this.rules = rules;
    this.items = [];
  }

  _calculateUnitPrice(totalItems: number, price: number) {
    return totalItems * price;
  }

  _calculateSpecial(
    totalItems: number,
    price: number,
    specialQuantity: number,
    specialPrice: number
  ) {
    let total = 0;

    // 2. Add specials from the number of items
    total += Math.floor(totalItems / specialQuantity) * specialPrice;

    // 3. Find remainder and add as individual units
    let remainder = totalItems % specialQuantity;
    total += this._calculateUnitPrice(remainder, price);

    return total;
  }

  scan(item: string) {
    this.items.push(item);
  }

  total() {
    return this.rules.reduce((acc: number, rule: Rule) => {
      const grouped = this.items.filter((item) => item === rule.key);
      const totalItems = grouped.length;

      const groupedTotal = rule.special
        ? this._calculateSpecial(
            totalItems,
            rule.price,
            rule.special.quantity,
            rule.special.price
          )
        : this._calculateUnitPrice(totalItems, rule.price);

      return acc + groupedTotal;
    }, 0);
  }
}

export default Checkout;
