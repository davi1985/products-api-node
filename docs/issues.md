# GitHub Issues Generated from Skills Session

## Issue #1: [CRITICAL] Add Authentication & Authorization

**Priority:** HIGH | **Labels:** enhancement, critical

### Problem

All API endpoints are currently public. Anyone can create/delete products.

### Solution

Add JWT authentication middleware.

### Acceptance Criteria

- [ ] POST /auth/login endpoint (return JWT)
- [ ] JWT middleware for protected routes
- [ ] All /products endpoints require auth
- [ ] Tests for auth flow
- [ ] Update Swagger docs

### Technical Notes

```typescript
// Protected route example
app.use("/products", authenticateJWT);
```

**Estimated effort:** 2-3 hours

---

## Issue #2: [CRITICAL] Add Pagination to GET /products

**Priority:** HIGH | **Labels:** enhancement, critical

### Problem

Currently returns ALL products. Will fail with large datasets.

### Solution

Implement cursor-based pagination.

### Acceptance Criteria

- [ ] Add ?limit and ?cursor query params
- [ ] Default limit: 20 items
- [ ] Response includes: data, total, nextCursor, hasMore
- [ ] Tests for pagination edge cases
- [ ] Update Swagger docs

**Estimated effort:** 2 hours

---

## Issue #3: [CRITICAL] Implement Graceful Shutdown

**Priority:** HIGH | **Labels:** enhancement, critical

### Problem

Server closes immediately on SIGTERM. In-flight requests are lost.

### Solution

Add graceful shutdown handler.

### Acceptance Criteria

- [ ] SIGTERM handler in index.ts
- [ ] Finish in-flight HTTP requests
- [ ] Close server properly
- [ ] Exit with code 0
- [ ] Log shutdown events

**Estimated effort:** 1 hour

---

## Issue #4: [MEDIUM] Add UPDATE (PUT) Endpoint

**Priority:** MEDIUM | **Labels:** enhancement

### Problem

Domain supports updates (updateName, updatePrice) but HTTP doesn't expose them.

### Solution

Add PUT /products/:id endpoint.

### Acceptance Criteria

- [ ] PUT /products/:id endpoint
- [ ] Use existing domain methods
- [ ] Tests for update flow
- [ ] Swagger documentation

**Estimated effort:** 1 hour

---

## Issue #5: [MEDIUM] Add Filtering & Search

**Priority:** MEDIUM | **Labels:** enhancement

### Problem

Can't filter products by price range or search by name.

### Solution

Add query parameters for filtering.

### Acceptance Criteria

- [ ] ?name=search_term (substring match)
- [ ] ?minPrice=10&maxPrice=100
- [ ] Combine with existing sort parameter
- [ ] Tests for filter combinations
- [ ] Swagger documentation

**Estimated effort:** 2-3 hours

---

## Issue #6: [MEDIUM] Add Optimistic Locking

**Priority:** MEDIUM | **Labels:** enhancement

### Problem

Race conditions possible when concurrent updates occur.

### Solution

Add version field with optimistic locking.

### Acceptance Criteria

- [ ] Version field in Product entity
- [ ] ETag header support
- [ ] 409 Conflict on stale update
- [ ] Tests for race conditions

**Estimated effort:** 2 hours

---

## Generated From

- `/zoom-out` skill: Architecture overview
- `/grill-me` skill: Design review with gaps
- `/handoff` skill: This document

**Date:** June 5, 2026
