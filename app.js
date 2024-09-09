let cardList = document.querySelector('.card-list')
let cartList = document.querySelector('.cart-list')
let closeBtn = document.querySelector('.close')
let count = document.querySelector('.count')
let cartIcon = document.querySelector('.cart-icon')
let cartBox = document.querySelector('.cart-box')
let totalPrice = document.querySelector('.total-price')

closeBtn.addEventListener('click' , function() {
    cartBox.classList.remove('active')
})

cartIcon.addEventListener('click' , function() {
    cartBox.classList.add('active')
})

let shoesList = [
    {id : 1, title: 'Men Shoe' , price : '15' , img: 'shoe.jpg'},
    {id : 2, title: 'Men Shoe 2' , price : '10' , img: 'shoe2.jpg'},
    {id : 3, title: 'Men Shoe 3 ' , price : '4' , img: 'shoe3.jpg'},
    {id : 4, title: 'Men Shoe 4' , price : '8' , img: 'shoe4.jpg'},
    {id : 5, title: 'Men Shoe 5' , price : '18' , img: 'shoe5.jpg'}
]

let userBasket = []

function countCheck()
{
    count.innerHTML = userBasket.length
}

countCheck()

shoesList.forEach((shoe) => {

    let cardElem = document.createElement('div')
    cardElem.className = 'card'

    let imgElem = document.createElement('img')
    imgElem.setAttribute('src' , shoe.img)  

    let titleElem = document.createElement('h3')
    titleElem.innerHTML = shoe.title
    titleElem.className = 'title'

    let desElem = document.createElement('p')
    desElem.innerHTML = 'lorem lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ipsum'
    desElem.className = 'description'

    let priceElem = document.createElement('span')
    priceElem.innerHTML = shoe.price + '$'
    priceElem.className = 'price'

    let btnElem = document.createElement('button')
    btnElem.innerHTML = 'Add To Cart'
    btnElem.className = 'btn'

    btnElem.addEventListener('click' , function() {
        addToCart(shoe.id)
        countCheck()
        addToUserBasket()
        checkTotalPrice()
        localStorage.setItem('cart' , JSON.stringify(userBasket))
    })

    cardElem.append(imgElem , titleElem , desElem , priceElem , btnElem)
    
    cardList.append(cardElem)

})

function addToCart(shoeId) {
    let MainshoeObj = shoesList.find(function(shoe) {
        return shoeId == shoe.id
        
    })
    userBasket.push(MainshoeObj)
    
}

let getCartFromLocal = JSON.parse(localStorage.getItem('cart'))

if (getCartFromLocal)
{
    userBasket = getCartFromLocal
    addToUserBasket()
    checkTotalPrice()
    countCheck()
    getCartFromLocal.forEach((shoe) => {
        
    })
}

function addToUserBasket() {

    cartList.innerHTML = ''

    userBasket.forEach(function(shoe) {

        let cartElem = document.createElement('div')
        cartElem.className = 'cart-item'

        let cartImgElem = document.createElement('img')
        cartImgElem.setAttribute('src' , shoe.img)  

        let cartTitleElem = document.createElement('h3')
        cartTitleElem.innerHTML = shoe.title
        cartTitleElem.className = 'title'

        let cartPrice = document.createElement('span')
        cartPrice.innerHTML = shoe.price + '$'

        let cartBtnElem = document.createElement('h3')
        cartBtnElem.innerHTML = 'Delete'
        cartBtnElem.className = 'delete-btn'

        cartElem.append(cartImgElem , cartTitleElem , cartPrice , cartBtnElem)
        cartList.append(cartElem)

        cartBtnElem.addEventListener('click' , function() {
            removeItemFromCart(shoe.id)
            checkTotalPrice()
            countCheck()
            localStorage.setItem('cart' , JSON.stringify(userBasket))

        })
    })
}

function removeItemFromCart(shoeId) {
    let mainItemIndex = userBasket.findIndex(function(shoe) {
        return shoe.id == shoeId
    })
    userBasket.splice(mainItemIndex , 1)
    countCheck()
    addToUserBasket()
}

function checkTotalPrice() { 
    let sum = 0
    let result = 0
    for (let i = 0; i < userBasket.length; i++)
    {   
        
        sum += Number(userBasket[i].price)
    }
    result = sum
    totalPrice.innerHTML = result + "$"
}

