import Header from './components/Header.tsx';
import Products from './components/Products.tsx';
import SellerInfo from './components/SellerInfo.tsx';
import Store from './components/Store.tsx';

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
