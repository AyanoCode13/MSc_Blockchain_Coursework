export function createProperty() {
  return {
    async createProperty(data) {
      const db = prisma;
      const property = await db.property.create({
        data
      });
      return property;
    }
  };
}