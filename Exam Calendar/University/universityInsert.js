// Firebase configuration
import { firebaseConfig } from '../../Config/FirebaseConfig.js'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
const list = document.querySelector('#List'); //get id = list from html file and create const list.
const form = document.querySelector('#data-form');



//saving data
form.addEventListener('submit', (e) => {
  //confirmation message
  Swal.fire({
    icon: 'success',
    title: 'Successfully inserted',
    showConfirmButton: false,
    timer: 2000
  })
  e.preventDefault();//when we add data then web page don't refresh
  var id = form.code.value + form.shift.value;
  console.log(id);
  db.collection('University Exam').doc(id).set({
    Id: id,
    Code: form.code.value,
    Name: form.name.value,
    Shift: form.shift.value,
    Time: form.time.value,
    Date: form.date.value
  })
  form.code.value = '';
  form.name.value = '';
  form.shift.value = '';
  form.time.value = '';
  form.date.value = '';
})

