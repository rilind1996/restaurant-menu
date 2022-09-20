const menu = [
    { id: 1, category: "burger", image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", name: "Beef Burger", price: "5.50", qty: "10" },
    { id: 2, category: "burger", image: "https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg?auto=compress&cs=tinysrgb&w=600", name: "Elk Burger", price: "7.50", qty: "10" },
    { id: 3, category: "burger", image: "https://images.pexels.com/photos/7845170/pexels-photo-7845170.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load", name: "Wild Salmon Burger", price: "6.00", qty: "10" },
    { id: 4, category: "pizza", image: "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=800", name: "Neapolitan Pizza", price: "8.00", qty: "10" },
    { id: 5, category: "pizza", image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=800", name: "New York Thin Crust Pizza.", price: "10.00", qty: "10" },
    { id: 6, category: "pizza", image: "https://images.pexels.com/photos/2714722/pexels-photo-2714722.jpeg?auto=compress&cs=tinysrgb&w=800", name: "New Haven-Style Clam Pizza", price: "6.50", qty: "10" },
    { id: 7, category: "pasta", image: "https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=800", name: "Pasta al Tonno.", price: "7.00", qty: "10" },
    { id: 8, category: "pasta", image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800", name: "Spaghetti Cacio e Pepe", price: "9.00", qty: "10" },
    { id: 9, category: "pasta", image: "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=800", name: "Tagliatelle alla Bolognese.", price: "6.50", qty: "10" },
    { id: 10, category: "drink", image: "https://images.pexels.com/photos/4389665/pexels-photo-4389665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", name: "Cocacola", price: "2.50", qty: "10" },
    { id: 11, category: "drink", image: "https://images.pexels.com/photos/1301390/pexels-photo-1301390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", name: "Beer", price: "3.50", qty: "10" },
    { id: 12, category: "drink", image: "https://images.pexels.com/photos/4264049/pexels-photo-4264049.jpeg?auto=compress&cs=tinysrgb&w=600", name: "Coffee", price: "6.50", qty: "10" },
    { id: 13, category: "drink", image: "https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", name: "Water", price: "1.00", qty: "10" },
    { id: 14, category: "drink", image: "https://images.pexels.com/photos/4551975/pexels-photo-4551975.jpeg?auto=compress&cs=tinysrgb&w=600", name: "Smothie", price: "5.00", qty: "10" }
]

let card = []


const diplayFlex = document.getElementById("display-flex")
const buttons = document.querySelectorAll(".buttons")
const cartModal = document.getElementById("exampleModal")



window.onload = function () {
    card = [...storageToCard()]
    document.querySelector(".total-card").innerHTML = card.length
    displayMenuItems(menu)
}


buttons.forEach(button => {

    button.addEventListener("click", (e) => {

        const category = e.target.dataset.id
        const menuItems = menu.filter(item => {

            if (category === item.category)
                return item
        })

        if (category === "all") {
            displayMenuItems(menu)
        } else {
            displayMenuItems(menuItems)
        }
    })
})

function displayMenuItems(divMenu) {

    let displayMenu = divMenu.map(item => {

        return `<div class="second-div">
<img src="${item.image}"
    alt="${item.name}">
<div>
    <h3>${item.name}</h3>
    <h4>${item.price} &euro;</h4>
</div>
<form action="#" onsubmit="addToCard(event)">
    <input type="number" min="1" id="qty" max=${item.qty} value="1">
    <button type="submit" class="item-buttons" id="btn" value=${item.id}>Add to card</button>
</form>
</div>`

    })
    displayMenu = displayMenu.join("")

    diplayFlex.innerHTML = displayMenu

}

function addToCard(event) {
    event.preventDefault()

    menu.map(menuitem => {
        if (parseInt(event.target.btn.value) === menuitem.id)
            card.push({ ...menuitem, qty: event.target.qty.value })
    })

    displayCardItems()
    updateCard()

}

function displayCardItems() {

    const table = document.querySelector(".modal-body")
    let content = ` <table class="w-100" cellspacing=20 cellpadding=10>
                 <tr class="first-tr">
                     <th>Image</th>
                     <th>Name</th>
                     <th>Price</th>
                     <th>Qty</th>
                     <th>Delete</th>
                 </tr>`
    let total = 0.0

    card.map((carditem, index) => {

        content += `<tr>
           <td><img src="${carditem.image}" alt=""></td>
           <td>${carditem.name}</td>
           <td class="align-center">${carditem.price}</td>
           <td class="align-center">${carditem.qty}</td>
           <td class="align-center"><button type="submit" class="delete-buttons text-white" onclick="deleteCard(${index})">X</button></td>
        </tr>`



        total += carditem.price * carditem.qty

    })

    if (total > 0) {
        content += `<tr class="first-tr">
        <td class="text-dark align-center text-white" colspan=5>Total ${total}&euro;</td>
        </tr>`}

    content += `</table>`

    table.innerHTML = content

}

function updateCard() {
    document.querySelector(".total-card").innerHTML = card.length
    cardToStorage()
}

cartModal.addEventListener('show.bs.modal', event => {
    displayCardItems()
})


function deleteCard(index) {

    card.splice(index, 1)
    displayCardItems()
    updateCard()

}

function cardToStorage() {
    localStorage.setItem("card", JSON.stringify(card))
}

function storageToCard() {
    return JSON.parse(localStorage.getItem("card"))
}