export default function Header() {
  return (
    <header className="flex justify-center items-center py-4 bg-orange-300 sticky top-0 z-50">
      <div className="text-3xl text-primary font-bold">E-COMMERCE</div>
      <button className="absolute right-8 btn btn-sm btn-accent" type="button">
        Login
      </button>
    </header>
  );
}
