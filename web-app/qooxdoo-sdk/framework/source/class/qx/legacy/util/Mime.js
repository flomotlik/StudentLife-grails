/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Mime type constants
 */
qx.Class.define("qx.legacy.util.Mime",
{
  statics :
  {
    JAVASCRIPT : "text/javascript",

    /** this has been changed from text/json to application/json */
    JSON       : "application/json",
    XML        : "application/xml",
    TEXT       : "text/plain",
    HTML       : "text/html"
  }
});
