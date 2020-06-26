export class UserSettings {

    static getStyle() {
        return StyleEnum.resolveStyleEnumValue(UserSettings.readFromStorage(CookieEnum.style));
    }

    static storeStyle(value) {
        UserSettings.writeToStorage(CookieEnum.style, value);
    }

    static getSortBy() {
        return SortEnum.fromValueToSortEntityAndDirection(UserSettings.readFromStorage(CookieEnum.sortBy));
    }

    static storeSortBy(value) {
        UserSettings.writeToStorage(CookieEnum.sortBy, value);
    }

    static getFilterBy() {
        if (UserSettings.readFromStorage(CookieEnum.filterBy) === "false") {
            return false;
        }
        return true;
    }

    static storeFilterBy(value) {
        UserSettings.writeToStorage(CookieEnum.filterBy, value);
    }

    static readFromStorage(key) {
        return UserSettings.getStorage().getItem(key);
    }

    static writeToStorage(key, value) {
        UserSettings.getStorage().setItem(key, value);
    }

    static getStorage() {
        return window.localStorage;
    }
}