document.addEventListener("DOMContentLoaded", () => {
  const leftSoldier = document.getElementById("cursormarker1");
  const rightSoldier = document.getElementById("cursormarker2");
  const bubbletext1 = document.getElementById("bubbletext1");
  const bubbletext2 = document.getElementById("bubbletext2");
  const nextPageLink = document.getElementById("JourneyEmbarker");
  const leftBubble = document.getElementById("leftBubble");
  const rightBubble = document.getElementById("rightBubble");

  leftSoldier.style.display = "inline-block";
  rightSoldier.style.display = "inline-block";

  let pointInConversation = 0;

  leftSoldier.addEventListener("mouseenter", () => {
    if (pointInConversation === 0) {
      bubbletext1.textContent = "I sure wish I could remember the Roman Empire...";
      pointInConversation = 1;
    } else if (pointInConversation === 2) {
      bubbletext1.textContent = "Oh yeah? Well what are we waiting for? Let's sign up!";
      pointInConversation = 3;

      setTimeout(() => {
        leftBubble.style.display = "none";
        rightBubble.style.display = "none";
        nextPageLink.textContent = "Enlist Now!";
      }, 2000); 
    }
  });

  leftSoldier.addEventListener("mouseleave", () => {
    if (pointInConversation < 3) {
      bubbletext1.textContent = "";
    }
  });

  rightSoldier.addEventListener("mouseenter", () => {
    if (pointInConversation === 1) {
      bubbletext2.textContent = "Didn't you hear? Mike and Marcel designed an incredible app to help us remember!";
      pointInConversation = 2;
    }
  });

  rightSoldier.addEventListener("mouseleave", () => {
    if (pointInConversation < 3) {
      bubbletext2.textContent = "";
    }
  });
});

