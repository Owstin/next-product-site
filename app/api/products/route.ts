import { NextRequest, NextResponse } from 'next/server';
import smallProductData from '@/src/mock/small/products.json';
import largeProductData from '@/src/mock/large/products.json';
import Fuse from 'fuse.js';

type PageData = {
  page: number;
  size: number;
  totalPages: number;
};

export type ResponseData = {
  productData: typeof smallProductData;
  pageData: PageData;
};

const filterResults = (data: typeof smallProductData, search: string) => {
  if (!search) {
    return data;
  }

  const fuseOptions = {
    isCaseSensitive: false,
    findAllMatches: true,
    keys: ['name', 'description', 'category'],
  };
  const fuse = new Fuse(data, fuseOptions);

  return fuse.search(search);
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = +(searchParams.get('page') ?? 1);
  const size = +(searchParams.get('size') ?? 20);
  const search = searchParams.get('search') ?? '';

  const data = [...largeProductData, ...smallProductData];
  const filteredData = filterResults(data, search);

  const totalPages = Math.ceil(filteredData.length / size);

  if (page < 1 || size < 1 || page > totalPages) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const productData = filteredData.slice(startIndex, endIndex).map((product) => (!search ? product : product.item));

  const pageData = {
    page,
    size,
    totalPages,
  };

  return NextResponse.json<ResponseData>({ productData, pageData });
}
