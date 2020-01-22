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
var db=firebase.firestore();
const list=document.querySelector('#list');
const form = document.querySelector('#data-form');
//create element and render cafe
function renderList(doc){
let li = document.createElement('li');
let rank = document.createElement('span');
let code = document.createElement('span');
let name = document.createElement('span');
let division = document.createElement('span');
let district = document.createElement('span');
let address = document.createElement('span');
let contact = document.createElement('span');
let email = document.createElement('span');
let location = document.createElement('span');
let circular = document.createElement('span');
let college = document.createElement('span');

li.setAttribute('data-id',doc.id);
rank.textContent = doc.data().rank;
code.textContent = doc.data().code;
name.textContent = doc.data().name;
division.textContent = doc.data().division;
district.textContent = doc.data().district;
address.textContent = doc.data().address;
contact.textContent = doc.data().contact;
email.textContent = doc.data().email;
location.textContent = doc.data().location;
circular.textContent = doc.data().circular;
college.textContent = doc.data().college;

li.appendChild(rank);
li.appendChild(code);
li.appendChild(name);
li.appendChild(division);
li.appendChild(district);
li.appendChild(address);
li.appendChild(contact);
li.appendChild(email);
li.appendChild(location);
li.appendChild(circular);
li.appendChild(college);

list.appendChild(li);
}
db.collection('college').get().then((snapshot) => {
snapshot.docs.forEach(doc => {
  renderList(doc);
})
})

//saving data
form.addEventListener('submit',(e) => {
e.preventDefault();//when we add data then web page don't refresh
db.collection('college').doc(form.code.value).set({
  rank:form.rank.value,
  code:form.code.value,
  name:form.name.value,
  division:form.division.value,
  district:form.district.value,
  address:form.address.value,
  contact:form.contact.value,
  email:form.email.value,
  location:form.location.value,
  circular:form.circular.value,
  college:form.college.value
})
form.rank.value='';
form.code.value='';
form.name.value='';
form.contact.value='';
form.email.value='';
})
