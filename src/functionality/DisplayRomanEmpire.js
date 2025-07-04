document.addEventListener("DOMContentLoaded", async () => {
    const imageTitle = document.getElementById("ImageTitle");
    const selectableImage = document.getElementById("SelectableImage");
    const imageDescription = document.getElementById("ImageDescription");
    const rightArrow = document.getElementById("RightArrow");
    const leftArrow = document.getElementById("LeftArrow");
    const setReminderShield = document.getElementById("settingsShield");
    const logOutButton = document.getElementById("logOutWalkWay");
    const defeatedAndVictoryArea = document.getElementById("DefeatedAndForgivenessArea");
    const defeatedTitle = document.getElementById("DefeatedAndForgivenessTitle");
    const defeatedText = document.getElementById("DefeatedAndForgivenessText");
    const defeatedThoughtBubble = document.getElementById("DefeatedBubble");

    try {
        const checkIfActiveAttempt = await fetch('http://localhost:5000/getRemainingDays', {
            method: "GET", 
            credentials: "include"
        }); //if need to test without the logic, comment it out and implement a failsafe always fail code

        if (checkIfActiveAttempt.ok) {

            const checkIfActiveResponse = await checkIfActiveAttempt.json();

            if (checkIfActiveResponse.timerStatus === "timerActive") {

                setReminderShield.addEventListener("click", () => {
                    window.location.href = "RomanEmpireSetReminder.html";
                });

                logOutButton.addEventListener("click", async () => {
                    try {
                        const logOutAttempt = await fetch('http://localhost:5000/logout', {
                            method: "POST",
                            credentials: "include", 
                        });

                        const logOutResponse = await logOutAttempt.json();

                        if (logOutResponse) {
                            window.location.href = "index.html";
                        } else {
                            alert("There was an error logging out.")
                        }
                    } catch (err) {
                        console.log(err);
                        alert(err);
                    }
                });

                leftArrow.addEventListener("click", () => {
                    const current = selectableImage.dataset.current;

                    if (current === "TransparentAugust") {
                        imageTitle.textContent = "Marcus my words...";
                        selectableImage.src = "images/Aurelius.jpg";
                        imageDescription.textContent = "Did you know Marcus was a man of his word? He taught and practiced Stoicism, which is a philosophy about many things, including being humble and self-disciplined.";
                        selectableImage.dataset.current = "Aurelius";
                    } else if (current === "Aurelius") {
                        imageTitle.textContent = "A Brawl of a Lifetime";
                        selectableImage.src = "images/Colosseum.jpg";
                        imageDescription.textContent = "Did you know that the Colosseum was actually at one point used for naval combat? Romans would flood the Colosseum!";
                        selectableImage.dataset.current = "Colosseum";
                    } else if (current === "Colosseum") {
                        imageTitle.textContent = "Our Calendar DATES back to the Empire";
                        selectableImage.src = "images/TransparentAugust.png";
                        imageDescription.textContent = "Did you know that our modern-day calendar was created by the Romans? In fact, months like July and August are named because of Julius Caesar and Augustus!";
                        selectableImage.dataset.current = "TransparentAugust";
                    }
                });

                rightArrow.addEventListener("click", () => {
                    const current = selectableImage.dataset.current;

                    if (current === "TransparentAugust") {
                        imageTitle.textContent = "A Brawl of a Lifetime";
                        selectableImage.src = "images/Colosseum.jpg";
                        imageDescription.textContent = "Did you know that the Colosseum was actually at one point used for naval combat? Romans would flood the Colosseum!";
                        selectableImage.dataset.current = "Colosseum";
                    } else if (current === "Colosseum") {
                        imageTitle.textContent = "Marcus my words...";
                        selectableImage.src = "images/Aurelius.jpg";
                        imageDescription.textContent = "Did you know Marcus was a man of his word? He taught and practiced Stoicism, which is a philosophy about many things, including being humble and self-disciplined.";
                        selectableImage.dataset.current = "Aurelius";
                    } else if (current === "Aurelius") {
                        imageTitle.textContent = "Our Calendar DATES back to the Empire";
                        selectableImage.src = "images/TransparentAugust.png";
                        imageDescription.textContent = "Did you know that our modern-day calendar was created by the Romans? In fact, months like July and August are named because of Julius Caesar and Augustus!";
                        selectableImage.dataset.current = "TransparentAugust";
                    }
                });
            } else {
                document.body.style.backgroundImage = 'url("../images/defeatedRoman.jpg")';
                leftArrow.style.visibility = "hidden";
                rightArrow.style.visibility = "hidden";
                logOutButton.style.visibility = "hidden";
                setReminderShield.style.visibility = "hidden";
                imageTitle.style.visibility = "hidden";
                selectableImage.style.visibility = "hidden";
                imageDescription.style.visibility = "hidden";
                defeatedAndVictoryArea.style.visibility = "visible";

                setTimeout(() => {
                    document.body.style.backgroundImage = 'url("../images/RomanForgive.png")';
                    defeatedTitle.textContent = "Don't worry! You are forgiven.";
                    defeatedText.textContent = "Mike and Marcel being glad you came back to their app";
                    defeatedThoughtBubble.style.transform = "scaleX(1)";
                    defeatedThoughtBubble.style.rotate = "0deg";
                    defeatedThoughtBubble.style.left = "59%";
                    defeatedTitle.style.top = "-2%";
                    defeatedTitle.style.left = "30%";
                    defeatedTitle.style.fontSize = "47px";
                    defeatedText.style.fontSize = "21px";
                    defeatedText.style.right = "25%";
                    defeatedText.style.top = "15%"
                    defeatedText.style.rotate = "0deg";
                    setTimeout(() => {  
                        defeatedAndVictoryArea.style.visibility = "hidden";
                        defeatedTitle.style.visibility = "hidden";
                        defeatedText.style.visibility = "hidden";
                        defeatedThoughtBubble.style.visibility = "hidden";
                        leftArrow.style.visibility = "visible";
                        rightArrow.style.visibility = "visible";
                        logOutButton.style.visibility = "visible";
                        setReminderShield.style.visibility = "visible";
                        imageTitle.style.visibility = "visible";
                        selectableImage.style.visibility = "visible";
                        imageDescription.style.visibility = "visible";
                        document.body.style.backgroundImage = 'url("../images/RomanTest7.png")';
                        setReminderShield.addEventListener("click", () => {
                            window.location.href = "RomanEmpireSetReminder.html";
                        });

                        logOutButton.addEventListener("click", () => {
                            window.location.href = "index.html";
                        });

                        leftArrow.addEventListener("click", () => {
                            const current = selectableImage.dataset.current;

                            if (current === "TransparentAugust") {
                                imageTitle.textContent = "Marcus my words...";
                                selectableImage.src = "images/Aurelius.jpg";
                                imageDescription.textContent = "Did you know Marcus was a man of his word? He taught and practiced Stoicism, which is a philosophy about many things, including being humble and self-disciplined.";
                                selectableImage.dataset.current = "Aurelius";
                            } else if (current === "Aurelius") {
                                imageTitle.textContent = "A Brawl of a Lifetime";
                                selectableImage.src = "images/Colosseum.jpg";
                                imageDescription.textContent = "Did you know that the Colosseum was actually at one point used for naval combat? Romans would flood the Colosseum!";
                                selectableImage.dataset.current = "Colosseum";
                            } else if (current === "Colosseum") {
                                imageTitle.textContent = "Our Calendar DATES back to the Empire";
                                selectableImage.src = "images/TransparentAugust.png";
                                imageDescription.textContent = "Did you know that our modern-day calendar was created by the Romans? In fact, months like July and August are named because of Julius Caesar and Augustus!";
                                selectableImage.dataset.current = "TransparentAugust";
                            }
                        });

                        rightArrow.addEventListener("click", () => {
                            const current = selectableImage.dataset.current;

                            if (current === "TransparentAugust") {
                                imageTitle.textContent = "A Brawl of a Lifetime";
                                selectableImage.src = "images/Colosseum.jpg";
                                imageDescription.textContent = "Did you know that the Colosseum was actually at one point used for naval combat? Romans would flood the Colosseum!";
                                selectableImage.dataset.current = "Colosseum";
                            } else if (current === "Colosseum") {
                                imageTitle.textContent = "Marcus my words...";
                                selectableImage.src = "images/Aurelius.jpg";
                                imageDescription.textContent = "Did you know Marcus was a man of his word? He taught and practiced Stoicism, which is a philosophy about many things, including being humble and self-disciplined.";
                                selectableImage.dataset.current = "Aurelius";
                            } else if (current === "Aurelius") {
                                imageTitle.textContent = "Our Calendar DATES back to the Empire";
                                selectableImage.src = "images/TransparentAugust.png";
                                imageDescription.textContent = "Did you know that our modern-day calendar was created by the Romans? In fact, months like July and August are named because of Julius Caesar and Augustus!";
                                selectableImage.dataset.current = "TransparentAugust";
                            }
                        });

                    }, 7000); 
                }, 7000); 
            }
        }
    } catch(err) {
        console.log(err);
    }
});