import Header from './components/Header';
import Products from './components/Products';
import SellerInfo from './components/SellerInfo';
import Store from '@/store';

export default function App() {
  return (
    <Store>
      <main className="h-screen overflow-auto">
        <Header />
        <div className="max-w-screen-2xl px-6 mx-auto">
          <SellerInfo />
          <Products />
        </div>
      </main>
    </Store>
  );
}
