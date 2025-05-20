function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const phone = document.getElementById('phone').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      saveOrder(email, phone);
    })
    .catch(error => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
          saveOrder(email, phone);
        })
        .catch(err => alert("Login/Signup error: " + err.message));
    });
}

function saveOrder(email, phone) {
  const db = firebase.firestore();
  db.collection("orders").add({
    email: email,
    phone: phone,
    size: "20x20",
    price: "700",
    timestamp: new Date()
  }).then(() => {
    alert("Order saved!");
    document.getElementById('loginModal').style.display = 'none';
  });
}
