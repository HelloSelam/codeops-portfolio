# Future Work

The following features were intentionally left out of this version to keep the project focused on the core ordering journey, Next.js concepts, authentication, data validation, and dashboard presentation.

| Deferred or cut feature                            | Why it was left out                                                                                                                          | Possible next step                                                                              |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Persistent production database                     | The project uses an in-memory mock order store to focus on application flow and server-side data handling within the available project time. | Replace mock helpers with PostgreSQL or another persistent database.                            |
| Full user account system                           | Demo credentials are sufficient to demonstrate customer/staff roles, but registration and account management were outside the current scope. | Add a trusted identity provider, password hashing, registration, reset, and account management. |
| Real payment processing                            | Payment integration requires provider setup, transaction handling, and additional security work.                                             | Integrate a supported payment provider in a test environment first.                             |
| Live delivery tracking                             | The current scope focuses on placing and reviewing orders rather than dispatch operations.                                                   | Add delivery states and a tracking interface backed by persistent updates.                      |
| Kitchen operations interface                       | It was removed to keep the navigation and demonstration focused on the customer journey and staff management dashboard.                      | Reconsider only if kitchen workflow becomes a defined product requirement.                      |
| Real-time order updates                            | The current mock data model does not provide a persistent event source for reliable live updates.                                            | Add database-backed updates or a real-time service.                                             |
| Production-grade customer and order administration | The dashboard demonstrates basic summaries and charts, not a complete operations system.                                                     | Add audited staff actions, detailed filters, and role-specific permissions.                     |

## Scope Decision

The priority for this version was a complete demonstrable flow:

1. Browse and filter Ethiopian dishes.
2. View dish details.
3. Add dishes to a cart.
4. Submit a validated order while authenticated.
5. Review order history and order status.
6. Restrict management reporting to staff.

The deferred items are potential future improvements, not features represented as already implemented.
