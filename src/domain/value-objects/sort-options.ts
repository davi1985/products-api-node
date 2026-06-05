export type SortField = "name" | "price";
export type SortOrder = "asc" | "desc";

export class SortOptions {
  constructor(
    private readonly _field: SortField | undefined,
    private readonly _order: SortOrder = "asc",
  ) {}

  get field(): SortField | undefined {
    return this._field;
  }

  get order(): SortOrder {
    return this._order;
  }

  isSorting(): boolean {
    return this._field !== undefined;
  }

  getDirection(): number {
    return this._order === "desc" ? -1 : 1;
  }

  static create(
    field: string | undefined,
    order: string | undefined,
  ): SortOptions {
    const validatedField = SortOptions.validateField(field);
    const validatedOrder = SortOptions.validateOrder(order);

    return new SortOptions(validatedField, validatedOrder);
  }

  private static validateField(
    field: string | undefined,
  ): SortField | undefined {
    const validFields: SortField[] = ["name", "price"];

    if (field && validFields.includes(field as SortField)) {
      return field as SortField;
    }

    return undefined;
  }

  private static validateOrder(order: string | undefined): SortOrder {
    const validOrders: SortOrder[] = ["asc", "desc"];

    if (order && validOrders.includes(order as SortOrder)) {
      return order as SortOrder;
    }

    return "asc";
  }
}
