// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import 'cypress-xpath'
import { register } from '@cypress/snapshot'

import './commands/login-user'
import './commands/visit-admin-page'
import './commands/close-welcome-guide'
import './commands/click-button'
import './commands/click-element-by-text'
import './commands/click-block-toolbar-button'
import './commands/open-sidebar-panel'
import './commands/create-new-post'
import './commands/open-global-block-inserter'
import './commands/search-for-block'
import './commands/insert-block'
import './commands/post-content-matches-snapshot'
import './commands/select-block-by-name'
import './commands/ensure-sidebar-opened'
import './commands/set-post-content'
import './commands/toolbar-option-is-active'
import './commands/open-sidebar-panel-with-title'
import './commands/get-input-by-label'
import './commands/get-checkbox-by-label'
import './commands/activate-plugin'
import './commands/deactivate-plugin'
import './commands/get-select-by-label'
import './commands/select-option-is-available'
import './commands/get-text-control-by-label'
import './commands/set-text-control-value-by-label'
import './commands/get-toggle-by-label'

import './project-commands/insert-row-block'
import './project-commands/select-row-block'
import './project-commands/row-template-is-selected'
import './project-commands/select-column-block'
import './project-commands/insert-button-block'
import './project-commands/select-button-block'
import './project-commands/insert-container-block'
import './project-commands/select-container-block'

register();
