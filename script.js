// calculator container
let calculator__container = document.getElementById("calculator")
function changePosition(){
    calculator__container.classList.toggle("-bottom-[50%]")
    calculator__container.classList.toggle("-bottom-[68%]")
}

// bmi calculation

const metric__container = document.querySelector("#metricContainer")

const imperial__container = document.querySelector("#imperialContainer")

function getMetricValues(){
    const cm = metric__container.querySelector("#height").value
    const kg = metric__container.querySelector("#weight").value

    return [cm, kg]
}

function getImperialValues(){
    const feet = imperial__container.querySelector("#feet").value
    const inches = imperial__container.querySelector("#inches").value
    const stones = imperial__container.querySelector("#stones").value
    const pounds = imperial__container.querySelector("#pounds").value

    return [feet, inches, stones, pounds]
}

// radio input

const metric__selector = Array.from(document.getElementsByName("metric"))

metric__selector.forEach(e => e.addEventListener("change", function(radio){
    const target = radio.target.value

    if(target === "metric"){
        imperial__container.classList.add("hidden")
        metric__container.classList.remove("hidden")

        changePosition()
    } else {
        imperial__container.classList.remove("hidden")
        metric__container.classList.add("hidden")

        changePosition()
    }
    
}))

// calculate the bmi

let cm = 0, kg = 0

const metric__events = Array.from(metric__container.querySelectorAll('input'))
metric__events.forEach(input => {
    
    input.addEventListener("input", function(){
        let [cm, kg] = getMetricValues()
        if(cm && kg){
            console.log("BRUM")
        }
    })
})