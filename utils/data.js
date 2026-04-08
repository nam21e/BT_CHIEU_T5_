let dataCategories = [
  {
    id: 1,
    name: "k232080-M.Moiz Updated",
    slug: "k232080-m-moiz-updated",
    image: "https://placeimg.com/640/480/tech",
    creationAt: "2026-03-04T17:42:16.000Z",
    updatedAt: "2026-03-04T18:34:54.000Z"
  },
  {
    id: 2,
    name: "Petter",
    slug: "petter",
    image: "https://i.imgur.com/ZANVnHE.jpeg",
    creationAt: "2026-03-04T17:42:16.000Z",
    updatedAt: "2026-03-05T04:17:29.000Z"
  },
  {
    id: 3,
    name: "My First Name",
    slug: "my-first-name",
    image: "https://i.imgur.com/Qphac99.jpeg",
    creationAt: "2026-03-04T17:42:16.000Z",
    updatedAt: "2026-03-04T18:24:25.000Z"
  },
  {
    id: 4,
    name: "Shoes",
    slug: "shoes",
    image: "https://i.imgur.com/qNOjJje.jpeg",
    creationAt: "2026-03-04T17:42:16.000Z",
    updatedAt: "2026-03-04T17:42:16.000Z"
  },
  {
    id: 5,
    name: "Miscellaneous",
    slug: "miscellaneous",
    image: "https://i.imgur.com/BG8J0Fj.jpg",
    creationAt: "2026-03-04T17:42:16.000Z",
    updatedAt: "2026-03-04T17:42:16.000Z"
  }
];

let dataProducts = [
  {
    id: "3",
    title: "Nuevo titulo",
    slug: "nuevo-titulo",
    price: 1000,
    description: "Stay cozy and stylish with our Classic Heather Gray Hoodie.",
    category: {
      id: 1,
      name: "k232080-M.Moiz Updated",
      slug: "k232080-m-moiz-updated",
      image: "https://placeimg.com/640/480/tech",
      creationAt: "2026-03-04T17:42:16.000Z",
      updatedAt: "2026-03-04T18:34:54.000Z"
    },
    images: ["https://placeimg.com/640/480/any"],
    isDeleted: false,
    creationAt: "2026-03-04T17:42:16.000Z",
    updatedAt: "2026-03-05T02:20:07.000Z"
  },
  {
    id: "18",
    title: "Sleek White & Orange Wireless Gaming Controller",
    slug: "sleek-white-orange-wireless-gaming-controller",
    price: 6,
    description: "Gaming controller",
    category: {
      id: 2,
      name: "Petter",
      slug: "petter",
      image: "https://i.imgur.com/ZANVnHE.jpeg",
      creationAt: "2026-03-04T17:42:16.000Z",
      updatedAt: "2026-03-05T04:17:29.000Z"
    },
    images: ["https://i.imgur.com/ZANVnHE.jpeg"],
    isDeleted: false,
    creationAt: "2026-03-04T17:42:16.000Z",
    updatedAt: "2026-03-04T20:54:36.000Z"
  },
  {
    id: "28",
    title: "Sleek Modern Leather Sofa",
    slug: "sleek-modern-leather-sofa",
    price: 53,
    description: "Modern sofa",
    category: {
      id: 3,
      name: "My First Name",
      slug: "my-first-name",
      image: "https://i.imgur.com/Qphac99.jpeg",
      creationAt: "2026-03-04T17:42:16.000Z",
      updatedAt: "2026-03-04T18:24:25.000Z"
    },
    images: ["https://i.imgur.com/Qphac99.jpeg"],
    isDeleted: false,
    creationAt: "2026-03-04T17:42:16.000Z",
    updatedAt: "2026-03-04T17:42:16.000Z"
  }
];

let dataComments = [
  {
    id: "1",
    productId: "3",
    content: "Sản phẩm này đẹp",
    author: "Nguyen Van A",
    isDeleted: false,
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    productId: "18",
    content: "Giá khá ổn",
    author: "Tran Van B",
    isDeleted: false,
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

module.exports = {
  dataCategories,
  dataProducts,
  dataComments
};