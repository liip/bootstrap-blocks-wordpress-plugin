module.exports = {
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
  "__version": "6.8.0",
  "Row Block Backwards Compatibility": {
    "v1.0.0 row block content should be compatible": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"template\":\"2-1\",\"noGutters\":true,\"className\":\"additional-class-1 additional-class-2\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":8} -->\n<!-- wp:paragraph -->\n<p>row 1 col 1</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeXl\":9,\"sizeLg\":8,\"sizeMd\":7,\"sizeSm\":6,\"sizeXs\":5} -->\n<!-- wp:paragraph -->\n<p>row 1 col 2</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n<!-- /wp:wp-bootstrap-blocks/row -->\n\n<!-- wp:wp-bootstrap-blocks/row {\"alignment\":\"right\",\"verticalAlignment\":\"bottom\",\"align\":\"full\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} -->\n<!-- wp:paragraph -->\n<p>row 2 col 1</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} -->\n<!-- wp:paragraph -->\n<p>row 2 col 2</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    },
    "v1.1.0 row block content should be compatible": {
      "1": "<!-- wp:wp-bootstrap-blocks/row {\"template\":\"2-1\",\"noGutters\":true,\"className\":\"additional-class-1 additional-class-2\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":8} -->\n<!-- wp:paragraph -->\n<p>row 1 col 1</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeXl\":9,\"sizeLg\":8,\"sizeMd\":7,\"sizeSm\":6,\"sizeXs\":5,\"bgColor\":\"primary\",\"padding\":\"p-5\",\"centerContent\":true} -->\n<!-- wp:paragraph -->\n<p>row 1 col 2</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n<!-- /wp:wp-bootstrap-blocks/row -->\n\n<!-- wp:wp-bootstrap-blocks/row {\"alignment\":\"right\",\"verticalAlignment\":\"bottom\",\"align\":\"full\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":4} -->\n<!-- wp:paragraph -->\n<p>row 2 col 1</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} -->\n<!-- wp:paragraph -->\n<p>row 2 col 2</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n<!-- /wp:wp-bootstrap-blocks/row -->\n\n<!-- wp:wp-bootstrap-blocks/row {\"template\":\"custom\"} -->\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} -->\n<!-- wp:paragraph -->\n<p>row 3 col 1</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n\n<!-- wp:wp-bootstrap-blocks/column {\"sizeMd\":6} -->\n<!-- wp:paragraph -->\n<p>row 3 col 2</p>\n<!-- /wp:paragraph -->\n<!-- /wp:wp-bootstrap-blocks/column -->\n<!-- /wp:wp-bootstrap-blocks/row -->"
    }
  }
}
