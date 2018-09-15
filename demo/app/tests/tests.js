var reflect = require("reflect-metadata");
var component = require("../app.component");

describe("Kinvey SDK test", function() {
    it("Should login to Kinvey", function() {
		
        var appComponent = new component.AppComponent();
		appComponent.login().then(()=>{
		     expect(appComponent.show).toBe(true);
		});
    });
});
