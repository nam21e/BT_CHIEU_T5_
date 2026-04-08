// Câu 1: Constructor function
function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
}

// Câu 2: Tạo mảng ít nhất 6 sản phẩm (>= 2 category)
let products = [
    new Product(1, "Laptop", 25000000, 10, "Electronics", true),
    new Product(2, "Phone", 15000000, 5, "Electronics", true),
    new Product(3, "Headphone", 2000000, 0, "Accessories", true),
    new Product(4, "Mouse", 500000, 20, "Accessories", true),
    new Product(5, "Keyboard", 1000000, 0, "Accessories", false),
    new Product(6, "Monitor", 7000000, 8, "Electronics", true),
];

// Câu 3: Mảng chỉ chứa name + price
let namePriceList = products.map(p => ({
    name: p.name,
    price: p.price
}));
console.log("Câu 3:", namePriceList);

// Câu 4: Sản phẩm còn hàng (quantity > 0)
let inStock = products.filter(p => p.quantity > 0);
console.log("Câu 4:", inStock);

// Câu 5: Có ít nhất 1 sản phẩm > 30 triệu không?
let hasExpensive = products.some(p => p.price > 30000000);
console.log("Câu 5:", hasExpensive);

// Câu 6: Tất cả sản phẩm category "Accessories" có đang bán không?
let allAccessoriesAvailable = products
    .filter(p => p.category === "Accessories")
    .every(p => p.isAvailable === true);

console.log("Câu 6:", allAccessoriesAvailable);

// Câu 7: Tổng giá trị kho = price * quantity
let totalValue = products.reduce((sum, p) => {
    return sum + (p.price * p.quantity);
}, 0);

console.log("Câu 7:", totalValue);

// Câu 8: for...of in ra tên – danh mục – trạng thái
console.log("Câu 8:");
for (let p of products) {
    console.log(`${p.name} - ${p.category} - ${p.isAvailable}`);
}

// Câu 9: for...in
console.log("Câu 9:");
for (let key in products[0]) {
    console.log("Thuộc tính:", key);
    console.log("Giá trị:", products[0][key]);
}

// Câu 10: Tên sản phẩm đang bán và còn hàng
let availableProducts = products
    .filter(p => p.isAvailable && p.quantity > 0)
    .map(p => p.name);

console.log("Câu 10:", availableProducts);