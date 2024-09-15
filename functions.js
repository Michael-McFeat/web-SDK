(function () {
    // This is an Immediately Invoked Function Expression (IIFE)
    // It helps to create a private scope for variables and functions

    var form = document.getElementById("card-form");
    var clear = document.getElementById("clear");

    Worldpay.checkout.init({
        // Configuration object for Worldpay checkout
        id: "your-checkout-id",
        form: "#card-form",
        fields: {
            // Define selectors and placeholders for card input fields
            pan: { selector: "#card-pan", placeholder: "4444 3333 2222 1111" },
            expiry: { selector: "#card-expiry", placeholder: "MM/YY" },
            cvv: { selector: "#card-cvv", placeholder: "123" }
        },
        styles: {
            // Custom styles for input fields
            "input": { /* ... */ },
            "input#pan": { /* ... */ },
            "input.is-valid": { /* ... */ },
            "input.is-invalid": { /* ... */ },
            "input.is-onfocus": { /* ... */ }
        },
        accessibility: {
            // Accessibility settings for better user experience
            ariaLabel: { /* ... */ },
            lang: { locale: "en-GB" },
            title: { /* ... */ }
        },
        acceptedCardBrands: ["amex", "diners", "discover", "jcb", "maestro", "mastercard", "visa"],
        enablePanFormatting: true
    }, function (error, checkout) {
        // Callback function after initialization
        if (error) {
            console.error(error);
            return;
        }

        // Add submit event listener to the form
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            checkout.generateSessionState(function (error, sessionState) {
                if (error) {
                    console.error(error);
                    return;
                }
                // Handle the session state (e.g., send to server for processing)
                alert(sessionState);
            });
        });

        // Add click event listener to the clear button
        clear.addEventListener("click", function(event) {
            event.preventDefault();
            checkout.clearForm(function() {
                console.log('Form successfully cleared');
            });
        });
    });
})();
