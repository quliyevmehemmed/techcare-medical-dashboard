import { data } from './datajs.js';

let leftCardContainer = document.querySelector(".left-card-container")
let diagnosticListDataContainer = document.querySelector(".diagnostic-list-data-container")
let respirationRate = document.getElementById("respiration-rate")
let respirationNormality = document.getElementById("respiration-normality")
let tempratureRate = document.getElementById("temprature-rate")
let tempratureNormality = document.getElementById("temprature-normality")
let heartRate = document.getElementById("heart-rate")
let heartRateNormality = document.getElementById("heart-rate-normality")
let profilePic = document.getElementById("profilePic")
let ProfileName = document.getElementById("ProfileName")
let birth = document.getElementById("birth")
let Gender = document.getElementById("Gender")
let Contact = document.getElementById("Contact")
let Emergency = document.getElementById("Emergency")
let Insurance = document.getElementById("Insurance")
let labResultContainer = document.querySelector(".lab-result-container")
let systolicValue = document.querySelector(".systolic-value")
let systolicValueImg = document.getElementById("systolic-value-img")
let systolicNormality = document.querySelector(".systolic-normality")
let diastolicValue = document.querySelector("#diastolic-value")
let diastolicValueImg = document.getElementById("diastolic-value-img")
let diastolicNormality = document.querySelector(".diastolic-normality") 




data.forEach((element,index) => {
    leftCardContainer.innerHTML += `
                    <div id = "${index}"class="card-cover">
                        <div class="card ">
                            <section class="card-left">
                                <img src="${element.profile_picture}" alt="">
                                <div class="patient-text">
                                    <p style = "margin-bottom:4px" class = "manrope-bold">${element.name}</p>
                                    <p class = "title-sub">${element.gender}, ${element.age}</p>
                                </div>
                            </section>

                            <section class="card-right">
                                <img src="./img/tools/horizontalDot.png" alt="">
                            </section>

                        </div>
                    </div>`
    if(index == 0) {
        let card = document.querySelector(".card-cover")
        card.classList.add("activePatient")
    }
    
    
});
let activeID = 0
let sum = 0
let index = 0
data[activeID].diagnostic_list.forEach((listElement) => {
    diagnosticListDataContainer.innerHTML += `
                <div class="diagnostic-list-data">
                    <p>${listElement.name}</p>
                    <p>${listElement.description}</p>
                    <p>${listElement.status}</p>
                </div>
                <hr>`
})

data[activeID].diagnosis_history.forEach((element) => {
    sum+= element.heart_rate.value
    index++
   
})
heartRate.innerHTML = (+sum/+index).toFixed(0)
sum = 0
index = 0

data[activeID].diagnosis_history.forEach((element) => {
    sum+= element.temperature.value
    index++
})
tempratureRate.innerHTML = (+sum/+index).toFixed(0)
sum = 0
index = 0

data[activeID].diagnosis_history.forEach((element) => {
    sum+= element.respiratory_rate.value
    index++
})
respirationRate.innerHTML = (+sum/+index).toFixed(0)
sum = 0
index = 0

profilePic.setAttribute("src", data[activeID].profile_picture);
ProfileName.innerHTML = data[activeID].name
birth.innerHTML = data[activeID].date_of_birth
Gender.innerHTML = data[activeID].gender
Contact.innerHTML = data[activeID].phone_number
Emergency.innerHTML = data[activeID].emergency_contact
Insurance.innerHTML = data[activeID].insurance_type

let systolicData = []
let diastolicData = []
let date = []
data[activeID].diagnosis_history.forEach((element) => {
    systolicData.push(element.blood_pressure.systolic.value)
    diastolicData.push(element.blood_pressure.diastolic.value)
    date.push(`${element.month.slice(0,3)}, ${element.year}`)
})





    const ctx = document.getElementById("myChart").getContext("2d");

    if (window.myChartInstance) {
        window.myChartInstance.destroy();
    }
    

    
        window.myChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date, 
            datasets: [
                {
                    label: 'Systolic',
                    data: systolicData,
                    borderColor: '#D63384',
                    backgroundColor: '#D63384',
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#D63384',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Diastolic',
                    data: diastolicData,
                    borderColor: '#6F42C1',
                    backgroundColor: '#6F42C1',
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#6F42C1',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
        }
    });



let sysindex = 0;
let syssum = 0;
let diasum = 0;

data[activeID].lab_results.forEach((element) => {
    labResultContainer.innerHTML += `
    <div class="lab-result-card">
        <span class="lab-result-text">${element}</span>
        <img src="./img/tools/download.png" alt="">
    </div>`
})

data[activeID].diagnosis_history.forEach((element) => {
    systolicData.push(element.blood_pressure.systolic.value)
    diastolicData.push(element.blood_pressure.diastolic.value)
    date.push(`${element.month.slice(0,3)}, ${element.year}`)
    let systolicValueImg = document.getElementById("systolic-value-img")
    let systolicNormality = document.querySelector(".systolic-normality")
    syssum += element.blood_pressure.systolic.value
    diasum += element.blood_pressure.diastolic.value
    sysindex++        
})
systolicValue.innerHTML = (+syssum/+sysindex).toFixed(0)
diastolicValue.innerHTML = (+diasum/+sysindex).toFixed(0)
let sysnormal = data[activeID].diagnosis_history[data[activeID].diagnosis_history.length-1].blood_pressure.systolic.levels    
let dianormal = data[activeID].diagnosis_history[data[activeID].diagnosis_history.length-1].blood_pressure.diastolic.levels

if(sysnormal == "Lower than Average") {
    systolicValueImg.style.display = "block"
    systolicValueImg.setAttribute("src", './img/tools/ArrowDown.svg')
}else if(sysnormal == "Higher than Average") {
    systolicValueImg.style.display = "block"
    systolicValueImg.setAttribute("src", './img/tools/ArrowUp.svg')
}else {
    systolicValueImg.style.display = "none"
}

if(dianormal == "Lower than Average") {
    diastolicValueImg.style.display = "block"
    diastolicValueImg.setAttribute("src", './img/tools/ArrowDown.svg')
}else if(dianormal == "Higher than Average") {
    diastolicValueImg.style.display = "block"
    diastolicValueImg.setAttribute("src", './img/tools/ArrowUp.svg')
}else {
    diastolicValueImg.style.display = "none"
}

systolicNormality.innerHTML = sysnormal
diastolicNormality.innerHTML = dianormal



leftCardContainer.addEventListener("click", function(event) {
    document.querySelector(".activePatient").classList.toggle("activePatient");
    if (event.target.closest(".card-cover")) {
        const cardCover = event.target.closest(".card-cover");
        cardCover.classList.toggle("activePatient");
        activeID = cardCover.id;
    }
    diagnosticListDataContainer.innerHTML = ''
    data[activeID].diagnostic_list.forEach((listElement) => {
        diagnosticListDataContainer.innerHTML += `
                    <div class="diagnostic-list-data">
                        <p>${listElement.name}</p>
                        <p>${listElement.description}</p>
                        <p>${listElement.status}</p>
                    </div>
                    <hr>`
    })
    data[activeID].diagnosis_history.forEach((element) => {
        sum+= element.heart_rate.value
        index++            
    })
    if(+sum/+index<80) {heartRateNormality.innerHTML = "Lower Than Avarage"}
    else if(+sum/+index>=80 && +sum/+index<100) {heartRateNormality.innerHTML = "Normal"}
    else {heartRateNormality.innerHTML = "Higher Than Avarage"}
    heartRate.innerHTML = (+sum/+index).toFixed(0)
    sum = 0
    index = 0

    data[activeID].diagnosis_history.forEach((element) => {
        sum+= element.temperature.value
        index++
    })
    if(+sum/+index<95) {tempratureNormality.innerHTML = "Lower Than Avarage"}
    else if(+sum/+index>=95 && +sum/+index<100) {tempratureNormality.innerHTML = "Normal"}
    else {tempratureNormality.innerHTML = "Higher Than Avarage"}
    tempratureRate.innerHTML = (+sum/+index).toFixed(0)
    sum = 0
    index = 0

    data[activeID].diagnosis_history.forEach((element) => {
        sum+= element.respiratory_rate.value
        index++
    })
    if(+sum/+index<12) {respirationNormality.innerHTML = "Lower Than Avarage"}
    else if(+sum/+index>=12 && +sum/+index<20) {respirationNormality.innerHTML = "Normal"}
    else {respirationNormality.innerHTML = "Higher Than Avarage"}
    respirationRate.innerHTML = (+sum/+index).toFixed(0)
    sum = 0
    index = 0
    
    profilePic.setAttribute("src", data[activeID].profile_picture);
    ProfileName.innerHTML = data[activeID].name
    birth.innerHTML = data[activeID].date_of_birth
    Gender.innerHTML = data[activeID].gender
    Contact.innerHTML = data[activeID].phone_number
    Emergency.innerHTML = data[activeID].emergency_contact
    Insurance.innerHTML = data[activeID].insurance_type
    labResultContainer.innerHTML = ''
    data[activeID].lab_results.forEach((element) => {
        labResultContainer.innerHTML += `
        <div class="lab-result-card">
            <span class="lab-result-text">${element}</span>
            <img src="./img/tools/download.png" alt="">
        </div>`
    })

    let systolicData = []
    let diastolicData = []
    let date = []
    syssum = 0;
    sysindex = 0
    diasum = 0;
    data[activeID].diagnosis_history.forEach((element) => {
        systolicData.push(element.blood_pressure.systolic.value)
        diastolicData.push(element.blood_pressure.diastolic.value)
        date.push(`${element.month.slice(0,3)}, ${element.year}`)
        let systolicValueImg = document.getElementById("systolic-value-img")
        let systolicNormality = document.querySelector(".systolic-normality")
        syssum += element.blood_pressure.systolic.value
        diasum += element.blood_pressure.diastolic.value
        sysindex++        
    })
    systolicValue.innerHTML = (+syssum/+sysindex).toFixed(0)
    diastolicValue.innerHTML = (+diasum/+sysindex).toFixed(0)
    let sysnormal = data[activeID].diagnosis_history[data[activeID].diagnosis_history.length-1].blood_pressure.systolic.levels    
    let dianormal = data[activeID].diagnosis_history[data[activeID].diagnosis_history.length-1].blood_pressure.diastolic.levels

    if(sysnormal == "Lower than Average") {
        systolicValueImg.style.display = "block"
        systolicValueImg.setAttribute("src", './img/tools/ArrowDown.svg')
    }else if(sysnormal == "Higher than Average") {
        systolicValueImg.style.display = "block"
        systolicValueImg.setAttribute("src", './img/tools/ArrowUp.svg')
    }else {
        systolicValueImg.style.display = "none"
    }

    if(dianormal == "Lower than Average") {
        diastolicValueImg.style.display = "block"
        diastolicValueImg.setAttribute("src", './img/tools/ArrowDown.svg')
    }else if(dianormal == "Higher than Average") {
        diastolicValueImg.style.display = "block"
        diastolicValueImg.setAttribute("src", './img/tools/ArrowUp.svg')
    }else {
        diastolicValueImg.style.display = "none"
    }
    
    systolicNormality.innerHTML = sysnormal
    diastolicNormality.innerHTML = dianormal
    
    
    
    
    

        const ctx = document.getElementById("myChart").getContext("2d");

        if (window.myChartInstance) {
            window.myChartInstance.destroy();
        }
        
    
        
            window.myChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: date, 
                datasets: [
                    {
                        label: 'Systolic',
                        data: systolicData,
                        borderColor: '#D63384',
                        backgroundColor: '#D63384',
                        tension: 0.4,
                        pointRadius: 6,
                        pointBackgroundColor: '#D63384',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Diastolic',
                        data: diastolicData,
                        borderColor: '#6F42C1',
                        backgroundColor: '#6F42C1',
                        tension: 0.4,
                        pointRadius: 6,
                        pointBackgroundColor: '#6F42C1',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    }
                ]
            },
            options: {
            }
        });

        


    });










