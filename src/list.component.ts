import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { DataItem, ItemService } from "./item.service";

@Component({
	selector: "List",
	moduleId: module.id,
	templateUrl: "./list.component.html",
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	@ViewChild("listSearch") searchBar: ElementRef;

	private _isLoading: boolean = false;
	private _listItems: ObservableArray<DataItem> = new ObservableArray<DataItem>([]);
	private resultList: ObservableArray<DataItem> = new ObservableArray<DataItem>([]);

	constructor(private _itemService: ItemService,) {
	}
	ngOnInit(): void {
		this._isLoading = true;
		/*let arr: Array<DataItem> = [
			new DataItem(1, 'Kitchen1'),
			new DataItem(2, 'Kitchen2'),
			new DataItem(3, 'Kitchen3'),
			new DataItem(4, 'Kitchen4'),
			new DataItem(5, 'Someother')

		];
		this._listItems = new ObservableArray(arr);
		this.resultList = new ObservableArray(arr);
		*/
		this._itemService.load()
			.then((items: Array<DataItem>) => {
				this._listItems = new ObservableArray(items);
				this.resultList = new ObservableArray(items);
				this._isLoading = false;
			})
			.catch(() => {
				this._isLoading = false;
			});
	}
	get listItems(): ObservableArray<DataItem> {
		return this.resultList;
	}

	get isLoading(): boolean {
		return this._isLoading;
	}

	onSubmit(args): void {
		const searchBar = <SearchBar>args.object;
		const searchValue = searchBar.text.toLowerCase();
		if (!searchValue) {
			this.resultList = new ObservableArray(this._listItems.slice());
		} else {
			const filteredList = this._listItems.filter((dataItem) => {
				return dataItem.name.toLocaleLowerCase().startsWith(searchValue);
			});
			this.resultList = new ObservableArray(filteredList);
		}
		//var searchbar: SearchBar = <SearchBar>this.page.getViewById("searchbarid");
		searchBar.dismissSoftInput();
	}

	onClear(args): void {
		this.resultList = new ObservableArray(this._listItems.slice());
	}

	
}