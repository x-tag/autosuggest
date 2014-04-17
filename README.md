# About

An autosuggest input provides automated hints and completion of textual value based on keyboard input.

# Syntax


```
  <x-autosuggest padding="2" url="http://yourwebsite.com/api/movies.json?page_limit=10&page=1"></x-autosuggest>
```


## Usage

```
  var autosuggest = document.getElementsByNames('x-autosuggest')[0];
  // change the URL to send the input text
  autosuggest.addEventListener('beforerequest', function(event){
    if (this.tagName == 'X-AUTOSUGGEST'){
      // set the url
      this.xtag.request.url = this.xtag.request.url + '&q=' + this.value;
    }
  });

  // Process the resulting data
  autosuggest.dataready = function(request){
    if (!request.responseText) return this;
    request.responseText.movies.forEach(function(movie){
      this.addSuggestion(movie.title, movie);
    }, this);
  };

```



# Create X-Tag Components

[Guide for creating X-Tag Components](https://github.com/x-tag/core/wiki/Creating-X-Tag-Components)

# Use X-Tag Components

[Using X-Tag components in your applications](https://github.com/x-tag/core/wiki/Using-our-Web-Components-in-Your-Application)

