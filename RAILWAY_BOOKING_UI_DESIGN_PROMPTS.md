# Railway Booking Platform UI Design Prompt Pack

**Date:** 2026-08-06

## Purpose

Step-by-step UI design prompts for the complete railway booking web interface. Use these prompts sequentially with Figma AI, Canva, Claude, Codex, or another UI generation/design tool.

---

# 1. Global Design Direction

## PROMPT 01: Design System and Product Foundation

```text
Design a modern, production-grade railway booking web application for Nigeria.

The product is a digital railway ticketing and journey booking platform. Users should be able to search for train journeys, view schedules and fares, select seats, enter passenger information, pay securely, receive a PNR, manage bookings, cancel bookings, and receive notifications.

The interface should feel trustworthy, efficient, modern and transportation-focused. Do not make it look like a generic SaaS dashboard.

Design philosophy:
- Clear information hierarchy
- Fast task completion
- Minimal cognitive load
- Strong trust signals
- Excellent mobile responsiveness
- Accessibility-conscious
- High-density information where appropriate
- Spacious layouts for major booking actions
- Strong visual distinction between available, held, confirmed, RAC and waitlisted inventory
- Clear financial information
- Clear booking status
- Avoid unnecessary decorative elements

Currency:
- NGN / ₦

Primary users:
- Individual passengers
- Families/groups
- Frequent travellers
- Business travellers

Create a complete design system including:
1. Color palette
2. Typography system
3. Font hierarchy
4. Spacing scale
5. Grid system
6. Border radius
7. Shadows
8. Buttons
9. Inputs
10. Select controls
11. Date picker
12. Time picker
13. Dropdowns
14. Tabs
15. Cards
16. Tables
17. Badges
18. Status indicators
19. Alerts
20. Toast notifications
21. Modals
22. Drawers
23. Tooltips
24. Progress indicators
25. Skeleton loaders
26. Empty states
27. Error states
28. Confirmation states
29. Seat map components
30. Journey cards
31. Passenger cards
32. Payment summary components

Use a restrained professional visual language.

The design must support both desktop and mobile.

Do not invent unnecessary features outside the railway booking domain.

Create reusable components rather than designing every screen independently.
```

---

# 2. Public Website

## PROMPT 02: Homepage

```text
Using the established railway booking design system, design the public homepage.

The primary objective is to get a passenger from landing on the website to searching for a journey as quickly as possible.

Create:
1. Header
   - Logo
   - Book Ticket
   - My Bookings
   - Train Information
   - Help
   - Login
   - Sign Up

2. Hero section
   - Strong railway travel headline
   - Short supporting statement
   - Origin station
   - Destination station
   - Departure date
   - Return date optional
   - Passenger count
   - Search Trains button

3. Quick actions
   - Search trains
   - Manage booking
   - Check PNR
   - Download ticket

4. Popular routes
5. Travel information section
6. Why book online section
   - Secure payment
   - Real-time availability
   - Digital ticket
   - Easy cancellation
7. FAQ preview
8. Footer

The search widget must be the dominant element of the page.

Design desktop and mobile versions.
```

---

# 3. Authentication

## PROMPT 03: Registration

```text
Design the passenger registration experience.

Create:
1. Registration page
2. Full name
3. Email
4. Phone number
5. Password
6. Confirm password
7. Terms and conditions
8. Create account button
9. Login link

Include:
- Field validation
- Password strength indicator
- Loading state
- Error state
- Success state
- Existing account state

Keep the registration process simple and trustworthy.
```

## PROMPT 04: Login and Account Recovery

```text
Design the authentication flows.

Create screens for:
1. Login
2. Forgot password
3. Reset password
4. Email/phone verification
5. Account verification success
6. Session expired
7. Account temporarily locked

Include appropriate validation and error states.

The UI should clearly communicate why an action failed and what the user should do next.
```

---

# 4. Train Search

## PROMPT 05: Search Results

```text
Design the train search results experience.

The user has entered:
Origin
Destination
Travel date
Passenger count

Create:
1. Search summary bar
2. Date navigation
3. Filter controls
4. Sort controls
5. Train journey cards

Each journey card should display:
- Train name/number
- Departure station
- Departure time
- Arrival station
- Arrival time
- Journey duration
- Number of stops
- Available classes
- Fare
- Availability
- Booking button

Availability must visually distinguish:
- Available
- Limited availability
- RAC
- Waitlist
- Sold out

Include:
- Loading skeleton
- No results
- Search error
- Network error
- Changed availability state

The interface should allow the user to quickly compare journeys.
```

## PROMPT 06: Journey Details

```text
Design the journey details page.

Display:
- Train information
- Origin
- Destination
- Departure time
- Arrival time
- Journey duration
- Intermediate stations
- Stop durations
- Available classes
- Fare
- Availability

Include a visual journey timeline.

Provide a clear "Select seats" or "Continue" action.

On mobile, make the fare and primary action sticky at the bottom.
```

---

# 5. Seat Selection

## PROMPT 07: Coach and Seat Selection

```text
Design the railway seat selection experience.

The user has selected a train journey and must select seats.

Create:
1. Coach selector
2. Coach information
3. Visual seat map
4. Seat legend
5. Selected seat state
6. Available seat state
7. Occupied seat state
8. Held seat state
9. Unavailable seat state
10. RAC state
11. Waitlist state

The seat map should visually resemble a realistic railway coach layout rather than a generic cinema seat map.

Allow the user to:
- Select preferred seats
- See seat number
- See seat type
- Change coach
- View selected seats

If preferred seats become unavailable, show:

"Your selected seat is no longer available. Choose another seat or allow the system to select the best available seat."

Provide:
- Use best available seat
- Continue
- Back

Include seat-hold countdown.

The seat hold timer must be prominent but not alarming.
```

---

# 6. Passenger Information

## PROMPT 08: Passenger Details

```text
Design the passenger information page.

Create a clear multi-passenger form.

For every passenger capture:
- Full name
- Age
- Gender
- Document type
- Document reference where required

Include:
- Passenger counter
- Passenger cards
- Add passenger
- Remove passenger
- Validation
- Save passenger information
- Continue to payment

Show selected journey and seats in a compact summary panel.

On mobile, convert the summary into a collapsible section.
```

---

# 7. Booking Review

## PROMPT 09: Booking Review

```text
Design the booking review page before payment.

Display:
1. Journey
2. Passenger information
3. Coach
4. Seat assignments
5. Fare
6. Taxes/fees where applicable
7. Discounts if applicable
8. Total amount

Create a clear price breakdown.

Include:
- Edit journey
- Edit seats
- Edit passenger details
- Cancellation policy
- Terms acceptance
- Continue to payment

The total payable amount must be visually prominent.

The user should understand exactly what they are paying before proceeding.
```

---

# 8. Payment

## PROMPT 10: Payment Page

```text
Design the payment experience using Paystack.

Create:
1. Order summary
2. Amount payable
3. Payment initiation state
4. Redirect/loading state
5. Payment processing state
6. Payment success
7. Payment failed
8. Payment pending
9. Payment timeout
10. Payment retry

Clearly communicate:

"Do not close this page while your payment is being processed."

After successful payment, transition the user to booking confirmation.

Never imply that payment is successful merely because the browser returned from the payment provider. The final booking confirmation must come from verified payment processing.
```

---

# 9. Booking Confirmation

## PROMPT 11: Booking Confirmation

```text
Design the booking confirmation page.

This is one of the most important screens in the product.

Display prominently:
- Success indicator
- PNR
- Booking reference
- Passenger name(s)
- Train
- Origin
- Destination
- Travel date
- Departure time
- Coach
- Seat
- Fare
- Booking status

Actions:
- Download ticket
- Print ticket
- Email ticket
- Add to calendar
- View booking
- Book another journey

Include a digital ticket/card that can later be rendered as a downloadable PDF.

Make the PNR extremely easy to find.
```

---

# 10. RAC and Waitlist

## PROMPT 12: RAC Experience

```text
Design the RAC booking experience.

When confirmed seating is unavailable but RAC allocation is available, clearly communicate:
"RAC"

Display:
- RAC position
- Train
- Journey
- Date
- Passenger
- Current status
- What RAC means
- What happens if a confirmed seat becomes available

Include:
- Booking summary
- Payment information
- PNR
- Notification preferences

Use clear status progression.

Avoid making RAC look like a failed booking.
```

## PROMPT 13: Waitlist Experience

```text
Design the waitlist booking experience.

Display:
- Waitlist position
- Current queue position
- Journey
- Passenger
- PNR
- Booking status
- Probability/status messaging only if backed by actual system data

Explain:
- What waitlist means
- How promotion works
- What happens when a seat becomes available
- Cancellation/refund rules

Create states for:
1. Waiting
2. Promoted to RAC
3. Promoted to confirmed
4. Cancelled
5. Expired

Use clear visual status progression.
```

---

# 11. Tatkal / High-Demand Booking

## PROMPT 14: Virtual Waiting Room

```text
Design a high-demand railway booking waiting room.

This page is displayed when a large number of users are trying to access a limited booking window.

Create:
1. Queue status
2. Current position
3. Estimated waiting time
4. Progress indicator
5. Booking window information
6. User session status
7. Rules and instructions
8. Automatic refresh state

The design must communicate fairness and FIFO processing.

Do not encourage users to refresh repeatedly.

Display:
"Your place in the queue is being protected."

Include anti-abuse messaging without exposing security implementation details.

Create states:
- Joining queue
- Waiting
- Approaching admission
- Admitted
- Session expired
- Queue closed
- Service temporarily unavailable
```

## PROMPT 15: Queue Admission

```text
Design the transition from the virtual waiting room into the booking system.

Create:
1. Admission success
2. Countdown to booking access
3. Session validity
4. Continue to booking

The user should understand that their queue position has been converted into temporary booking access.

Include a clear warning that the admission token is temporary and should not be shared.
```

---

# 12. Manage Booking

## PROMPT 16: My Bookings

```text
Design the authenticated "My Bookings" section.

Create:
1. Upcoming trips
2. Past trips
3. Cancelled bookings
4. RAC bookings
5. Waitlisted bookings

Each booking card should show:
- PNR
- Train
- Route
- Date
- Time
- Seat/status
- Booking status
- Amount

Actions:
- View
- Download ticket
- Cancel
- Contact support

Provide filters and search.

Create empty states for each category.
```

## PROMPT 17: Booking Details

```text
Design the detailed booking management page.

Display:
- PNR
- Booking status
- Journey
- Train
- Passenger information
- Seat allocation
- Fare breakdown
- Payment status
- Cancellation policy

Actions:
- Download ticket
- Cancel booking
- Request refund where applicable
- Contact support

Show a booking timeline:

Booking created
Payment received
Booking confirmed
Travel date
Completed

For cancelled bookings show the cancellation and refund timeline.
```

---

# 13. Cancellation and Refund

## PROMPT 18: Cancellation Flow

```text
Design the booking cancellation flow.

Use a confirmation modal/page that clearly explains:
- Booking being cancelled
- Passenger(s)
- Seats
- Original amount
- Refund amount
- Cancellation fee
- Expected refund method
- Expected processing time

Require explicit confirmation.

Create states:
1. Cancellation confirmation
2. Cancellation processing
3. Cancellation successful
4. Cancellation failed

Never hide the financial consequence of cancellation.
```

## PROMPT 19: Refund Status

```text
Design the refund status experience.

Display:
- Refund amount
- Original payment
- Refund reference
- Refund status
- Date requested
- Processing status

Statuses:
Requested
Processing
Completed
Failed

Provide appropriate messaging for delayed refunds.
```

---

# 14. User Profile

## PROMPT 20: Profile

```text
Design the passenger profile area.

Sections:
1. Personal information
2. Contact information
3. Saved passenger information
4. Notification preferences
5. Security
6. Sessions/devices
7. Account settings

Allow users to update permitted information.

Use clear save/cancel states and validation.
```

## PROMPT 21: Saved Passengers

```text
Design a saved passengers feature.

Users can save frequently used passenger profiles.

Each passenger card contains:
- Name
- Age
- Gender
- Document information where applicable

Actions:
- Edit
- Delete
- Use for booking

Sensitive document information must be visually protected and never unnecessarily exposed.
```

---

# 15. Notifications

## PROMPT 22: Notifications Center

```text
Design the notification center.

Categories:
- Booking
- Payment
- Journey
- RAC
- Waitlist
- Refund
- Account

Display:
- Unread/read state
- Timestamp
- Notification title
- Short message
- Related booking

Include:
- Mark as read
- Mark all as read
- Notification preferences

Design mobile and desktop versions.
```

---

# 16. Help and Support

## PROMPT 23: Help Center

```text
Design a railway passenger help center.

Create:
1. Search help
2. Popular questions
3. Booking help
4. Payment help
5. Cancellation/refund help
6. RAC help
7. Waitlist help
8. Travel information
9. Account help
10. Contact support

The search interface should be prominent.

Prioritize self-service before contact support.
```

---

# 17. System States

## PROMPT 24: Loading, Empty, Error and Maintenance States

```text
Design the complete system state library.

Create reusable states for:
1. Loading
2. Skeleton loading
3. No search results
4. No bookings
5. No notifications
6. Network failure
7. API failure
8. Payment failure
9. Session expired
10. Unauthorized
11. Forbidden
12. Booking unavailable
13. Seat unavailable
14. Journey sold out
15. Queue unavailable
16. Queue closed
17. Maintenance
18. Rate limited
19. Unexpected error

Every state must provide:
- What happened
- Whether the user's data is safe
- What the user can do next

Avoid generic "Something went wrong" messages when the system knows the actual failure.
```

---

# 18. Mobile Web

## PROMPT 25: Mobile Passenger Experience

```text
Take the complete passenger-facing railway booking experience and redesign it specifically for mobile web.

Optimize for:
- One-handed interaction
- Small screens
- Touch targets
- Sticky bottom actions
- Bottom sheets
- Collapsible summaries
- Simplified navigation
- Fast loading
- Reduced visual density

Pay special attention to:
- Search
- Journey cards
- Seat selection
- Passenger forms
- Booking summary
- Payment
- PNR confirmation
- My bookings
- Queue/waiting room

Do not simply shrink the desktop interface.

Create mobile-native layouts while preserving the same design system and information architecture.
```

---

# 19. Admin / Operations Interface

The admin interface is a separate product surface. It should share the underlying design language but optimize for operational efficiency.

## PROMPT 26: Admin Dashboard

```text
Design an internal railway operations dashboard.

This is NOT a passenger-facing interface.

Create:
1. Overview
2. Booking metrics
3. Revenue
4. Active journeys
5. Seat occupancy
6. RAC
7. Waitlist
8. Queue status
9. Payments
10. Refunds
11. Notifications
12. System health
13. Audit logs

Dashboard cards:
- Today's bookings
- Today's revenue
- Active journeys
- Occupancy
- RAC count
- Waitlist count
- Failed payments
- Pending refunds

Use charts only where they communicate useful operational information.

Prioritize operational clarity over decorative dashboards.
```

---

# 20. Railway Operations

## PROMPT 27: Train Management

```text
Design the internal train management interface.

Create:
- Train list
- Train details
- Create train
- Edit train
- Coach configuration
- Seat configuration
- Train stops
- Schedule
- Train status

Support:
- Active
- Inactive
- Maintenance

Use tables for high-density administrative data.

Provide confirmation dialogs for destructive actions.
```

## PROMPT 28: Journey Management

```text
Design the journey management interface.

Operators should be able to:
- Create journey
- Schedule journey
- View journey
- Modify journey
- Cancel journey
- View occupancy
- View seat inventory
- View RAC
- View waitlist

Display:
- Train
- Route
- Date
- Departure
- Arrival
- Capacity
- Occupancy
- Availability
- Status

Create journey status states:

Scheduled
Boarding
Departed
Completed
Cancelled
Delayed
```

---

# 21. Inventory Operations

## PROMPT 29: Inventory Management

```text
Design an operational seat inventory interface.

Display:
- Train
- Journey
- Coach
- Seat map
- Available
- Held
- Confirmed
- RAC
- Waitlist

Operators should be able to inspect inventory without accidentally modifying it.

Use strong visual distinction between inventory states.

Include:
- Search seat
- Filter by coach
- Filter by status
- Passenger/booking lookup
- Booking reference
- PNR

Any manual override must require explicit authorization and confirmation.
```

---

# 22. Queue Operations

## PROMPT 30: Tatkal Queue Monitoring

```text
Design an internal queue operations dashboard.

Display:
- Current queue size
- Active users
- Current admission rate
- Average wait time
- Queue throughput
- Expired tokens
- Failed admissions
- Abuse blocks

Provide queue states:
Opening
Active
Paused
Closing
Closed

Include operational controls where authorized:
- Pause admission
- Resume admission
- Adjust admission rate
- Close queue

All operational changes must display confirmation and audit information.
```

---

# 23. Payment Operations

## PROMPT 31: Payment Operations

```text
Design an internal payment operations interface.

Display:
- Payment ID
- Booking
- PNR
- User
- Amount
- Provider reference
- Payment status
- Created time
- Completed time

Filters:
- Success
- Failed
- Pending
- Refunded
- Refund pending

Provide payment detail view with a timeline.

Do not expose sensitive payment credentials.
```

---

# 24. Refund Operations

## PROMPT 32: Refund Management

```text
Design the internal refund management interface.

Display:
- Refund ID
- Booking
- PNR
- Payment reference
- Amount
- Status
- Requested date
- Completed date
- Failure reason

Allow authorized operators to inspect and retry failed refunds.

Every manual action must require confirmation and produce an audit event.
```

---

# 25. User Management

## PROMPT 33: User Administration

```text
Design the internal user management interface.

Create:
- User list
- Search
- Filters
- User details
- Account status
- Booking history
- Payment history
- Risk indicators
- Notification history
- Audit history

Statuses:
Active
Suspended
Blocked
Pending verification

Avoid displaying unnecessary sensitive information.
```

---

# 26. Anti-Abuse Operations

## PROMPT 34: Anti-Abuse Dashboard

```text
Design an internal anti-abuse monitoring interface.

Display:
- Risk score
- Suspicious requests
- Blocked IPs
- Suspicious accounts
- Rate-limit events
- Queue abuse
- Booking abuse
- Challenge outcomes

Create a user/session investigation view.

Show evidence behind a risk score without exposing sensitive internal security logic to unauthorized users.

Provide:
- Investigate
- Restrict
- Release
- Add note

All security actions require authorization and audit logging.
```

---

# 27. Audit Logs

## PROMPT 35: Audit Log Interface

```text
Design an internal audit log interface.

Display:
- Timestamp
- Actor
- Action
- Resource
- Resource ID
- Previous state
- New state
- IP/session metadata where appropriate

Provide:
- Search
- Filters
- Date range
- Actor
- Action type
- Resource type

The interface should support investigation of:
- Booking changes
- Payment changes
- Refunds
- Inventory changes
- Queue changes
- Account changes
- Administrative actions
```

---

# 28. Design System Documentation

## PROMPT 36: Complete Design System

```text
Create a formal design system documentation page for the railway booking platform.

Document:
- Colors
- Typography
- Spacing
- Layout
- Buttons
- Inputs
- Forms
- Cards
- Tables
- Tabs
- Navigation
- Modals
- Drawers
- Alerts
- Toasts
- Badges
- Status indicators
- Seat components
- Journey components
- Booking components
- Payment components
- Queue components

For every component show:
- Default
- Hover
- Focus
- Active
- Disabled
- Loading
- Error
- Success

Document responsive behavior for desktop, tablet and mobile.

All future screens must use these components rather than introducing visually inconsistent variants.
```

---

# 29. Recommended Figma Page Structure

```text
00 - Cover
01 - Design System
02 - Components
03 - Public Website
04 - Authentication
05 - Search
06 - Journey Details
07 - Seat Selection
08 - Passenger Details
09 - Booking
10 - Payment
11 - Confirmation
12 - RAC & Waitlist
13 - Tatkal Queue
14 - My Bookings
15 - Profile
16 - Notifications
17 - Help Center
18 - Mobile
19 - Admin Dashboard
20 - Operations
21 - Inventory
22 - Payments
23 - Refunds
24 - Users
25 - Anti-Abuse
26 - Audit
27 - Empty & Error States
28 - Prototypes
```

---

# 30. Recommended Execution Order

Do not ask a design tool to generate all prompts at once.

Execute them in this order:

```text
01 Design System
        ↓
02 Homepage
        ↓
03 Authentication
        ↓
04 Search
        ↓
05 Journey Details
        ↓
06 Seat Selection
        ↓
07 Passenger Details
        ↓
08 Booking Review
        ↓
09 Payment
        ↓
10 Confirmation
        ↓
11 RAC / Waitlist
        ↓
12 Tatkal Queue
        ↓
13 My Bookings
        ↓
14 Profile
        ↓
15 Notifications
        ↓
16 Help
        ↓
17 System States
        ↓
18 Mobile
        ↓
19 Admin
        ↓
20 Operations
```

---

# 31. State Design Rule

After every major screen, generate at minimum:

```text
Default
Loading
Error
Empty
```

For transactional screens, also generate:

```text
Processing
Success
Failure
Expired
```

This is especially important for:

- Seat selection
- Booking
- Payment
- RAC
- Waitlist
- Queue admission
- Cancellation
- Refunds

A railway booking platform is fundamentally a state-management UX problem. The interface must remove ambiguity when seats, payments, queues, RAC, waitlists and refunds change underneath the user.

---

# 32. Final Design Principle

The UI should optimize for:

```text
Discover
   ↓
Compare
   ↓
Select
   ↓
Hold
   ↓
Enter passenger data
   ↓
Review
   ↓
Pay
   ↓
Confirm
   ↓
Manage journey
```

Every screen should answer three questions immediately:

1. Where am I?
2. What is the current state?
3. What should I do next?

Do not sacrifice these principles for visual novelty.
