// Firebase configuration
import { firebaseConfig } from '../../Config/FirebaseConfig.js'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const form = document.querySelector('#data-form');

document.getElementById("Show").style.visibility = 'hidden'; //hide form field

export function searching(code) {
  //getting search document and show its value
  db.collection('Agriculture').doc(code).get().then(function (doc) {
    if (doc.exists) {
      document.getElementById('Show').style.visibility = 'visible'; //visible form field
      //set the data in form field
      document.getElementById('rank').value = doc.data().Rank;
      document.getElementById('code').value = doc.data().Code;
      document.getElementById('name').value = doc.data().Name;
      document.getElementById('division').value = doc.data().Division;
      document.getElementById('district').value = doc.data().District;
      document.getElementById('location').value = doc.data().Location;
      document.getElementById('contact').value = doc.data().Contact;
      document.getElementById('email').value = doc.data().Email;
      document.getElementById('image').value = doc.data().ImageLink;
      document.getElementById('website').value = doc.data().Website;
      document.getElementById('circular').value = doc.data().Circular;
      document.getElementById('seat').value = doc.data().SeatPlan;
    }

    else {
      Swal.fire(
        'Not found!',
        'You entered a wrong institute code.',
        'error'
      ).then((result) => {
        if (result.value) {
          location.reload(true);
        }
      })
    }
  })
}

form.addEventListener('submit', (e) => {
  //confirmation message
  Swal.fire({
    icon: 'success',
    title: 'Successfully edited',
    showConfirmButton: false,
    timer: 2000
  }).then((result) => {
    location.reload();
  })
  e.preventDefault();//when we add data then web page don't refresh
  //update data in firestore
  db.collection('Agriculture').doc(form.code.value).update({
    Rank: form.rank.value,
    Code: form.code.value,
    Name: form.name.value,
    Division: form.division.value,
    District: form.district.value,
    Location: form.location.value,
    Contact: form.contact.value,
    Email: form.email.value,
    ImageLink: form.image.value,
    Website: form.website.value,
    Circular: form.circular.value,
    SeatPlan: form.seat.value
  })

})
