document.addEventListener("DOMContentLoaded", function () {
    const scanNowBtn = document.getElementById("scanNowBtn");
    const qrCodeImage = document.getElementById("qrCodeImage");
    const qrCodeResult = document.getElementById("qrCodeResult");
    const qrReader = document.getElementById("qr-reader");

    // Handle "Scan Now" button click
    scanNowBtn.addEventListener("click", function () {
        // Hide the QR code image
        qrCodeImage.style.display = "none";
        // Show the QR Reader div
        qrReader.style.display = "block";

        // Create a new instance of Html5QrcodeScanner
        const html5QrCode = new Html5Qrcode("qr-reader");

        // Start the QR code scanner
        html5QrCode.start(
            { facingMode: "environment" }, // Use rear camera if available
            {
                fps: 10,  // Set the frames per second for scanning
                qrbox: 250 // Set the scanning box size
            },
            (decodedText, decodedResult) => {
                console.log("Decoded Result:", decodedResult);
                // Display the decoded QR code text
                qrCodeResult.innerText = "Scanned Result: " + decodedText;

                // Stop the QR code scanner
                html5QrCode.stop().then(() => {
                    // Hide the QR reader
                    qrReader.style.display = "none";
                }).catch(err => {
                    console.error("Unable to stop scanning: ", err);
                });
            },
            (errorMessage) => {
                // Handle errors during scanning
                console.log("Error scanning QR Code: ", errorMessage);
            }
        ).catch(err => {
            console.error("Unable to start scanning: ", err);
        });
    });
});
