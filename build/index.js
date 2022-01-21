!function(){"use strict";var t,e={534:function(){var t=window.wp.hooks;(0,t.hasFilter)("wpBootstrapBlocks.container.customMarginOptions")&&console.warn("`wpBootstrapBlocks.container.customMarginOptions` filter was renamed to `wpBootstrapBlocks.container.marginAfterOptions`. Please change your filter definition."),(0,t.hasFilter)("wpBootstrapBlocks.container.useFluidContainerPerDefault")&&console.warn("`wpBootstrapBlocks.container.useFluidContainerPerDefault` filter has been removed. Please use `wp_bootstrap_blocks_container_default_attributes` filter (PHP) instead."),(0,t.hasFilter)("wpBootstrapBlocks.row.useOldObjectTemplateStructure")&&console.warn("`wpBootstrapBlocks.row.useOldObjectTemplateStructure` filter has no effect since the old template structure is not supported anymore. You can safely remove this filter.");var e=window.wp.element,o=window.wp.blocks,n=window.wp.components;o.updateCategory&&(0,o.updateCategory)("wp-bootstrap-blocks",{icon:(0,e.createElement)(n.SVG,{viewBox:"0 0 120 120",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(n.Rect,{stroke:"#979797",fill:"#6EA644",x:"-110.5",y:"-123.5",width:"340",height:"367"}),(0,e.createElement)(n.Path,{d:"M105.362393,45.9570783 C103.695123,44.8177711 101.427637,45.2868976 100.293893,46.9623494 C93.6915059,56.9480422 79.6864416,57.4841867 78.952843,57.4841867 C78.8194614,57.4841867 78.7527707,57.4841867 78.6193891,57.4841867 C61.3464764,57.4841867 54.744089,72.2951807 54.4773258,72.8983434 C53.6770365,74.7748494 54.5440166,76.9194277 56.3446678,77.7236446 C56.8115032,77.9246988 57.3450295,78.0587349 57.811865,78.0587349 C59.2123714,78.0587349 60.5461871,77.2545181 61.1464041,75.8471386 C61.2130949,75.7131024 65.7480681,65.5263554 77.418955,64.8561747 L77.418955,83.8222892 C76.9521195,87.9103916 75.0180868,91.127259 71.6168569,93.5399096 C68.0822455,96.0195783 63.3471999,97.2929217 57.5451018,97.2929217 C50.6092605,97.2929217 44.940544,94.8802711 40.7390247,90.121988 C36.4708146,85.3637048 34.3367095,78.5948795 34.3367095,69.8825301 L34.4034003,48.9728916 C34.7368542,41.2658133 36.8042685,35.1671687 40.7390247,30.810994 C45.0072347,26.0527108 50.6092605,23.6400602 57.5451018,23.6400602 C63.3471999,23.6400602 68.0822455,24.9134036 71.6168569,27.3930723 C75.1514684,29.872741 77.1521919,33.2906627 77.4856458,37.7138554 C77.4856458,37.8478916 77.4856458,38.0489458 77.4856458,38.1829819 C77.4856458,40.7296687 79.5530601,42.8072289 82.0873098,42.8072289 C84.6215595,42.8072289 86.6889738,40.7296687 86.6889738,38.1829819 C86.6889738,38.0489458 86.6889738,37.8478916 86.6889738,37.7138554 C86.022066,31.0790663 83.0209807,25.8516566 77.6190274,21.8975904 C72.217074,17.9435241 65.481305,16 57.3450295,16 C47.674866,16 39.8720445,19.2168675 33.9365648,25.5835843 C28.3345391,31.5481928 25.4001447,39.3893072 25.0666908,49.0399096 C25.0666908,49.7100904 25,50.3802711 25,51.0504518 L25.0666908,69.8825301 L25,69.8825301 C25,80.5384036 28.0010852,89.0496988 33.9365648,95.4164157 C39.8720445,101.783133 47.674866,105 57.3450295,105 C65.481305,105 72.217074,103.056476 77.6190274,99.1024096 C82.5541453,95.4834337 85.4885397,90.7251506 86.4889014,84.8275602 L86.6889738,63.7838855 C92.757835,62.309488 101.027492,58.9585843 106.229373,51.0504518 C107.563189,49.375 107.096353,47.0963855 105.362393,45.9570783 Z",stroke:"#FFFFFF",fill:"#FFFFFF"}))});var r=window.wp.i18n,l=window.wp.blockEditor,a=window.wp.editor;function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function i(t,e,o){return e&&s(t.prototype,e),o&&s(t,o),Object.defineProperty(t,"prototype",{writable:!1}),t}function p(t,e){return p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},p(t,e)}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&p(t,e)}function b(t){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},b(t)}function m(t,e){if(e&&("object"===b(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function w(t){return w=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},w(t)}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var o=0,n=new Array(e);o<e;o++)n[o]=t[o];return n}function d(t){return function(t){if(Array.isArray(t))return f(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return f(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?f(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var h=window.wp.data,v=window.wp.compose,k=function(){return"1"===wpBootstrapBlocks.isBootstrap5Active},g=function(){return"1"===wpBootstrapBlocks.isCssGridEnabled};var _=l||a,y=_.InnerBlocks,C=_.InspectorControls,E=[{label:(0,r.__)("Small","wp-bootstrap-blocks"),value:"mb-2"},{label:(0,r.__)("Medium","wp-bootstrap-blocks"),value:"mb-3"},{label:(0,r.__)("Large","wp-bootstrap-blocks"),value:"mb-5"}];E=(0,t.applyFilters)("wpBootstrapBlocks.container.marginAfterOptions",E),E=[{label:(0,r.__)("None","wp-bootstrap-blocks"),value:"mb-0"}].concat(d(E));var B=[{label:(0,r.__)("Xl","wp-bootstrap-blocks"),value:"xl"},{label:(0,r.__)("Lg","wp-bootstrap-blocks"),value:"lg"},{label:(0,r.__)("Md","wp-bootstrap-blocks"),value:"md"},{label:(0,r.__)("Sm","wp-bootstrap-blocks"),value:"sm"}];k()&&(B=[{label:(0,r.__)("Xxl","wp-bootstrap-blocks"),value:"xxl"}].concat(d(B))),B=[{label:(0,r.__)("No breakpoint selected","wp-bootstrap-blocks"),value:""}].concat(d(B));var O=function(t){u(s,t);var o,l,a=(o=s,l=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=w(o);if(l){var n=w(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return m(this,t)});function s(){return c(this,s),a.apply(this,arguments)}return i(s,[{key:"render",value:function(){var t=this.props,o=t.attributes,l=t.className,a=t.setAttributes,c=t.hasChildBlocks,s=o.isFluid,i=o.fluidBreakpoint,p=o.marginAfter;return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(C,null,(0,e.createElement)(n.PanelBody,{title:(0,r.__)("Fluid","wp-bootstrap-blocks")},(0,e.createElement)(n.CheckboxControl,{label:(0,r.__)("Fluid","wp-bootstrap-blocks"),checked:s,onChange:function(t){a({isFluid:t})}}),(0,e.createElement)(n.SelectControl,{label:(0,r.__)("Fluid Breakpoint","wp-bootstrap-blocks"),disabled:!s,value:i,options:B,onChange:function(t){a({fluidBreakpoint:t})},help:(0,r.__)("Fluid breakpoints only work with Bootstrap v4.4+. The container will be 100% wide until the specified breakpoint is reached, after which max-widths for each of the higher breakpoints will be applied.","wp-bootstrap-blocks")})),(0,e.createElement)(n.PanelBody,{title:(0,r.__)("Margin","wp-bootstrap-blocks")},(0,e.createElement)(n.SelectControl,{label:(0,r.__)("Margin After","wp-bootstrap-blocks"),value:p,options:E,onChange:function(t){a({marginAfter:t})}}))),(0,e.createElement)("div",{className:l},(0,e.createElement)(y,{renderAppender:c?void 0:function(){return(0,e.createElement)(y.ButtonBlockAppender,null)}})))}}]),s}(e.Component),x=(0,v.compose)((0,h.withSelect)((function(t,e){var o=e.clientId;return{hasChildBlocks:(0,(t("core/block-editor")||t("core/editor")).getBlockOrder)(o).length>0}})))(O),z=(0,e.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(n.Path,{d:"M16.4 4.2H7.6v1.5h8.9V4.2zM4 11.2v1.5h16v-1.5H4zm3.6 8.6h8.9v-1.5H7.6v1.5z"})),P=(0,e.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(n.Path,{d:"M4 19.8h8.9v-1.5H4v1.5zm8.9-15.6H4v1.5h8.9V4.2zm-8.9 7v1.5h16v-1.5H4z"})),S=(0,e.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(n.Path,{d:"M11.1 19.8H20v-1.5h-8.9v1.5zm0-15.6v1.5H20V4.2h-8.9zM4 12.8h16v-1.5H4v1.5z"})),V=(0,e.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(n.Path,{d:"M15 4H9v11h6V4zM4 18.5V20h16v-1.5H4z"})),M=(0,e.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(n.Path,{d:"M20 11h-5V4H9v7H4v1.5h5V20h6v-7.5h5z"})),A=(0,e.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(n.Path,{d:"M9 20h6V9H9v11zM4 4v1.5h16V4H4z"})),H=(0,e.createElement)(n.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(n.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M23.58 26.28c0-.600003.1499985-1.099998.45-1.5.3000015-.400002.7433304-.8399976 1.33-1.32.5600028-.4533356.9833319-.8699981 1.27-1.25s.43-.8433306.43-1.39c0-.5466694-.1733316-1.0566643-.52-1.53s-.986662-.71-1.92-.71c-1.1066722 0-1.8533314.2766639-2.24.83-.3866686.5533361-.58 1.1766632-.58 1.87 0 .1466674.0033333.2666662.01.36.0066667.0933338.01.1533332.01.18h-1.78c-.0133334-.0533336-.0266666-.146666-.04-.28-.0133334-.133334-.02-.2733326-.02-.42 0-.7733372.1766649-1.4666636.53-2.08.3533351-.6133364.8899964-1.0999982 1.61-1.46.7200036-.3600018 1.5999948-.54 2.64-.54 1.2133394 0 2.2033295.3233301 2.97.97s1.15 1.5099946 1.15 2.59c0 .7066702-.1033323 1.3033309-.31 1.79-.2066677.4866691-.4533319.8799985-.74 1.18-.2866681.3000015-.6566644.6233316-1.11.97-.4800024.3866686-.8333322.7166653-1.06.99-.2266678.2733347-.34.6233312-.34 1.05v.82h-1.74zm-.14 2.56h2V31h-2zM39 12c1.1046 0 2 .8954 2 2v20c0 1.1046-.8954 2-2 2H9c-1.10457 0-2-.8954-2-2V14c0-1.1046.89543-2 2-2h30zm0 22V14H9v20h30z"})),j=(0,e.createElement)(n.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(n.Path,{d:"M19 6.5H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2zm.5 9c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5v-7c0-.3.2-.5.5-.5h14c.3 0 .5.2.5.5v7zM8 13h8v-1.5H8V13z"})),F=(0,e.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(n.Path,{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM6 17.5c-.3 0-.5-.2-.5-.5V8c0-.3.2-.5.5-.5h3v10H6zm13.5-.5c0 .3-.2.5-.5.5h-3v-10h3c.3 0 .5.2.5.5v9z"})),R=(0,e.createElement)(n.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(n.Path,{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4.1 1.5v10H10v-10h4.9zM5.5 17V8c0-.3.2-.5.5-.5h2.5v10H6c-.3 0-.5-.2-.5-.5zm14 0c0 .3-.2.5-.5.5h-2.6v-10H19c.3 0 .5.2.5.5v9z"})),G=(0,e.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(n.Path,{d:"M20.2 8v11c0 .7-.6 1.2-1.2 1.2H6v1.5h13c1.5 0 2.7-1.2 2.7-2.8V8zM18 16.4V4.6c0-.9-.7-1.6-1.6-1.6H4.6C3.7 3 3 3.7 3 4.6v11.8c0 .9.7 1.6 1.6 1.6h11.8c.9 0 1.6-.7 1.6-1.6zm-13.5 0V4.6c0-.1.1-.1.1-.1h11.8c.1 0 .1.1.1.1v11.8c0 .1-.1.1-.1.1H4.6l-.1-.1z"})),L=(l||a).InnerBlocks;function N(){return N=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t},N.apply(this,arguments)}function X(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}(0,o.registerBlockType)("wp-bootstrap-blocks/container",{title:(0,r.__)("Container","wp-bootstrap-blocks"),icon:G,category:"wp-bootstrap-blocks",keywords:[(0,r.__)("Container","wp-bootstrap-blocks"),(0,r.__)("Bootstrap Container","wp-bootstrap-blocks"),(0,r.__)("Bootstrap","wp-bootstrap-blocks")],supports:{align:!1},edit:x,save:function(){return(0,e.createElement)(L.Content,null)}});var q=["label","attributeName","value","setAttributes"];var I=l||a,T=I.InnerBlocks,W=I.InspectorControls,D=I.BlockControls,Z=I.AlignmentToolbar,U=[{icon:A,title:(0,r.__)("Align content top","wp-bootstrap-blocks"),align:"top"},{icon:M,title:(0,r.__)("Align content center","wp-bootstrap-blocks"),align:"center"},{icon:V,title:(0,r.__)("Align content bottom","wp-bootstrap-blocks"),align:"bottom"}],Y=function(t){var o=t.label,r=t.attributeName,l=t.value,a=t.setAttributes,c=function(t,e){if(null==t)return{};var o,n,r=function(t,e){if(null==t)return{};var o,n,r={},l=Object.keys(t);for(n=0;n<l.length;n++)o=l[n],e.indexOf(o)>=0||(r[o]=t[o]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)o=l[n],e.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(t,o)&&(r[o]=t[o])}return r}(t,q);return(0,e.createElement)(n.RangeControl,N({label:o,value:l,onChange:function(t){a(X({},r,t))},min:0,max:12},c))},$=[{name:"primary",color:"#007bff"},{name:"secondary",color:"#6c757d"}];$=(0,t.applyFilters)("wpBootstrapBlocks.column.bgColorOptions",$);var J=[{label:(0,r.__)("None","wp-bootstrap-blocks"),value:""},{label:(0,r.__)("Small","wp-bootstrap-blocks"),value:"p-2"},{label:(0,r.__)("Medium","wp-bootstrap-blocks"),value:"p-3"},{label:(0,r.__)("Large","wp-bootstrap-blocks"),value:"p-5"}];J=(0,t.applyFilters)("wpBootstrapBlocks.column.paddingOptions",J);var K=function(t){u(s,t);var o,l,a=(o=s,l=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=w(o);if(l){var n=w(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return m(this,t)});function s(){return c(this,s),a.apply(this,arguments)}return i(s,[{key:"render",value:function(){var t=this.props,o=t.attributes,l=t.className,a=t.setAttributes,c=t.hasChildBlocks,s=o.sizeXxl,i=o.sizeXl,p=o.sizeLg,u=o.sizeMd,b=o.sizeSm,m=o.sizeXs,w=o.equalWidthXxl,f=o.equalWidthXl,d=o.equalWidthLg,h=o.equalWidthMd,v=o.equalWidthSm,_=o.equalWidthXs,y=o.bgColor,C=o.padding,E=o.centerContent,B=o.contentVerticalAlignment;return E&&a({contentVerticalAlignment:"center",centerContent:!1}),(0,e.createElement)(e.Fragment,null,(0,e.createElement)(W,null,(0,e.createElement)(n.PanelBody,{title:(0,r.__)("Column size","wp-bootstrap-blocks"),initialOpen:!1},(0,e.createElement)(Y,{label:(0,r.__)("Xs Column count","wp-bootstrap-blocks"),attributeName:"sizeXs",value:m,disabled:_,setAttributes:a}),!g()&&(0,e.createElement)(n.CheckboxControl,{label:(0,r.__)("Xs equal-width","wp-bootstrap-blocks"),checked:_,onChange:function(t){return a({equalWidthXs:t})}}),(0,e.createElement)("hr",null),(0,e.createElement)(Y,{label:(0,r.__)("Sm Column count","wp-bootstrap-blocks"),attributeName:"sizeSm",value:b,disabled:v,setAttributes:a}),!g()&&(0,e.createElement)(n.CheckboxControl,{label:(0,r.__)("Sm equal-width","wp-bootstrap-blocks"),checked:v,onChange:function(t){return a({equalWidthSm:t})}}),(0,e.createElement)("hr",null),(0,e.createElement)(Y,{label:(0,r.__)("Md Column count","wp-bootstrap-blocks"),attributeName:"sizeMd",value:u,disabled:h,setAttributes:a}),!g()&&(0,e.createElement)(n.CheckboxControl,{label:(0,r.__)("Md equal-width","wp-bootstrap-blocks"),checked:h,onChange:function(t){return a({equalWidthMd:t})}}),(0,e.createElement)("hr",null),(0,e.createElement)(Y,{label:(0,r.__)("Lg Column count","wp-bootstrap-blocks"),attributeName:"sizeLg",value:p,disabled:d,setAttributes:a}),!g()&&(0,e.createElement)(n.CheckboxControl,{label:(0,r.__)("Lg equal-width","wp-bootstrap-blocks"),checked:d,onChange:function(t){return a({equalWidthLg:t})}}),(0,e.createElement)("hr",null),(0,e.createElement)(Y,{label:(0,r.__)("Xl Column count","wp-bootstrap-blocks"),attributeName:"sizeXl",value:i,disabled:f,setAttributes:a}),!g()&&(0,e.createElement)(n.CheckboxControl,{label:(0,r.__)("Xl equal-width","wp-bootstrap-blocks"),checked:f,onChange:function(t){return a({equalWidthXl:t})}}),k()&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)("hr",null),(0,e.createElement)(Y,{label:(0,r.__)("Xxl Column count","wp-bootstrap-blocks"),attributeName:"sizeXxl",value:s,disabled:w,setAttributes:a}),!g()&&(0,e.createElement)(n.CheckboxControl,{label:(0,r.__)("Xxl equal-width","wp-bootstrap-blocks"),checked:w,onChange:function(t){return a({equalWidthXxl:t})}}))),(0,e.createElement)(n.PanelBody,{title:(0,r.__)("Background color","wp-bootstrap-blocks"),initialOpen:!1},(0,e.createElement)(n.ColorPalette,{colors:$,value:y,onChange:function(t){if(t){var e=$.find((function(e){return e.color===t}));e&&a({bgColor:e.name})}else a({bgColor:"",centerContent:!1})},disableCustomColors:!0})),(0,e.createElement)(n.PanelBody,{title:(0,r.__)("Padding (inside column)","wp-bootstrap-blocks"),initialOpen:!1},(0,e.createElement)(n.SelectControl,{label:(0,r.__)("Size","wp-bootstrap-blocks"),value:C,options:J,onChange:function(t){a({padding:t})}}))),(0,e.createElement)(D,null,(0,e.createElement)(Z,{value:B,label:(0,r.__)("Change vertical alignment of content","wp-bootstrap-blocks"),onChange:function(t){return a({contentVerticalAlignment:t})},alignmentControls:U})),(0,e.createElement)("div",{className:l},(0,e.createElement)(T,{templateLock:!1,renderAppender:c?void 0:function(){return(0,e.createElement)(T.ButtonBlockAppender,null)}})))}}]),s}(e.Component),Q=(0,v.compose)((0,h.withSelect)((function(t,e){var o=e.clientId;return{hasChildBlocks:(0,(t("core/block-editor")||t("core/editor")).getBlockOrder)(o).length>0}})))(K),tt=(l||a).InnerBlocks;function et(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}(0,o.registerBlockType)("wp-bootstrap-blocks/column",{title:(0,r.__)("Column","wp-bootstrap-blocks"),icon:F,category:"wp-bootstrap-blocks",keywords:[(0,r.__)("Column","wp-bootstrap-blocks"),(0,r.__)("Bootstrap Column","wp-bootstrap-blocks"),(0,r.__)("Bootstrap","wp-bootstrap-blocks")],parent:["wp-bootstrap-blocks/row"],getEditWrapperProps:function(t){var e=t.sizeXxl,o=t.sizeXl,n=t.sizeLg,r=t.sizeMd,l=t.sizeSm,a=t.sizeXs,c=t.equalWidthXxl,s=t.equalWidthXl,i=t.equalWidthLg,p=t.equalWidthMd,u=t.equalWidthSm,b=t.equalWidthXs,m=t.bgColor,w=t.padding,f=t.contentVerticalAlignment,d={};if(m){var h=$.find((function(t){return t.name===m}));h&&(d={backgroundColor:h.color})}return{"data-size-xs":c||s||i||p||u||b?0:a,"data-size-sm":c||s||i||p||u?0:l,"data-size-md":c||s||i||p?0:r,"data-size-lg":c||s||i?0:n,"data-size-xl":c||s?0:o,"data-size-xxl":c?0:e,"data-bg-color":m,"data-padding":w,"data-content-vertical-alignment":f,style:d}},edit:Q,save:function(){return(0,e.createElement)(tt.Content,null)}});var ot=l||a,nt=ot.InnerBlocks,rt=ot.InspectorControls,lt=ot.BlockControls,at=ot.AlignmentToolbar,ct="custom",st=["wp-bootstrap-blocks/column"],it=[{name:"1-1",title:(0,r.__)("2 Columns (1:1)","wp-bootstrap-blocks"),icon:(0,e.createElement)(n.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(n.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z"})),templateLock:"all",template:[["wp-bootstrap-blocks/column",{sizeMd:6}],["wp-bootstrap-blocks/column",{sizeMd:6}]]},{name:"1-2",title:(0,r.__)("2 Columns (1:2)","wp-bootstrap-blocks"),icon:(0,e.createElement)(n.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(n.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z"})),templateLock:"all",template:[["wp-bootstrap-blocks/column",{sizeMd:4}],["wp-bootstrap-blocks/column",{sizeMd:8}]]},{name:"2-1",title:(0,r.__)("2 Columns (2:1)","wp-bootstrap-blocks"),icon:(0,e.createElement)(n.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(n.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z"})),templateLock:"all",template:[["wp-bootstrap-blocks/column",{sizeMd:8}],["wp-bootstrap-blocks/column",{sizeMd:4}]]},{name:"1-1-1",title:(0,r.__)("3 Columns (1:1:1)","wp-bootstrap-blocks"),icon:(0,e.createElement)(n.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(n.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z"})),templateLock:"all",template:[["wp-bootstrap-blocks/column",{sizeMd:4}],["wp-bootstrap-blocks/column",{sizeMd:4}],["wp-bootstrap-blocks/column",{sizeMd:4}]]}];it=function(t){return t.map((function(t){return function(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?et(Object(o),!0).forEach((function(e){X(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):et(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}({icon:H},t)}))}(it=(0,t.applyFilters)("wpBootstrapBlocks.row.templates",it));var pt=(0,t.applyFilters)("wpBootstrapBlocks.row.enableCustomTemplate",!0);pt&&it.push({name:ct,title:(0,r.__)("Custom","wp-bootstrap-blocks"),icon:H,templateLock:!1,template:[["wp-bootstrap-blocks/column"]]});var ut=[{label:(0,r.__)("None","wp-bootstrap-blocks"),value:"gx-0"},{label:(0,r.__)("Small","wp-bootstrap-blocks"),value:"gx-3"},{label:(0,r.__)("Large","wp-bootstrap-blocks"),value:"gx-5"}];ut=(0,t.applyFilters)("wpBootstrapBlocks.row.horizontalGuttersOptions",ut),ut=[{label:(0,r.__)("Bootstrap Default","wp-bootstrap-blocks"),value:""}].concat(d(ut));var bt=[{label:(0,r.__)("Small","wp-bootstrap-blocks"),value:"gy-3"},{label:(0,r.__)("Large","wp-bootstrap-blocks"),value:"gy-5"}];bt=(0,t.applyFilters)("wpBootstrapBlocks.row.verticalGuttersOptions",bt),bt=[{label:(0,r.__)("Bootstrap Default (None)","wp-bootstrap-blocks"),value:""}].concat(d(bt));var mt=[{label:(0,r.__)("Small","wp-bootstrap-blocks"),value:"1rem"},{label:(0,r.__)("Large","wp-bootstrap-blocks"),value:"2rem"}];mt=(0,t.applyFilters)("wpBootstrapBlocks.row.cssGridGuttersOptions",mt),mt=[{label:(0,r.__)("Bootstrap Default (None)","wp-bootstrap-blocks"),value:""}].concat(d(mt));var wt=function(t){var e=it.find((function(e){return e.name===t}));return!!e&&e.templateLock},ft=function(t){u(s,t);var o,l,a=(o=s,l=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=w(o);if(l){var n=w(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return m(this,t)});function s(){return c(this,s),a.apply(this,arguments)}return i(s,[{key:"render",value:function(){var t,o,l=this.props,a=l.className,c=l.attributes,s=l.setAttributes,i=l.columns,p=l.updateBlockAttributes,u=c.template,b=c.noGutters,m=c.alignment,w=c.verticalAlignment,f=c.editorStackColumns,d=c.horizontalGutters,h=c.verticalGutters,v=c.cssGridGutters,_=[{icon:P,title:(0,r.__)("Align columns left","wp-bootstrap-blocks"),align:"left"},{icon:z,title:(0,r.__)("Align columns center","wp-bootstrap-blocks"),align:"center"},{icon:S,title:(0,r.__)("Align columns right","wp-bootstrap-blocks"),align:"right"}],y=[{icon:A,title:(0,r.__)("Align columns top","wp-bootstrap-blocks"),align:"top"},{icon:M,title:(0,r.__)("Align columns center","wp-bootstrap-blocks"),align:"center"},{icon:V,title:(0,r.__)("Align columns bottom","wp-bootstrap-blocks"),align:"bottom"}];return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(rt,null,(0,e.createElement)(n.PanelBody,null,(0,e.createElement)(n.CheckboxControl,{label:(0,r.__)("Editor: Display columns stacked","wp-bootstrap-blocks"),description:(0,r.__)("Displays stacked columns in editor to enhance readability of block content. This option is only used in the editor and won't affect the output of the row.","wp-bootstrap-blocks"),checked:f,onChange:function(t){return s({editorStackColumns:t})}})),(0,e.createElement)(n.PanelBody,{title:(0,r.__)("Change layout","wp-bootstrap-blocks")},(0,e.createElement)("ul",{className:"wp-bootstrap-blocks-template-selector-list"},it.map((function(t,o){return(0,e.createElement)("li",{className:"wp-bootstrap-blocks-template-selector-button",key:o},(0,e.createElement)(n.IconButton,{label:t.title,icon:t.icon,onClick:function(){!function(t){var e=it.find((function(e){return e.name===t}));e&&(i.forEach((function(t,o){if(e.template.length>o){var n=e.template[o][1];p(t.clientId,n)}})),s({template:t}))}(t.name)},className:u===t.name?"is-active":null},(0,e.createElement)("div",{className:"wp-bootstrap-blocks-template-selector-button-label"},t.title)))})))),(0,e.createElement)(n.PanelBody,{title:(0,r.__)("Row options","wp-bootstrap-blocks")},(0,e.createElement)(n.CheckboxControl,{label:(0,r.__)("No Gutters","wp-bootstrap-blocks"),checked:b,onChange:function(t){return s({noGutters:t})}}),!b&&(g()?(0,e.createElement)(n.SelectControl,{label:(0,r.__)("Gutters","wp-bootstrap-blocks"),value:v,options:mt,onChange:function(t){s({cssGridGutters:t})}}):k()&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(n.SelectControl,{label:(0,r.__)("Horizontal Gutters","wp-bootstrap-blocks"),value:d,options:ut,onChange:function(t){s({horizontalGutters:t})}}),(0,e.createElement)(n.SelectControl,{label:(0,r.__)("Vertical Gutters","wp-bootstrap-blocks"),value:h,options:bt,onChange:function(t){s({verticalGutters:t})}}))))),(0,e.createElement)(lt,null,!g()&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(at,{value:m,label:(0,r.__)("Change horizontal alignment of columns","wp-bootstrap-blocks"),onChange:function(t){return s({alignment:t})},alignmentControls:_}),(0,e.createElement)(at,{value:w,label:(0,r.__)("Change vertical alignment of columns","wp-bootstrap-blocks"),onChange:function(t){return s({verticalAlignment:t})},alignmentControls:y}))),(0,e.createElement)("div",{className:a},(0,e.createElement)(nt,{allowedBlocks:st,template:(t=u,o=it.find((function(e){return e.name===t})),o?o.template:[]),templateLock:wt(u),orientation:"horizontal"})))}}]),s}(e.Component),dt=(0,h.withSelect)((function(t,e){var o=e.clientId,n=(t("core/block-editor")||t("core/editor")).getBlocksByClientId;return{columns:n(o)[0]?n(o)[0].innerBlocks:[]}})),ht=(0,h.withDispatch)((function(t){return{updateBlockAttributes:(t("core/block-editor")||t("core/editor")).updateBlockAttributes}})),vt=(0,v.compose)(dt,ht)(ft);function kt(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function gt(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?kt(Object(o),!0).forEach((function(e){X(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):kt(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var _t=pt&&o.createBlocksFromInnerBlocksTemplate?{from:[{type:"block",isMultiBlock:!0,blocks:["*"],__experimentalConvert:function(t){var e=Math.max(Math.round(12/t.length),3),n=t.map((function(t){var o=t.name,n=t.attributes,r=t.innerBlocks;return["wp-bootstrap-blocks/column",{sizeMd:e},[[o,gt({},n),r]]]}));return(0,o.createBlock)("wp-bootstrap-blocks/row",{template:ct},(0,o.createBlocksFromInnerBlocksTemplate)(n))}}]}:{},yt=_t,Ct=(l||a).InnerBlocks;(0,o.registerBlockType)("wp-bootstrap-blocks/row",{title:(0,r.__)("Row","wp-bootstrap-blocks"),icon:R,category:"wp-bootstrap-blocks",keywords:[(0,r.__)("Row","wp-bootstrap-blocks"),(0,r.__)("Bootstrap Row","wp-bootstrap-blocks"),(0,r.__)("Bootstrap","wp-bootstrap-blocks")],supports:{align:["full"]},transforms:yt,getEditWrapperProps:function(t){return{"data-alignment":t.alignment,"data-vertical-alignment":t.verticalAlignment,"data-editor-stack-columns":t.editorStackColumns}},edit:vt,save:function(){return(0,e.createElement)(Ct.Content,null)}});var Et=l||a,Bt=Et.RichText,Ot=Et.URLInput,xt=Et.InspectorControls,zt=Et.BlockControls,Pt=Et.AlignmentToolbar,St="noreferrer noopener",Vt=function(o){u(p,o);var l,a,s=(l=p,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=w(l);if(a){var o=w(this).constructor;t=Reflect.construct(e,arguments,o)}else t=e.apply(this,arguments);return m(this,t)});function p(){return c(this,p),s.apply(this,arguments)}return i(p,[{key:"render",value:function(){var o=this.props,l=o.attributes,a=o.className,c=o.setAttributes,s=o.isSelected,i=l.url,p=l.linkTarget,u=l.rel,b=l.text,m=l.style,w=l.alignment,f=[{label:(0,r.__)("Primary","wp-bootstrap-blocks"),value:"primary"},{label:(0,r.__)("Secondary","wp-bootstrap-blocks"),value:"secondary"}];return f=(0,t.applyFilters)("wpBootstrapBlocks.button.styleOptions",f),(0,e.createElement)(e.Fragment,null,(0,e.createElement)("div",{className:a,"data-alignment":w},(0,e.createElement)(Bt,{placeholder:(0,r.__)("Add text...","wp-bootstrap-blocks"),value:b,onChange:function(t){return c({text:t})},formattingControls:[],keepPlaceholderOnFocus:!0}),(0,e.createElement)(xt,null,(0,e.createElement)(n.PanelBody,null,(0,e.createElement)(n.SelectControl,{label:(0,r.__)("Style","wp-bootstrap-blocks"),value:m,options:f,onChange:function(t){c({style:t})}})),(0,e.createElement)(n.PanelBody,{title:(0,r.__)("Link settings","wp-bootstrap-blocks")},(0,e.createElement)(n.ToggleControl,{label:(0,r.__)("Open in new tab","wp-bootstrap-blocks"),onChange:function(t){var e=t?"_blank":void 0,o=u;e&&!u?o=St:e||u!==St||(o=void 0),c({linkTarget:e,rel:o})},checked:"_blank"===p}),(0,e.createElement)(n.TextControl,{label:(0,r.__)("Link rel","wp-bootstrap-blocks"),value:u||"",onChange:function(t){c({rel:t})}}))),(0,e.createElement)(zt,null,(0,e.createElement)(Pt,{value:w,label:(0,r.__)("Change button alignment","wp-bootstrap-blocks"),onChange:function(t){return c({alignment:t})}}))),s&&(0,e.createElement)("form",{className:"wp-block-wp-bootstrap-blocks-button-link",onSubmit:function(t){return t.preventDefault()}},(0,e.createElement)(n.Dashicon,{icon:"admin-links"}),(0,e.createElement)(Ot,{value:i,onChange:function(t){return c({url:t})}}),(0,e.createElement)(n.IconButton,{icon:"editor-break",label:(0,r.__)("Apply","wp-bootstrap-blocks"),type:"submit"})))}}]),p}(e.Component),Mt=Vt;(0,o.registerBlockType)("wp-bootstrap-blocks/button",{title:(0,r.__)("Button","wp-bootstrap-blocks"),icon:j,category:"wp-bootstrap-blocks",keywords:[(0,r.__)("Button","wp-bootstrap-blocks"),(0,r.__)("Bootstrap Button","wp-bootstrap-blocks"),(0,r.__)("Bootstrap","wp-bootstrap-blocks")],example:{},getEditWrapperProps:function(t){return{"data-alignment":t.alignment}},edit:Mt,save:function(){return null}})}},o={};function n(t){var r=o[t];if(void 0!==r)return r.exports;var l=o[t]={exports:{}};return e[t](l,l.exports,n),l.exports}n.m=e,t=[],n.O=function(e,o,r,l){if(!o){var a=1/0;for(p=0;p<t.length;p++){o=t[p][0],r=t[p][1],l=t[p][2];for(var c=!0,s=0;s<o.length;s++)(!1&l||a>=l)&&Object.keys(n.O).every((function(t){return n.O[t](o[s])}))?o.splice(s--,1):(c=!1,l<a&&(a=l));if(c){t.splice(p--,1);var i=r();void 0!==i&&(e=i)}}return e}l=l||0;for(var p=t.length;p>0&&t[p-1][2]>l;p--)t[p]=t[p-1];t[p]=[o,r,l]},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t={826:0,46:0};n.O.j=function(e){return 0===t[e]};var e=function(e,o){var r,l,a=o[0],c=o[1],s=o[2],i=0;if(a.some((function(e){return 0!==t[e]}))){for(r in c)n.o(c,r)&&(n.m[r]=c[r]);if(s)var p=s(n)}for(e&&e(o);i<a.length;i++)l=a[i],n.o(t,l)&&t[l]&&t[l][0](),t[l]=0;return n.O(p)},o=self.webpackChunkwp_bootstrap_blocks=self.webpackChunkwp_bootstrap_blocks||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var r=n.O(void 0,[46],(function(){return n(534)}));r=n.O(r)}();