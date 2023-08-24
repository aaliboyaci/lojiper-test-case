import React from "react";
import "./styles/Home.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <header className="header">
        <h1>Welcome to Bus Ticket App</h1>
      </header>
      <Link href="/login"> Giriş Yap?</Link>
      <main className="main">
        <div className="formContainer">
          <h2>Search Bus Tickets</h2>
          <form className="searchForm">
            <label htmlFor="departure">Departure</label>
            <select id="departure" name="departure">
              <option value="city1">City 1</option>
              <option value="city2">City 2</option>
            </select>

            <label htmlFor="arrival">Arrival</label>
            <select id="arrival" name="arrival">
              <option value="city1">City 1</option>
              <option value="city2">City 2</option>
            </select>

            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" />

            <button type="submit">Search</button>
          </form>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Bus Ticket App</p>
      </footer>
    </main>
  );
}
