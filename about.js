const scriptURL = 'https://script.google.com/macros/s/AKfycby0VL6xWvE5rwwCK7ajul_Gu4-esvx443HHSm8t9JfHIBwhXH4rBHVnpdOa-vrCYP_EtQ/exec'

const form3 = document.forms['newsLetter-footer'];

  form3.addEventListener('submit', e => {
  e.preventDefault()
  const email = document.getElementById('email');

    fetch(scriptURL, { method: 'POST', body: new FormData(form3)})
    .then(response => console.log('Success!', response))
    .catch(error => alert('Error!', error.message))

    document.getElementById("myForm-footer").reset();
    alert("You have been added to our Newsletter, Cheers!");
  //  const message =  document.getElementById('message');

  //  message.textContent = "You have been added to our Newsletter, Cheers!";
  //  message.setAttribute('style', 'color:green; text-align: center;');
  
  
        })
  

  