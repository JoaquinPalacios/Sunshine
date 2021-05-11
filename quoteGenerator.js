let datosJSON = {"name": "", "age": null, "email": "", "telephone": null}


function saveInfo() {
    datosJSON.names = document.getElementById('names').value;
    datosJSON.age = document.getElementById('age').value;
    datosJSON.email = document.getElementById('email').value;
    datosJSON.telephone = document.getElementById('telephone').value;
    localStorage.setItem('datosSolictante', JSON.stringify(datosJSON));
} // ./savedInfo



window.onload = function() {
	let allTheInfo = document.getElementById('allTheInfo');
	let info = document.getElementById('info');
	console.log(allTheInfo);
	console.log(info);
	allTheInfo.innerHTML = '';
	var infoSaved = document.getElementById('infoSaved');
	infoSaved.addEventListener("click", function () {
    if (checkData) {
        infoSaved.innerHTML = `infoSaved`;
    }
});
};

infoSaved.addEventListener("click", function() {
    if ((names.value) && (age.value) && (email.value) && (telephone.value)) {
        info.innerHTML = "<th>Client Information</th><tr><td>Name: " + names.value + "</tr></td><tr><td>Age: " + age.value + "</tr></td><tr><td>Email: " + email.value + "</tr></td><tr><td>Telephone: " + telephone.value + "</td></tr>"; 
    }
    names.value = "";
    age.value = "";
    email.value = "";
    telephone.value = "";
});


// Show the form
$("#infoSaved").click(function(){
  $("#contenido").show("slow", function () {
    $('html, body').animate({
      scrollTop: $("#contenido").offset().top
    }, 1000)
  });
});


// Constructor
class Seguro {
    constructor(brand, model, year, tipo, price) {
      this.brand = brand;
      this.model = model;
      this.year = year;
      this.tipo = tipo;
      this.price = price;
    }
  
    // Generates the quote with the info
    getQuote() {
      const base = 1000;
      let quote = ((this.price * 0.05) / 12);
  
      if (quote < 1000) {
        quote += base;
      }
      // Reads the year
      const diference = new Date().getFullYear() - this.year;
  
      // Each year that the diference is bigger, the cost decrease 3%
      quote -= ((diference * 3) * quote) / 100;
  
      //IF the type of insurance is comprehensive the price increase 30%, comprehensivve plus 45%
      if (this.tipo === 'comprehensive') {
        quote *= 1.30;
      } else if (this.tipo === 'comprehensive-plus') {
        quote *= 1.45;
      }
  
      return quote;
    }
  }
  
  window.onload = () => {
    $.ajax({
      url: 'cars.JSON',
      dataType: 'json',
      success: function (data, status, jqXHR) {
        console.log(data);  
            //Select of brand and model
    const selectbrand = document.querySelector('#brand');
    const selectModel = document.querySelector('#model');
  
    //Select the form
    const formulaic = document.querySelector('#quote-generator');
  
    //Handle evento "submit" of form
    formulaic.addEventListener('submit', getQuote);
  
    //Call function listSelect in order to do an array with the diferent brands
    const brands = listSelect(data, "brand");
  
    //Load the brands in the Select
    loadContent(brands, selectbrand);
  
    //Load the years
    fillDate();
  
    //Handle event "change" of the select brand (When the user select a brand)
    selectbrand.addEventListener('change', (e) => {
      //Deletes the content of the model select
      selectModel.innerHTML = '<option value=""> Select </option>';
  
      //Filter the array of cars and select the choosen brand
      const models = data.filter(elem => elem.brand.toLowerCase().replace(' ', '-') == e.target.value);
  
      //Call the function listSelect to do an array with the different models
      const listModels = listSelect(models, "model");
  
      //Load the models in the select models
      loadContent(listModels, selectModel);
    });
      //Handle function of event "submit" from form
  function getQuote(e) {
    e.preventDefault();
  
    // Reads the selected brand
    const brand = document.querySelector('#brand').value;
  
    // Reads the selected model
    const model = document.querySelector('#model').value;
  
    // Reads the selected year
    const year = document.querySelector('#year').value;
  
    // Reads the type of insurance
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
  
    //check that there are no empty boxes
    if (brand === '' || model === '' || year === '' || tipo === '') {
      showMessage('Please complete all the fields', 'error');
      return;
    }
  
    showMessage('Loading...', 'exito');
  
    // Hides previous quote 
    const results = document.querySelector('#results div');
    if (results != null) {
      results.remove();
    }
  
    //Search the price of the selected model
    
    price = data.find(elem => (elem.brand.toLowerCase().replace(' ', '-') == brand.toLowerCase() && elem.model.toLowerCase().replace(' ', '-') == model.toLowerCase()));
  
    
    const seguro = new Seguro(brand, model, year, tipo, price.price);
  
    //Call the method getQuote of the clase Seguro
    const valueQuote = seguro.getQuote();
  
    // Shows the result of the quote
    showResults(valueQuote, seguro);
  } // ./function getQuote

        },
      error: function (jqXHR, status, error) {
          console.log(jqXHR),
          console.log(`Error -> Status: ${status} - Error: ${error}`);
        }  
    });

  } // ./windows.onload
  
  //Function for generate and load in the select the years
  function fillDate() {
    const max = new Date().getFullYear(),
      min = max - 70;
  
    const selectYear = document.querySelector('#year');
  
    for (let i = max; i > min; i--) {
      let option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      selectYear.appendChild(option);
    }
  } // ./function fillDate
  
  // Selecciono el input de color
  let colorin = document.querySelector('#color');

  // Load contennt in the Select
  function loadContent(array, select) {
    array.forEach(element => {
      let option = document.createElement('option');
      option.value = element.toLowerCase().replace(' ', '-');
      option.textContent = element;
      select.appendChild(option);
    })
  } // ./function loadContent
  
  
  // Generate array for the select
  function listSelect(array, key) {
    const listOf = [];
  
    array.forEach(elem => {
      if (!listOf.includes(elem[key])) {
        listOf.push(elem[key]);
      }
    })
    return listOf.sort();
  } // ./function listSelect
  
  
  //Function to show message
  function showMessage(message, tipo) {
    //Creates div to show message
    const div = document.createElement('div');
  
    if (tipo === 'error') {
      div.classList.add('error');
    } else {
      div.classList.add('correct');
    }
  
    //Add class and content to the div
    div.classList.add('message', 'mt-10');
    div.textContent = message;
  
    // Insert into the HTML
    const formulaic = document.querySelector('#quote-generator');
    formulaic.insertBefore(div, document.querySelector('#results'));
  
    //It hold the message for 2 seconds and then it gets deleted
    setTimeout(() => {
      div.remove();
    }, 2000);
  } // ./function showMessage  

  //Function to show the sum of the quote
  function showResults(valueQuote, seguro) {
  
    //Destructuring the objet seguro
    let {brand, model, year, tipo, price } = seguro;
  
    //Config a formatter for the quote and another for the price of the car
    const options1 = { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 };
    const options2 = { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 };
    const formatPrice = new Intl.NumberFormat('es-AR', options1);
    const formatQuote = new Intl.NumberFormat('es-AR', options2);

    // Creates a div to show the results
    const div = document.createElement('div');
    div.classList.add('mt-10');
  
    div.innerHTML = `
      <p class="header">Quote summarise for ${datosJSON.names}</p>
      <p class="font-italic">Brand: ${brand.toUpperCase().replace('-', ' ')} </p>
      <p class="font-italic">Model: ${model.toUpperCase().replace('-', ' ')}  </p>
      <p class="font-italic">Year: ${year} </p>
      <p class="font-italic">Amount covered: ${formatPrice.format(price)}  </p>
      <p class="font-italic">Type of Insurance: ${tipo.toUpperCase().replace('-', ' ')}  </p>
      <p class="font-italic">Amount insured: ${formatQuote.format(valueQuote)}  </p>
      `;   
    if (colorin.value.length > 0) {
      div.innerHTML += `<p class="font-italic">Car color: ${colorin.value.toUpperCase()} </p>`;
    };
   

    //Select the div "#results" where the information will get insert
    const resultsquote = document.querySelector('#results');
  
    // Show the spinner
    const spinner = document.querySelector('#loadingQuote');
    spinner.style.display = 'block';
  
    setTimeout(() => {
      //After 2 seconds the spinner is out and show the quote
      spinner.style.display = 'none';
      resultsquote.appendChild(div);
    }, 2000);
  } // ./function showResults

  var slideIndex = 0;
  showSlides();
  // Function for slider
  function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
  }