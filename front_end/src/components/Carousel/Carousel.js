import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Carousel.css';

const Carousel = () => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const items = [
    {
      title: 'Build a Website That Speaks Your Brain',
      price: 'Travel',
      description: 'Turn your ideas into stunning websites effortlessly. Just type a prompt, and we’ll build it for you!',
      imgSrc: '/images/travelv.jpg',
      bgColor: '#7A99C9',
    },
    {
      title: 'Build a Website That Speaks Your Brain',
      price: 'Business',
      description: 'Turn your ideas into stunning websites effortlessly. Just type a prompt, and we’ll build it for you!',
      imgSrc: '/images/businessv.jpg',
      bgColor: '#D1B3FF',
    },
    {
      title: 'Build a Website That Speaks Your Brain',
      price: 'E-Commerce',
      description: 'Turn your ideas into stunning websites effortlessly. Just type a prompt, and we’ll build it for you!',
      imgSrc: '/images/ecommv.png',
      bgColor: '#FFC1E0',
    },
    {
      title: 'Build a Website That Speaks Your Brain',
      price: 'Portfolio',
      description: 'Turn your ideas into stunning websites effortlessly. Just type a prompt, and we’ll build it for you!',
      imgSrc: '/images/portfoliov.jpg',
      bgColor: '#FFC785',
    },
  ];

  const countItem = items.length;

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [active]);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % countItem);
  };

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + countItem) % countItem);
  };

  const handleButtonClick = () => {
    navigate('/form');
  };

  return (
    <div className="carousel-container">
      <section className="carousel">
        <div className="list">
          {items.map((item, index) => (
            <article
              key={index}
              className={`item ${index === active ? 'active' : ''}`}
              style={{
                transform: `translateX(${(index - active) * 100}%)`,
                backgroundColor: item.bgColor,
              }}
            >
              <div className="main-content">
                <div className="content">
                  <h2>{item.title}</h2>
                  <p className="price">{item.price}</p>
                  <p className="description">{item.description}</p>
                  <button className="addToCard" onClick={handleButtonClick}>
                    Generate your website
                  </button>
                </div>
              </div>
              <figure className="image">
                <img src={item.imgSrc} alt={item.title} />
              </figure>
            </article>
          ))}
        </div>
        <div className="arrows">
          <button id="prev" onClick={prevSlide}>
            &lt;
          </button>
          <button id="next" onClick={nextSlide}>
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
};

export default Carousel;
