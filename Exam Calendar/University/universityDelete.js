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
//get id from html file
const list = document.querySelector('#List');

//create element and render list
function renderList(doc) {
  let li = document.createElement('li');
  let code = document.createElement('span');
  let name = document.createElement('span');
  let shift = document.createElement('span');
  let time = document.createElement('span');
  let date = document.createElement('span');
  let cross = document.createElement('div');

  //set the value
  li.setAttribute('data-id', doc.id);
  code.textContent = doc.data().Code;
  name.textContent = doc.data().Name;
  shift.textContent = doc.data().Shift;
  time.textContent = doc.data().Time;
  date.textContent = doc.data().Date;
  cross.textContent = 'Delete';
  //listed the value
  li.appendChild(code);
  li.appendChild(name);
  li.appendChild(shift);
  li.appendChild(time);
  li.appendChild(date);
  li.appendChild(cross);

  list.appendChild(li);
  // deleting data
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
        db.collection('University Exam').doc(id).delete().then(function () {

          // Deleting target item from list
          list.removeChild(e.target.parentElement);
        }).catch(function (error) {
          console.error("Error removing document: ", error);
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  });
}
// show all value from firestore
db.collection('University Exam').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderList(doc);
  })
})
