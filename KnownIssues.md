Known Issues so far:

A) Need to add a link next to Enlist Now! for users who already have an account, that way they can skip the sign up process and go directly to the main page.
    -- Logout button needs server testing before saying it's 100% complete.
    -- Login Page needs server testing before saying it's 100% complete.

B) Enlist now (For now) does not look great. 
    -- For now, I've changed it so that it goes directly to Set Reminder so I can design that page easier. However, in 
    -- Normal User Flow, Enlist now should go to sign up, and there should be a link to the right of Enlist that goes to Login.

C) Need to add a process that decrements the reminder value in the database every day until it reaches 0, so that the next time the user logs in, they see the "You failed your reminder" image on the main page.

E) Need to implement set reminder - the page, backend route, and JS code. 

F) Need a button to go from Set Reminder back to the main page.

G) If the user already has a reminder, then set reminder should be changed to change reminder time, and the user can change their reminder settings from there.

H) Verify that the "fun facts" are actually facts.