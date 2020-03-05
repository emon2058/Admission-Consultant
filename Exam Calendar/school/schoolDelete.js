// Firebase configuration
import {firebaseConfig} from '../../Config/FirebaseConfig.js'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
//get id from html file
const list = document.querySelector('#List');

//create element and render list
function renderList(doc) {
  let li = document.createElement('li');
  let id = document.createElement('span');
  let code = document.createElement('span');
  let name = document.createElement('span');
  let shift = document.createElement('span');
  let time = document.createElement('span');
  let date = document.createElement('span');
  let cross = document.createElement('div');

  //get the value
  li.setAttribute('data-id', doc.id);
  id.textContent = doc.data().Id;
  code.textContent = doc.data().Code;
  name.textContent = doc.data().Name;
  shift.textContent = doc.data().Shift;
  time.textContent = doc.data().Time;
  date.textContent = doc.data().Date;
  cross.textContent = 'Delete'; //named this delete
  //listed the value
  li.appendChild(id);
  li.appendChild(code);
  li.appendChild(name);
  li.appendChild(shift);
  li.appendChild(time);
  li.appendChild(date);
  li.appendChild(cross);//show list view

  list.appendChild(li);
  // deleting data when clicking
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        let id = e.target.parentElement.getAttribute('data-id'); // Getting id by clicked item
        db.collection('School Exam').doc(id).delete().then(function () {

          // Deleting target item from list
          list.removeChild(e.target.parentElement);
        }).catch(function (error) {
          console.error("Error removing document: ", error);
        });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Successfully deleted',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  });
}
// show all value from firestore
db.collection('School Exam').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderList(doc);
  })
})
let sortDirection = false;
let tableData = [
  {id: '1a', code: '1', name: 'Shuvo', shift: 'a', date: '05-03-2020', time: '00.00'},
  {id: '1d', code: '2', name: 'Hasibul', shift: 'd', date: '06-03-2020', time: '01.00'}
];
loadTableData(tableData);
function loadTableData(tableData) {
  const tableBody = document.getElementById('schoolCalendarList');
  let dataHtml = '';

  for(let data of tableData) {
    dataHtml += '<tr><td><input class="list-value" value="'+ data.id+ 
    '"></td><td><input class="list-value" value="' + data.code + 
    '"></td><td><input class="list-value" value="' + data.name +
    '"></td><td><input class="list-value" value="' + data.shift + 
    '"></td><td><input class="list-value" value="' + data.date +
    '"></td><td><input class="list-value" value="' + data.time +
    '"></td></tr>';
    
  }

  console.log(dataHtml);
  tableBody.innerHTML = dataHtml;
}

export function sortByCode() {
  let columnName = 'code'
  sortDirection = !sortDirection;

  console.log(columnName);

  tableData = tableData.sort((p1, p2) => {
    return sortDirection ? p1[columnName] - p2[columnName]:
    p2[columnName] - p1[columnName]
  });
  loadTableData(tableData);
}
