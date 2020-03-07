// Firebase configuration
import { firebaseConfig } from '../../Config/FirebaseConfig.js'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
//get id from html file
const list = document.querySelector('#List');
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

  //Inserted data
  db.collection('School Exam').doc(id).set({
    Id: id,
    Code: form.code.value,
    Name: form.name.value,
    Shift: form.shift.value,
    Time: form.time.value,
    Date: form.date.value
  })
  //blank this field when inserted
  form.code.value = '';
  form.name.value = '';
  form.shift.value = '';
  form.time.value = '';
  form.date.value = '';
})

