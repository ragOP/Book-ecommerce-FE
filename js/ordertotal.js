document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.ft-bumbchbox');
    const orderTotalElement = document.querySelector('.ftorder-details-total em');
    const showTotalButton = document.querySelector('.ft-show-totalButton');
    const selectedItems = [];
    const sPrice = document.getElementById('undefined1');

    function handleShowTotalButtonClick() {
        selectedItems.length = 0; 

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const itemName = checkbox.getAttribute('data-title');
                const itemPrice = parseFloat(checkbox.getAttribute('data-price'));

                if (!selectedItems.some(item => item.name === itemName)) {
                    selectedItems.push({ name: itemName, price: itemPrice });
                }
            }
        });

        const totalAmount = parseFloat(orderTotalElement.textContent.replace('INR ', ''));
        console.log('Selected Items:', selectedItems);
        console.log('Total Order Amount:', `INR ${totalAmount.toFixed(2)}`);
    }

    function updateTotal() {
        let baseAmount = 199; 
        let additionalAmount = 0;

        sPrice.innerHTML = ''; 

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const itemPrice = parseFloat(checkbox.getAttribute('data-price'));
                const itemName = checkbox.getAttribute('data-title');

                additionalAmount += itemPrice;
                if (!selectedItems.some(item => item.name === itemName)) {
                    const parent = document.createElement('span');
                    const child = document.createElement('span');
                    const child1 = document.createElement('em');
                    child1.innerText = `INR ${itemPrice.toFixed(2)}`;
                    child.innerText = itemName;
                    parent.appendChild(child);
                    parent.appendChild(child1);
                    sPrice.appendChild(parent);

                }
            }
        });

        const totalAmount = baseAmount + additionalAmount;
        orderTotalElement.textContent = `INR ${totalAmount.toFixed(2)}`;
    }

    showTotalButton.addEventListener('click', handleShowTotalButtonClick);

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', updateTotal);
    });

    updateTotal();
});
