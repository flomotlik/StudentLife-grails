/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2008-2009 Sebastian Werner, http://sebastian-werner.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * Sizzle CSS Selector Engine - v1.0

     http://sizzlejs.com/
     http://groups.google.com/group/sizzlejs
     http://github.com/jeresig/sizzle/tree

     Snapshot from July 23, 2009
       commit  ee45e59cdbdae1b60971a620ce5d15487ac1f9bf
       tree    5ba840431c2909e0e7b84737212a126468e853ae
       parent  3a163323c6391eb9c36dedfd39eac6026894ec09
     Copyright:
       (c) 2009, The Dojo Foundation

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

   ----------------------------------------------------------------------

     Copyright (c) 2009 John Resig

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation files
     (the "Software"), to deal in the Software without restriction,
     including without limitation the rights to use, copy, modify, merge,
     publish, distribute, sublicense, and/or sell copies of the Software,
     and to permit persons to whom the Software is furnished to do so,
     subject to the following conditions:

     The above copyright notice and this permission notice shall be
     included in all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     DEALINGS IN THE SOFTWARE.

************************************************************************ */

/**
 * The selector engine supports virtually all CSS 3 Selectors – this
 * even includes some parts that are infrequently implemented such as
 * escaped selectors (<code>.foo\\+bar</code>), Unicode selectors, and results
 * returned in document order. There are a few notable exceptions to
 * the CSS 3 selector support:
 *
 * * <code>:root</code>
 * * <code>:target</code>
 * * <code>:nth-last-child</code>
 * * <code>:nth-of-type</code>
 * * <code>:nth-last-of-type</code>
 * * <code>:first-of-type</code>
 * * <code>:last-of-type</code>
 * * <code>:only-of-type</code>
 * * <code>:lang()</code>
 *
 * In addition to the CSS 3 Selectors the engine supports the following
 * additional selectors or conventions.
 *
 * *Changes*
 *
 * * <code>:not(a.b)</code>: Supports non-simple selectors in :not() (most browsers only support :not(a), for example).
 * * <code>:not(div > p)</code>: Supports full selectors in :not().
 * * <code>:not(div, p)</code>: Supports multiple selectors in :not().
 * * <code>[NAME=VALUE]</code>: Doesn’t require quotes around the specified value in an attribute selector.
 *
 * *Additions*
 *
 * * <code>[NAME!=VALUE]</code>: Finds all elements whose NAME attribute doesn’t match the specified value. Is equivalent to doing :not([NAME=VALUE]).
 * * <code>:contains(TEXT)</code>: Finds all elements whose textual context contains the word ‘TEXT’ (case sensitive).
 * * <code>:header</code>: Finds all elements that are a header element (h1, h2, h3, h4, h5, h6).
 * * <code>:parent</code>: Finds all elements that contains another element.
 *
 * *Positional Selector Additions*
 *
 * * <code>:first</code>/</code>:last</code>: Finds the first or last matching element on the page. (e.g. “div:first” would find the first div on the page, in document order)
 * * <code>:even</code>/<code>:odd</code>: Finds every other element on the page (counting begins at 0, so :even would match the first element).
 * * <code>:eq</code>/<code>:nth</code>: Finds the Nth element on the page (e.g. :eq(5) finds the 6th element on the page).
 * * <code>:lt</code>/<code>:gt</code>: Finds all elements at positions less than or greater than the specified positions.
 *
 * *Form Selector Additions*
 *
 * * <code>:input</code>: Finds all input elements (includes textareas, selects, and buttons).
 * * <code>:text</code>, <code>:checkbox</code>, <code>:file</code>, <code>:password</code>, <code>:submit</code>, <code>:image</code>, <code>:reset</code>, <code>:button</code>: Finds the input element with the specified input type (<code>:button</code> also finds button elements).
 *
 * Based on Sizzle by John Resig, see also:
 *
 * * http://sizzlejs.com/
 *
 * For further usage details, also have a look at the Wiki page under:
 *
 * * http://wiki.github.com/jeresig/sizzle
 */
qx.Bootstrap.define("qx.bom.Selector",
{
  statics :
  {
    /**
     * Queries the document for the given selector. Supports all CSS3 selectors
     * plus some extensions as mentioned in the class description.
     *
     * @signature function(selector, context)
     * @param selector {String} Valid selector (CSS3 + extensions)
     * @param context {Element} Context element (result elements must be children of this element)
     * @return {Array} Matching elements
     */
    query : null,

    /**
     * Returns an reduced array which only contains the elements from the given
     * array which matches the given selector
     *
     * @signature function(selector, set)
     * @param selector {String} Selector to filter given set
     * @param set {Array} List to filter according to given selector
     * @return {Array} New array containing matching elements
     */
    matches : null
  }
});


/**
 * Below is the original Sizzle code. Snapshot date is mentioned in the head of
 * this file.
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
  done = 0,
  toString = Object.prototype.toString,
  hasDuplicate = false;

var Sizzle = function(selector, context, results, seed) {
  results = results || [];
  var origContext = context = context || document;

  if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
    return [];
  }

  if ( !selector || typeof selector !== "string" ) {
    return results;
  }

  var parts = [], m, set, checkSet, check, mode, extra, prune = true, contextXML = isXML(context);

  // Reset the position of the chunker regexp (start from head)
  chunker.lastIndex = 0;

  while ( (m = chunker.exec(selector)) !== null ) {
    parts.push( m[1] );

    if ( m[2] ) {
      extra = RegExp.rightContext;
      break;
    }
  }

  if ( parts.length > 1 && origPOS.exec( selector ) ) {
    if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
      set = posProcess( parts[0] + parts[1], context );
    } else {
      set = Expr.relative[ parts[0] ] ?
        [ context ] :
        Sizzle( parts.shift(), context );

      while ( parts.length ) {
        selector = parts.shift();

        if ( Expr.relative[ selector ] )
          selector += parts.shift();

        set = posProcess( selector, set );
      }
    }
  } else {
    // Take a shortcut and set the context if the root selector is an ID
    // (but not if it'll be faster if the inner selector is an ID)
    if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
        Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {
      var ret = Sizzle.find( parts.shift(), context, contextXML );
      context = ret.expr ? Sizzle.filter( ret.expr, ret.set )[0] : ret.set[0];
    }

    if ( context ) {
      var ret = seed ?
        { expr: parts.pop(), set: makeArray(seed) } :
        Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );
      set = ret.expr ? Sizzle.filter( ret.expr, ret.set ) : ret.set;

      if ( parts.length > 0 ) {
        checkSet = makeArray(set);
      } else {
        prune = false;
      }

      while ( parts.length ) {
        var cur = parts.pop(), pop = cur;

        if ( !Expr.relative[ cur ] ) {
          cur = "";
        } else {
          pop = parts.pop();
        }

        if ( pop == null ) {
          pop = context;
        }

        Expr.relative[ cur ]( checkSet, pop, contextXML );
      }
    } else {
      checkSet = parts = [];
    }
  }

  if ( !checkSet ) {
    checkSet = set;
  }

  if ( !checkSet ) {
    throw "Syntax error, unrecognized expression: " + (cur || selector);
  }

  if ( toString.call(checkSet) === "[object Array]" ) {
    if ( !prune ) {
      results.push.apply( results, checkSet );
    } else if ( context && context.nodeType === 1 ) {
      for ( var i = 0; checkSet[i] != null; i++ ) {
        if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && contains(context, checkSet[i])) ) {
          results.push( set[i] );
        }
      }
    } else {
      for ( var i = 0; checkSet[i] != null; i++ ) {
        if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
          results.push( set[i] );
        }
      }
    }
  } else {
    makeArray( checkSet, results );
  }

  if ( extra ) {
    Sizzle( extra, origContext, results, seed );
    Sizzle.uniqueSort( results );
  }

  return results;
};

Sizzle.uniqueSort = function(results){
  if ( sortOrder ) {
    hasDuplicate = false;
    results.sort(sortOrder);

    if ( hasDuplicate ) {
      for ( var i = 1; i < results.length; i++ ) {
        if ( results[i] === results[i-1] ) {
          results.splice(i--, 1);
        }
      }
    }
  }
};

Sizzle.matches = function(expr, set){
  return Sizzle(expr, null, null, set);
};

Sizzle.find = function(expr, context, isXML){
  var set, match;

  if ( !expr ) {
    return [];
  }

  for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
    var type = Expr.order[i], match;

    if ( (match = Expr.match[ type ].exec( expr )) ) {
      var left = RegExp.leftContext;

      if ( left.substr( left.length - 1 ) !== "\\" ) {
        match[1] = (match[1] || "").replace(/\\/g, "");
        set = Expr.find[ type ]( match, context, isXML );
        if ( set != null ) {
          expr = expr.replace( Expr.match[ type ], "" );
          break;
        }
      }
    }
  }

  if ( !set ) {
    set = context.getElementsByTagName("*");
  }

  return {set: set, expr: expr};
};

Sizzle.filter = function(expr, set, inplace, not){
  var old = expr, result = [], curLoop = set, match, anyFound,
    isXMLFilter = set && set[0] && isXML(set[0]);

  while ( expr && set.length ) {
    for ( var type in Expr.filter ) {
      if ( (match = Expr.match[ type ].exec( expr )) != null ) {
        var filter = Expr.filter[ type ], found, item;
        anyFound = false;

        if ( curLoop == result ) {
          result = [];
        }

        if ( Expr.preFilter[ type ] ) {
          match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

          if ( !match ) {
            anyFound = found = true;
          } else if ( match === true ) {
            continue;
          }
        }

        if ( match ) {
          for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
            if ( item ) {
              found = filter( item, match, i, curLoop );
              var pass = not ^ !!found;

              if ( inplace && found != null ) {
                if ( pass ) {
                  anyFound = true;
                } else {
                  curLoop[i] = false;
                }
              } else if ( pass ) {
                result.push( item );
                anyFound = true;
              }
            }
          }
        }

        if ( found !== undefined ) {
          if ( !inplace ) {
            curLoop = result;
          }

          expr = expr.replace( Expr.match[ type ], "" );

          if ( !anyFound ) {
            return [];
          }

          break;
        }
      }
    }

    // Improper expression
    if ( expr == old ) {
      if ( anyFound == null ) {
        throw "Syntax error, unrecognized expression: " + expr;
      } else {
        break;
      }
    }

    old = expr;
  }

  return curLoop;
};

var Expr = Sizzle.selectors = {
  order: [ "ID", "NAME", "TAG" ],
  match: {
    ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
    CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
    NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
    ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
    TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
    CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
    POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
    PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
  },
  attrMap: {
    "class": "className",
    "for": "htmlFor"
  },
  attrHandle: {
    href: function(elem){
      return elem.getAttribute("href");
    }
  },
  relative: {
    "+": function(checkSet, part, isXML){
      var isPartStr = typeof part === "string",
        isTag = isPartStr && !/\W/.test(part),
        isPartStrNotTag = isPartStr && !isTag;

      if ( isTag && !isXML ) {
        part = part.toUpperCase();
      }

      for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
        if ( (elem = checkSet[i]) ) {
          while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

          checkSet[i] = isPartStrNotTag || elem && elem.nodeName === part ?
            elem || false :
            elem === part;
        }
      }

      if ( isPartStrNotTag ) {
        Sizzle.filter( part, checkSet, true );
      }
    },
    ">": function(checkSet, part, isXML){
      var isPartStr = typeof part === "string";

      if ( isPartStr && !/\W/.test(part) ) {
        part = isXML ? part : part.toUpperCase();

        for ( var i = 0, l = checkSet.length; i < l; i++ ) {
          var elem = checkSet[i];
          if ( elem ) {
            var parent = elem.parentNode;
            checkSet[i] = parent.nodeName === part ? parent : false;
          }
        }
      } else {
        for ( var i = 0, l = checkSet.length; i < l; i++ ) {
          var elem = checkSet[i];
          if ( elem ) {
            checkSet[i] = isPartStr ?
              elem.parentNode :
              elem.parentNode === part;
          }
        }

        if ( isPartStr ) {
          Sizzle.filter( part, checkSet, true );
        }
      }
    },
    "": function(checkSet, part, isXML){
      var doneName = done++, checkFn = dirCheck;

      if ( !/\W/.test(part) ) {
        var nodeCheck = part = isXML ? part : part.toUpperCase();
        checkFn = dirNodeCheck;
      }

      checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
    },
    "~": function(checkSet, part, isXML){
      var doneName = done++, checkFn = dirCheck;

      if ( typeof part === "string" && !/\W/.test(part) ) {
        var nodeCheck = part = isXML ? part : part.toUpperCase();
        checkFn = dirNodeCheck;
      }

      checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
    }
  },
  find: {
    ID: function(match, context, isXML){
      if ( typeof context.getElementById !== "undefined" && !isXML ) {
        var m = context.getElementById(match[1]);
        return m ? [m] : [];
      }
    },
    NAME: function(match, context, isXML){
      if ( typeof context.getElementsByName !== "undefined" ) {
        var ret = [], results = context.getElementsByName(match[1]);

        for ( var i = 0, l = results.length; i < l; i++ ) {
          if ( results[i].getAttribute("name") === match[1] ) {
            ret.push( results[i] );
          }
        }

        return ret.length === 0 ? null : ret;
      }
    },
    TAG: function(match, context){
      return context.getElementsByTagName(match[1]);
    }
  },
  preFilter: {
    CLASS: function(match, curLoop, inplace, result, not, isXML){
      match = " " + match[1].replace(/\\/g, "") + " ";

      if ( isXML ) {
        return match;
      }

      for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
        if ( elem ) {
          if ( not ^ (elem.className && (" " + elem.className + " ").indexOf(match) >= 0) ) {
            if ( !inplace )
              result.push( elem );
          } else if ( inplace ) {
            curLoop[i] = false;
          }
        }
      }

      return false;
    },
    ID: function(match){
      return match[1].replace(/\\/g, "");
    },
    TAG: function(match, curLoop){
      for ( var i = 0; curLoop[i] === false; i++ ){}
      return curLoop[i] && isXML(curLoop[i]) ? match[1] : match[1].toUpperCase();
    },
    CHILD: function(match){
      if ( match[1] == "nth" ) {
        // parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
        var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
          match[2] == "even" && "2n" || match[2] == "odd" && "2n+1" ||
          !/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

        // calculate the numbers (first)n+(last) including if they are negative
        match[2] = (test[1] + (test[2] || 1)) - 0;
        match[3] = test[3] - 0;
      }

      // TODO: Move to normal caching system
      match[0] = done++;

      return match;
    },
    ATTR: function(match, curLoop, inplace, result, not, isXML){
      var name = match[1].replace(/\\/g, "");

      if ( !isXML && Expr.attrMap[name] ) {
        match[1] = Expr.attrMap[name];
      }

      if ( match[2] === "~=" ) {
        match[4] = " " + match[4] + " ";
      }

      return match;
    },
    PSEUDO: function(match, curLoop, inplace, result, not){
      if ( match[1] === "not" ) {
        // If we're dealing with a complex expression, or a simple one
        if ( chunker.exec(match[3]).length > 1 || /^\w/.test(match[3]) ) {
          match[3] = Sizzle(match[3], null, null, curLoop);
        } else {
          var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
          if ( !inplace ) {
            result.push.apply( result, ret );
          }
          return false;
        }
      } else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
        return true;
      }

      return match;
    },
    POS: function(match){
      match.unshift( true );
      return match;
    }
  },
  filters: {
    enabled: function(elem){
      return elem.disabled === false && elem.type !== "hidden";
    },
    disabled: function(elem){
      return elem.disabled === true;
    },
    checked: function(elem){
      return elem.checked === true;
    },
    selected: function(elem){
      // Accessing this property makes selected-by-default
      // options in Safari work properly
      elem.parentNode.selectedIndex;
      return elem.selected === true;
    },
    parent: function(elem){
      return !!elem.firstChild;
    },
    empty: function(elem){
      return !elem.firstChild;
    },
    has: function(elem, i, match){
      return !!Sizzle( match[3], elem ).length;
    },
    header: function(elem){
      return /h\d/i.test( elem.nodeName );
    },
    text: function(elem){
      return "text" === elem.type;
    },
    radio: function(elem){
      return "radio" === elem.type;
    },
    checkbox: function(elem){
      return "checkbox" === elem.type;
    },
    file: function(elem){
      return "file" === elem.type;
    },
    password: function(elem){
      return "password" === elem.type;
    },
    submit: function(elem){
      return "submit" === elem.type;
    },
    image: function(elem){
      return "image" === elem.type;
    },
    reset: function(elem){
      return "reset" === elem.type;
    },
    button: function(elem){
      return "button" === elem.type || elem.nodeName.toUpperCase() === "BUTTON";
    },
    input: function(elem){
      return /input|select|textarea|button/i.test(elem.nodeName);
    }
  },
  setFilters: {
    first: function(elem, i){
      return i === 0;
    },
    last: function(elem, i, match, array){
      return i === array.length - 1;
    },
    even: function(elem, i){
      return i % 2 === 0;
    },
    odd: function(elem, i){
      return i % 2 === 1;
    },
    lt: function(elem, i, match){
      return i < match[3] - 0;
    },
    gt: function(elem, i, match){
      return i > match[3] - 0;
    },
    nth: function(elem, i, match){
      return match[3] - 0 == i;
    },
    eq: function(elem, i, match){
      return match[3] - 0 == i;
    }
  },
  filter: {
    PSEUDO: function(elem, match, i, array){
      var name = match[1], filter = Expr.filters[ name ];

      if ( filter ) {
        return filter( elem, i, match, array );
      } else if ( name === "contains" ) {
        return (elem.textContent || elem.innerText || "").indexOf(match[3]) >= 0;
      } else if ( name === "not" ) {
        var not = match[3];

        for ( i = 0, l = not.length; i < l; i++ ) {
          if ( not[i] === elem ) {
            return false;
          }
        }

        return true;
      }
    },
    CHILD: function(elem, match){
      var type = match[1], node = elem;
      switch (type) {
        case 'only':
        case 'first':
          while ( (node = node.previousSibling) )  {
            if ( node.nodeType === 1 ) return false;
          }
          if ( type == 'first') return true;
          node = elem;
        case 'last':
          while ( (node = node.nextSibling) )  {
            if ( node.nodeType === 1 ) return false;
          }
          return true;
        case 'nth':
          var first = match[2], last = match[3];

          if ( first == 1 && last == 0 ) {
            return true;
          }

          var doneName = match[0],
            parent = elem.parentNode;

          if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
            var count = 0;
            for ( node = parent.firstChild; node; node = node.nextSibling ) {
              if ( node.nodeType === 1 ) {
                node.nodeIndex = ++count;
              }
            }
            parent.sizcache = doneName;
          }

          var diff = elem.nodeIndex - last;
          if ( first == 0 ) {
            return diff == 0;
          } else {
            return ( diff % first == 0 && diff / first >= 0 );
          }
      }
    },
    ID: function(elem, match){
      return elem.nodeType === 1 && elem.getAttribute("id") === match;
    },
    TAG: function(elem, match){
      return (match === "*" && elem.nodeType === 1) || elem.nodeName === match;
    },
    CLASS: function(elem, match){
      return (" " + (elem.className || elem.getAttribute("class")) + " ")
        .indexOf( match ) > -1;
    },
    ATTR: function(elem, match){
      var name = match[1],
        result = Expr.attrHandle[ name ] ?
          Expr.attrHandle[ name ]( elem ) :
          elem[ name ] != null ?
            elem[ name ] :
            elem.getAttribute( name ),
        value = result + "",
        type = match[2],
        check = match[4];

      return result == null ?
        type === "!=" :
        type === "=" ?
        value === check :
        type === "*=" ?
        value.indexOf(check) >= 0 :
        type === "~=" ?
        (" " + value + " ").indexOf(check) >= 0 :
        !check ?
        value && result !== false :
        type === "!=" ?
        value != check :
        type === "^=" ?
        value.indexOf(check) === 0 :
        type === "$=" ?
        value.substr(value.length - check.length) === check :
        type === "|=" ?
        value === check || value.substr(0, check.length + 1) === check + "-" :
        false;
    },
    POS: function(elem, match, i, array){
      var name = match[2], filter = Expr.setFilters[ name ];

      if ( filter ) {
        return filter( elem, i, match, array );
      }
    }
  }
};

var origPOS = Expr.match.POS;

for ( var type in Expr.match ) {
  Expr.match[ type ] = new RegExp( Expr.match[ type ].source + /(?![^\[]*\])(?![^\(]*\))/.source );
}

var makeArray = function(array, results) {
  array = Array.prototype.slice.call( array, 0 );

  if ( results ) {
    results.push.apply( results, array );
    return results;
  }

  return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
try {
  Array.prototype.slice.call( document.documentElement.childNodes, 0 );

// Provide a fallback method if it does not work
} catch(e){
  makeArray = function(array, results) {
    var ret = results || [];

    if ( toString.call(array) === "[object Array]" ) {
      Array.prototype.push.apply( ret, array );
    } else {
      if ( typeof array.length === "number" ) {
        for ( var i = 0, l = array.length; i < l; i++ ) {
          ret.push( array[i] );
        }
      } else {
        for ( var i = 0; array[i]; i++ ) {
          ret.push( array[i] );
        }
      }
    }

    return ret;
  };
}

var sortOrder;

if ( document.documentElement.compareDocumentPosition ) {
  sortOrder = function( a, b ) {
    var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
    if ( ret === 0 ) {
      hasDuplicate = true;
    }
    return ret;
  };
} else if ( "sourceIndex" in document.documentElement ) {
  sortOrder = function( a, b ) {
    var ret = a.sourceIndex - b.sourceIndex;
    if ( ret === 0 ) {
      hasDuplicate = true;
    }
    return ret;
  };
} else if ( document.createRange ) {
  sortOrder = function( a, b ) {
    var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
    aRange.selectNode(a);
    aRange.collapse(true);
    bRange.selectNode(b);
    bRange.collapse(true);
    var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
    if ( ret === 0 ) {
      hasDuplicate = true;
    }
    return ret;
  };
}

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
  // We're going to inject a fake input element with a specified name
  var form = document.createElement("div"),
    id = "script" + (new Date).getTime();
  form.innerHTML = "<a name='" + id + "'/>";

  // Inject it into the root element, check its status, and remove it quickly
  var root = document.documentElement;
  root.insertBefore( form, root.firstChild );

  // The workaround has to do additional checks after a getElementById
  // Which slows things down for other browsers (hence the branching)
  if ( !!document.getElementById( id ) ) {
    Expr.find.ID = function(match, context, isXML){
      if ( typeof context.getElementById !== "undefined" && !isXML ) {
        var m = context.getElementById(match[1]);
        return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
      }
    };

    Expr.filter.ID = function(elem, match){
      var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
      return elem.nodeType === 1 && node && node.nodeValue === match;
    };
  }

  root.removeChild( form );
  root = form = null; // release memory in IE
})();

(function(){
  // Check to see if the browser returns only elements
  // when doing getElementsByTagName("*")

  // Create a fake element
  var div = document.createElement("div");
  div.appendChild( document.createComment("") );

  // Make sure no comments are found
  if ( div.getElementsByTagName("*").length > 0 ) {
    Expr.find.TAG = function(match, context){
      var results = context.getElementsByTagName(match[1]);

      // Filter out possible comments
      if ( match[1] === "*" ) {
        var tmp = [];

        for ( var i = 0; results[i]; i++ ) {
          if ( results[i].nodeType === 1 ) {
            tmp.push( results[i] );
          }
        }

        results = tmp;
      }

      return results;
    };
  }

  // Check to see if an attribute returns normalized href attributes
  div.innerHTML = "<a href='#'></a>";
  if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
      div.firstChild.getAttribute("href") !== "#" ) {
    Expr.attrHandle.href = function(elem){
      return elem.getAttribute("href", 2);
    };
  }

  div = null; // release memory in IE
})();

if ( document.querySelectorAll ) (function(){
  var oldSizzle = Sizzle, div = document.createElement("div");
  div.innerHTML = "<p class='TEST'></p>";

  // Safari can't handle uppercase or unicode characters when
  // in quirks mode.
  if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
    return;
  }

  Sizzle = function(query, context, extra, seed){
    context = context || document;

    // Only use querySelectorAll on non-XML documents
    // (ID selectors don't work in non-HTML documents)
    if ( !seed && context.nodeType === 9 && !isXML(context) ) {
      try {
        return makeArray( context.querySelectorAll(query), extra );
      } catch(e){}
    }

    return oldSizzle(query, context, extra, seed);
  };

  for ( var prop in oldSizzle ) {
    Sizzle[ prop ] = oldSizzle[ prop ];
  }

  div = null; // release memory in IE
})();

if ( document.getElementsByClassName && document.documentElement.getElementsByClassName ) (function(){
  var div = document.createElement("div");
  div.innerHTML = "<div class='test e'></div><div class='test'></div>";

  // Opera can't find a second classname (in 9.6)
  if ( div.getElementsByClassName("e").length === 0 )
    return;

  // Safari caches class attributes, doesn't catch changes (in 3.2)
  div.lastChild.className = "e";

  if ( div.getElementsByClassName("e").length === 1 )
    return;

  Expr.order.splice(1, 0, "CLASS");
  Expr.find.CLASS = function(match, context, isXML) {
    if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
      return context.getElementsByClassName(match[1]);
    }
  };

  div = null; // release memory in IE
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
  var sibDir = dir == "previousSibling" && !isXML;
  for ( var i = 0, l = checkSet.length; i < l; i++ ) {
    var elem = checkSet[i];
    if ( elem ) {
      if ( sibDir && elem.nodeType === 1 ){
        elem.sizcache = doneName;
        elem.sizset = i;
      }
      elem = elem[dir];
      var match = false;

      while ( elem ) {
        if ( elem.sizcache === doneName ) {
          match = checkSet[elem.sizset];
          break;
        }

        if ( elem.nodeType === 1 && !isXML ){
          elem.sizcache = doneName;
          elem.sizset = i;
        }

        if ( elem.nodeName === cur ) {
          match = elem;
          break;
        }

        elem = elem[dir];
      }

      checkSet[i] = match;
    }
  }
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
  var sibDir = dir == "previousSibling" && !isXML;
  for ( var i = 0, l = checkSet.length; i < l; i++ ) {
    var elem = checkSet[i];
    if ( elem ) {
      if ( sibDir && elem.nodeType === 1 ) {
        elem.sizcache = doneName;
        elem.sizset = i;
      }
      elem = elem[dir];
      var match = false;

      while ( elem ) {
        if ( elem.sizcache === doneName ) {
          match = checkSet[elem.sizset];
          break;
        }

        if ( elem.nodeType === 1 ) {
          if ( !isXML ) {
            elem.sizcache = doneName;
            elem.sizset = i;
          }
          if ( typeof cur !== "string" ) {
            if ( elem === cur ) {
              match = true;
              break;
            }

          } else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
            match = elem;
            break;
          }
        }

        elem = elem[dir];
      }

      checkSet[i] = match;
    }
  }
}

var contains = document.compareDocumentPosition ?  function(a, b){
  return a.compareDocumentPosition(b) & 16;
} : function(a, b){
  return a !== b && (a.contains ? a.contains(b) : true);
};

var isXML = function(elem){
  return elem.nodeType === 9 && elem.documentElement.nodeName !== "HTML" ||
    !!elem.ownerDocument && elem.ownerDocument.documentElement.nodeName !== "HTML";
};

var posProcess = function(selector, context){
  var tmpSet = [], later = "", match,
    root = context.nodeType ? [context] : context;

  // Position selectors must be done after the filter
  // And so must :not(positional) so we move all PSEUDOs to the end
  while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
    later += match[0];
    selector = selector.replace( Expr.match.PSEUDO, "" );
  }

  selector = Expr.relative[selector] ? selector + "*" : selector;

  for ( var i = 0, l = root.length; i < l; i++ ) {
    Sizzle( selector, root[i], tmpSet );
  }

  return Sizzle.filter( later, tmpSet );
};

// EXPOSE

// window.Sizzle = Sizzle;

// EXPOSE qooxdoo variant

var Selector = qx.bom.Selector;

Selector.query = function(selector, context) {
  return Sizzle(selector, context);
};

Selector.matches = function(selector, set) {
  return Sizzle(selector, null, null, set);
};

})();