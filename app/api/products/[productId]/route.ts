import { NextResponse } from 'next/server';
import largeProductData from '@/src/mock/large/products.json';
import smallProductData from '@/src/mock/small/products.json';

type Params = {
  params: {
    productId: string;
  };
};

export async function GET(_: Request, { params }: Params) {
  const data = [...largeProductData, ...smallProductData];
  const product = data.find((product) => product.id === params.productId);

  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}
