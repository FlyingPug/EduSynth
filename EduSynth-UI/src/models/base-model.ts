export class BaseModel {

    protected mapFromJson(json: any): void {
        for (const key in json) {
            try {
                const propKey = this.uncapitalized(key);
                (this as any)[propKey] = json[key];
            } catch (e) {
                // do nothing
            }
        }
    }

    private uncapitalized(str: string): string {
        if (str.charAt(0) === str.charAt(0).toUpperCase()) {
            return str.charAt(0).toLocaleLowerCase() + str.slice(1);
        }
        return str;
    }

}