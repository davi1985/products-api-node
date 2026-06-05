# Products API

A REST API for managing products. Built with Node.js, Express, and TypeScript using a layered architecture that actually keeps concerns separated.

## Why this structure?

I got tired of refactoring codebases where business logic, HTTP handling, and database queries were all mixed together. This project follows a layered approach that makes testing and maintenance less painful.

```
src/
├── domain/          # Pure business entities and rules
├── application/     # Use cases and orchestration
├── infrastructure/  # Concrete implementations (in-memory db)
├── controllers/     # HTTP adapters
├── factories/       # Dependency injection
├── routes/          # Route definitions
└── config/          # Configuration
```

### The Domain Layer

Business logic lives here, with zero dependencies on Express, databases, or HTTP. The `Product` entity, `ProductId` and `Money` value objects, and the `ProductRepository` interface all sit here.

This means you can test your business rules with plain unit tests. No need to spin up a server or database.

```typescript
// You can test this without any infrastructure
const price = new Money(29.99); // Validates it's positive
const product = new Product(new ProductId(), "Mouse", price);
```

### Application Layer

The `ProductService` orchestrates use cases. It doesn't know about HTTP or databases - it only knows about the domain and repository interfaces.

```typescript
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  createProduct(request: CreateProductRequest): Product {
    ProductValidator.validate(request); // Pure validation
    const product = new Product(/* ... */);
    this.repository.save(product);
    return product;
  }
}
```

### Controllers

Controllers handle HTTP specifics: extracting data from requests, calling services, sending responses. They don't contain business logic - that's delegated to the application layer.

```typescript
// Notice the pattern: destructured params, not positional
getById({ request, response }: GetProductByIdRequest): void {
  const getByIdRequest = { id: String(request.params.id) };
  const product = this.service.getProductById(getByIdRequest);

  if (!product) {
    response.status(404).json({ error: "Product not found" });
    return;
  }

  response.json(product.toJSON());
}
```

## Patterns we actually use

### Objects over positional parameters

After debugging too many issues from passing parameters in wrong order, now anything with more than 1 parameter uses an object:

```typescript
// Don't do this - easy to mess up order
validateSortOptions(request, response, sortOptions, cache, locale);

// Do this instead - named parameters
validateSortOptions({ request, response, sortOptions });
```

This also makes the code extensible. Adding an optional field doesn't break existing call sites.

### Value Objects for critical types

`ProductId` and `Money` aren't primitives. They're classes that validate on construction:

```typescript
// This fails immediately with clear error
const badId = new ProductId("not-a-uuid"); // throws

// This works
const goodId = new ProductId("550e8400-e29b-41d4-a716-446655440000");
```

Fail fast at the boundary, not deep in the system.

### Extracted types

Instead of inline type definitions, we define named types in separate files:

```typescript
// controllers/types/controller-types.ts
type GetAllProductsRequest = {
  request: Request;
  response: Response;
};

type SendErrorRequest = {
  response: Response;
  message: string;
};
```

This keeps the controller code readable and makes types reusable if needed.

### Single Responsibility methods

Each method does one thing. Validation is extracted to private methods:

```typescript
getAll({ request, response }: GetAllRequest): void {
  const sortOptions = this.extractSortOptions(request);

  // Early return pattern, no nested ifs
  if (!this.isValidSortOptions({ request, response, sortOptions })) return;

  const products = this.service.getAllProducts(sortOptions);
  response.json(products.map(p => p.toJSON()));
}

private extractSortOptions(request: Request): SortOptions {
  const sort = request.query.sort;
  const order = request.query.order;
  return SortOptions.create(
    typeof sort === "string" ? sort : undefined,
    typeof order === "string" ? order : undefined
  );
}
```

## Running the API

```bash
# Install dependencies
yarn install

# Start development server
yarn start
```

The server runs on `http://localhost:3000`.

## API Endpoints

| Endpoint        | Method | Description                                                      |
| --------------- | ------ | ---------------------------------------------------------------- |
| `/health`       | GET    | Health check                                                     |
| `/products`     | GET    | List all products (optional `?sort=name\|price&order=asc\|desc`) |
| `/products/:id` | GET    | Get product by ID                                                |
| `/products`     | POST   | Create new product                                               |
| `/products/:id` | DELETE | Delete product                                                   |

## Swagger Documentation

Interactive API docs available at:

```
http://localhost:3000/api-docs
```

You can test all endpoints directly from the Swagger UI.

## Example: Creating a product

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Wireless Mouse", "price": 29.99}'
```

Response:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Wireless Mouse",
  "price": 29.99
}
```

## SOLID Skills

This project was built using the SOLID skills framework - a set of guidelines for professional software engineering. The `.agents/skills/solid/` directory contains references on:

- **Single Responsibility Principle** - Each class and method has one reason to change
- **Open/Closed Principle** - Extensible without modifying existing code
- **Liskov Substitution** - Implementations are interchangeable
- **Interface Segregation** - Small, focused interfaces
- **Dependency Inversion** - Depend on abstractions, not concretions

The skills also cover TDD practices, testing strategies, and clean code patterns. These aren't theoretical - they're applied throughout the codebase, from the domain entities to the controller method signatures.

## Security measures

The API includes several security protections by default:

- **Helmet** - Security headers including CSP
- **Rate limiting** - 100 requests per 15 minutes per IP (prevents brute force)
- **CORS** - Configurable allowed origins via `CORS_ORIGIN` env var
- **Body size limits** - 10kb max JSON payload (prevents large payload attacks)
- **Input validation** - Name length (1-100 chars), price limits (0-999,999.99)
- **Error sanitization** - Internal errors don't leak to client

Security-related values are defined as constants in `src/config/validation-config.ts` rather than magic numbers scattered through the code.

## What I'd do differently in production

- **Repository**: Swap in-memory for PostgreSQL or MongoDB
- **Secrets**: Use a secrets manager (AWS Secrets Manager, HashiCorp Vault) instead of .env files
- **Error handling**: Add proper error classes instead of generic messages
- **Validation**: Use a library like Zod instead of manual checks
- **Testing**: Add integration tests for the repository layer
- **Authentication**: Add JWT or OAuth for protected endpoints

## The commit history

The project was built with atomic commits - each commit represents one logical change. If you're curious about the evolution, check the git log:

```bash
git log --oneline
```

This made it easier to review changes and rollback if needed.
