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
function renderList(doc){
let li = document.createElement('li');
let code = document.createElement('span');
let name = document.createElement('span');
let unit = document.createElement('span');
let time = document.createElement('span');
let date = document.createElement('span');

li.setAttribute('data-id',doc.id);
code.textContent = doc.data().Code;
name.textContent = doc.data().Name;
unit.textContent = doc.data().Unit;
time.textContent = doc.data().Time;
date.textContent = doc.data().Date;

li.appendChild(code);
li.appendChild(name);
li.appendChild(unit);
li.appendChild(time);
li.appendChild(date);

list.appendChild(li);
}
db.collection('University Exam').get().then((snapshot) => {
snapshot.docs.forEach(doc => {
  renderList(doc);
})
})

//saving data
form.addEventListener('submit',(e) => {
e.preventDefault();//when we add data then web page don't refresh
db.collection('University Exam').doc(form.code.value).set({
  Code:form.code.value,
  Name:form.name.value,
  Unit:form.unit.value,
  Time:form.time.value,
  Date:form.date.value
})
form.code.value='';
form.name.value='';
form.unit.value='';
form.time.value='';
form.date.value='';
})
