import { SearchBar } from "../components/SearchBar";

export default function Home() {

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl mt-5 mb-5 font-light">Explore Our Collection</h1>

      <SearchBar></SearchBar>

      <img className="mb-15" src="images/hero.png" alt="Hero Banner" />
    </div>
  );
}
