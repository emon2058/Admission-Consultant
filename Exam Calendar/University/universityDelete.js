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
    Id: doc.data().Id, Code: doc.data().Code, Name: doc.data().Name, Shift: doc.data().Shift,
    Date: doc.data().Date, Time: doc.data().Time
  };

  tableData.push(values);
  //  console.log(values);
}

// Realtime data fetching 
db.collection('University Exam').orderBy('Code', 'asc').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    console.log(change.doc.data());
    if (change.type === 'added') { // If data is added
      renderList(change.doc);
    } else if (change.type === "removed") { // If data is removed
      console.log(change.doc.data().Id);
      let index = 0;
      for (let data of tableData) {
        if (data.Id == change.doc.data().Id) {
          console.log("Removed ", index);
          tableData.splice(index, 1);
          break;
        }
        index++;
      }
    } else if (change.type === "modified") { // If data is modified
      console.log(change.doc.data().Id);
      let index = 0;
      for (let data of tableData) {
        if (data.Id == change.doc.data().Id) {
          console.log("Modified ", index);
          tableData[index] = change.doc.data();
          break;
        }
        index++;
      }
    }
  });

  loadTableData(tableData);
});

// Adding data into table
function loadTableData(tableData) {
  const tableBody = document.getElementById('universityCalendarList');
  let dataHtml = '';
  let index = 0;
  for (let data of tableData) {
    dataHtml += '<tr><td><input class="list-value" value="' + data.Id +
      '"></td><td><input class="list-value" value="' + data.Code +
      '"></td><td><input class="list-value" value="' + data.Name +
      '"></td><td><input class="list-value" value="' + data.Shift +
      '"></td><td><input class="list-value" value="' + data.Date +
      '"></td><td><input class="list-value" value="' + data.Time +
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
  console.log(value);

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#01D307',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {

      // Deleting from database
      db.collection('University Exam').doc(value.Id).delete().then(function () {

        //confirmation message
        Swal.fire({
          icon: 'success',
          title: 'Successfully deleted',
          showConfirmButton: false,
          timer: 2000
        })
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      //confirmation message
      Swal.fire({
        icon: 'error',
        title: 'Cancelled!',
        text: 'Your imaginary file is safe :)',
        showConfirmButton: false,
        timer: 2000
      })
    }
  });
}


// Sorting data by code
export function sortByCode() {
  let columnName = 'Code'
  sortDirection = !sortDirection;

  console.log(columnName);

  tableData = tableData.sort((p1, p2) => {
    return sortDirection ? p1[columnName] - p2[columnName] :
      p2[columnName] - p1[columnName]
  });
  loadTableData(tableData);
}
