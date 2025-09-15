// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD39HLOm27VdzQwXjKl-cd96WC5VTJTnsQ",
  authDomain: "oluwaseun-collection.firebaseapp.com",
  projectId: "oluwaseun-collection",
  storageBucket: "oluwaseun-collection.appspot.com",
  messagingSenderId: "759387634255",
  appId: "1:759387634255:web:565d9c6ac340ebd361883a",
  measurementId: "G-YEQZMCBFK9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// Wait for DOM ready
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const messageDiv = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const imageUrl = document.getElementById("image").value;

    if (!imageUrl) {
      messageDiv.innerHTML = `<div class="error">Please enter an image URL</div>`;
      return;
    }

    try {
      // Save to Firestore directly
      await db.collection("products").add({
        name: name,
        price: price,
        image: imageUrl,
        createdAt: new Date()
      });

      messageDiv.innerHTML = `<div class="success">✅ Product uploaded successfully!</div>`;
      form.reset();

    } catch (error) {
      console.error(error);
      messageDiv.innerHTML = `<div class="error">❌ Error: ${error.message}</div>`;
    }
  });
});
