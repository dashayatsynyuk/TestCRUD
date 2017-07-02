import { Component, OnInit, ViewChild } from '@angular/core';
import { RegionsService } from '../Service/regions.service';
import { IRegions } from '../Models/regions';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { ManageRegion } from './manageregion.component';
import { MdDialog, MdDialogRef } from '@angular/material';
@Component({
    templateUrl: 'Scripts/app/Components/regions.component.html'
})
export class RegionsComponent implements OnInit {
    regions: IRegions[];
    region: IRegions;
    msg: string;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    direct: string;
    currentRegionId: number;
    selectedOption: string;
    constructor(private _regionService: RegionsService, private dialog: MdDialog) { }
    openDialog() {
        let dialogRef = this.dialog.open(ManageRegion);
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.region = this.region;
        dialogRef.afterClosed().subscribe(result => {
            if (result == "success") {
                this.LoadRegions();
                switch (this.dbops) {
                    case DBOperation.create:
                        this.msg = "Data successfully added.";
                        break;
                    case DBOperation.update:
                        this.msg = "Data successfully updated.";
                        break;
                    case DBOperation.delete:
                        this.msg = "Data successfully deleted.";
                        break;
                }
            }
            else if (result == "error")
                this.msg = "There is some issue in saving records, please contact to system administrator!"
            else
                this.msg = result;
        });
    }
    ngOnInit(): void {
        this.LoadRegions();
    }
    LoadRegions(): void {
        this._regionService.get(Global.BASE_REGION_ENDPOINT)
            .subscribe(regions => { this.regions = regions; }
            ,error => this.msg = <any>error
            );
    }
    addRegion() {
        this.dbops = DBOperation.create;
        this.modalTitle = "Add New Region";
        this.modalBtnTitle = "Add";
        this.openDialog();
    }
    editRegion(regionId: number) {
        this.dbops = DBOperation.update;
        this.modalTitle = "Edit Region";
        this.modalBtnTitle = "Update";
        this.region = this.regions.filter(x => x.RegionsId == regionId)[0];
        this.openDialog();
    }
    deleteRegion(regionId: number) {
        this.dbops = DBOperation.delete;
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.region = this.regions.filter(x => x.RegionsId == regionId)[0];
        this.openDialog();
    }

    setCurrent(RegionId: number) {
        this.currentRegionId = RegionId;
    }

    sortByField(fieldName, event) {
        if (this.direct == 'ASC') {
            this.regions = this.regions.sort((n1, n2) => {
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
        } else {
            this.regions = this.regions.sort((n1, n2) => {
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
    }
}