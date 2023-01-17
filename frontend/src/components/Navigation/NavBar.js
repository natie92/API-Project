import React, { useState } from "react";
import "./NavBar.css";


export default function SearchBar() {

  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.target.value);
  };

  return(
    <div>
      <input
      className="search-bar"
      type="text"
      placeholder="Search..."
      value={search}
      onChange={handleChange}
      />
    </div>
  );


};








// const NavBar = () => {
//   return (


//     <form>
//     <div className="nav-search-bar-container">
//       <div className="main-buttion">
//         <div className="anwhere">Anywhere</div>
//         <div className="anyweek">Any week</div>
//         <div className="addguests">Add guests</div>
//         <button className="search">

//         </button>
//       </div>
//     </div>
//     </form>
//   );
// };

// export default NavBar;
