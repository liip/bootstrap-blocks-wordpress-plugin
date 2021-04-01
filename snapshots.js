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
    }
  },
  "__version": "6.8.0"
}
