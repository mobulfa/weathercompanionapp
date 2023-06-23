const scriptURL = 'https://script.google.com/macros/s/AKfycby0VL6xWvE5rwwCK7ajul_Gu4-esvx443HHSm8t9JfHIBwhXH4rBHVnpdOa-vrCYP_EtQ/exec'

// const form3 = document.forms['newsLetter-footer'];

//   form3.addEventListener('submit', e => {
//   e.preventDefault()
//   const email = document.getElementById('email');

//     fetch(scriptURL, { method: 'POST', body: new FormData(form3)})
//     .then(response => console.log('Success!', response))
//     .catch(error => alert('Error!', error.message))

//     document.getElementById("myForm-footer").reset();
//     // alert("You have been added to our Newsletter, Cheers!");


//   //  const message =  document.getElementById('message');

//   //  message.textContent = "You have been added to our Newsletter, Cheers!";
//   //  message.setAttribute('style', 'color:green; text-align: center;');
  
  
//         })
//         const sendEmailFoot = document.getElementById('myForm-footer');
//         sendEmailFoot.addEventListener('submit', function(event) {
//    event.preventDefault();

//   // btnSend.value = 'Sending...';

//    const serviceID = 'default_service';
//    const templateID = 'template_071flpv';

//    emailjs.sendForm(serviceID, templateID, this)
//     .then(() => {
//      // btnSend.value = 'Send Email';
//      console.log('Success');
//      //alert('Sent!');
//     }, (err) => {
//      // btnSend.value = 'Send Email';
//       console.log(JSON.stringify(err));
//     });
// });
const sendEmailFooter = document.getElementById('myForm-footer');
sendEmailFooter.addEventListener('submit', function(event) {
   event.preventDefault();

   const serviceID = 'default_service';
   const templateID = 'template_071flpv';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      
     fetch(scriptURL, { method: 'POST', body: new FormData(form3)})
     .then(response => console.log('Success!', response))
     .catch(error => console.error('Error!', error.message))
    
     console.log('Send Success');
     document.getElementById('myForm-footer').reset();
     modal.style.display = "none";
    }, (err) => {
    
      console.log(JSON.stringify(err));
    });
});
        const currentTimeT = () => {
          //Time Script
          var time = new Date();
          //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          const currentTime1 = document.getElementById('currentTime');
          const dateToday = document.getElementById('dateToday');
          // currentTime1.textContent = time.toLocaleString(('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
         
          var month = months[time.getMonth()]; 
          var day = time.getDate();
          var year = time.getFullYear();
          var weekday = days[time.getDay()];

           dateToday.textContent = " " + weekday + ", " + month + " " + day + ", " + year;

          var d = new Date();
          var s = d.getSeconds();
          var m = d.getMinutes();
          var h = d.getHours();

          currentTime1.textContent = 
            ("" + h).substring(-2) + ":" + ("0" + m).substring(-2) + ":" + ("" + s).substring(-2);
        
}
// currentTimeT();
setInterval(currentTimeT, 1000)
  

  