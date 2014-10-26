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
			str: '',
			method: 'CamelCase'
			},
			options =  $.extend(defaults, options),
			methods = ['CamelCase', 'underscore_case'];
			
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
				options.str = options.str.trim();
				
				if (options.str.length === 1) {
					return options.str;
				} else if (sd.validateMethod()) {
					if(options.method === 'CamelCase') {
						var strToReturn = options.str.replace(/^[_.\- ]+/, '')
											.toLowerCase()
											.replace(/[_.\- ]+(\w|$)/g, function (m, p1) { return p1.toUpperCase();});
							return strToReturn.charAt(0).toUpperCase() + strToReturn.slice(1);
					} else {
						//TODO underscore_case
					}
				}
			}
		};
		
		return sd.transformString();
		
    };
})(jQuery);