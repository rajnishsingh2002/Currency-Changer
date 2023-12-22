const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdown=document.querySelectorAll(".drowpdown select");
const btn=document.querySelector("form button");
const formCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdown){

    for (const currCode in countryList) {
       let newOption=document.createElement("option");
       newOption.innerText=currCode;
       newOption.value=currCode;
       select.append(newOption);
    }


    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".Amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }

    // console.log(formCurr.value,toCurr.value);
    const URL=`${BASE_URL}/${formCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];

   let finalAmount=amtVal*rate;
    
   msg.innerText=`${amtVal} ${formCurr.value}= ${finalAmount} ${toCurr.value}  `
})