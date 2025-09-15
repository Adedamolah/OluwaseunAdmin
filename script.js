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

const productForm = document.getElementById("productForm");
const statusText = document.getElementById("status");

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const file = document.getElementById("image").files[0];

  if (!file) {
    statusText.textContent = "⚠ Please select an image!";
    return;
  }

  try {
    statusText.textContent = "⏳ Uploading...";

    // Upload image to Firebase Storage
    const storageRef = storage.ref(`products/${Date.now()}_${file.name}`);
    await storageRef.put(file);
    const imageUrl = await storageRef.getDownloadURL();

    // Save product to Firestore
    await db.collection("products").add({
      name,
      price,
      image: imageUrl,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    statusText.textContent = "✅ Product uploaded successfully!";
    productForm.reset();

  } catch (error) {
    console.error("Error uploading product:", error);
    statusText.textContent = "❌ Upload failed. Check console.";
  }
});
