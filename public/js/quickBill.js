let e = document.getElementById('populate');
document.querySelector("#split").addEventListener('click', split);

function split() {
let total = document.getElementById('total').value;
let ways = document.getElementById('ways').value;
let tax = document.getElementById('tip').value;
let totalWithTax = (total * (tax? tax/100 + 1 : 1))
let amount = (totalWithTax / ways).toFixed(2);
isNaN(amount)? e.innerHTML = "<span class='badge rounded-pill bg-danger'>Please enter valid numbers for total/tip!</span>" :
               e.innerHTML = `Everyone owes <span class='badge rounded-pill bg-primary'> $${amount}</span> each! (Total: $${totalWithTax.toFixed(2)})` 
}