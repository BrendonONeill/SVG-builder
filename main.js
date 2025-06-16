
const formStartX = document.querySelector(".startx")
const formStartY = document.querySelector(".starty")
const formMoveX = document.querySelector(".movex")
const formMoveY = document.querySelector(".movey")
const svgPath = document.querySelector(".svg-path")
const addDataContainer = document.querySelector(".add-data")
const addDataButton = document.querySelector(".add-data-button")
const selectionData = document.querySelector("#type")
const form = document.querySelector("form")


formStartX.addEventListener("change", updateSVG)
formStartY.addEventListener("change", updateSVG)
formMoveX.addEventListener("change", updateSVG)
formMoveY.addEventListener("change", updateSVG)
addDataButton.addEventListener("click", (e) => updateForm(e))

let a = `M${formStartX.value} ${formStartY.value}, L${formMoveX.value} ${formMoveY.value}`
let data = ["M",[formStartX,formStartY],"L",[formMoveX,formMoveY]]
let number = 0

function updateSVG()
{
    let string = updateString()
    svgPath.setAttributeNS(null,'d',string);
    requestAnimationFrame(updateSVG);
}

function updateForm(e)
{
    e.preventDefault()
    addFormChunk(selectionData.value)
}

function addFormChunk(a)
{
    if(a == "M")
    {
        let test = document.createElement("div")
        test.classList.add("form-section")
        test.innerHTML = 
        `
        <label for=""> Move to X
            <input class="form-input test-${number + 1}" value="100" type="number">
        </label>
        <label for=""> Move to Y
            <input class="form-input test-${number + 2}" value="100" type="number">
        </label>
        `
        form.insertBefore(test,addDataContainer)
        data.push("M")
        data.push([document.querySelector(`.test-${number+1}`),document.querySelector(`.test-${number+2}`)])
        number += 2
    }
    if(a == "L")
    {
        let test = document.createElement("div")
        test.classList.add("form-section")
        test.innerHTML = 
        `
        <label for=""> Line to X
            <input class="form-input test-${number + 1}" value="100" type="number">
        </label>
        <label for=""> Line to Y
            <input class="form-input test-${number + 2}" value="100" type="number">
        </label>
        `
        form.insertBefore(test,addDataContainer)
        data.push("L")
        data.push([document.querySelector(`.test-${number+1}`),document.querySelector(`.test-${number+2}`)])
        number += 2
    }
    if(a == "Q")
    {
        let test = document.createElement("div")
        test.classList.add("form-section")
        test.innerHTML = 
        `
        <label for=""> 1
            <input class="form-input test-${number + 1}" value="100" min="0" type="number">
        </label>
        <label for=""> 2
            <input class="form-input test-${number + 2}" value="100" min="0" type="number">
        </label>
        <label for=""> 3
            <input class="form-input test-${number + 3}" value="100" min="0" type="number">
        </label>
        <label for=""> 4
            <input class="form-input test-${number + 4}" value="100" min="0" type="number">
        </label>
        `
        form.insertBefore(test,addDataContainer)
        data.push("Q")
        data.push([document.querySelector(`.test-${number+1}`),document.querySelector(`.test-${number+3}`),document.querySelector(`.test-${number+2}`),document.querySelector(`.test-${number+4}`)])
        number += 4
    }

}

function updateString()
{
    let string = ''
    for (let i = 0; i < data.length; i++) {
        if(typeof data[i] == "string")
        {
            string = string + data[i]
        }
        else
        {
            if(data[i-1] != "Q")
            {
                string = string + `${data[i][0].value} ${data[i][1].value} `
            }
            else
            {
                string = string + `${data[i][0].value},${data[i][1].value} ${data[i][2].value},${data[i][3].value} `
            }
        }
    }
    return string
}

requestAnimationFrame(updateSVG);