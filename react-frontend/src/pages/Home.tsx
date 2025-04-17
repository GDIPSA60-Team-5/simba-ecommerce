import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full ">
      <h1 className="text-2xl mt-5 mb-5 font-light">Explore Our Collection</h1>

      <div className="search-bar flex border mb-10">
        <input className="px-5 py-2" type="text" name="search" id="search" placeholder="Search" />
        <Link to="/books" className="bg-black text-white px-3 py-3 h-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
            <path d="M17.1 18L10.8 11.7C10.3 12.1 9.725 12.4167 9.075 12.65C8.425 12.8833 7.73333 13 7 13C5.18333 13 3.646 12.3707 2.388 11.112C1.13 9.85333 0.500667 8.316 0.500001 6.5C0.499334 4.684 1.12867 3.14667 2.388 1.888C3.64733 0.629333 5.18467 0 7 0C8.81533 0 10.353 0.629333 11.613 1.888C12.873 3.14667 13.502 4.684 13.5 6.5C13.5 7.23333 13.3833 7.925 13.15 8.575C12.9167 9.225 12.6 9.8 12.2 10.3L18.5 16.6L17.1 18ZM7 11C8.25 11 9.31267 10.5627 10.188 9.688C11.0633 8.81333 11.5007 7.75067 11.5 6.5C11.4993 5.24933 11.062 4.187 10.188 3.313C9.314 2.439 8.25133 2.00133 7 2C5.74867 1.99867 4.68633 2.43633 3.813 3.313C2.93967 4.18967 2.502 5.252 2.5 6.5C2.498 7.748 2.93567 8.81067 3.813 9.688C4.69033 10.5653 5.75267 11.0027 7 11Z" fill="#FAFAFA" />
          </svg>
        </Link>
      </div>
      <img className="mb-15" src="images/hero.png" alt="" />
    </div >
  )
} 