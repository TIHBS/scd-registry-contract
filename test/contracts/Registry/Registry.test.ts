import { edgeCases } from "./Registry.edge-cases.test";
import { storeMultipleRetrieveMultiple } from "./Registry.store-multiple-retrieve-multiple.test";
import { storeMultipleRetrieveOne } from "./Registry.store-multiple-retrieve-one.test";
import { storeOneRetrieveOne } from "./Registry.store-one-retrieve-one.test";

describe("Registry contract", () => {
  storeOneRetrieveOne();
  storeMultipleRetrieveOne();
  storeMultipleRetrieveMultiple();
  edgeCases();
});
