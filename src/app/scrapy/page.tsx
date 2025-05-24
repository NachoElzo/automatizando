"use client";
import React, { useState } from "react";
import Image from "next/image";
import "../css/scrapy.css";

// Add a price to each movie (add price: number to each movie object)
const MOVIES = {
  action: [
    {
      title: "Mad Max: Fury Road",
      director: "George Miller",
      actors: ["Tom Hardy", "Charlize Theron"],
      rating: 8.1,
      country: "Australia",
      year: 2015,
      duration: "120 min",
      genre: "Action",
      image: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
      price: 12,
    },
    {
      title: "Die Hard",
      director: "John McTiernan",
      actors: ["Bruce Willis", "Alan Rickman"],
      rating: 8.2,
      country: "USA",
      year: 1988,
      duration: "132 min",
      genre: "Action",
      image: "https://image.tmdb.org/t/p/w500/1nAfchiXHQB3iyhK8fCJJEnNs5A.jpg",
      price: 10,
    },
    {
      title: "Terminator 2: Judgment Day",
      director: "James Cameron",
      actors: ["Arnold Schwarzenegger", "Linda Hamilton"],
      rating: 8.6,
      country: "USA",
      year: 1991,
      duration: "137 min",
      genre: "Action",
      image: "https://image.tmdb.org/t/p/w500/weVXMD5QBGeQil4HEATZqAkXeEc.jpg",
      price: 15,
    },
    {
      title: "The Dark Knight",
      director: "Christopher Nolan",
      actors: ["Christian Bale", "Heath Ledger"],
      rating: 9.0,
      country: "USA",
      year: 2008,
      duration: "152 min",
      genre: "Action",
      image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      price: 20,
    },
    {
      title: "Gladiator",
      director: "Ridley Scott",
      actors: ["Russell Crowe", "Joaquin Phoenix"],
      rating: 8.5,
      country: "USA",
      year: 2000,
      duration: "155 min",
      genre: "Action",
      // Imagen alternativa de Gladiator (TMDb)
      image: "https://www.themoviedb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
      price: 18,
    },
  ],
  cartoons: [
    {
      title: "Toy Story",
      director: "John Lasseter",
      actors: ["Tom Hanks", "Tim Allen"],
      rating: 8.3,
      country: "USA",
      year: 1995,
      duration: "81 min",
      genre: "Cartoon",
      image: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
      price: 8,
    },
    {
      title: "Spirited Away",
      director: "Hayao Miyazaki",
      actors: ["Rumi Hiiragi", "Miyu Irino"],
      rating: 8.6,
      country: "Japan",
      year: 2001,
      duration: "125 min",
      genre: "Cartoon",
      image: "https://image.tmdb.org/t/p/w500/oRvMaJOmapypFUcQqpgHMZA6qL9.jpg",
      price: 10,
    },
    {
      title: "The Lion King",
      director: "Roger Allers",
      actors: ["Matthew Broderick", "Jeremy Irons"],
      rating: 8.5,
      country: "USA",
      year: 1994,
      duration: "88 min",
      genre: "Cartoon",
      image: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
      price: 9,
    },
    {
      title: "Finding Nemo",
      director: "Andrew Stanton",
      actors: ["Albert Brooks", "Ellen DeGeneres"],
      rating: 8.2,
      country: "USA",
      year: 2003,
      duration: "100 min",
      genre: "Cartoon",
      image: "https://image.tmdb.org/t/p/w500/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg",
      price: 11,
    },
    {
      title: "Coco",
      director: "Lee Unkrich",
      actors: ["Anthony Gonzalez", "Gael García Bernal"],
      rating: 8.4,
      country: "USA",
      year: 2017,
      duration: "105 min",
      genre: "Cartoon",
      image: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
      price: 13,
    }
  ],
  comedy: [
    {
      title: "The Mask",
      director: "Chuck Russell",
      actors: ["Jim Carrey", "Cameron Diaz"],
      rating: 6.9,
      country: "USA",
      year: 1994,
      duration: "101 min",
      genre: "Comedy",
      image: "https://image.tmdb.org/t/p/w500/6Biy7R9LfumYshur3YKhpj56MpB.jpg",
      price: 7,
    },
    {
      title: "Superbad",
      director: "Greg Mottola",
      actors: ["Jonah Hill", "Michael Cera"],
      rating: 7.6,
      country: "USA",
      year: 2007,
      duration: "113 min",
      genre: "Comedy",
      image: "https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg",
      price: 8,
    },
    {
      title: "Forrest Gump",
      director: "Robert Zemeckis",
      actors: ["Tom Hanks", "Robin Wright"],
      rating: 8.8,
      country: "USA",
      year: 1994,
      duration: "142 min",
      genre: "Comedy",
      image: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
      price: 10,
    },
    {
      title: "Back to the Future",
      director: "Robert Zemeckis",
      actors: ["Michael J. Fox", "Christopher Lloyd"],
      rating: 8.5,
      country: "USA",
      year: 1985,
      duration: "116 min",
      genre: "Comedy",
      image: "https://image.tmdb.org/t/p/w500/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
      price: 9,
    },
    {
      title: "Groundhog Day",
      director: "Harold Ramis",
      actors: ["Bill Murray", "Andie MacDowell"],
      rating: 8.1,
      country: "USA",
      year: 1993,
      duration: "101 min",
      genre: "Comedy",
      image: "https://image.tmdb.org/t/p/w500/7rhzEufovmmUqVjcbzMHTBQ2SCG.jpg",
      price: 8,
    }
  ],
  romance: [
    {
      title: "La La Land",
      director: "Damien Chazelle",
      actors: ["Ryan Gosling", "Emma Stone"],
      rating: 8.0,
      country: "USA",
      year: 2016,
      duration: "128 min",
      genre: "Romance",
      image: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
      price: 14,
    },
    {
      title: "Titanic",
      director: "James Cameron",
      actors: ["Leonardo DiCaprio", "Kate Winslet"],
      rating: 7.9,
      country: "USA",
      year: 1997,
      duration: "195 min",
      genre: "Romance",
      image: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
      price: 15,
    },
    {
      title: "Notting Hill",
      director: "Roger Michell",
      actors: ["Julia Roberts", "Hugh Grant"],
      rating: 7.2,
      country: "UK",
      year: 1999,
      duration: "124 min",
      genre: "Romance",
      image: "https://image.tmdb.org/t/p/w500/c8Ass7acuOe4za6DhSattE359gr.jpg",
      price: 13,
    },
    {
      title: "The Notebook",
      director: "Nick Cassavetes",
      actors: ["Ryan Gosling", "Rachel McAdams"],
      rating: 7.8,
      country: "USA",
      year: 2004,
      duration: "123 min",
      genre: "Romance",
      image: "https://image.tmdb.org/t/p/w500/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg",
      price: 14,
    },
    {
      title: "Her",
      director: "Spike Jonze",
      actors: ["Joaquin Phoenix", "Scarlett Johansson"],
      rating: 8.0,
      country: "USA",
      year: 2013,
      duration: "126 min",
      genre: "Romance",
      image: "https://image.tmdb.org/t/p/w500/ykUEbfpkf8d0w49pHh0AD2KrT52.jpg",
      price: 15,
    }
  ],
  suspense: [
    {
      title: "Inception",
      director: "Christopher Nolan",
      actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
      rating: 8.8,
      country: "USA",
      year: 2010,
      duration: "148 min",
      genre: "Suspense",
      image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      price: 16,
    },
    {
      title: "Se7en",
      director: "David Fincher",
      actors: ["Brad Pitt", "Morgan Freeman"],
      rating: 8.6,
      country: "USA",
      year: 1995,
      duration: "127 min",
      genre: "Suspense",
      image: "https://image.tmdb.org/t/p/w500/69Sns8WoET6CfaYlIkHbla4l7nC.jpg",
      price: 14,
    },
    {
      title: "The Sixth Sense",
      director: "M. Night Shyamalan",
      actors: ["Bruce Willis", "Haley Joel Osment"],
      rating: 8.1,
      country: "USA",
      year: 1999,
      duration: "107 min",
      genre: "Suspense",
      image: "https://image.tmdb.org/t/p/w500/fIssD3w3SvIhPPmVo4WMgZDVLID.jpg",
      price: 13,
    },
    {
      title: "Shutter Island",
      director: "Martin Scorsese",
      actors: ["Leonardo DiCaprio", "Mark Ruffalo"],
      rating: 8.2,
      country: "USA",
      year: 2010,
      duration: "138 min",
      genre: "Suspense",
      image: "https://image.tmdb.org/t/p/w500/kve20tXwUZpu4GUX8l6X7Z4jmL6.jpg",
      price: 15,
    },
  ]
};

const TABS = [
  { key: "action", label: "Action" },
  { key: "cartoons", label: "Cartoons" },
  { key: "comedy", label: "Comedy" },
  { key: "romance", label: "Romance" },
  { key: "suspense", label: "Suspense" }
];

type MovieCategory = keyof typeof MOVIES;
type Movie = (typeof MOVIES)[MovieCategory][number];

export default function MovieScrappingApp() {
  const [tab, setTab] = useState<MovieCategory>("action");
  const [cart, setCart] = useState<Movie[]>([]);
  const [modalMovie, setModalMovie] = useState<Movie | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);

  // Add to cart with modal confirmation
  const handleAddToCart = (movie: Movie) => setModalMovie(movie);

  const confirmAddToCart = () => {
    if (modalMovie && !cart.find(m => m.title === modalMovie.title)) {
      setCart([...cart, modalMovie]);
    }
    setModalMovie(null);
  };

  const cancelAddToCart = () => setModalMovie(null);

  const removeFromCart = (title: string) => setCart(cart.filter(m => m.title !== title));

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, m) => sum + (m.price || 0), 0);

  const handleBuy = () => {
    setLoadingBuy(true);
    setTimeout(() => {
      setLoadingBuy(false);
      setShowCart(false);
      setShowInvoice(true);
    }, 3000); // 3 segundos de loading
  };

  const closeInvoice = () => {
    setShowInvoice(false);
    setCart([]);
  };

  return (
    <div className="scrap-app-container">
      <h1 className="scrapflix-title">Scrapflix</h1>
      {/* Cart Button */}
      <button className="scrap-cart-fab" onClick={() => setShowCart(true)}>
        🛒 Cart {cart.length > 0 && <span className="scrap-cart-fab-count">{cart.length}</span>}
      </button>
      <div className="scrap-tabs">
        {TABS.map(t => (
          <button
            key={t.key}
            className={`scrap-tab-btn${tab === t.key ? " active" : ""}`}
            onClick={() => setTab(t.key as MovieCategory)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="scrap-movie-list">
        {MOVIES[tab].map((movie, idx) => (
          <div className="scrap-movie-card" key={movie.title + idx}>
            <div className="scrap-movie-img-wrap">
              <Image
                src={movie.image}
                alt={movie.title}
                className="scrap-movie-img"
                width={300}
                height={450}
                style={{ objectFit: "cover" }}
                unoptimized
              />
            </div>
            <div className="scrap-movie-info">
              <div className="scrap-movie-title">{movie.title}</div>
              <div className="scrap-movie-label"><b>Director:</b> {movie.director}</div>
              <div className="scrap-movie-label"><b>Actors:</b> {movie.actors.join(", ")}</div>
              <div className="scrap-movie-label"><b>Rating:</b> {movie.rating}</div>
              <div className="scrap-movie-label"><b>Country:</b> {movie.country}</div>
              <div className="scrap-movie-label"><b>Year:</b> {movie.year}</div>
              <div className="scrap-movie-label"><b>Duration:</b> {movie.duration}</div>
              <div className="scrap-movie-label"><b>Genre:</b> {movie.genre}</div>
              <div className="scrap-movie-label"><b>Price:</b> ${movie.price}</div>
            </div>
            <button
              className="scrap-cart-btn-netflix"
              onClick={() => handleAddToCart(movie)}
              disabled={!!cart.find(m => m.title === movie.title)}
            >
              {cart.find(m => m.title === movie.title) ? "Added" : "Add to cart"}
            </button>
          </div>
        ))}
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="scrap-modal-backdrop">
          <div className="scrap-modal">
            <div className="scrap-modal-title">Shopping Cart</div>
            {cart.length === 0 ? (
              <div className="scrap-cart-empty">Your cart is empty.</div>
            ) : loadingBuy ? (
              <div style={{ padding: "2rem 0" }}>
                <div className="scrap-loading-spinner" />
                <div style={{ marginTop: "1rem" }}>Processing your purchase...</div>
              </div>
            ) : (
              <>
                <ul className="scrap-cart-list">
                  {cart.map((movie) => (
                    <li key={movie.title} className="scrap-cart-item">
                      <span>{movie.title}</span>
                      <span>${movie.price}</span>
                      <button
                        className="scrap-cart-remove-btn"
                        onClick={() => removeFromCart(movie.title)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="scrap-cart-total">
                  <span>Total:</span>
                  <span>${total}</span>
                </div>
                <div className="scrap-cart-actions">
                  <button className="scrap-cart-clear-btn" onClick={clearCart}>
                    Clear Cart
                  </button>
                  <button className="scrap-cart-buy-btn" onClick={handleBuy}>
                    Buy
                  </button>
                </div>
              </>
            )}
            <div className="scrap-modal-actions">
              <button className="scrap-modal-btn scrap-modal-cancel" onClick={() => setShowCart(false)} disabled={loadingBuy}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add to cart modal */}
      {modalMovie && (
        <div className="scrap-modal-backdrop">
          <div className="scrap-modal">
            <div className="scrap-modal-title">Add to cart</div>
            <div className="scrap-modal-message">
              Do you want to add <b>{modalMovie.title}</b> to your cart?
            </div>
            <div className="scrap-modal-actions">
              <button className="scrap-modal-btn scrap-modal-ok" onClick={confirmAddToCart}>
                OK
              </button>
              <button className="scrap-modal-btn scrap-modal-cancel" onClick={cancelAddToCart}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice modal */}
      {showInvoice && (
        <div className="scrap-modal-backdrop">
          <div className="scrap-modal">
            <div className="scrap-modal-title">Invoice</div>
            <div className="scrap-modal-message">
              <b>Thank you for your purchase!</b>
              <ul className="scrap-invoice-list">
                {cart.map((movie) => (
                  <li key={movie.title}>
                    {movie.title} - ${movie.price}
                  </li>
                ))}
              </ul>
              <div className="scrap-cart-total">
                <span>Total:</span>
                <span>${total}</span>
              </div>
            </div>
            <div className="scrap-modal-actions">
              <button className="scrap-modal-btn scrap-modal-ok" onClick={closeInvoice}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="scrap-explanation">
        <h3>How to practice scraping?</h3>
        <ul>
          <li>Use a scraping library (cheerio, BeautifulSoup, etc.) to extract the data.</li>
          <li>Save the data in JSON files (like the example above).</li>
          <li>Import those files into your app and display them in cards like these.</li>
          <li>Never use scraping for commercial purposes without permission!</li>
        </ul>
      </div>
    </div>
  );
}