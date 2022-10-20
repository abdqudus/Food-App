import {menuArray} from "/data.js"
let menu=''
let order=[]
const inputForm=document.getElementById('input-form')
// This function is used to obtain the backbone of the interface.
function getMenuArray() {
    menuArray.forEach(item => {
       menu+=
       `<div class="products">
                   <div class="img-class">
                       <img src="${item.img}" alt="${item.name}-img" class="item-img">
                   </div>
                  <div>
                      <h1 class="item">${item.name}</h1>
                      <p class="ingredients">${item.ingredients}</p>
                      <p>$${item.price}</p>
                  </div>
                  <div class='grid'>
                      <i id=${item.id} class="fa-solid fa-2x fa-circle-plus"></i>
                      <i id=${item.id} class="fa-solid fa-2x fa-circle-xmark"></i>
                  </div>
               </div>
           <hr>
       

       `
   });
 
   return menu
}
// This function renders the menu onto the page
function render() {
    const menu=getMenuArray()
    document.getElementById('menu').innerHTML=menu
    
    
}
document.addEventListener('click',function (e) {
    if(e.target.classList.contains('fa-circle-plus')){
        
        const targetObject=menuArray.filter(function(obj){
             return obj.id===Number(e.target.id)}
             )[0]
        sortOrder(targetObject)
        document.querySelector('.pay').classList.remove('hide')
        document.getElementById('total').classList.remove('hide')
        document.querySelector('button').classList.remove('hide')
        document.querySelector('.payment-section').classList.remove('hide')
    }else if(e.target.classList.contains('fa-circle-xmark')){
        const object=menuArray.filter(function(obj){
            return obj.id===Number(e.target.id)
        })[0]
        removeItem(object)
    }else if(e.target.id==='complete-btn'){
        this.documentElement.querySelector('.payment-methood').classList.remove('hide')   
    }else if(e.target.id==='close-btn'){
        document.querySelector('.payment-methood').classList.add('hide')   
    }
})

    // This function is called when add button is clicked.
    // It carries out to functions;
    //     Display the total order on the page
    //     It also sums the total payment for the order

function sortOrder(orderObject) {
    let cost=[]
    let orderHtml=''
    if (orderObject) {
        order.push(orderObject)
    }
  
   order.forEach(item=>{
    
    orderHtml+=`
   
    <div class='estimate'>
        <p>${item.name}<p>
        <p>$${item.price}</p>
    </div>
    
    `
    cost.push(item.price)
    
    
   })
   document.getElementById('payment').innerHTML=orderHtml  
   const total=cost.reduce((a,b)=>a+b,0)
   document.getElementById('amount').innerHTML='$'+total
}
// This function is called when remove button is clicked.
// It does the same task as the add button function
function removeItem(item) {
    if(order.includes(item)){
        order.pop(item)
    let cost=[]
    let orderHtml=''
   order.forEach(item=>{
    
    orderHtml+=`
   
    <div class='estimate'>
        <p>${item.name}<p>
        <p>$${item.price}</p>
    </div>
    
    `
    cost.push(item.price)
    
   
   })
   
   document.getElementById('payment').innerHTML=orderHtml  
   if (cost.length===0) {
    document.querySelector('.payment-section').classList.add('hide')
   }else if(cost.length>0){
    document.getElementById('amount').innerHTML='$'+ cost.reduce((a,b)=>a+b,0)
   }
   
    }
}

inputForm.addEventListener('submit',inputFormFunction)

    function inputFormFunction(e){
        e.preventDefault()
        document.getElementById('confirmatory-message').classList.remove('hide')
            document.getElementById('confirmatory-message').innerHTML=`<p>Thanks, ${document.getElementById('name').value}! Your order is on the way!</p>`
            document.querySelector('.payment-section').classList.add('hide')
            document.querySelector('.payment-methood').classList.add('hide')   
        
    }



render()
removeItem()