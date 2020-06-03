# BackbaseTest

This project is created via Angluar CLI, angular version used is 9+.
Other option I considered for this project was ES6, but I was not sure if it will take more time than I had at my disposal, so I decided it is safer to use Angular. I already worked with this framework on several projects before.
The app build is located in ./dist/backbase-test directory and can be run from there, but it has to be open with some server, for example angular-http-server.

## App architecture

It is a small SPA, so there is not much 'architecture' here. The whole app is in app.component.ts, no routing was needed. There are two components - app-transacion and app-popover and one service transaction.service.ts where all the transactions are held and updated.

## UI and design

All styling is made with css only (in Sass), without any css libraries or frameworks. I find most of these tools to be rather useless and non-optimal, especially on long-term projects. In my experience, sufficient knowledge of css is enough for any layout or design. If done carefully, css codebase is easy to maintain and scale. BEM methodology was used for class naming.
I also used css custom variables for all properties that I needed to make responsive. All @media queries are in styles.sass file and only these properties are updated there.

## App flow

On page init, two methods are executed - generateForm() and getTransactions(). The first is used to initiate the (reactive) form for transactions submission and the other for getting the transactions from transactions.service.
Transaction are fetched from the service via a subscription to BehaviorSubject as defined in the service. The service has one additional method, addTransaction(), which is used to add a transaction to the array of transactions and call next() on the behaviorSubject. This was done so that on each array change, the sorting and filtering functions in app.component can be executed.
It might not be optimal to re-sort and re-filter the entire array on each change for an array with a large number of elements, but in this case it does not impact performance.

In the form, on submit, the validateForm() method is executed. I created some basic validation for these fields, the 'toAccount' accepts letters and spaces up to 30 characters, and 'amount' accepts only positive number with up to two decimals. Also, there is a check if the balance will be less than -500 upon the transaction, and it is rejected if it is so. If the form is valid, the confirmation popover opens.

Basically, the whole transactions rendering process goes through two main functions, sortList() which sorts all the transactions by selected criteria (this criteria is kept and updated in sortCriteria object, on each click of a sort option). Then it checks if there is any text entered in search field and does the filtering. The sorted and filtered array is then displayed - this.transactionsDisplayed array.
If one of the sort options is clicked, the sortCriteria is updated, then array is sorted again (by new sortCriteria) and then filtered by the existing string in search field.

This stream - update, sort, filter - is kept so that whatever is changed (new transaction is added or sort option is changed), all previous parameters stay valid. For example, if there is a filter applied and new transaction is entered, if the filter does not apply to this new transaction it will not be displayed, not until the search filter is changed or removed.
The search filter works for both the merchant and transactionType properties.  




