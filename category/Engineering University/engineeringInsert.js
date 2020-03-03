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
//firebase.analytics();
var db = firebase.firestore();

const list = document.querySelector('#List');
const form = document.querySelector('#data-form');

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
  //get the data value individually
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
  //The data will be listed below
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
//get all data from firestore
db.collection('Engineering').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderList(doc);
  })
})

//save the data in firestore
form.addEventListener('submit', (e) => {
  //confirmation message
  Swal.fire({
    icon: 'success',
    title: 'Successfully inserted',
    showConfirmButton: false,
    timer: 2000
  })
  e.preventDefault();//when we add data then web page don't refresh
  db.collection('Engineering').doc(form.code.value).set({
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
  //when submit the button then this field will be blank
  form.rank.value = '';
  form.code.value = '';
  form.name.value = '';
  form.contact.value = '';
  form.email.value = '';
})
