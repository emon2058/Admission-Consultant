// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDlESaTQUPM3rRX_BBLLihLfVf3UEEfBmc",
  authDomain: "admission-consultant-c9db1.firebaseapp.com",
  databaseURL: "https://admission-consultant-c9db1.firebaseio.com",
  projectId: "admission-consultant-c9db1",
  storageBucket: "admission-consultant-c9db1.appspot.com",
  messagingSenderId: "1006379150064",
  appId: "1:1006379150064:web:2d4cb80711383179ef7035",
  measurementId: "G-P82D3N1F4K"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
const list = document.querySelector('#List');
const form = document.querySelector('#data-form');

document.getElementById("Show").style.visibility = 'hidden'; //hide form field

function searching(code) {
  //getting search document and show its value
  db.collection('National').doc(code).get().then(function (doc) {
    if (doc.exists) {
      document.getElementById('Show').style.visibility = 'visible'; //visible form field
      //set the data in form field
      document.getElementById('rank').value = doc.data().Rank;
      document.getElementById('code').value = doc.data().Code;
      document.getElementById('name').value = doc.data().Name;
      document.getElementById('division').value = doc.data().Division;
      document.getElementById('district').value = doc.data().District;
      document.getElementById('location').value = doc.data().Location;
      document.getElementById('contact').value = doc.data().Contact;
      document.getElementById('email').value = doc.data().Email;
      document.getElementById('image').value = doc.data().ImageLink;
      document.getElementById('circular').value = doc.data().Circular;
      document.getElementById('seat').value = doc.data().SeatPlan;
    }

    else {
      Swal.fire(
        'Not found!',
        'You entered a wrong institute code.',
        'error'
      ).then((result) => {
        if (result.value) {
          location.reload(true);
        }
      })
    }
  })
  //create element and render list
  function renderList(doc) {
    let li = document.createElement('li');
    let rank = document.createElement('span');
    let code = document.createElement('span');
    let name = document.createElement('span');
    let division = document.createElement('span');
    let district = document.createElement('span');
    let location = document.createElement('span');
    let contact = document.createElement('span');
    let email = document.createElement('span');
    let image = document.createElement('span');
    let circular = document.createElement('span');
    let seat = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    rank.textContent = doc.data().Rank;
    code.textContent = doc.data().Code;
    name.textContent = doc.data().Name;
    division.textContent = doc.data().Division;
    district.textContent = doc.data().District;
    location.textContent = doc.data().Location;
    contact.textContent = doc.data().Contact;
    email.textContent = doc.data().Email;
    image.textContent = doc.data().ImageLink;
    circular.textContent = doc.data().Circular;
    seat.textContent = doc.data().SeatPlan;

    li.appendChild(rank);
    li.appendChild(code);
    li.appendChild(name);
    li.appendChild(division);
    li.appendChild(district);
    li.appendChild(location);
    li.appendChild(contact);
    li.appendChild(email);
    li.appendChild(image);
    li.appendChild(circular);
    li.appendChild(seat);

    list.appendChild(li);
  }
  //getting all collection
  db.collection('National').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      renderList(doc);
    })
  })
}

form.addEventListener('submit', (e) => {
  //confirmation message
  Swal.fire({
    icon: 'success',
    title: 'Successfully edited',
    showConfirmButton: false,
    timer: 2000
  })
  e.preventDefault();//when we add data then web page don't refresh
  //update data in firestore
  db.collection('National').doc(form.code.value).update({
    Rank: form.rank.value,
    Code: form.code.value,
    Name: form.name.value,
    Division: form.division.value,
    District: form.district.value,
    Location: form.location.value,
    Contact: form.contact.value,
    Email: form.email.value,
    ImageLink: form.image.value,
    Circular: form.circular.value,
    SeatPlan: form.seat.value
  })
  //blank this form field
  form.rank.value = '';
  form.name.value = '';
  form.contact.value = '';
  form.email.value = '';
})
