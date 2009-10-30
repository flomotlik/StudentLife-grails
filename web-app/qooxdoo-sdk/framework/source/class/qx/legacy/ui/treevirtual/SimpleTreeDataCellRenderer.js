/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman (derrell)
     * David Perez Carmona (david-perez)

************************************************************************ */

/* ************************************************************************

#asset(qx/compat/icon/CrystalClear/16/status/folder-open.png)
#asset(qx/compat/icon/CrystalClear/16/places/folder.png)
#asset(qx/compat/icon/CrystalClear/16/actions/document-open.png)
#asset(qx/compat/icon/CrystalClear/16/actions/document-new.png)
#asset(qx/static/blank.gif)

************************************************************************ */

/**
 * A data cell renderer for the tree column of a simple tree
 */
qx.Class.define("qx.legacy.ui.treevirtual.SimpleTreeDataCellRenderer",
{
  extend : qx.legacy.ui.table.cellrenderer.Abstract,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    // Base URL used for indent images
    var Am = qx.legacy.util.AliasManager;
    this.WIDGET_TREE_URI = qx.util.ResourceManager.getInstance().toUri(Am.getInstance().resolve("widget/tree/line.gif")).replace("line.gif", "");
    this.STATIC_IMAGE_URI = qx.util.ResourceManager.getInstance().toUri("qx/static/blank.gif").replace("blank.gif", "");

    // Get the preloader manager singleton
    var preloader = qx.legacy.io.image.PreloaderManager.getInstance();

    // Pre-load the tree widgets so they always show up quickly
    var uri = this.WIDGET_TREE_URI;
    preloader.create(uri + "line.gif");
    preloader.create(uri + "minus.gif");
    preloader.create(uri + "plus.gif");
    preloader.create(uri + "only-minus.gif");
    preloader.create(uri + "only-plus.gif");
    preloader.create(uri + "start-minus.gif");
    preloader.create(uri + "start-plus.gif");
    preloader.create(uri + "end-minus.gif");
    preloader.create(uri + "end-plus.gif");
    preloader.create(uri + "cross-minus.gif");
    preloader.create(uri + "cross-plus.gif");
    preloader.create(uri + "end.gif");
    preloader.create(uri + "cross.gif");
    preloader.create(uri + "line.gif");

    // We also use a blank image, so preload it as well.
    uri = this.STATIC_IMAGE_URI;
    preloader.create(uri + "blank.gif");
  },




  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    MAIN_DIV_STYLE  :
      ';overflow:hidden;white-space:nowrap;border-right:1px solid #eeeeee;' +
      'padding-left:2px;padding-right:2px;cursor:default' +
      (qx.core.Variant.isSet("qx.client", "mshtml")
       ? ''
       : ';-moz-user-select:none;'),

    IMG_START       : '<img src="',
    IMG_END         : '"/>',
    IMG_TITLE_START : '" title="'
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * Set whether lines linking tree children shall be drawn on the tree.
     */
    useTreeLines :
    {
      check : "Boolean",
      init : true
    },

    /**
     * When true, exclude only the first-level tree lines, creating,
     * effectively, multiple unrelated root nodes.
     */
    excludeFirstLevelTreeLines :
    {
      check : "Boolean",
      init : false
    },

    /**
     * Set whether the open/close button should be displayed on a branch, even
     * if the branch has no children.
     */
    alwaysShowOpenCloseSymbol :
    {
      check : "Boolean",
      init : false
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    useTreeLines : function()
    {
      return this.getUseTreeLines();
    },

    // overridden
     _getCellStyle : function(cellInfo)
    {
      var node = cellInfo.value;

      // Return the style for the div for the cell.  If there's cell-specific
      // style information provided, append it.
      var html =
        this.base(arguments, cellInfo) +
        qx.legacy.ui.treevirtual.SimpleTreeDataCellRenderer.MAIN_DIV_STYLE +
        (node.cellStyle ? node.cellStyle + ";" : "");
      return html;
    },

    __addImage : function(urlAndToolTip)
    {
      var Stdcr = qx.legacy.ui.treevirtual.SimpleTreeDataCellRenderer;
      var html = Stdcr.IMG_START;
      var Am = qx.legacy.util.AliasManager;

      if (qx.legacy.core.Client.getInstance().isMshtml() &&
          /\.png$/i.test(urlAndToolTip.url))
        {
          html +=
            this.STATIC_IMAGE_URI +
            "blank.gif" +
            '" style="filter:' +
            "progid:DXImageTransform.Microsoft.AlphaImageLoader(" +
            "  src='" +
            qx.util.ResourceManager.getInstance().toUri(Am.getInstance().resolve(urlAndToolTip.url)) +
            "',sizingMethod='scale')";
        }
      else
        {
          var imageUrl = qx.util.ResourceManager.getInstance().toUri(Am.getInstance().resolve(urlAndToolTip.url));
          html += imageUrl + '" style="';
        }

      if (urlAndToolTip.imageWidth && urlAndToolTip.imageHeight)
      {
        html +=
          ';width:' +
          urlAndToolTip.imageWidth +
          'px' +
          ';height:' +
          urlAndToolTip.imageHeight +
          'px';
      }

      var tooltip = urlAndToolTip.tooltip;

      if (tooltip != null)
      {
        html += Stdcr.IMG_TITLE_START + tooltip;
      }

      html += Stdcr.IMG_END;

      return html;
    },


    /**
     * Adds extra content just before the icon.
     * @param cellInfo {Map} The information about the cell.
     *          See {@link qx.legacy.ui.table.cellrenderer.Abstract#createDataCellHtml}.
     * @return {Map} with the HTML and width in pixels of the rendered content.
     */
    _addExtraContentBeforeIcon : function(cellInfo)
    {
      return { html: '', width: 0 };
    },

    // overridden
    _getContentHtml : function(cellInfo)
    {
      var html = "";
      var node = cellInfo.value;
      var imageUrl;

      // Generate the indentation.  Obtain icon determination values once
      // rather than each time through the loop.
      var bUseTreeLines = this.getUseTreeLines();
      var bExcludeFirstLevelTreeLines = this.getExcludeFirstLevelTreeLines();
      var bAlwaysShowOpenCloseSymbol = this.getAlwaysShowOpenCloseSymbol();

      // Horizontal position
      var pos = 0;

      for (var i=0; i<node.level; i++)
      {
        imageUrl = this._getIndentSymbol(i, node, bUseTreeLines,
                                         bAlwaysShowOpenCloseSymbol,
                                         bExcludeFirstLevelTreeLines);

        html += this.__addImage(
        {
          url         : imageUrl,
          imageWidth  : 19,
          imageHeight : 16
        });
        pos += 19;
      }

      var extra = this._addExtraContentBeforeIcon(cellInfo);
      html += extra.html;
      pos += extra.width;

      // Add the node's icon
      imageUrl = (node.bSelected ? node.iconSelected : node.icon);

      if (!imageUrl)
      {
        if (node.type == qx.legacy.ui.treevirtual.SimpleTreeDataModel.Type.LEAF)
        {
          imageUrl =
            (node.bSelected
             ? "icon/16/actions/document-open.png"
             : "icon/16/actions/document-new.png");
        }
        else
        {
          imageUrl =
            (node.bSelected
             ? "icon/16/status/folder-open.png"
             : "icon/16/places/folder.png");
        }
      }

      html += this.__addImage(
      {
        url         : imageUrl,
        imageWidth  : 16,
        imageHeight : 16
      });

      // Add the node's label.  We calculate the "left" property with: each
      // tree line (indentation) icon is 19 pixels wide; the folder icon is 16
      // pixels wide, there are two pixels of padding at the left, and we want
      // 2 pixels between the folder icon and the label
      html +=
        '<div style="position:absolute;' +
        'left:' +
        ((node.level * 19) + 16 + 2 + 2) +
        ';' +
        'top:0' +
        (node.labelStyle ? ";" + node.labelStyle : "") +
        ';">' +
        node.label +
        '</div>';

      return html;
    },


    /**
     * Determine the symbol to use for indentation of a tree row, at a
     * particular column.  The indentation to use may be just white space or
     * may be a tree line.  Tree lines come in numerous varieties, so the
     * appropriate one is selected.
     *
     *
     * @param column {Integer}
     *   The column of indentation being requested, zero-relative
     *
     * @param node {Node}
     *   The node being displayed in the row.  The properties of a node are
     *   described in {@link qx.legacy.ui.treevirtual.SimpleTreeDataModel}
     *
     * @param bUseTreeLines {Boolean}
     *   Whether to find an appropriate tree line icon, or simply provide
     *   white space.
     *
     * @param bAlwaysShowOpenCloseSymbol {Boolean}
     *   Whether to display the open/close icon for a node even if it has no
     *   children.
     *
     * @param bExcludeFirstLevelTreeLines {Boolean}
     *   If bUseTreeLines is enabled, then further filtering of the left-most
     *   tree line may be specified here.  If <i>true</i> then the left-most
     *   tree line, between top-level siblings, will not be displayed.
     *   If <i>false</i>, then the left-most tree line wiill be displayed
     *   just like all of the other tree lines.
     *
     * @return {var} TODOC
     */
    _getIndentSymbol : function(column,
                                node,
                                bUseTreeLines,
                                bAlwaysShowOpenCloseSymbol,
                                bExcludeFirstLevelTreeLines)
    {
      // If we're in column 0 and excludeFirstLevelTreeLines is enabled, then
      // we treat this as if no tree lines were requested.
      if (column == 0 && bExcludeFirstLevelTreeLines)
      {
        bUseTreeLines = false;
      }

      // If we're not on the final column...
      if (column < node.level - 1)
      {
        // then return either a line or a blank icon, depending on
        // bUseTreeLines
        return (bUseTreeLines && ! node.lastChild[column]
                 ? this.WIDGET_TREE_URI + "line.gif"
                 : this.STATIC_IMAGE_URI + "blank.gif");
      }

      var bLastChild = node.lastChild[node.lastChild.length - 1];

      // Is this a branch node that does not have the open/close button hidden?
      if (node.type == qx.legacy.ui.treevirtual.SimpleTreeDataModel.Type.BRANCH &&
          ! node.bHideOpenClose)
      {
        // Does this node have any children, or do we always want the
        // open/close symbol to be shown?
        if (node.children.length > 0 || bAlwaysShowOpenCloseSymbol)
        {
          // If we're not showing tree lines...
          if (!bUseTreeLines)
          {
            // ... then just use a plus or minus
            return (node.bOpened
                    ? this.WIDGET_TREE_URI + "minus.gif"
                    : this.WIDGET_TREE_URI + "plus.gif");
          }

          // Are we looking at a top-level, first child of its parent?
          if (column == 0 && node.bFirstChild)
          {
            // Yup.  If it's also a last child...
            if (bLastChild)
            {
              // ... then use no tree lines.
              return (node.bOpened
                      ? this.WIDGET_TREE_URI + "only-minus.gif"
                      : this.WIDGET_TREE_URI + "only-plus.gif");
            }
            else
            {
              // otherwise, use descender lines but no ascender.
              return (node.bOpened
                      ? this.WIDGET_TREE_URI + "start-minus.gif"
                      : this.WIDGET_TREE_URI + "start-plus.gif");
            }
          }

          // It's not a top-level, first child.  Is this the last child of its
          // parent?
          if (bLastChild)
          {
            // Yup.  Return an ending plus or minus, or blank if node.bOpened
            // so indicates.
            return (node.bOpened
                    ? this.WIDGET_TREE_URI + "end-minus.gif"
                    : this.WIDGET_TREE_URI + "end-plus.gif");
          }

          // Otherwise, return a crossing plus or minus, or a blank if
          // node.bOpened so indicates.
          return (node.bOpened
                  ? this.WIDGET_TREE_URI + "cross-minus.gif"
                  : this.WIDGET_TREE_URI + "cross-plus.gif");
        }
      }

      // This node does not have any children.  Return an end or cross, if
      // we're using tree lines.
      if (bUseTreeLines)
      {
        // If this is a child of the root node...
        if (node.parentNodeId == 0)
        {
          // then return a blank.
          return this.STATIC_IMAGE_URI + "blank.gif";
        }

        // If this is a last child, return and ending line; otherwise cross.
        return (bLastChild
                ? this.WIDGET_TREE_URI + "end.gif"
                : this.WIDGET_TREE_URI + "cross.gif");
      }

      return this.STATIC_IMAGE_URI + "blank.gif";
    }
  }
});
