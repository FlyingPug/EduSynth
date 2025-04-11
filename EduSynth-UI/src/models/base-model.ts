export class BaseModel {

    protected mapFromJson(json: any): void {
        for (const key in json) {
            try {
                const propKey = key.toLowerCase();
                (this as any)[propKey] = json[key];
            } catch (e) { /* empty */ }
        }
    }

}