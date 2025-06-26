Known Issues so far:

A) Need to add a link next to Enlist Now! for users who already have an account, that way they can skip the sign up process and go directly to the main page.
    -- Needs frontend implementation of login and logout.
    -- Need to verify that the username in login matches a username in our system before moving on.

B) Enlist now (For now) does not look great. 
    -- For now, I've changed it so that it goes directly to login instead of sign up, so that I can redesign Login easier. However, in 
    -- Normal User Flow, Enlist now should go to sign up, and there should be a link to the right of Enlist that goes to Login.

C) Need to add a process that decrements the reminder value in the database every day until it reaches 0, so that the next time the user logs in, they see the "You failed your reminder" image on the main page.
