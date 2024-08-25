// Function to fetch the menu from the provided JSON and display it to the user
async function getMenu() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        const data = await response.json();

        // Assuming you have a container with the ID 'menu-container' to display the items
        const menuContainer = document.getElementById('menu-container');
        data.forEach((item, index) => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('box');
            menuItem.innerHTML = `
                <img width="100%" src="asset/burger.jpeg" alt="">
                <div class="divide">
                    <div class="left">
                        <h2>${item.name}</h2>
                        <p>$${item.price}/-</p>
                    </div>
                    <div class="right">
                        <button class="plus-button"> <img width="10px" src="asset/plus.png" alt=""> </button>
                    </div>
                </div>
            `;
            menuContainer.appendChild(menuItem);

            // Add event listener to the plus button to start the order process
            menuItem.querySelector('.plus-button').addEventListener('click', handleOrderProcess);
        });
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
}

// Function to simulate taking an order
function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Randomly select 3 burgers from the menu
            const burgers = ['Cheeseburger', 'Veggie Burger', 'Chicken Burger', 'Bacon Burger', 'Fish Burger'];
            const selectedBurgers = [];
            for (let i = 0; i < 3; i++) {
                selectedBurgers.push(burgers[Math.floor(Math.random() * burgers.length)]);
            }
            resolve({ burgers: selectedBurgers });
        }, 2500);
    });
}

// Function to simulate order preparation
function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

// Function to simulate paying for the order
function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

// Function to display a thank you alert
function thankyouFnc() {
    alert('Thank you for eating with us today!');
}

// Using async/await to handle the promises in sequence
async function handleOrderProcess() {
    try {
        const order = await takeOrder();
        console.log('Order taken:', order);
        const prep = await orderPrep();
        console.log('Order prepared:', prep);
        const payment = await payOrder();
        console.log('Payment processed:', payment);
        if (payment.paid) {
            thankyouFnc();
        }
    } catch (error) {
        console.error('Error in order process:', error);
    }
}

// Call the function to fetch the menu when the page loads
document.addEventListener('DOMContentLoaded', getMenu);
