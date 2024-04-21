let btncheck;
let btnhint;
let wordlist;
let subject;
let hintcnt = 1;

subjects = [
    Animals = ["Animals", "Tiger", "Mouse", "Snake", "Horse"],
    Fruits = ["Fruits", "Apple", "Grape", "Lemon", "Mango"],
    Colors = ["Colors", "Black", "Green", "Brown", "White"],
    Plants = ["Plants", "Maple", "Ferns", "Grass", "Bambo"],
    Tools = ["Tools", "Spone", "Screw", "Plier", "Knife"]
]


function initialiserWord(array){
    let a = Math.floor(Math.random() * 5);
    let b = Math.ceil(Math.random() * 4);
    wordlist = array[a][b].toUpperCase().split('');
    subject = array[a][0]
}

document.body.onload = () => {
    initialiserWord(subjects)
    document.querySelector('#subject').innerText = subject
    console.log(wordlist)

    let game = document.querySelector('.game');
    let btn = document.querySelector('.btn');

    for(i=1 ; i<7 ; i++){
        let Try = document.createElement('div')
        Try.style.display = 'flex';
        Try.style.gap = '10px'
        if(i==1){
            Try.className = 'live'
        }else{
            Try.className = 'nonlive'
        }
        for(j=1 ; j<7 ; j++){
            input = document.createElement('input');
            div = document.createElement('div')
            input.style.maxWidth = '60px'
            input.style.height = '60px'
            div.style.maxWidth = '60px'
            div.style.height = '60px'
            if(j==1){
                div.innerText = `Try ${i}`
                div.style = `
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 25px;
                    color: white;
                `
                Try.appendChild(div)
            }else{
                input.style.border = 'none'
                input.style.cursor = 'pointer'
                input.style.outline = 'none'
                input.style.fontSize = '40px'
                input.style.textAlign = 'center'
                input.style.fontWeight = '600'
                input.style.borderRadius = '5px'
                input.setAttribute('maxlength', '1')
                Try.appendChild(input)
                if(input.parentElement.className == 'live'){
                    input.disabled = false
                }else{
                    input.setAttribute('disabled', 'true')
                }
                input.onfocus = function(){
                    this.onkeyup = function(){
                        if(this.value != '' && this.value != ' '){
                            if(this != this.parentElement.children[5]){
                                this.nextElementSibling.focus()
                            }
                        }else{
                            this.value = ''
                            alert('Fill the input')
                        }
                    }
                    this.onchange = function(){
                        this.value = this.value.toUpperCase()
                    }
                }
                
                const inputs = document.querySelectorAll('input');
                inputs.forEach((input, index) => {
                    input.addEventListener('keydown', (key) => {
                        if(key.keyCode == 8){
                            input.value = '';
                            const currentIndex = index;
                            if (currentIndex > 0) {
                                inputs[currentIndex - 1].focus();
                            }
                        }
                    });
                });
            }
        }
        game.appendChild(Try)
        
    }
    btncheck = document.createElement('button');
    btncheck.addEventListener('click', btnchek)
    btncheck.innerText = 'Check Word'
    btncheck.style = `
    width: 35%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 15px;
    cursor: pointer;
    background-color: brown;
    `

    btnhint = document.createElement('button');
    btnhint.addEventListener('click', btnhnt)
    btnhint.innerText = 'Hint'
    btnhint.style = `
    width: 35%;
    background-color: rgb(12, 130, 106);
    padding: 10px;
    border-radius: 5px;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 15px;
    `

    btn.appendChild(btncheck)
    btn.appendChild(btnhint)

}

function reloadPage() {
    location.reload();
}



let k=0;
let msg = ''

function btnchek(){
    let wordfill = 0
    inputs = document.querySelectorAll('.live input')
    wordinput = []
    inputs.forEach(input => {
        wordinput.push(input.value) 
        if(input.value == '' || input.value == ' '){
            wordfill++
        }
    });
    let j=0;
    for(i=0 ; i<5 ; i++){
        k+=1
        if(wordlist[i] == wordinput[i]){
            document.querySelector('.live').children[i+1].style.background = 'green'
            j+=1
            console.log(j)
        }if(wordlist.includes(wordinput[i]) == true && wordlist[i] != wordinput[i]){
            document.querySelector('.live').children[i+1].style.background = 'red'
        }
    }
    if(k<30){
        if(wordfill == 0){
            document.querySelector('.live').nextElementSibling.className = 'live'
            document.querySelector('.live').className = 'nonlive'
        }else{
            alert('Fill the input')
        }
    }else{
        document.querySelectorAll('input').forEach(input => {
            input.disabled = true
        })
        let win = document.createElement('div')
        win.innerHTML += `YOU LOSE! the right word is: <span style='color: rgb(12, 130, 106);'>${wordlist.join().replaceAll(',' , '')}</span>`
        win.innerHTML += `
            <button onclick='reloadPage()' style='padding: 5px; cursor: pointer; font-size: 30px; border: 1px solid white; border-radius: 5px; display: flex; align-items: center; justify-content: center;'><i class="fa-solid fa-reply"></i></button>
        `
        win.style = `
        width: 60%;
        height: 60%;
        text-align: center;
        font-size: 50px;
        font-weight: 900;
        border-radius: 10px;
        background: transparent;
        backdrop-filter: blur(10px);
        border: 2px solid white;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        justify-content: center;
        z-index: 1;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        `
        document.querySelector('body').appendChild(win)
    }
    document.querySelectorAll('input').forEach(input => {
        if(input.parentElement.className == 'live'){
            input.disabled = false
        }else{
            input.setAttribute('disabled', 'true')
        }
    })
    if(j==5){
        document.querySelectorAll('input').forEach(input => {
            input.disabled = true
        })
        let win = document.createElement('div')
        win.innerHTML += 'YOU WIN!'
        win.innerHTML += `
        <button onclick='reloadPage()' style='padding: 5px; cursor: pointer; font-size: 30px; border: 1px solid white; border-radius: 5px; display: flex; align-items: center; justify-content: center;'><i class="fa-solid fa-reply"></i></button>
        `
        win.style = `
        width: 60%;
        height: 60%;
        text-align: center;
        font-size: 50px;
        font-weight: 900;
        border-radius: 10px;
        background: transparent;
        backdrop-filter: blur(10px);
        border: 2px solid white;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        z-index: 1;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        `
        document.querySelector('body').appendChild(win)
    }
}

function btnhnt(){
    if (hintcnt == 1) {
        let a = Math.floor(Math.random() * 5)
        document.querySelector('.live').children[a+1].value = wordlist[a]
    } else {
        alert('You have terminated all assistance!!')
    }
    hintcnt--

}




