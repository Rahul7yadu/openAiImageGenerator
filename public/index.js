const form = document.getElementById("form")
console.log(form)
const onSubmit= async (e)=>{
    e.preventDefault();
    const input = document.getElementById('prompt');
    const size = document.getElementById("size")
    console.log(size.value)
    console.log(input.value)
    ShowOverlay();
    const response = await fetch('../openai/generateImage',{
        method:'POST',
        body:JSON.stringify({
           prompt:input.value,
           size:size.value 
        }),
        headers: {
    'Content-Type': 'application/json'
  }
    })

    if(!response.ok){
   EndOverlay()
     return alert('sorry could not load image')
 }
   const res =  await response.json()
EndOverlay()
   const img = document.getElementById('image')
   img.style.display='block'
   img.src = res.url
    const button = document.createElement("a")
    button.innerHTML = "open full image"
    button.href= res.url;
    document.body.appendChild(button);

   console.log(res.url)

}


form.addEventListener('submit',onSubmit)

function ShowOverlay(){
   const img = document.getElementById('image')
    img.style.display  = 'none'
    document.getElementById('overlay').style.display = 'block';
}
function EndOverlay(){
    document.getElementById('overlay').style.display = 'none';
}

  // Hide the overlay after a delay
