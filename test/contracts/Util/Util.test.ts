import { ethers } from "hardhat";
import { Util__factory, Util } from "src/types";
import expect from "test/expect";

describe("Util", () => {
  let util: Util;
  before(async () => {
    util = await new Util__factory((await ethers.getSigners())[0]).deploy();
  });

  describe("tokenize", () => {
    it("Should tokenize the string by ' '", async () => {
      const expected = ["string1", "string2", "string3", "string4"];
      const delim = " ";
      const str = expected.join(delim);

      const result = await util.tokenize(str, delim);
      expect(result).to.deep.equal(expected);
    });

    it("Should tokenize the string by '.'", async () => {
      const expected = ["string5", "string6", "string7", "string8"];
      const delim = ".";
      const str = expected.join(delim);

      const result = await util.tokenize(str, delim);
      expect(result).to.deep.equal(expected);
    });

    it("Should tokenize the string by ','", async () => {
      const expected = ["string9", "string10", "string11", "string12"];
      const delim = ",";
      const str = expected.join(delim);

      const result = await util.tokenize(str, delim);
      expect(result).to.deep.equal(expected);
    });
  });

  describe("splitt", () => {
    it("Should split the string at position 4", async () => {
      const expected = ["Auto", "bahn"];
      const str = expected.join("");

      const result = await util.split(str, 4);
      expect(result).to.deep.equal(expected);
    });

    it("Should split the string at position 3", async () => {
      const expected = ["Aut", "obahn"];
      const str = expected.join("");

      const result = await util.split(str, 3);
      expect(result).to.deep.equal(expected);
    });

    it("Should split the string at position 7", async () => {
      const expected = ["Autobah", "n"];
      const str = expected.join("");

      const result = await util.split(str, 7);
      expect(result).to.deep.equal(expected);
    });

    it("Should split the string at position 0", async () => {
      const expected = ["", "Autobahn"];
      const str = expected.join("");

      const result = await util.split(str, 0);
      expect(result).to.deep.equal(expected);
    });

    it("Should split the string at the end", async () => {
      const expected = ["Autobahn", ""];
      const str = expected.join("");

      const result = await util.split(str, str.length);
      expect(result).to.deep.equal(expected);
    });
  });

  describe("substring", () => {
    it("Should extract the substring", async () => {
      {
        const expected = "Test";
        const left = "sfsdfdsdrgblkjkgsdlrjgijkdnvd";
        const right = " kldsahfiasjkjhihjkdklvmkkkkkkkkkkkkkkkkl";

        const begin = left.length;
        const end = begin + expected.length;

        const str = [left, expected, right].join("");
        const result = await util.substring(str, begin, end);
        expect(result).to.deep.equal(expected);
      }

      {
        const expected = "Flugzeug";
        const left = "sfsdfdsdrgblkjkjkjkgsdlrjgijkkjdddddnvd";
        const right = " kldsahfiasjkjhihjkdklvmjkddddkl";

        const begin = left.length;
        const end = begin + expected.length;

        const str = [left, expected, right].join("");
        const result = await util.substring(str, begin, end);
        expect(result).to.deep.equal(expected);
      }
    });
  });
});
