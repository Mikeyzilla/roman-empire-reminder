Known Issues so far:

A) We need a signup implementation system. If the user is already signed up (i.e has an account) then when "Enlist now!" is clicked, instead of going to the signup page, they should go to the Main Page.
    -- Right now, I just made it so that the user defaults going to the sign up page (This assumes they do not have an account)
    -- Needs the routes to be implemented.

B) Enlist now (For now) does not look great. 


D) Need to add a process that decrements the reminder value in the database every day until it reaches 0, so that the next time the user logs in, they see the "You failed your reminder" image on the main page.


(Go for B, A, D)