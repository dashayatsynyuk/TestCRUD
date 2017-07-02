"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var regions_service_1 = require("../Service/regions.service");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var manageregion_component_1 = require("./manageregion.component");
var material_1 = require("@angular/material");
var RegionsComponent = (function () {
    function RegionsComponent(_regionService, dialog) {
        this._regionService = _regionService;
        this.dialog = dialog;
    }
    RegionsComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(manageregion_component_1.ManageRegion);
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.region = this.region;
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == "success") {
                _this.LoadRegions();
                switch (_this.dbops) {
                    case enum_1.DBOperation.create:
                        _this.msg = "Data successfully added.";
                        break;
                    case enum_1.DBOperation.update:
                        _this.msg = "Data successfully updated.";
                        break;
                    case enum_1.DBOperation.delete:
                        _this.msg = "Data successfully deleted.";
                        break;
                }
            }
            else if (result == "error")
                _this.msg = "There is some issue in saving records, please contact to system administrator!";
            else
                _this.msg = result;
        });
    };
    RegionsComponent.prototype.ngOnInit = function () {
        this.LoadRegions();
    };
    RegionsComponent.prototype.LoadRegions = function () {
        var _this = this;
        this._regionService.get(global_1.Global.BASE_REGION_ENDPOINT)
            .subscribe(function (regions) { _this.regions = regions; }, function (error) { return _this.msg = error; });
    };
    RegionsComponent.prototype.addRegion = function () {
        this.dbops = enum_1.DBOperation.create;
        this.modalTitle = "Add New Region";
        this.modalBtnTitle = "Add";
        this.openDialog();
    };
    RegionsComponent.prototype.editRegion = function (regionId) {
        this.dbops = enum_1.DBOperation.update;
        this.modalTitle = "Edit Region";
        this.modalBtnTitle = "Update";
        this.region = this.regions.filter(function (x) { return x.RegionsId == regionId; })[0];
        this.openDialog();
    };
    RegionsComponent.prototype.deleteRegion = function (regionId) {
        this.dbops = enum_1.DBOperation.delete;
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.region = this.regions.filter(function (x) { return x.RegionsId == regionId; })[0];
        this.openDialog();
    };
    RegionsComponent.prototype.setCurrent = function (RegionId) {
        this.currentRegionId = RegionId;
    };
    RegionsComponent.prototype.sortByField = function (fieldName, event) {
        if (this.direct == 'ASC') {
            this.regions = this.regions.sort(function (n1, n2) {
                if (n1[fieldName] > n2[fieldName]) {
                    return 1;
                }
                if (n1[fieldName] < n2[fieldName]) {
                    return -1;
                }
                return 0;
            });
            this.direct = 'DESC';
            event.target.innerText = fieldName + ' ↓';
        }
        else {
            this.regions = this.regions.sort(function (n1, n2) {
                if (n1[fieldName] < n2[fieldName]) {
                    return 1;
                }
                if (n1[fieldName] > n2[fieldName]) {
                    return -1;
                }
                return 0;
            });
            this.direct = 'ASC';
            event.target.innerText = fieldName + ' ↑';
        }
    };
    return RegionsComponent;
}());
RegionsComponent = __decorate([
    core_1.Component({
        templateUrl: 'Scripts/app/Components/regions.component.html'
    }),
    __metadata("design:paramtypes", [regions_service_1.RegionsService, material_1.MdDialog])
], RegionsComponent);
exports.RegionsComponent = RegionsComponent;
//# sourceMappingURL=regions.component.js.map