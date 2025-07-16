# Food Subscription App - Step by Step Development Plan

## 1. User Application (Mobile/PWA)

### 1.1. User Registration & Login

- [ ] Registration screen: Name, surname, phone, email, password (unique validation)
- [ ] Send and verify 4-digit code via SMS
- [ ] Login screen: Login with phone/email + password
- [ ] Forgot password: Password reset flow
- [ ] Skip registration/login option
- [ ] Require login to make a subscription

### 1.2. Price Calculator

- [ ] Dynamically update price as subscription details change
- [ ] Show total price, meal price, discounts, and discounted price

### 1.3. Subscription Selection

- [ ] Select lunch/dinner/2 meals per day
- [ ] Weekly (5 or 6 days) or monthly (5 or 6 days) options
- [ ] Select multiple people (2-20)
- [ ] Dynamically update price based on number of people
- [ ] Show price per meal for each subscription

### 1.4. Cart

- [ ] Display all details of selected subscription
- [ ] Show subscription start date (weekly: next Monday, monthly: next 1st, at least 3 days ahead)
- [ ] Show restaurant branch address
- [ ] Allow changing number of people, remove if set to zero
- [ ] Price updates instantly as amount changes
- [ ] Require login and show confirmation popup before confirming cart
- [ ] Show success screen and notify admin after confirmation

### 1.5. Menu

- [ ] Show meal menu for next month
- [ ] Allow downloading menu as PDF
- [ ] Show possible subscription start date and rules

### 1.6. Profile

- [ ] Allow updating personal details (name, surname, email, password, phone)
- [ ] Require SMS confirmation for phone number change
- [ ] Show current subscription status, start date, and cost
- [ ] Show restaurant branch contact info
- [ ] Sign out

### 1.7. Additional Features (MVP2)

- [ ] Half subscription (3 days)
- [ ] Branch address selection and map integration
- [ ] Change branch address in cart
- [ ] Payment flow, confirmation, and retry on failure
- [ ] Show dish titles, descriptions, and ingredients in menu
- [ ] Meal skip limit and remaining skips display
- [ ] Subscription cancellation and payment history
- [ ] Support and feedback (WhatsApp link)

## 2. Admin Dashboard

### 2.1. Admin Login

- [ ] Login with username and password
- [ ] Enforce strong password policy and session timeout

### 2.2. Orders

- [ ] Show total meal packages for today, tomorrow, and the day after
- [ ] Show lunch, dinner, and 2-meal packages separately

### 2.3. Prices & Discounts

- [ ] Update price per meal
- [ ] Show discounted prices for all subscriptions
- [ ] Add, delete, and configure discounts (by duration, type, number of people)

### 2.4. Menu Management

- [ ] View and upload monthly menu as PDF
- [ ] Update menu, add/edit/delete dishes
- [ ] Each dish: name, description, ingredients, day, and category

### 2.5. Customer Management

- [ ] Show total customers filtered by weekly/monthly
- [ ] Customer table: full name, phone, email, subscription type
- [ ] Export table as CSV
- [ ] Search and filter customers

### 2.6. Stock Management (MVP2)

- [ ] Track current and needed portions in kitchen
- [ ] Track stock by product

### 2.7. Feedback & Analytics (MVP2)

- [ ] User feedback and daily meal ratings
- [ ] Revenue reports (daily, weekly, monthly, yearly)
- [ ] Show number of active subscriptions
- [ ] Export reports as CSV/Excel

### 2.8. Admin Profile & Authorization

- [ ] Update admin profile details
- [ ] View, add, edit, deactivate other admins
- [ ] Role-based access control (RBAC)
- [ ] Log all admin actions

## 3. Shared & Technical Requirements

### 3.1. Performance

- [ ] Home screen loads within 2 seconds
- [ ] Price calculator updates within 500 ms
- [ ] Cart updates render within 1 second

### 3.2. Security

- [ ] All data transmission encrypted with TLS 1.2+
- [ ] Passwords stored with bcrypt or equivalent
- [ ] Limit failed login attempts per user/IP
- [ ] GDPR and local data protection compliance

### 3.3. Usability & Accessibility

- [ ] Reach cart within 3 clicks/taps
- [ ] Responsive and accessible design
- [ ] All text readable and accessible

### 3.4. Compatibility & Scalability

- [ ] PWA compatible with Chrome, Safari, Firefox
- [ ] Support portrait and landscape modes
- [ ] Support 1000+ concurrent users
- [ ] Backend horizontally scalable

### 3.5. Maintainability & Logging

- [ ] Modular, industry-standard codebase
- [ ] Maintain and monitor system logs
- [ ] Log all admin actions
