const scriptURL = 'https://script.google.com/macros/s/AKfycby0VL6xWvE5rwwCK7ajul_Gu4-esvx443HHSm8t9JfHIBwhXH4rBHVnpdOa-vrCYP_EtQ/exec'
const form = document.forms['newsLetter'];
const form2 = document.forms['newsLetter-footer'];

 // Get the modal
 var modal = document.getElementById("myModal");
  
 // Get the button that opens the modal
 var btn = document.getElementById("myBtn");
 
 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];
 
 // When the user clicks on the button, open the modal
 window.onload = function() {
 modal.style.display = "block";

 }
 
 // When the user clicks on <script> (x), close the modal
 span.onclick = function() {
 modal.style.display = "none";
 
 }
 
 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
 if (event.target === modal) {
 modal.style.display = "none";
 }
 }
 


form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message))
    document.getElementById("myForm").reset();
    // alert("You have been added to our Newsletter, Cheers!");
   const message =  document.getElementById('message');

   message.textContent = "You have been added to our Newsletter, Cheers!";
   message.setAttribute('style', 'color:green; text-align: center;');

   btnNewsLetter.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_aw8rpav';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btnNewsLetter.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btnNewsLetter.value = 'Send Email';
      alert(JSON.stringify(err));
    });
  
        })

  form2.addEventListener('submit', e => {
  e.preventDefault()
  const email = document.getElementById('email');

    fetch(scriptURL, { method: 'POST', body: new FormData(form2)})
    .then(response => console.log('Success!', response))
    .catch(error => console.log('Error!', error.message))

    document.getElementById("myForm-footer").reset();

    btnNewsLetter.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_aw8rpav';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btnNewsLetter.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btnNewsLetter.value = 'Send Email';
      alert(JSON.stringify(err));
    });
    // alert("You have been added to our Newsletter, Cheers!");
  //  const message =  document.getElementById('message');

  //  message.textContent = "You have been added to our Newsletter, Cheers!";
  //  message.setAttribute('style', 'color:green; text-align: center;');
 

        })
  
 