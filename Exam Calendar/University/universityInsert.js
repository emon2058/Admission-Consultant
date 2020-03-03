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
firebase.analytics();
var db = firebase.firestore();
const list = document.querySelector('#List'); //get id = list from html file and create const list.
const form = document.querySelector('#data-form');

//create element and render list
function renderList(doc) {
  let li = document.createElement('li');
  let code = document.createElement('span');
  let name = document.createElement('span');
  let shift = document.createElement('span');
  let time = document.createElement('span');
  let date = document.createElement('span');

  li.setAttribute('data-id', doc.id);
  code.textContent = doc.data().Code;
  name.textContent = doc.data().Name;
  shift.textContent = doc.data().Shift;
  time.textContent = doc.data().Time;
  date.textContent = doc.data().Date;

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
  db.collection('University Exam').doc(form.code.value).set({
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
