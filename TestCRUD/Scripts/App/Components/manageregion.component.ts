import { Component, OnInit, ViewChild } from '@angular/core';
import { RegionsService } from '../Service/regions.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IRegions } from '../Models/regions';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
    templateUrl: 'Scripts/app/Components/manageregion.component.html',
})

export class ManageRegion implements OnInit {
    msg: string;
    indLoading: boolean = false;
    regionFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    selectedOption: string;
    region: IRegions;
    stateCtrl: FormControl;
    constructor(private fb: FormBuilder, private _regionService: RegionsService, public dialogRef: MdDialogRef<ManageRegion>) { }
    ngOnInit(): void {
        this.regionFrm = this.fb.group({
            RegionsId: [''],
            Name: ['', [Validators.required, Validators.maxLength(200)]],
            Timezone: ['', [Validators.required, Validators.maxLength(10)]]
        });
        this.regionFrm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        if (this.dbops == DBOperation.create)
            this.regionFrm.reset();
        else
            this.regionFrm.setValue(this.region);
        this.SetControlsState(this.dbops == DBOperation.delete ? false : true);
    }

    onValueChanged(data?: any) {
        if (!this.regionFrm) { return; }
        const form = this.regionFrm;
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
    formErrors = {
        'Name': '',
        'Timezone': ''
    };
    validationMessages = {
        'Name': {
            'maxlength': 'Name cannot be more than 200 characters long.',
            'required': 'First Name is required.'
        },
        'Timezone': {
            'maxlength': 'Timezone cannot be more than 10 characters long.',
            'required': 'Timezone is required.'
        }
    };
    onSubmit(formData: any) {
        switch (this.dbops) {
            case DBOperation.create:
                this._regionService.post(Global.BASE_REGION_ENDPOINT, formData.value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;
            case DBOperation.update:
                this._regionService.put(Global.BASE_REGION_ENDPOINT, formData._value.RegionsId, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;
            case DBOperation.delete:
                this._regionService.delete(Global.BASE_REGION_ENDPOINT, formData._value.RegionsId).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;
        }
    }
    SetControlsState(isEnable: boolean) {
        isEnable ? this.regionFrm.enable() : this.regionFrm.disable();
    }
}