import React, { useEffect } from 'react'
import BookHeroSection from '../components/book/BookHero';
import BookWhySection from '../components/book/BookWhy';
import BookPreorderSection from '../components/book/PreoderSection';

const Book = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <BookHeroSection/>
      <BookWhySection/>
      <BookPreorderSection/>
    </div>
  )
}

export default Book
