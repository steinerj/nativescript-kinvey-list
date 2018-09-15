import { Injectable } from "@angular/core";
import { File } from "tns-core-modules/file-system";
import { Kinvey } from "kinvey-nativescript-sdk";

@Injectable()
export class DataItem {
	constructor(public id: number, public name: string) { }
}

@Injectable()
export class ItemService {
    private allItems: Array<DataItem> = [];
    private itemStore = Kinvey.DataStore.collection<any>("items");

    getItemById(id: number): DataItem {
        if (!id) {
            return null;
        }
        return this.allItems.filter((item) => {
            return item.id === id;
        })[0];
    }

    load(): Promise<any> {
        return this.itemStore.sync().then(() => {
            const sortByNameQuery = new Kinvey.Query();
            sortByNameQuery.ascending("name");
            const stream = this.itemStore.find(sortByNameQuery);
            return stream.toPromise();
        }).then((data) => {
            this.allItems = [];
            data.forEach((dataItem: any) => {
                const item = new DataItem(dataItem._id, dataItem.name);
                this.allItems.push(item);
            });
            return this.allItems;
        });
    }

    uploadImage(remoteFullPath: string, localFullPath: string): Promise<any> {
        const imageFile = File.fromPath(localFullPath);
        const imageContent = imageFile.readSync();
        const metadata = {
            filename: imageFile.name,
            mimeType: this.getMimeType(imageFile.extension),
            size: imageContent.length,
            public: true
        };
        return Kinvey.Files.upload(imageFile, metadata, { timeout: 2147483647 })
            .then((uploadedFile: any) => {
                const query = new Kinvey.Query();
                query.equalTo("_id", uploadedFile._id);
                return Kinvey.Files.find(query);
            })
            .then((files: Array<any>) => {
                if (files && files.length) {
                    const file = files[0];
                    file.url = file._downloadURL;
                    return file;
                } else {
                    Promise.reject(new Error("No items with the given ID could be found."));
                }
            });
    }

    private getMimeType(imageExtension: string): string {
        const extension = imageExtension === "jpg" ? "jpeg" : imageExtension;
        return "image/" + extension.replace(/\./g, "");
    }
}
