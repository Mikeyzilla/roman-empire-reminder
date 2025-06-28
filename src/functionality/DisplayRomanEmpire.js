document.addEventListener("DOMContentLoaded", async () => {
    const imageTitle = document.getElementById("ImageTitle");
    const selectableImage = document.getElementById("SelectableImage");
    const imageDescription = document.getElementById("ImageDescription");
    const rightArrow = document.getElementById("RightArrow");
    const leftArrow = document.getElementById("LeftArrow");
    const setReminderShield = document.getElementById("settingsShield");
    const logOutButton = document.getElementById("logOutWalkWay");


    try {
        const checkIfActiveAttempt = await fetch('http://localhost:5000/getRemainingDays', {
            method: "GET", 
            credentials: "include"
        });

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
                document.body.style.backgroundImage = "images/defeatedRoman.jpg";
                leftArrow.style.visibility = "hidden";
                rightArrow.style.visibility = "hidden";
                logOutButton.style.visibility = "hidden";
                setReminderShield.style.visibility = "hidden";
                imageTitle.style.visibility = "hidden";
                selectableImage.style.visibility = "hidden";
                imageDescription.style.visibility = "hidden";
                //now, create some text for the defeated roman, add it to the page, and style it.
                //(The empire is saddened by your forgetfulness)
               setTimeout(async () => {
                        //replace the background image with a new forgiveness image, add forgiveness text
                        //reset the reminder time to 1 for the user
                    setTimeout(() => {
                        //in this timeout, first remove the forgiveness text, 
                        //then change that forgiveness background back to normal  
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
                    }, 2000); //restoring the UI runs two seconds after
                }, 2000); //the forgiveness message is displayed
            }
        }
    } catch(err) {
        console.log(err);
    }
});