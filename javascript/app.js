const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money_plus");
const moneyMinus = document.getElementById("money_minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
// const dummyTransaction = [
//     {id: 1, text: "Flower", amount: -20},
//     {id: 2, text: "salary", amount: 300},
//     {id: 3, text: "Book", amount: -10},
//     {id: 4, text: "cemra", amount: 150},
// ];
const localStorageTransaction = JSON.parse(localStorage.getItem("transaction"));
let transaction = localStorage.getItem("transcation") !== null ? localStorageTransaction: [];
// Add Transaction
function addTrasaction(e) {
    e.preventDefault();
    if (text.ariaValueMax.trim() === "" || amount.value.trim() === "") {
        alert("Please Enter Text & Value");
    }else {
        const transaction = {
            id: generteId(),
            text: text.value,
            amount: +amount.value,
        };
        transaction.push(transaction);
        addTransactionDom(transaction);
        updateLocalstorage();
        updateValue();
        text.value = "";
        amount.value = "";
    }
};
// Genrete ID
function generteId() {
    return Math.floor(Math.random()*100000000)
};
function addTransactionDom(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li")
    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    )
    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete_button" onclick="removeTransaction(${transaction.id})">X</button>
    `
    list.appendChild(item);    
};
// Remove Transaction
function removeTransaction(id){
    transaction = transaction.filter(transaction => transaction.id !== id);
    updateLocalstorage();
    Init();
};
// addTransactionDom(transaction);
// Update Value
function updateValue() {
    const amounts = transaction.map(transaction => transaction.amount);
    const total = amounts.reduce((acc,item) => (acc += item),0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc,item) => (acc += item),0).toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc,item) => (acc += item),0)* -1
    ).toFixed(2);
    balance.innerText= `$${total}`;
    money_plus.innerText= `$${income}`;
    money_minus.innerText= `$${expense}`;    
}; 
// update Local Storage
function updateLocalstorage() {
    localStorage.setItem(
        "transaction",JSON.stringify(transaction)
    );
}; 
// Init App
function Init() {
    list.innerHTML="";
    transaction.forEach(addTransactionDom)
    updateValue();
};
Init();
form.addEventListener("submit",addTrasaction);