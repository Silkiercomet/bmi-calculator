// calculator container
let calculator__container = document.getElementById("calculator")

// bmi calculation

const metric__container = document.querySelector("#metricContainer")

const imperial__container = document.querySelector("#imperialContainer")

function getMetricValues(){
    const cm = metric__container.querySelector("#height").value
    const kg = metric__container.querySelector("#weight").value

    return [cm, kg]
}
function resetMetricValues(){
    metric__container.querySelector("#height").value = ""
    metric__container.querySelector("#weight").value = ""
}

function getImperialValues(){
    const feet = imperial__container.querySelector("#feet").value
    const inches = imperial__container.querySelector("#inches").value
    const stones = imperial__container.querySelector("#stones").value
    const pounds = imperial__container.querySelector("#pounds").value

    return [feet, inches, stones, pounds]
}
function resetImperialValues(){
    imperial__container.querySelector("#feet").value = ""
    imperial__container.querySelector("#inches").value = ""
    imperial__container.querySelector("#stones").value = ""
    imperial__container.querySelector("#pounds").value = ""
}
function clearInputs(containerId) {
    const container = document.getElementById(containerId);
    const inputFields = container.getElementsByTagName('input');

    for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].value = ''; // Set the value to an empty string
    }
}
// radio input

const metric__selector = Array.from(document.getElementsByName("metric"))

metric__selector.forEach(e => e.addEventListener("change", function(radio){
    const target = radio.target.value
    result__container.innerHTML = `
    <h3 class="text-white font-bold text-2xl">Welcome!</h3>
    <p class="text-white pt-2">
      Enter your height and weight and you'll see your BMI result here
    </p>
    `

    if(target === "metric"){
        resetImperialValues()
        imperial__container.classList.add("hidden")
        metric__container.classList.remove("hidden")

    } else {
        resetMetricValues()
        imperial__container.classList.remove("hidden")
        metric__container.classList.add("hidden")

    }
    
}))

// calculate the bmi
const result__container = document.querySelector("#resultContainer")
//imperial result
const imperial__events = Array.from(imperial__container.querySelectorAll('input'))
imperial__events.forEach(input => {
    input.addEventListener("input", function(){
        let [feet, inches, stones, pounds] = getImperialValues()
        if(feet && inches && pounds && stones){
            const {bmi, idealWeightRange, idealWeightRangeInKg} = calculateBMI(...imperialToMetric(feet, inches, stones, pounds))
            result__container.innerHTML = `
            <div class="grid grid-cols-2 items-center max-w-[390px] mx-auto *:text-white ">
            <p>
              Your BMI is...
              <strong class="block text-2xl sm:text-5xl">${bmi}</strong>
            </p>
            <p>Your BMI suggests you're ${idealWeightRange}. Your ideal weight is between <strong>${idealWeightRangeInKg}</strong></p>
          </div>
            `
        }else{
            result__container.innerHTML = `
            <h3 class="text-white font-bold text-2xl">Welcome!</h3>
            <p class="text-white pt-2">
              Enter your height and weight and you'll see your BMI result here
            </p>
            `
        }
    })
})


//metric result
const metric__events = Array.from(metric__container.querySelectorAll('input'))
metric__events.forEach(input => {
    
    input.addEventListener("input", function(){
        let [cm, kg] = getMetricValues()
        if(cm && kg && kg.length >= 2){
            const {bmi, idealWeightRange, idealWeightRangeInKg} = calculateBMI(cm, kg, true)
            result__container.innerHTML = `
            <div class="grid grid-cols-2 items-center max-w-[390px] mx-auto *:text-white ">
            <p>
              Your BMI is...
              <strong class="block text-2xl sm:text-5xl">${bmi}</strong>
            </p>
            <p>Your BMI suggests you're ${idealWeightRange}. Your ideal weight is between <strong>${idealWeightRangeInKg}</strong></p>
          </div>
            `
        }else{
            result__container.innerHTML = `
            <h3 class="text-white font-bold text-2xl">Welcome!</h3>
            <p class="text-white pt-2">
              Enter your height and weight and you'll see your BMI result here
            </p>
            `
        }
    })
})

// result display


function calculateBMI(cm, kg, metric = false) {
    // Convert height from centimeters to meters
    const heightInMeters = cm / 100;

    // Calculate BMI
    const bmi = kg / (heightInMeters * heightInMeters);

    // Determine the ideal weight range based on BMI
    let idealWeightRange;
    if (bmi < 18.5) {
        idealWeightRange = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        idealWeightRange = "a Healthy weight";
    } else if (bmi >= 25 && bmi < 29.9) {
        idealWeightRange = "Overweight";
    } else {
        idealWeightRange = "Obese";
    }

    // Calculate the ideal weight range based on height
    const minHeight = 18.5 * (heightInMeters * heightInMeters);
    const maxHeight = 24.9 * (heightInMeters * heightInMeters);
    if(metric){
        return {
            bmi: bmi.toFixed(2), // Rounded to 2 decimal places
            idealWeightRange,
            idealWeightRangeInKg: `${minHeight.toFixed(1)}kg - ${maxHeight.toFixed(1)}kg`,
        }
    } 
    return {
        bmi: bmi.toFixed(2), // Rounded to 2 decimal places
        idealWeightRange,
        idealWeightRangeInKg: `${kgToStonesAndPounds(minHeight.toFixed(1))} - ${kgToStonesAndPounds(maxHeight.toFixed(1))}`,
    };
}

function imperialToMetric(ft, inc, st, lbs) {
    // Convert feet and inches to centimeters
      // Convert height to centimeters
      const heightInCm = (ft * 30.48) + (inc * 2.54);

      // Convert weight to kilograms
      const weightInKg = (st * 6.35029) + (lbs * 0.453592);

    return [heightInCm.toFixed(2), weightInKg.toFixed(2)]
}

function kgToStonesAndPounds(kg) {
    // Convert kilograms to pounds
    const pounds = kg * 2.20462;

    // Calculate the number of stones
    const stones = Math.floor(pounds / 14);

    // Calculate the remaining pounds
    const remainingPounds = pounds % 14;

    return `${stones}st ${remainingPounds.toFixed(2)}lbs`
}
// Example usage:
// const heightInCm = 180; // Replace with actual height in centimeters
// const weightInKg = 70; // Replace with actual weight in kilograms

// const result = calculateBMI(heightInCm, weightInKg);
// console.log("BMI:", result.bmi);
// console.log("Ideal Weight Range:", result.idealWeightRange);
// console.log("Ideal Weight Range (in kg):", result.idealWeightRangeInKg);