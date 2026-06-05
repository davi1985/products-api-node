# Grill-Me Session: Design Review

**Date:** June 5, 2026  
**Skill:** grill-me  
**Topic:** Products API Architecture Review

---

## The Session

### Q1: What happens if the in-memory database grows to 1 million products?

**A:** Current implementation would fail. InMemoryProductRepository stores everything in a Map in RAM.

**Gap identified:** ✅ No pagination on GET /products
**Mitigation:** Need to add pagination (limit/offset or cursor-based)

---

### Q2: What if two users try to update the same product simultaneously?

**A:** Race condition possible. No optimistic locking or versioning.

**Current flow:**

```typescript
// No check if product changed between read and write
const product = repo.findById(id); // T1
// ... user modifies ...
repo.save(product); // T2 - could overwrite T1's changes
```

**Gap identified:** ✅ No concurrency control
**Mitigation:** Add version field (ETag or timestamp) for optimistic locking

---

### Q3: What's the rollback plan if a deploy breaks production?

**A:**

1. Git commits are atomic - easy to revert
2. No database migrations (in-memory), so no schema rollback needed
3. Health check endpoint (`/health`) for monitoring

**Gap identified:** ⚠️ No blue-green deployment or feature flags
**Mitigation:** Add container health checks and rolling updates

---

### Q4: Why did you choose in-memory over a real database?

**A:**

- Faster development iteration
- Easier testing (no Docker needed)
- Demonstrates Repository pattern allows swapping implementation

**Trade-off:** Data lost on restart
**Future:** Easy to swap for PostgreSQL/MongoDB since we depend on interface

---

### Q5: What if an attacker sends a 100MB JSON payload?

**A:** Blocked by `jsonLimit = "10kb"` in security-config.ts

**Current:** Returns 413 Payload Too Large
**Gap:** ✅ Verified - implemented correctly

---

### Q6: How do you handle database connection failures?

**A:** Currently N/A (in-memory). But the Repository interface would allow:

```typescript
// Connection failure in PostgreSQLRepository
throw new DatabaseConnectionError();

// Controller would need to catch and return 503
```

**Gap identified:** ⚠️ No error handling strategy for external services
**Mitigation:** Add circuit breaker pattern when implementing real DB

---

### Q7: What's the query pattern for GET /products with filters?

**A:** Currently only supports sorting (name/price, asc/desc).

**Missing:**

- No filtering by price range
- No search by name substring
- No pagination

**Impact:** API will be slow with large datasets
**Decision:** Accept for MVP, add filters in v2

---

### Q8: Why use `bind(this)` in controllers instead of arrow functions?

**A:**

```typescript
// Arrow function - loses method on prototype
getAll = (req, res) => { ... }  // OOP purists don't like

// bind(this) - keeps prototype, OOP-correct
this.getAll = this.getAll.bind(this);  // What we chose
```

**Trade-off:** Slightly more verbose but more OOP-aligned with skills principles

---

### Q9: What if someone deletes a product while another user is viewing it?

**A:**

1. User A: GET /products/123 (gets product)
2. User B: DELETE /products/123 (deletes)
3. User A: Still has stale data in client

**Gap identified:** ✅ No real-time updates or cache invalidation
**Mitigation:** Acceptable for REST API, could add WebSockets for real-time

---

### Q10: How do you handle graceful shutdown?

**A:** Currently not implemented. Would lose in-flight requests.

**Gap identified:** ⚠️ No graceful shutdown
**Mitigation:** Add SIGTERM handler:

```typescript
process.on("SIGTERM", () => {
  server.close(() => {
    // Finish in-flight requests
    process.exit(0);
  });
});
```

---

### Q11: Why is there no UPDATE (PUT/PATCH) endpoint?

**A:** Intentionally omitted for simplicity.

**Domain supports it:** `product.updateName()`, `product.updatePrice()`
**Gap:** ✅ Missing REST endpoint
**Mitigation:** Easy to add - just expose existing domain methods

---

### Q12: What's the authentication strategy?

**A:** None currently. All endpoints are public.

**Risk:** Anyone can create/delete products
**Mitigation:** Add JWT middleware:

```typescript
app.use("/products", authenticateJWT);
```

**Priority:** HIGH for production

---

## Summary of Gaps Found

### High Priority

1. ❌ No authentication/authorization
2. ❌ No pagination (performance issue)
3. ❌ No graceful shutdown

### Medium Priority

4. ⚠️ No optimistic locking (race conditions)
5. ⚠️ No UPDATE endpoint (domain supports it)
6. ⚠️ No filtering/search

### Low Priority

7. ⚠️ No real-time updates
8. ⚠️ No metrics/monitoring

---

## Design Decisions Validated

✅ **Value Objects** - Good for validation, testable  
✅ **Layered Architecture** - Clean separation  
✅ **Named Constants** - No magic numbers  
✅ **Object Parameters** - Type-safe, extensible  
✅ **Pre-commit Hooks** - Quality gates working  
✅ **Test Coverage** - 66 tests, excellent coverage  
✅ **Security Defaults** - Rate limiting, CORS, body limits

---

## Action Items

1. Add JWT authentication middleware
2. Implement pagination (cursor-based)
3. Add graceful shutdown handler
4. Document optimistic locking strategy for v2
5. Add PUT /products/:id endpoint

---

_Session completed by grill-me skill | June 5, 2026_
