# Crypto Screener

## 📌 Project Overview
The **Crypto Screener** is a React-based web application that provides real-time cryptocurrency market data. It fetches data from the **CoinGecko API** and displays key metrics like price, market cap, and 24-hour changes.

🔗 **Live Demo:** [Crypto Screener](https://novozero.github.io/Crypto_Data/)

## 🚀 Features
- Real-time cryptocurrency market data
- Search function to filter coins
- Toggle between percentage and dollar view for price changes
- Responsive design

## 🛠️ Installation
To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/novozero/Crypto_Data.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd Crypto_Data
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Start the development server:**
   ```sh
   npm start
   ```
   The app will be available at `http://localhost:3000/`.

## 🌍 Deploying to GitHub Pages
The project is deployed on **GitHub Pages**. To update the deployment, follow these steps:

### 1️⃣ Ensure `gh-pages` is installed:
```sh
npm install gh-pages --save-dev
```

### 2️⃣ Add deployment scripts in `package.json`:
```json
"homepage": "https://novozero.github.io/Crypto_Data",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

### 3️⃣ Commit and push changes:
```sh
git add .
git commit -m "Update project"
git push origin main
```

### 4️⃣ Deploy the app:
```sh
npm run deploy
```
After deployment, your app will be available at:
```
https://novozero.github.io/Crypto_Data
```

## 🔧 Technologies Used
- **React** – Frontend framework
- **Bootstrap** – UI styling
- **Axios** – API requests
- **CoinGecko API** – Cryptocurrency market data
- **GitHub Pages** – Hosting

## 🤝 Contributing
If you want to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## 📜 License
This project is open-source and available under the **MIT License**.

---
Made with ❤️ by [novozero](https://github.com/novozero)

