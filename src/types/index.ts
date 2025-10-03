export type TBanners = {
  _id: string;
  subtitle: string;
  title: string;
  image: string;
  status: string;
  type: string;
};
export type TCategory = {
  _id: string;
  title: string;
  image: string;
};

export type TColor = {
  _id: string;
  colorName: string;
  colorCode: string;
  size: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
};
export type TSize = {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
};

export type TBrand = {
  _id: string;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
};

export type TProducts = {
  _id: string;
  title: string;
  quantity: number;
  mrpPrice: number;
  discount: number;
  description: string;
  category: TCategory;
  colors: TColor[];
  brand: TBrand;
  thumbal_image: string;
  backview_image: string;
  images: string[];
  freeShipping: boolean;
  stock_status: string;
  labels: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  sku: string;
  label: string;
  price: number;
  soldQuantity: number;
  availableQuantity: number;
  __v: number;
};

export type TAuthor = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TBlogs = {
  _id: string;
  title: string;
  image: string;
  description: string;
  author: TAuthor;
  tags: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type TCart = {
  userRef?: string;
  productRef: TProducts[];
  quantity: number;
};
export type TContact = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export interface TOrderProduct {
  productRef: string
  quantity: number
  color: string
  size: string
  _id: string
}

export type TOrder = {
  _id: string
  subTotalPrice: number
  totalPrice: number
  shippingCost: number
  products: TOrderProduct[]
  name: string
  phone: string
  city: string
  address: string
  road: string
  paymentMethod: string
  status: string
};
