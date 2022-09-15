//function som gør at når man trykker på "Hvad sker der" så åbner der en pop up
function openForm() {
    document.getElementById("myForm").style.display = "block";

    const textarea = document.querySelector("textarea");
    textarea.addEventListener("input", ()=> {
      document.getElementById("count").textContent = textarea.value.length;
    })
  }
  
  // Function som lukker pop up når man klikker på "close"
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }


//Forbinder til html
  function sendPost(){
    const message = document.getElementById("textarea").value; 
    const username =document.getElementById("username").value; 

    //Send Postrequest
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8000/", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
      "Besked" : message,
      "Brugernavn" : username
    }))
  }



  // Load event listener med arrow function
window.addEventListener("load", async () => {
    // Await data to be fetched from endpoint
    const result = await fetch(
        //EKSEMPEL "localhost:3036"
      "http://127.0.0.1:8000/"
    );
    // Result er det overordnede HTTP response
    console.log(result);
    // Her får vi data:
    const data = await result.json();
    console.log(data);
  
    // the new array
    const items = [];
    // Traditionelt for loop
    //
    for (let item in data) {
      // Do not worry about this.
      items.push(data[item]);
    }
    // But the result is an array:
    console.log(items);
  
    // Modern for loops
    items.forEach((item) => {
      console.log(item);


    //Forbinder dataen til en const, for at gøre koden lettere
      const brugernavn = item.Brugernavn;
      const besked = item.Besked;
  
      //Laver den HTML kode som skal indsættes
      const element = `<div class="midten">
      <img src="https://avatars.dicebear.com/api/avataaars/:${brugernavn}.svg" class="avatar" alt="">
        <h3>${brugernavn}</h3>
        <p>Siger: ${besked}</p>
       </div>`;
  
      // Sætter koden ind i klassen midterdiv
      const div = document.querySelector(".midterdiv");
      div.innerHTML = div.innerHTML + element;

    });
  });

