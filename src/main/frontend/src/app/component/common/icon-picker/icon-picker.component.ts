import {Component, ElementRef, ViewChild} from '@angular/core';
import icons from './icons.json';

@Component({
  selector: 'icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrl: './icon-picker.component.scss'
})
export class IconPickerComponent {
  iconMap = new Map;
  pristineIconMap = {...this.iconMap};
  @ViewChild('searchIcon') searchIconText!: ElementRef;

  constructor() {

    let sortedAndFiltered = icons.icons
      .filter(icon => icon.version == 240)
      .sort((icon, icon2) => icon.popularity - icon2.popularity);
    this.iconMap = Utility.groupBy(sortedAndFiltered, (a: { categories: any; }) => a.categories);
  }

  pickIcon(name: string) {
    console.log(name);

  }

  search() {
    let searchValue = this.searchIconText.nativeElement.value;
    console.log(searchValue);

    const allIcons = Array.from(this.iconMap.values()).flatMap((icons) => icons);

    // Filter icons based on the name
    const filteredIcons = allIcons.filter((icon) => icon.name === searchValue);

    // Optionally, you can convert the result back to a Map if needed
    const result = new Map(Array.from(this.iconMap).map(([key]) => [key, filteredIcons]));
    if (!!searchValue) {
      this.iconMap = result;
      console.log(result);
    }
  }
}

interface IconList {
  icons: (Icon)[];
}

interface Icon {
  name: string;
  version: number;
  popularity: number;
  codepoint: number;
  categories?: (string)[] | null;
  tags?: (string | null)[] | null;
  sizes_px?: (number)[] | null;
}

class Utility {
  static groupBy(xs: any[], f: Function) {
    const groupByObjects = xs.reduce(
      (
        previous: any,
        current: any,
        i: number,
        dataRef: any,
        k = f(current)) => ((previous[k] || (previous[k] = [])).push(current), previous), {}
    );
    const groupByModels = new Map<string, Icon[]>;
    for (const obj in groupByObjects) {
      if (!groupByObjects.hasOwnProperty(obj)) {
        continue;
      }
      groupByModels.set(obj, groupByObjects[obj]);
    }
    return groupByModels;
  }
}