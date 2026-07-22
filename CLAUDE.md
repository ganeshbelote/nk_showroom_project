# Task Plan: 4 Updates

## Task 1: Enable variant editing in VariantManager
- Add edit state to VariantManager (pencil button currently has no onClick)
- Allow editing existing variants inline

## Task 2: Multiple fuel types (CNG + Petrol)
- Add `petrolMileage`, `cngMileage` to Vehicle model
- Add `alternateFuel`, `alternatePrice` to Variant model for dual-fuel support
- Update forms to show these fields
- Update /car/[id] page to display them

## Task 3: On-Road Price breakdown (logged-in users only)
- Create OnRoadPrice model with all breakdown fields
- Create API endpoints
- Show on /car/[id] page when user is logged in

## Task 4: /admin/visitors uses User data
- Add `iscontacted` field to User model
- Update /admin/visitors page and API to use Users instead of Visitors