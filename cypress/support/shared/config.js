const WP_ADMIN_USER = {
	username: 'admin',
	password: 'password',
};

const WP_USERNAME = Cypress.env('WP_USERNAME') || WP_ADMIN_USER.username;
const WP_PASSWORD = Cypress.env('WP_PASSWORD') || WP_ADMIN_USER.password;
const WP_BASE_URL = Cypress.env('WP_BASE_URL') || 'http://localhost:8889';

export {
	WP_ADMIN_USER,
	WP_USERNAME,
	WP_PASSWORD,
	WP_BASE_URL,
};
