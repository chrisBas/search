# Search
This mini js/css library enables someone to easily add search functionality to any textual input field.  The search will wait for the user to stop typing to prevent any unwanted network requests and is easily configurable.

## Sample
* <https://chrisbas.github.io/>
* or download this project and open index.html

## Dependencies
* jQuery

## How to use
* Add the following CDN's to your html header:
```html
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="https://rawgit.com/chrisBas/search/master/search.js"></script>
<link rel="stylesheet" href="https://rawgit.com/chrisBas/search/master/search.css">
```
* Add an id to any textual search field
```html
<input type="text" id="someId">
```
* Create a javascript function that returns a Promise, or a jquery ajax/post/get call which internally uses Promises:

```javascript
function callBack(num) {
    // CALL SOME API AND FORMAT RESPONSE (usint $.ajax(...).then(FORMAT) functionality) to an 
        // array that can be listed in the search results
    // The below calls a chuck norris joke api if passing in an integer > 0
    if(parseInt(num, 10) > 0)
        return $.get("https://api.icndb.com/jokes/random/"+num)
            .done(function(data) {
                console.log("Success!", data);
            })
            .then(function(data) {
                return data["value"]
                    .map(i => i["joke"]);
            });
    else {
        console.error("invalid integer supplied.")
        return Promise.resolve();
    }
}
```
* Make sure the above defined 'successFunc' configures an array that can be added to the search menu
* Setup the search functionality on the input field
```javascript
srch.setup("#someId", callback)
```