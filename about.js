const scriptURL = 'https://script.google.com/macros/s/AKfycby0VL6xWvE5rwwCK7ajul_Gu4-esvx443HHSm8t9JfHIBwhXH4rBHVnpdOa-vrCYP_EtQ/exec'

const form2 = document.forms['newsLetter-footer'];

  form2.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form2)})
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message))
    document.getElementById("myForm-footer").reset();
    alert("You have been added to our Newsletter, Cheers!");

        })
  

  