// Firebase configuration
import { firebaseConfig } from '../../Config/FirebaseConfig.js'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
var db = firebase.firestore();
const form = document.querySelector('#data-form');


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
    Website: form.website.value,
    Circular: form.circular.value,
    SeatPlan: form.seat.value
  })
  //when submit the button then this field will be blank
  form.rank.value = '';
  form.code.value = '';
  form.name.value = '';
  form.contact.value = '';
  form.email.value = '';
  form.image.value = '';
  form.website.value = '';
  form.location.value = '';
  form.circular.value = '';
  form.seat.value = '';
})
