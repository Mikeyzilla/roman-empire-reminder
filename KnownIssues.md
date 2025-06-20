Known Issues so far:

A) There seems to be some empty space on the Left-hand and Right-hand side of the body area. Not sure what to put there. 

- To remove that whitespace you need to set padding and margin to 0, body by default comes with some padding

B) The page does not extend all the way down to the bottom of the viewport. 

- height: 100vh // (viewport height)

C) The button's text is slightly hard to read. 

- This is because you can't have semi-light text on a semi-light background, it's either dark background and light text or vice-versa.  Blurring the background also helps make the text more readable.

D) There is no on click redirection for the button yet.

- It's better to use a link for this

E) The index file (and all other web page files) are in html, not PHP yet. 
Because of this, we have unnecessary style files and functionality files. PHP should combine all three (HTML, CSS, and backend code) into one file when fixed. 

- This doesn't make sense.  If you want to combine all three you could use a frontend framework like React or Svelte, but for such a simple project I don't think it makes sense.
