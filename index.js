const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
 const searchField = document.querySelector(".searchField");
 const form = document.querySelector("form");

 //Default location
let target = " New Delhi";

//function to fetch data from weather API
const fetchData = async() => {
try{

    const url= `http://api.weatherapi.com/v1/current.json?key=afb30beafa2f42498c5182658242303&q=${target}`;

    const response= await fetch (url);
    const data= await response.json();
    
    //console.log(data);
    
    const{current:{temp_c, condition: {text,icon}
    },
        location:{name,localtime},
    } = data;
    
    updateDom (temp_c,name,localtime,icon,text);

}catch(error){
alert("Location not found");
}
    
};

//Function to update Dom
function updateDom(temperate,city,time,emoji,text){
temperateField.innerText= temperate;
cityField.innerText= city;

const exactTime=time.split(" ")[1];
const exactDate=time.split(" ")[0];

const exactDay = getDayFullName(new Date (exactDate).getDay());

//console.log(exactDay);

/*console.log(exactTime);
console.log(exactDate);*/

dateField.innerText= `${exactTime} - ${(exactDay)} ${exactDate}`;
emojiField.src= emoji;
weatherField.innerText = text;

}
fetchData(target); 
  
//Function to get name of the Day
function getDayFullName(num){

    switch (num) {
        case 0:
            
            return "Sunday";

            case 1:
            
            return "Monday";

            case 2:
            
            return "Tuesday";

            case 3:
            
            return "Wednesday";

            case 4:
            
            return "Thursday";

            case 5:
            
            return "Friday";

            case 6:
            
            return "Saturday";
    
        default:
            return "Don't Know";
    }
}

//Function to search Location
const search = (e) =>{
    e.preventDefault();


    target =searchField.value;
    fetchData();
}

form.addEventListener("submit", search)