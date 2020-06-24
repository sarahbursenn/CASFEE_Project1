export class Cookies {
    constructor(cookies) {
        // default values
        this.style = StyleEnum.getDefault();
        this.sortBy = SortEnum.getDefault();
        this.filterBy = true;

        const allCookies = this.parseCookies(cookies);
        allCookies.forEach(cookie => {
            const keyValuePair = cookie.split('=');
            const value = keyValuePair[1];
            switch (keyValuePair[0]) {
                case CookieEnum.style:
                    this.style = StyleEnum.resolveStyleEnumValue(value);
                    break;

                case CookieEnum.sortBy:
                    this.sortBy = SortEnum.fromValueToSortEntityAndDirection(value);
                    break;

                case CookieEnum.filterBy:
                    if(value === "false"){
                        this.filterBy = false;
                    }
                    break;
                default:
                    break;
            }
        });
    }

    parseCookies(cookies) {
        return cookies.split('; ');
    }
}