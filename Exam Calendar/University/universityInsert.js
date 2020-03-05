// Firebase configuration
import {firebaseConfig} from '../../Config/FirebaseConfig.js'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
const list = document.querySelector('#List'); //get id = list from html file and create const list.
const form = document.querySelector('#data-form');

//create element and render list
function renderList(doc) {
  let li = document.createElement('li');
  let id = document.createElement('span');
  let code = document.createElement('span');
  let name = document.createElement('span');
  let shift = document.createElement('span');
  let time = document.createElement('span');
  let date = document.createElement('span');

  li.setAttribute('data-id', doc.id);
  id.textContent = doc.data().Id;
  code.textContent = doc.data().Code;
  name.textContent = doc.data().Name;
  shift.textContent = doc.data().Shift;
  time.textContent = doc.data().Time;
  date.textContent = doc.data().Date;

  li.appendChild(id);
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

// real-time listener
db.collection('University Exam').orderBy('Code', 'asc').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    console.log(change.doc.data());
    if (change.type == 'added') {
      renderList(change.doc);
    }
  });
});
