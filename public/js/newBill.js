let e = document.getElementById('populate');
let splitType = document.getElementsByName('splitType');
let nextButton = document.querySelector("#next")
nextButton.addEventListener('click', addPayee);

function addPayee() {
  let total = document.getElementById('total').value;
  let ways = document.getElementById('ways').value;
  let each = (total / ways).toFixed(2);
  let type = '';
  for (i = 0; i < splitType.length; i++) {
    if(splitType[i].checked) {
      type = splitType[i].value;
    }
  }
  for(i = 0; i<ways; i++){
    if(type == 'even'){
      e.innerHTML += `<div class="mb-1 input-group">
                        <span class="input-group-text">Name:</span>
                        <input type="text" name="name" aria-label="Name" class="form-control">
                        <span class="input-group-text">$</span>
                        <input type="text" name="amount" aria-label="Amount owed" class="form-control" value="${each}" readonly>
                      </div>`
    } else{
      e.innerHTML += `<div class="mb-1 input-group">
                        <span class="input-group-text">Name:</span>
                        <input type="text" name="name" aria-label="Name" class="form-control">
                        <span class="input-group-text">$</span>
                        <input type="text" name="amount" aria-label="Amount owed" class="form-control" placeholder="(Ex: 87.58)">
                      </div>`
    }
  }
  e.innerHTML += `<div class="mb-1 input-group">
                    <span class="input-group-text">Notes</span>
                    <textarea name="notes" class="form-control" aria-label="Any additional notes"></textarea>
                  </div>`
  e.innerHTML += `<div class="mt-2">
                    <button type="button" class="col-3 btn btn-danger" id="back">Back</button>
                  </div>`
  nextButton.setAttribute('disabled', '')
  document.querySelector('#back').addEventListener('click', clear)
  function clear(){
    e.innerHTML = '';
    nextButton.removeAttribute('disabled');
  }
}