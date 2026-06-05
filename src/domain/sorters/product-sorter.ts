import { Product } from "../entities/product.js";
import type { SortField, SortOrder } from "../value-objects/sort-options.js";

export type SortRequest = {
  field: SortField;
  order: SortOrder;
};

export class ProductSorter {
  static sort(products: Product[], request: SortRequest): Product[] {
    const direction = request.order === "desc" ? -1 : 1;

    return [...products].sort((a, b) => {
      if (request.field === "name") {
        return direction * a.name.localeCompare(b.name);
      }

      return direction * (a.price.amount - b.price.amount);
    });
  }
}
