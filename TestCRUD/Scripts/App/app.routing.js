"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./Components/home.component");
var regions_component_1 = require("./Components/regions.component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'regions', component: regions_component_1.RegionsComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map