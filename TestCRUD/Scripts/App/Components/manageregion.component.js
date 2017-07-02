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
var forms_1 = require("@angular/forms");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var material_1 = require("@angular/material");
var ManageRegion = (function () {
    function ManageRegion(fb, _regionService, dialogRef) {
        this.fb = fb;
        this._regionService = _regionService;
        this.dialogRef = dialogRef;
        this.indLoading = false;
        this.formErrors = {
            'Name': '',
            'Timezone': ''
        };
        this.validationMessages = {
            'Name': {
                'maxlength': 'Name cannot be more than 200 characters long.',
                'required': 'First Name is required.'
            },
            'Timezone': {
                'maxlength': 'Timezone cannot be more than 10 characters long.',
                'required': 'Timezone is required.'
            }
        };
    }
    ManageRegion.prototype.ngOnInit = function () {
        var _this = this;
        this.regionFrm = this.fb.group({
            RegionsId: [''],
            Name: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(200)]],
            Timezone: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(10)]]
        });
        this.regionFrm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        if (this.dbops == enum_1.DBOperation.create)
            this.regionFrm.reset();
        else
            this.regionFrm.setValue(this.region);
        this.SetControlsState(this.dbops == enum_1.DBOperation.delete ? false : true);
    };
    ManageRegion.prototype.onValueChanged = function (data) {
        if (!this.regionFrm) {
            return;
        }
        var form = this.regionFrm;
        for (var field in this.formErrors) {
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    ManageRegion.prototype.onSubmit = function (formData) {
        var _this = this;
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._regionService.post(global_1.Global.BASE_REGION_ENDPOINT, formData.value).subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
            case enum_1.DBOperation.update:
                this._regionService.put(global_1.Global.BASE_REGION_ENDPOINT, formData._value.RegionsId, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
            case enum_1.DBOperation.delete:
                this._regionService.delete(global_1.Global.BASE_REGION_ENDPOINT, formData._value.RegionsId).subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
        }
    };
    ManageRegion.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.regionFrm.enable() : this.regionFrm.disable();
    };
    return ManageRegion;
}());
ManageRegion = __decorate([
    core_1.Component({
        templateUrl: 'Scripts/app/Components/manageregion.component.html',
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, regions_service_1.RegionsService, material_1.MdDialogRef])
], ManageRegion);
exports.ManageRegion = ManageRegion;
//# sourceMappingURL=manageregion.component.js.map