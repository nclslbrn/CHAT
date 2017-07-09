# Part of the CHAT Project
![drawings](https://github.com/nclslbrn/CHAT/blob/master/dev/images/chat-protagonistes.png?raw=true)

A generated chat with quotes by:
- Isaac ASIMOV
- Alain DAMASIO
- Héraclite d'EPHÈSE
- Michel FOUCAULT
- Ada LOVELACE
- Nicolas TESLA
- Aaron SWARTZ
- Linus TORVALDS
- Alan TURING

Demo [here](https://CHAT.artemg.com/ "CHAT: Demo")

## How it works ?

A javascript / jQuery script on index.html call results of a PHP page in data/index.php via global variable $_GET which contains the value `query` of the parameter `chat` (ie: `index.php/?chat=query`).
All data are stored as a huge PHP array (about 200 quotes) and quotes are stored by author name in files (_lastname-firstname.php include on the index.php).
Each quotes is categorized in the table according to its theme. To see how many quotes are in themes, you can access to `data/index.php?chat=dev`.
Theme are randomly choosen but when one is choose, the main script remove it from the themes list to prevent selecting it again and when every themes are selected, the main script rebuild the theme list.

## Can I chat with them ?

Nope, I just want to make a weird living archive, a generative chat so if you to speak with dead people you can visit a fortuneteller.

## How much does this work cost ?

How much money do you have to put for it?
