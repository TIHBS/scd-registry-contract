import { StoreMultipleRetrieveOne } from "./Registry.store-multiple-retrieve-one.test";
import { StoreOneRetrieveOne } from "./Registry.store-one-retrieve-one.test";
import { StoreMultipleRetrieveMultiple } from "./Registry.store-multiple-retrieve-multiple.test";

describe("Registry contract", () => {
  StoreOneRetrieveOne.suite();
  StoreMultipleRetrieveOne.suite();
  StoreMultipleRetrieveMultiple.suite();
});
