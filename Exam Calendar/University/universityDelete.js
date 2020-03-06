// Firebase configuration
import { firebaseConfig } from '../../Config/FirebaseConfig.js'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
//get id from html file
const list = document.querySelector('#List');

let sortDirection = false;
let tableData = [];
//create element and render list
function renderList(doc) {

  var values = {
    id: doc.data().Id, code: doc.data().Code, name: doc.data().Name, shift: doc.data().Shift,
    date: doc.data().Date, time: doc.data().Time
  };

  tableData.push(values);
  //  console.log(values);
}
// show all value from firestore
db.collection('University Exam').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderList(doc);
  });

  loadTableData(tableData);
})

// Adding data into table
function loadTableData(tableData) {
  const tableBody = document.getElementById('universityCalendarList');
  let dataHtml = '';
  let index = 0;
  for (let data of tableData) {
    dataHtml += '<tr><td><input class="list-value" value="' + data.id +
      '"></td><td><input class="list-value" value="' + data.code +
      '"></td><td><input class="list-value" value="' + data.name +
      '"></td><td><input class="list-value" value="' + data.shift +
      '"></td><td><input class="list-value" value="' + data.date +
      '"></td><td><input class="list-value" value="' + data.time +
      '"></td><td><center><img id="removeId' + index + '" style="height: 25px; cursor:pointer;" src="../../image/delete.png"' +
      '></center></td></tr>';
    index++;
  }

  tableBody.innerHTML = dataHtml;

  // Setting event listener for each item
  setEventListener();
}

// Adding onclick listener to the delete
function setEventListener() {
  let table = document.getElementById('table');
  for (let index = 0; index < table.rows.length; index++) {
    let element = document.getElementById("removeId" + index);
    let value = tableData[index];
    console.log(value);
    element.addEventListener('click', function () {
      remove(index, value)
    }, false);
  }
  console.log(element);
}

function remove(index, value) {
  console.log(index);
  console.log(value);
  // Deleting from database
  db.collection('University Exam').doc(value.id).delete().then(function () {
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
    tableData.splice(index, 1);
    loadTableData(tableData);
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}

// Sorting data by code
export function sortByCode() {
  let columnName = 'code'
  sortDirection = !sortDirection;

  console.log(columnName);

  tableData = tableData.sort((p1, p2) => {
    return sortDirection ? p1[columnName] - p2[columnName] :
      p2[columnName] - p1[columnName]
  });
  loadTableData(tableData);
}
