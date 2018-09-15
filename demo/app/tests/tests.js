var KinveyList = require("nativescript-kinvey-list").KinveyList;
var kinveyList = new KinveyList();

describe("greet function", function() {
    it("exists", function() {
        expect(kinveyList.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(kinveyList.greet()).toEqual("Hello, NS");
    });
});