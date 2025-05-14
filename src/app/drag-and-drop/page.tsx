"use client"; // Mark this file as a client component

import React, { useState } from "react";
import styles from "../css/drag-and-drop.module.css"; 

export default function DragAndDropPractice() {
    const [shoppingList, setShoppingList] = useState<string[]>([]);
    const [products, setProducts] = useState<string[]>([
        "Milk", "Bread", "Eggs", "Cheese", "Butter", "Apples", "Bananas", "Oranges",
        "Tomatoes", "Potatoes", "Carrots", "Chicken", "Beef", "Fish", "Rice", "Pasta",
        "Cereal", "Juice", "Yogurt", "Ice Cream", "Cookies", "Chips", "Coffee", "Tea"
    ]);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        setShoppingList((prevList) => [...prevList, data]);
        setProducts((prevProducts) => prevProducts.filter((product) => product !== data));
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, data: string) => {
        e.dataTransfer.setData("text", data);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Supermarket Shopping</h1>
            <p className={styles.instruction}>
                Drag items from the supermarket list on the left to the &quot;Items for Buying&quot; section on the right.
            </p>
            <div className={styles.dragSection}>
                {/* Left Section */}
                <div className={styles.supermarketList}>
                    <h2 className={styles.sectionTitle}>Supermarket Items</h2>
                    <div className={styles.grid}>
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className={`${styles.draggable} ${styles.bubble}`}
                                draggable
                                onDragStart={(e) => handleDragStart(e, product)}
                            >
                                {product}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Right Section */}
                <div
                    className={styles.shoppingList}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <h2 className={styles.sectionTitle}>Items for Buying</h2>
                    {shoppingList.length > 0 ? (
                        <>
                            <ul className={styles.list}>
                                {shoppingList.map((item, index) => (
                                    <li key={index} className={styles.listItem}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <button className={styles.printButton} onClick={handlePrint}>
                                Print List
                            </button>
                        </>
                    ) : (
                        <p className={styles.placeholder}>Drop items here</p>
                    )}
                </div>
            </div>
        </div>
    );
}