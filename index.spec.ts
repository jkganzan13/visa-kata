import Checkout from './index';

const pricingRules = [
  {
    key: 'A',
    price: 50,
    special: {
      price: 130,
      quantity: 3,
    },
  },
  {
    key: 'B',
    price: 30,
    special: {
      price: 45,
      quantity: 2,
    },
  },
  {
    key: 'C',
    price: 20,
  },
  {
    key: 'D',
    price: 15,
  },
];

describe('Checkout tests', () => {
  describe('Totals - single items', () => {
    it('0 for no products', () => {
      const checkout = new Checkout(pricingRules);
      expect(checkout.total()).toBe(0);
    });
    it("50 for 'A'", () => {
      const checkout = new Checkout(pricingRules);
      checkout.scan('A');
      expect(checkout.total()).toBe(50);
    });
    it("80 for 'AB'", () => {
      const checkout = new Checkout(pricingRules);
      checkout.scan('A');
      checkout.scan('B');
      expect(checkout.total()).toBe(80);
    });
    it("115 for 'CDBA'", () => {
      const checkout = new Checkout(pricingRules);
      checkout.scan('C');
      checkout.scan('D');
      checkout.scan('B');
      checkout.scan('A');
      expect(checkout.total()).toBe(115);
    });
  });

  describe('Totals - multiple items', () => {
    it("100 for 'AA'", () => {
      const checkout = new Checkout(pricingRules);
      checkout.scan('A');
      checkout.scan('A');
      expect(checkout.total()).toBe(100);
    });
    it("130 for 'AAA'", () => {
      const checkout = new Checkout(pricingRules);
      checkout.scan('A');
      checkout.scan('A');
      checkout.scan('A');
      expect(checkout.total()).toBe(130);
    });
    it("180 for 'AAAA'", () => {
      const checkout = new Checkout(pricingRules);
      checkout.scan('A');
      checkout.scan('A');
      checkout.scan('A');
      checkout.scan('A');
      expect(checkout.total()).toBe(180);
    });
    it("230 for 'AAAAA'", () => {
      const checkout = new Checkout(pricingRules);
      checkout.scan('A');
      checkout.scan('A');
      checkout.scan('A');
      checkout.scan('A');
      checkout.scan('A');
      expect(checkout.total()).toBe(230);
    });
    it("260 for 'AAAAAA'", () => {
      const checkout = new Checkout(pricingRules);
      checkout.scan('A');
      checkout.scan('A');
      checkout.scan('A');
      checkout.scan('A');
      checkout.scan('A');
      checkout.scan('A');
      expect(checkout.total()).toBe(260);
    });
  });

  describe('Totals - mixed items', () => {
    it("160 for 'AAAB'", () => {
      const checkout = new Checkout(pricingRules);
      checkout.scan('A');
      checkout.scan('A');
      checkout.scan('A');
      checkout.scan('B');
      expect(checkout.total()).toBe(160);
    });
    it("175 for 'AAABB'", () => {
      const checkout = new Checkout(pricingRules);
      checkout.scan('A');
      checkout.scan('A');
      checkout.scan('A');
      checkout.scan('B');
      checkout.scan('B');
      expect(checkout.total()).toBe(175);
    });
    it("190 for 'AAABBD'", () => {
      const checkout = new Checkout(pricingRules);
      checkout.scan('A');
      checkout.scan('A');
      checkout.scan('A');
      checkout.scan('B');
      checkout.scan('B');
      checkout.scan('D');
      expect(checkout.total()).toBe(190);
    });
    it("190 for 'DABABA'", () => {
      const checkout = new Checkout(pricingRules);
      checkout.scan('D');
      checkout.scan('A');
      checkout.scan('B');
      checkout.scan('A');
      checkout.scan('B');
      checkout.scan('A');
      expect(checkout.total()).toBe(190);
    });
  });

  describe('Incremental', () => {
    it('should return correct total', () => {
      const checkout = new Checkout(pricingRules);
      expect(checkout.total()).toBe(0);

      checkout.scan('A');
      expect(checkout.total()).toBe(50);

      checkout.scan('B');
      expect(checkout.total()).toBe(80);

      checkout.scan('A');
      expect(checkout.total()).toBe(130);

      checkout.scan('A');
      expect(checkout.total()).toBe(160);

      checkout.scan('B');
      expect(checkout.total()).toBe(175);
    });
  });
});
