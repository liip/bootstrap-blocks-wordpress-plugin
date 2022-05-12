module.exports = {
  "__version": "9.6.1",
  "Row Block": {
    "Row block should be available": {
      "1": "<!-- wp:wp-bootstrap-blocks/row -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "Should be possible to change alignment": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"alignment\":\"right\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->",
      "2": "<!-- wp:wp-bootstrap-blocks/row {\"alignment\":\"right\",\"verticalAlignment\":\"bottom\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "Should be possible to change column layout": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"template\":\"1-1-1\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->",
      "2": "<!-- wp:wp-bootstrap-blocks/row {\"template\":\"2-1\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":8} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "Should be possible to select custom template": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"template\":\"custom\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "Should be possible to apply row options": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"noGutters\":true} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "Should be possible to enable column layout in editor": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"editorStackColumns\":true} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    }
  },
  "Row Block Backwards Compatibility": {
    "v1.0.0 row block content should be compatible": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"template\":\"2-1\",\"noGutters\":true,\"className\":\"additional-class-1 additional-class-2\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":8} -->\n<!-- wp:paragraph -->\n<p>row 1 col 1</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeXl\":9,\"sizeLg\":8,\"sizeMd\":7,\"sizeSm\":6,\"sizeXs\":5} -->\n<!-- wp:paragraph -->\n<p>row 1 col 2</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n<!-- /wp:wp-bootstrap-blocks/row -->\n\n<!-- wp:wp-bootstrap-blocks/row {\"alignment\":\"right\",\"verticalAlignment\":\"bottom\",\"align\":\"full\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} -->\n<!-- wp:paragraph -->\n<p>row 2 col 1</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} -->\n<!-- wp:paragraph -->\n<p>row 2 col 2</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "v1.1.0 row block content should be compatible": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"template\":\"2-1\",\"noGutters\":true,\"className\":\"additional-class-1 additional-class-2\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":8} -->\n<!-- wp:paragraph -->\n<p>row 1 col 1</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeXl\":9,\"sizeLg\":8,\"sizeMd\":7,\"sizeSm\":6,\"sizeXs\":5,\"bgColor\":\"primary\",\"padding\":\"p-5\",\"contentVerticalAlignment\":\"center\"} -->\n<!-- wp:paragraph -->\n<p>row 1 col 2</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n<!-- /wp:wp-bootstrap-blocks/row -->\n\n<!-- wp:wp-bootstrap-blocks/row {\"alignment\":\"right\",\"verticalAlignment\":\"bottom\",\"align\":\"full\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} -->\n<!-- wp:paragraph -->\n<p>row 2 col 1</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} -->\n<!-- wp:paragraph -->\n<p>row 2 col 2</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n<!-- /wp:wp-bootstrap-blocks/row -->\n\n<!-- wp:wp-bootstrap-blocks/row {\"template\":\"custom\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} -->\n<!-- wp:paragraph -->\n<p>row 3 col 1</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} -->\n<!-- wp:paragraph -->\n<p>row 3 col 2</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "v3.2.0 column block content with center content option should be migrated to content vertical alignment": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"template\":\"2-1\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":8,\"bgColor\":\"primary\",\"contentVerticalAlignment\":\"center\"} -->\n<!-- wp:paragraph -->\n<p>row 1 col 1</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} -->\n<!-- wp:paragraph -->\n<p>row 1 col 2</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    }
  },
  "Row Block Bootstrap 5": {
    "Should be possible to change gutter sizes": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"horizontalGutters\":\"gx-5\",\"verticalGutters\":\"gy-3\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    }
  },
  "Row Block Filters": {
    "wpBootstrapBlocks.row.templates should add additional template": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"template\":\"1-66percent\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":8} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "wp_bootstrap_blocks_row_default_attributes should override default attributes": {
      "1": "<!-- wp:wp-bootstrap-blocks/row -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":8} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    }
  },
  "Row Block Filters Bootstrap 5": {
    "wpBootstrapBlocks.row.horizontalGuttersOptions should add horizontal gutters option": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"noGutters\":false,\"horizontalGutters\":\"gx-10\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":8} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "wpBootstrapBlocks.row.verticalGuttersOptions should add vertical gutters option": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"noGutters\":false,\"verticalGutters\":\"gy-10\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":8} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "wp_bootstrap_blocks_row_default_attributes should override default attributes with Bootstrap 5": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"noGutters\":false} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":8} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    }
  },
  "Button Block": {
    "Button block should be initialized with default attributes": {
      "1": "<!-- wp:wp-bootstrap-blocks/button /-->"
    },
    "Should be possible to set link url and text": {
      "1": "<!-- wp:wp-bootstrap-blocks/button {\"text\":\"Liip\"} /-->",
      "2": "<!-- wp:wp-bootstrap-blocks/button {\"url\":\"https://liip.ch\",\"text\":\"Liip\"} /-->"
    },
    "Should be possible to select style": {
      "1": "<!-- wp:wp-bootstrap-blocks/button {\"style\":\"secondary\"} /-->"
    },
    "Should be possible to change alignment": {
      "1": "<!-- wp:wp-bootstrap-blocks/button {\"alignment\":\"center\"} /-->"
    },
    "Should be possible to enable and disable open in new tab": {
      "1": "<!-- wp:wp-bootstrap-blocks/button {\"linkTarget\":\"_blank\",\"rel\":\"noreferrer noopener\"} /-->",
      "2": "<!-- wp:wp-bootstrap-blocks/button /-->"
    },
    "Should keep rel value if set when open in new tab is enabled or disabled": {
      "1": "<!-- wp:wp-bootstrap-blocks/button {\"linkTarget\":\"_blank\",\"rel\":\"custom rel value\"} /-->",
      "2": "<!-- wp:wp-bootstrap-blocks/button {\"rel\":\"custom rel value\"} /-->"
    }
  },
  "Button Block Filters": {
    "wpBootstrapBlocks.button.styleOptions should add style option": {
      "1": "<!-- wp:wp-bootstrap-blocks/button {\"style\":\"brand\"} /-->"
    },
    "wp_bootstrap_blocks_button_default_attributes should override default attributes": {
      "1": "<!-- wp:wp-bootstrap-blocks/button /-->"
    }
  },
  "Container Block": {
    "Container block should be initialized with default attributes": {
      "1": "<!-- wp:wp-bootstrap-blocks/container /-->"
    },
    "Should be possible to enable fluid option": {
      "1": "<!-- wp:wp-bootstrap-blocks/container {\"isFluid\":true} /-->",
      "2": "<!-- wp:wp-bootstrap-blocks/container {\"isFluid\":true,\"fluidBreakpoint\":\"lg\"} /-->"
    }
  },
  "Container Block Filters": {
    "wp_bootstrap_blocks_container_default_attributes should override default attributes": {
      "1": "<!-- wp:wp-bootstrap-blocks/container /-->"
    },
    "wpBootstrapBlocks.container.marginAfterOptions should add margin option": {
      "1": "<!-- wp:wp-bootstrap-blocks/container {\"marginAfter\":\"mb-8\"} /-->"
    }
  },
  "Column Block": {
    "Should be possible to change column size": {
      "1": "<!-- wp:wp-bootstrap-blocks/row -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6,\"equalWidthLg\":true} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->",
      "2": "<!-- wp:wp-bootstrap-blocks/row -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeXl\":2,\"sizeMd\":6,\"equalWidthLg\":true} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "Should be possible to select background color": {
      "1": "<!-- wp:wp-bootstrap-blocks/row -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6,\"bgColor\":\"secondary\"} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "Should be possible to select padding": {
      "1": "<!-- wp:wp-bootstrap-blocks/row -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6,\"padding\":\"p-2\"} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "Should be possible to change content vertical alignment": {
      "1": "<!-- wp:wp-bootstrap-blocks/row -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6,\"contentVerticalAlignment\":\"bottom\"} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    }
  },
  "Column Block Bootstrap 5": {
    "Should be possible to select column size for xxl breakpoint": {
      "1": "<!-- wp:wp-bootstrap-blocks/row -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeXxl\":2,\"sizeMd\":6,\"equalWidthXxl\":true} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    }
  },
  "Column Block filters": {
    "wpBootstrapBlocks.column.bgColorOptions should add background color": {
      "1": "<!-- wp:wp-bootstrap-blocks/row -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6,\"bgColor\":\"brand\"} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "wpBootstrapBlocks.column.paddingOptions should add padding option": {
      "1": "<!-- wp:wp-bootstrap-blocks/row -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6,\"padding\":\"p-8\"} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "wp_bootstrap_blocks_column_default_attributes should override default attributes": {
      "1": "<!-- wp:wp-bootstrap-blocks/row -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    }
  },
  "Column Block Filters Bootstrap 5": {
    "wp_bootstrap_blocks_column_default_attributes should override default attributes with Bootstrap 5": {
      "1": "<!-- wp:wp-bootstrap-blocks/row -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    }
  },
  "Column Block Filters": {
    "wpBootstrapBlocks.column.bgColorOptions should add background color": {
      "1": "<!-- wp:wp-bootstrap-blocks/row -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6,\"bgColor\":\"brand\"} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "wpBootstrapBlocks.column.paddingOptions should add padding option": {
      "1": "<!-- wp:wp-bootstrap-blocks/row -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6,\"padding\":\"p-8\"} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "wp_bootstrap_blocks_column_default_attributes should override default attributes": {
      "1": "<!-- wp:wp-bootstrap-blocks/row -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    }
  },
  "Row Block Transforms": {
    "Custom template enabled": {
      "Should be possible to transform 2 blocks to row block": {
        "1": "<!-- wp:wp-bootstrap-blocks/row {\"template\":\"custom\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} -->\n<!-- wp:heading -->\n<h2></h2>\n<!-- /wp:heading -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} -->\n<!-- wp:heading -->\n<h2></h2>\n<!-- /wp:heading -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n<!-- /wp:wp-bootstrap-blocks/row -->"
      },
      "Should be possible to transform 3 blocks to row block": {
        "1": "<!-- wp:wp-bootstrap-blocks/row {\"template\":\"custom\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} -->\n<!-- wp:heading -->\n<h2></h2>\n<!-- /wp:heading -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} -->\n<!-- wp:heading -->\n<h2></h2>\n<!-- /wp:heading -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} -->\n<!-- wp:heading -->\n<h2></h2>\n<!-- /wp:heading -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n<!-- /wp:wp-bootstrap-blocks/row -->"
      },
      "Should be possible to transform 4 blocks to row block": {
        "1": "<!-- wp:wp-bootstrap-blocks/row {\"template\":\"custom\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":3} -->\n<!-- wp:heading -->\n<h2></h2>\n<!-- /wp:heading -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":3} -->\n<!-- wp:heading -->\n<h2></h2>\n<!-- /wp:heading -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":3} -->\n<!-- wp:heading -->\n<h2></h2>\n<!-- /wp:heading -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":3} -->\n<!-- wp:heading -->\n<h2></h2>\n<!-- /wp:heading -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n<!-- /wp:wp-bootstrap-blocks/row -->"
      },
      "Columns should not be smaller than 3": {
        "1": "<!-- wp:wp-bootstrap-blocks/row {\"template\":\"custom\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":3} -->\n<!-- wp:heading -->\n<h2></h2>\n<!-- /wp:heading -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":3} -->\n<!-- wp:heading -->\n<h2></h2>\n<!-- /wp:heading -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":3} -->\n<!-- wp:heading -->\n<h2></h2>\n<!-- /wp:heading -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":3} -->\n<!-- wp:heading -->\n<h2></h2>\n<!-- /wp:heading -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":3} -->\n<!-- wp:heading -->\n<h2></h2>\n<!-- /wp:heading -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n<!-- /wp:wp-bootstrap-blocks/row -->"
      }
    }
  },
  "Row Block CSS grid": {
    "Should be possible to change gutters size": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"cssGridGutters\":\"2rem\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    }
  },
  "Row Block Filters CSS grid": {
    "wpBootstrapBlocks.row.cssGridGuttersOptions should add gutters option": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"noGutters\":false,\"cssGridGutters\":\"10rem\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":8} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "wp_bootstrap_blocks_row_default_attributes should override default attributes with CSS grid": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"noGutters\":false} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} /-->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":8} /-->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    }
  }
}
