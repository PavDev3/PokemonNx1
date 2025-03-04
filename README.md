# **PokemonNx1** 

**PokemonNx1** is an **Angular application** that allows users to **search and view Pokémon details** using the public **[PokeAPI](https://pokeapi.co/)**. This project follows **modular architecture** to ensure scalability, maintainability.

## **📌 Features**
- 🐜 **Pokémon List** displaying names and links to detailed pages.
- 🔍 **Real-time search functionality** to filter Pokémon by name.
- 📜 **Pokémon details page** showcasing images, abilities, and stats.
- 🚀 **Nx modular architecture** for optimized development and deployment.

### Future Enhancements
- 🔄 **Infinite Scroll with `@Defer`:** Implement infinite scrolling instead of displaying only the first 20 Pokémon.
- 🎨 **Dynamic Pokémon Type Colors:** Assign a background color to Pokémon cards based on their type (e.g., Water = Blue, Fire = Red, Grass = Green).
- 🆕 **Expanded Pokémon Details:** Display additional attributes such as abilities and evolutions.
- 👤 **Skeleton Loading Mode:** Display a skeleton screen while data is being fetched to improve user experience and provide visual feedback.

---

## **⚙️ Prerequisites**
Before running the project, ensure you have the following installed:
- **Node.js** (Recommended: `18.x` or later)
- **NPM** or **Yarn**

## **Optional installation**
To install Nx CLI globally, run:
```sh
npm install -g nx
```

---

## **🚀 Installation**
Clone the repository and navigate into the project directory:

```sh
git clone https://github.com/PavDev3/PokemonNx1.git
cd pokemon-nx1
```
Install dependencies:
```sh
npm install
```
---

## **🏃 Running the Application**
To start the development server, use:
```sh
npm start
```

Once started, open **[http://localhost:4200](http://localhost:4200)** in your browser.

---
## **🌍 Running the Application online**
To visit the project online, click the following link:

**[PokemonNx1](https://pokemon-nx1-git-main-pablo-nunez-s-projects.vercel.app/)**

---

## **🧪 Running Tests**
To run unit tests with coverage:
```sh
npx nx test PokemonNx1 --coverage
```
To view the coverage report in the browser:
```sh
open coverage/index.html
```

---

## **📼 API Integration**
This project integrates with the **PokeAPI** to fetch Pokémon data:
- 🌍 **Base API Endpoint:** `https://pokeapi.co/api/v2/pokemon`
- 🔍 **Example Request:** `https://pokeapi.co/api/v2/pokemon/1/` 

---

## Project Breakdown

### ✅ Project Setup & Development
- **Angular 19.1** 
- **Nx Monorepo** 
- **Tailwind CSS** for styling.
- **PrimeNG 19** for theme and components

### 🎮 Implemented Features
- **Pokémon List Component**: Displays Pokémon fetched from the API.
- **Search Component**: Filters Pokémon by name.
- **Pokémon Details Component**: Shows detailed stats and abilities.
- **Reusable Components**

### 🔍 Testing & Quality Assurance
- **Jest Unit Tests**:
  - Tested **components** (`SearchBox`, `PokemonCard`, `PokemonDetails`, etc.).
  - Mocked **services and API calls** using `jest.fn()`.
  - Resolved **dependency injection issues** with `inject()`.
- **Coverage Analysis**: Ensured tests covered key functionality.

---

## **📩 Contact**
For inquiries or suggestions, feel free to reach out:
- **🐙 GitHub:** [pavdev3](https://github.com/pavdev3)
- **📧 Email:** pnunfe@gmail.com


