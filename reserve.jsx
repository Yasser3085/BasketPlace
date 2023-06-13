import React from 'react'
import { useState } from 'react';

import Navbar from './navbar.jsx'
import Courts from './Courts.jsx'
import Footer from './footer.jsx'
export default function Reserve() {
    const [filterText, setFilterText] = useState('');

    const handleFilterText = (text) => {
      setFilterText(text);
    };
  return (
    <div>
      <Navbar onFilterText={handleFilterText} />
      <Courts  filterText={filterText}  />
      <Footer />
    </div>
  )
}
