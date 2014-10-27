 /**
 * stringcaser.js
 * @version: v1.0.0
 * @author: Dennis Hernández
 * @webSite: http://djhvscf.github.io/Blog
 *
 * Created by Dennis Hernández on 03/Oct/2014.
 *
 * Copyright (c) 2014 Dennis Hernández http://djhvscf.github.io/Blog
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
 

;(function ($) {
    'use strict'
    $.fn.stringcaser = function (options) {
		
		var defaults = {
			method: 'underscore_case',
			humanReadable: false,
			//events : {'blur': {callback: 'sd.onBlur'}, 'paste': {callback: 'sd.onPaste'}, 'change': {callback: 'sd.onChange'}},
			},
			options =  $.extend(defaults, options),
			methods = ['CamelCase', 'underscore_case'],
			base = $(this);
			
		var sd = {
			validateMethod: function() {
				if (options.method === '') {
					$.error("You have to pass a valid method to transform the string");
				} else if ($.inArray(options.method, methods) === -1) {
					$.error("You have to pass a valid method to transform the string");
				}
				
				return true;
			},
			
			transformString: function() {
				var inputValue = base.val();
				
				if (inputValue.length === 1) {
					return inputValue;
				}
				
				if(options.method === 'CamelCase') {
					var strToReturn = inputValue.replace(/^[_.\-\* ]+/, '')
										.toLowerCase()
										.replace(/[_.\-\* ]+(\w|$)/g, function (m, p1) { return p1.toUpperCase();});
					strToReturn = strToReturn.charAt(0).toUpperCase() + strToReturn.slice(1);
					if(options.humanReadable) {
						//return strToReturn.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1").trim();
						return strToReturn.replace(/([A-Z]+)/g, " $1").trim();
					}
						
					return strToReturn;
						
				} else {
					//TODO best underscore_case function
					return inputValue.replace(/([A-Z])/g, function($1) { return "_"+$1.toLowerCase(); });
				}
			},
			
			events: function () {
				base
				.off('blur').on('blur', sd.onBlur)
				.off('paste').on('paste', function() { setTimeout(function() { sd.onPaste();}, 1)})
                .off('change').on('change', sd.onChange);
			},
			
			onBlur: function() {
				base.val(sd.transformString());
			},
			
			onChange: function() {
				base.val(sd.transformString());
			},
			
			onPaste: function() { 
				base.val(sd.transformString());
			}
		};
		
		var init = function() {
			if (sd.validateMethod()) {
				sd.events();
			}
		};
		
		init();
    };
})(jQuery);