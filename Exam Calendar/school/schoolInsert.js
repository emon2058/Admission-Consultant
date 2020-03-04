// Firebase configuration
import {firebaseConfig} from '../../Config/FirebaseConfig.js'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
//get id from html file
const list = document.querySelector('#List');
const form = document.querySelector('#data-form');

//create element and render list
function renderList(doc) {
  let li = document.createElement('li');
  let code = document.createElement('span');
  let name = document.createElement('span');
  let shift = document.createElement('span');
  let time = document.createElement('span');
  let date = document.createElement('span');
  //set the value
  li.setAttribute('data-id', doc.id);
  code.textContent = doc.data().Code;
  name.textContent = doc.data().Name;
  shift.textContent = doc.data().Shift;
  time.textContent = doc.data().Time;
  date.textContent = doc.data().Date;
  //listed the value
  li.appendChild(code);
  li.appendChild(name);
  li.appendChild(shift);
  li.appendChild(time);
  li.appendChild(date);

  list.appendChild(li);
}
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
  //Inserted data
  db.collection('School Exam').doc(form.code.value).set({
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

// real-time listener
db.collection('School Exam').orderBy('Code', 'asc').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    console.log(change.doc.data());
    if (change.type == 'added') {
      renderList(change.doc);
    }
  });
});
