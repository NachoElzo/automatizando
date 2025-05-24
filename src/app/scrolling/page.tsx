"use client";
import React, { useRef, useState, useEffect } from "react";
import "../css/scrolling.css";

export default function ScrollingPractice() {
  // Infinite scrolling state
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i + 1));
  const [loading, setLoading] = useState(false);
  const loader = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Custom alert state
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  // Infinite scroll effect (inside the grid, not the page)
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const handleScroll = () => {
      if (loading) return;
      if (!loader.current) return;
      const rect = loader.current.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();
      // Check if loader is visible inside the grid
      if (
        rect.top < listRect.bottom &&
        rect.bottom > listRect.top &&
        items.length < 100
      ) {
        setLoading(true);
        setTimeout(() => {
          setItems((prev) => [
            ...prev,
            ...Array.from({ length: 20 }, (_, i) => prev.length + i + 1).filter(n => n <= 100),
          ]);
          setLoading(false);
        }, 2000); // 2 seconds loading
      }
    };

    list.addEventListener("scroll", handleScroll);
    return () => list.removeEventListener("scroll", handleScroll);
  }, [items, loading]);

  // Custom alert handler for horizontal cards
  const handleCardClick = (idx: number) => {
    setAlertMsg(`Clicked on Card ${idx + 1}!`);
  };

  return (
    <div className="scrolling-app-container">
      <h1 className="scrolling-title">Scrolling Practice</h1>

      {/* Custom Alert */}
      {alertMsg && (
        <div className="custom-alert-backdrop">
          <div className="custom-alert">
            <div className="custom-alert-message">{alertMsg}</div>
            <button className="custom-alert-btn" onClick={() => setAlertMsg(null)}>
              Accept
            </button>
          </div>
        </div>
      )}

      {/* Infinite Scrolling */}
      <section>
        <h2 className="scrolling-section-title">Infinite Scrolling (20 by 20 up to 100)</h2>
        <div className="infinite-list" ref={listRef}>
          {items.map((item) => (
            <div
              key={item}
              className="infinite-list-item"
            >
              Item {item}
            </div>
          ))}
          {items.length < 100 && (
            <div ref={loader} className="infinite-loader">
              {loading ? "Loading more..." : <span className="scrolling-red">Scroll to load more</span>}
            </div>
          )}
          {items.length >= 100 && (
            <div className="infinite-loader">
              <span className="scrolling-red">You have reached the end!</span>
            </div>
          )}
        </div>
      </section>

      {/* Horizontal Scrolling */}
      <section>
        <h2 className="scrolling-section-title">Horizontal Scrolling</h2>
        <div className="horizontal-scroll-grid">
          {Array.from({ length: 15 }, (_, i) => (
            <button
              className="horizontal-card"
              key={i}
              onClick={() => handleCardClick(i)}
              type="button"
            >
              Card {i + 1}
            </button>
          ))}
        </div>
        <p className="scroll-tip scrolling-red">Swipe right to see more cards and click any of them.</p>
      </section>
    </div>
  );
}