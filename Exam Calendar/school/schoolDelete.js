// Firebase configuration
import {firebaseConfig} from '../../Config/FirebaseConfig.js'

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

  var values = {id: doc.data().Id, code: doc.data().Code, name: doc.data().Name, shift: doc.data().Shift,
    date: doc.data().Date, time: doc.data().Time};

  tableData.push(values);
     console.log(values);
}
// show all value from firestore
db.collection('School Exam').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderList(doc);
  });
  loadTableData(tableData);
})

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
    '"></td><td><center><img style="height: 25px; cursor:pointer;" src="../../image/delete.png"' +
    '"></center</td></tr>';

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
