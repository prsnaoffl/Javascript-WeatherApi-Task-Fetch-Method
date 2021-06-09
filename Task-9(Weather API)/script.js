let body=document.querySelector("body");
let container=document.createElement("div");
container.setAttribute("class","container");
body.appendChild(container);



//!model: 
let modelData = document.createElement('div');
modelData.className='modal fade';
modelData.id='staticBackdrop';
modelData.setAttribute('data-bs-backdrop','static')
modelData.setAttribute('data-bs-keyboard','false')
modelData.setAttribute('tabindex','-1')
modelData.setAttribute('aria-labelledby','staticBackdropLabel')
modelData.setAttribute('aria-hidden','true')
document.querySelector('body').appendChild(modelData);


let mainModel = document.createElement('div');
mainModel.className='modal-dialog modal-dialog-centered';
modelData.appendChild(mainModel);

let contentModel = document.createElement('div');
contentModel.className='modal-content';
mainModel.appendChild(contentModel);

let modelHeader =document.createElement('div');
modelHeader.className='modal-header'
contentModel.appendChild(modelHeader);

let modelHeading = document.createElement('h5');
modelHeading.className='modal-title';
modelHeading.id='staticBackdropLabel';
//SmodelHeading.innerHTML=Weather-For-Report;
//let modelTitle = document.createTextNode(wetherCountry);
//modelHeading.appendChild(modelTitle);
modelHeader.appendChild(modelHeading);

let modelClose=document.createElement('button');
modelClose.className='btn-close';
modelClose.setAttribute('type','button');
modelClose.setAttribute('data-bs-dismiss','modal');
modelClose.setAttribute('aria-label','Close');
modelHeader.appendChild(modelClose);

let modelBody = document.createElement('div');
modelBody.className='modal-body';
contentModel.appendChild(modelBody);

let body1 =document.createElement('p');
body1.className='body1';
contentModel.appendChild(body1);

let body2 =document.createElement('img');
body2.className='weathericon';
contentModel.appendChild(body2);

let modelFooter = document.createElement('div');
modelFooter.className='modal-footer';
contentModel.appendChild(modelFooter);

let mfooterClose =document.createElement('button');
mfooterClose.className='btn btn-danger';
mfooterClose.setAttribute('data-bs-dismiss','modal')
let mfcText = document.createTextNode('Close');
mfooterClose.appendChild(mfcText);
modelFooter.appendChild(mfooterClose);

let m1footerClose =document.createElement('button');
m1footerClose.className='btn btn-primary';
m1footerClose.setAttribute('data-bs-dismiss','modal')
let m1fcText = document.createTextNode('Understood');
m1footerClose.appendChild(m1fcText);
modelFooter.appendChild(m1footerClose);


//!Api:
let apiurl="https://restcountries.eu/rest/v2/all"


fetch(apiurl).then((data)=>{
    return data.json();
}).then((data)=>{
   // console.log(data)
    data.forEach(element => {

        
        let card=document.createElement("div");
        card.setAttribute("class","card");
        card.style="width:18rem";
        container.appendChild(card);

        //!card heading:
        let cardhead=document.createElement("h4");
        cardhead.setAttribute("class","headh4");
        cardhead.innerHTML=element.name;
        card.appendChild(cardhead);

        //!card image:
        let cardImg=document.createElement("img");
        cardImg.setAttribute("src",element.flag);
        cardImg.setAttribute("class","card-img-top");
        cardImg.setAttribute("class","card-img-top");
        card.appendChild(cardImg);

        //!cardBody:
        let cardBody=document.createElement("div");
        cardBody.setAttribute("class","card-body");
        card.appendChild(cardBody);

        //!1st row:
        let firstRow=document.createElement("div");
        cardBody.appendChild(firstRow);

        //!capital-left:
        let capitalLeft=document.createElement("p");
        capitalLeft.setAttribute("class","capitalLeft")
        capitalLeft.innerHTML="Capital:" ;
        firstRow.appendChild(capitalLeft);

        
        //!capitalRight:
        let capitalRight=document.createElement("b");
        capitalRight.setAttribute("class","capitalRight");
        let capital=element.capital;
        capitalRight.innerHTML=capital;
        firstRow.appendChild(capitalRight);
        
        //!2n row:
        let secondRow=document.createElement("div");
        cardBody.appendChild(secondRow);

        //!Region:
        let regionLeft=document.createElement("p");
        regionLeft.setAttribute("class","regionLeft");
        regionLeft.innerHTML="Region: ";
        secondRow.appendChild(regionLeft);
  
          //!regionRight:
          let regionRight=document.createElement("b");
          regionRight.setAttribute("class","regionRight");
          let region=element.region;
          regionRight.innerHTML=region;
          secondRow.appendChild(regionRight);

          //!3rd row:
          let thirdrow=document.createElement("div");
          thirdrow.setAttribute("class","thirdrow");
          cardBody.appendChild(thirdrow);

          //!latlongleft:
          let latlongLeft=document.createElement("p");
          latlongLeft.setAttribute("class","latlongLeft");
          latlongLeft.innerHTML="Lat,Long: ";
          thirdrow.appendChild(latlongLeft);

          //!latlongRight:
          let latlongRight=document.createElement("b");
          latlongRight.setAttribute("class","latlongRight");
          latlongRight.innerHTML=element.latlng[0]+","+element.latlng[1];
          thirdrow.appendChild(latlongRight);

           //!4th row:
           let fourthrow=document.createElement("div");
           fourthrow.setAttribute("class","fourthrow");
           cardBody.appendChild(fourthrow);


          
          //!Button-clickForWeather:
          let button=document.createElement("button");
          button.className="btn btn-outline-danger";
          button.setAttribute("type","button");
          button.setAttribute("data-bs-toggle","modal");
          button.setAttribute("data-bs-target","#staticBackdrop");
          button.addEventListener("click",displayweather);
          let btntext=document.createTextNode("Click For Weather");
          button.appendChild(btntext);
          fourthrow.appendChild(button);
        
          
         
          //!Button response:
           function displayweather(){
               let lat=element.latlng[0];
               let lng=element.latlng[1];
                let weathercountry=element.name;

               let mykey="6c5ca4cafe1b03d6c5cce12e0dad7161";
               let weatherkey="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid="+mykey;
              // console.log(weatherkey);

                  
fetch(weatherkey).then((data)=>{
    return data.json();
}).then((data)=>{
    //console.log(data)
    let countrytemp=data.main.temp;
    let counicon=data.weather[0].icon;
    //console.log(counicon)
    let iconurl="https://openweathermap.org/img/wn/"+counicon+"@2x.png";
    console.log(iconurl);

    document.querySelector(".modal-body").innerHTML=weathercountry;
    document.querySelector(".body1").innerHTML=countrytemp;
    document.querySelector(".weathericon").setAttribute("src",iconurl);
    }).catch((err)=>{
        console.log(err);
    })
 }

});

}).catch((err)=>{
    console.log(err);
})

