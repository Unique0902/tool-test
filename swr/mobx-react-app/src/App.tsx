import useSWR, { Fetcher } from 'swr';
import './App.css';
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
function App() {
  const fetcher: Fetcher<ProductResponse, string> = () =>
    fetch('https://dummyjson.com/products').then((res) => res.json());
  const { data, error, isLoading } = useSWR('Products', fetcher);

  return (
    <ul>
      {data?.products.map((data) => (
        <li key={data.id}>
          <img src={data.thumbnail} alt='' />
          {/* {data.images.map((d) => (
            <img key={'img' + d} src={d} alt='' />
          ))} */}
          {data.title}
          {data.description}
          {data.price}
          {data.discountPercentage}
          {data.rating}
          {data.stock}
          {data.brand}
          {data.category}
        </li>
      ))}
    </ul>
  );
}

export default App;
