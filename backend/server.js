import app from "./app.js";

const PORT = process.env.PORT || 5000;
console.log(`Using port ${PORT}`);

app.listen(PORT, () => console.log("Server running on ", PORT));
