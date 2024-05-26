
$(document).ready(() => {


    // const allDivs = $('div');

    // // console.log(allDivs);

    // const budgetForm = $('.budget-form');
    // // console.log(budgetForm[0]);

    // budgetForm[0].addEventListener(('click'), () => {
    //     console.log('test');
    // })
    // budgetForm.on('click', function (e) {
    //     console.log("HELLO");
    // })

    // budgetForm.hide();
    // budgetForm.show();
    // fadeIn() // fadeOut()
    // slideUp, slideDown, slideToggle
    // budgetForm.css("background-color", 'red');

    // budgetForm.on('click', function () {
    //     $('#expense-form').slideToggle();
    // })

    // budgetForm.animate({
    //     marginTop: '250px',
    //     marginLeft: '250px'
    // }, 1000);

    // // 
    // console.log(budgetForm.parents());
    // console.log(budgetForm.parent());
    // console.log(budgetForm.children());
    // console.log(budgetForm.find('*'));
    // // or
    // console.log(budgetForm.find('input'));
    // console.log(budgetForm.nextUntil('input'));
    // console.log(budgetForm.nextUntil('li:first')); // The first li in the ul


    // siblings // next // nextAll // nextUntil // prev // prevAll / prevUntil


    // console.log($('div'));
    // console.log($('div').eq(0));

    // text // html // val

    // $("a").attr("href") - getter
    // $("a").attr("href", "https:/....") - setter

    // $('div').attr('id', "test")

    // append / prepend (for the Text inside)

    // $('div).append()
    // $('div).prepend()


    // before / after (befor or after the element)


    // remove (To delete the element)

    // empty (To empty the element)

})



$(document).ready(function () {




    const budgetInput = $('#budget-input');
    const budgetButton = $('#budget-submit');

    const budgetAmount = $('#budget-amount');
    const balancAmount = $('#balance-amount');
    const expenseAmount = $('#expense-amount');

    const expenseButton = $('#expense-submit')


    const expenseTitle = $('#expense-input');
    const expenseValue = $('#amount-input');

    const tableDiv = $('.col-md-7.my-3');


    const budgetFeedback = $('.budget-feedback');
    const expenseFeedback = $('.expense-feedback');

    let totalExpeses = 0;

    // Button on Click event
    budgetButton.on('click', (clickEvent) => {
        clickEvent.preventDefault();


        const budgetAmountInput = Number(budgetInput.val());


        // Validates the input for the Budget
        if (budgetAmountInput <= 0 || budgetAmountInput === '' || isNaN(budgetAmountInput)) {
            budgetFeedback.text('Value cannot be empty or negative');
            budgetFeedback.show();
            return;
        }

        const currentExpese = Number(expenseAmount.text());
        const newBalance = budgetAmountInput - currentExpese;

        updateBudget(budgetAmountInput)
        updateBalance(newBalance)
    })


    expenseButton.on('click', (clickEvent) => {
        clickEvent.preventDefault();

        const expenseTitleInput = expenseTitle.val();
        const expenseAmountInput = expenseValue.val();

        // Validation if the budget Amount is set
        if (budgetAmount.text() === "0") {
            expenseFeedback.text('Please enter a Budget first.');
            expenseFeedback.show();
            return;
        }
        // Check if the expanses Title and Amount are set
        if (expenseTitleInput === '' || expenseAmountInput === '') {
            expenseFeedback.text("Expanse and Amoun can't be empty");
            expenseFeedback.show();
            return;
        }

        // Check if the Expense amount is numeric
        if (isNaN(expenseAmountInput)) {
            expenseFeedback.text("Epxense amount must be numeric");
            expenseFeedback.show();
            return;
        }



        totalExpeses += Number(expenseAmountInput);
        let newBalance = Number(balancAmount.text()) - expenseAmountInput;



        updateBalance(newBalance)
        updateExpenses(totalExpeses);


        // Adds Table on the first expense thats added
        if (tableDiv.children().length === 0) {
            tableDiv.html('<table class="table"> <tr><th>Expense title</th><th>Expense value</th><th></th></tr></table>');
        }

        addExpense(expenseTitleInput, expenseAmountInput)


        expenseTitle.val('');
        expenseValue.val('');

    })


    // Focus events to hide the error messages.
    budgetInput.on('focus', () => {
        budgetFeedback.hide();
        expenseFeedback.hide();
    })

    expenseTitle.on('focus', () => {

        expenseFeedback.hide();
    })

    expenseValue.on('focus', () => {

        expenseFeedback.hide();
    })




    // Custom functions to update and change elements

    function addExpense(title, amount) {


        const newRow = `
            <tr>
                <td class="showRed text-uppercase">- ${title}</td>
                <td class="showRed ">${amount}</td>
                <td><i class="fa-solid fa-pen-to-square edit-icon"></i></td>
                <td><i class="fa-solid fa-trash delete-icon"></i></td>
            </tr>
        `;

        // Append the new row to the table
        tableDiv.find('.table').append(newRow);

        // Select the edit button within the new row
        const editButton = tableDiv.find('.table .edit-icon').last();
        const deleteButton = tableDiv.find('.table .delete-icon').last();
        // Add click event handler to the edit button
        editButton.on('click', function () {
            // Your edit button click event handler logic goes here
            console.log('Edit button clicked');
            console.log(editButton.parent().siblings().parent().remove());
            editExpense(title, amount);
            updateExpesesandBalance(amount);

        });


        deleteButton.on('click', function () {
            // Your edit button click event handler logic goes here
            console.log('Delete button clicked');
            console.log(editButton.parent().siblings().parent().remove());
            updateExpesesandBalance(amount);

        });
    }

    function updateBudget(amount) {
        budgetAmount.text(`${amount}`);
        budgetInput.val('')
    }

    function updateBalance(amount) {

        // console.log(amount);
        if (amount < 0) {
            $('#balance').addClass("showRed");
            $('#balance').removeClass("showGreen");

        } else {
            $('#balance').addClass("showGreen ");
            $('#balance').removeClass("showRed");


        }
        balancAmount.text(`${amount}`);
    }

    function updateExpenses(amount) {
        expenseAmount.text(`${amount}`)
    }

    function editExpense(title, amount) {
        expenseTitle.val(title);
        expenseValue.val(amount);

    }

    function updateExpesesandBalance(amount) {
        let currentExpese = Number(expenseAmount.text());
        let currentBalance = Number(balancAmount.text())

        totalExpeses = currentExpese - Number(amount);
        console.log(currentBalance);
        console.log(currentExpese);

        updateExpenses(totalExpeses);
        updateBalance(currentBalance + Number(amount));
    }
})