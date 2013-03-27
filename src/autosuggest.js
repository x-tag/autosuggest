
(function(){
	
	var printValue = function(event){
		var element = event.currentTarget;
		if (this.parentNode == element.lastElementChild){
			element.firstElementChild.value = this.textContent;
			element.firstElementChild.nextSibling.value = JSON.stringify(this.data);
			element.hideSuggestions();
			element.firstElementChild.focus();
			xtag.fireEvent(element, 'change');
		}
	};
	
	xtag.register('x-autosuggest', {
		mixins: ['request'],
		lifecycle: {
			created: function(){
				this.innerHTML = '<input type="text" /><input type="hidden" /><ul></ul>';
			}
		},
		accessors: {
			value: {
				get: function(){
					return this.firstElementChild.value;	
				}
			},
			name: {
				set: function(name){
					this.firstElementChild.name = name;
					this.firstElementChild.nextElementSibling.name = name;
					this.setAttribute('name', name);
				}
			}
		},
		events: {
			'dataready:preventable': function(){
				this.clearSuggestions();
				this.showSuggestions();
			},
			'keydown:keypass(38, 40)': function(event){
				var element = event.currentTarget;
				event.preventDefault();
				this.showSuggestions();
				
				var first = element.lastElementChild.firstElementChild;	
				if (!first) return element;
				
				var selected = xtag.query(element, '[selected="true"]')[0];
				if (selected) {
					(event.keyCode - 38 ? 
						selected.nextElementSibling || first : 
						selected.previousElementSibling || element.lastElementChild.lastElementChild).focus();
				} else {
					first.focus();
				}
			},
			'keyup:delegate(input):keyfail(9, 13, 16, 17, 32, 37, 38, 39, 40, 91)': function(event){
				var element = event.currentTarget;
				var url = element.getAttribute('data-url'),
					padding = element.getAttribute('data-padding') || 1;
				if (url && this.value.length >= padding) element.src = url;				
			},
			'keyup:delegate(li):keypass(13)': printValue,
			'click:delegate(li)': printValue,
			'focus:delegate(li)': function(){
				xtag.query(this.parentNode, '[selected="true"]').forEach(function(li){
					li.removeAttribute('selected');
				});
				this.setAttribute('selected', true);
			},
			'blur': function(event){
				var element = event.currentTarget;
				setTimeout(function(){
					if (element && element != document.activeElement && !element.contains(document.activeElement)) element.hideSuggestions();
				}, 1);
			}
		},
		methods: {
			addSuggestion: function(content, data){
				var li = document.createElement('li');
					li.setAttribute('tabindex', 0);
					li.innerHTML = content;
					li.xtag = { data: data };
				this.lastElementChild.appendChild(li);
			},
			clearSuggestions: function(){
				this.lastElementChild.innerHTML = '';
			},
			showSuggestions: function(){
				this.lastElementChild.setAttribute('data-show-suggestions', true);
			},
			hideSuggestions: function(){
				this.lastElementChild.removeAttribute('data-show-suggestions');
			}
		}
	});
	
})();