import chai from "chai";
import deepEqualInAnyOrder from "deep-equal-in-any-order";
import { solidity } from "ethereum-waffle";

chai.use(solidity);
chai.use(deepEqualInAnyOrder);
const { expect } = chai;

export default expect;
