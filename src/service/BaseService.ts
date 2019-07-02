import * as mysql from '../dao/mysql';

export class BaseService {
    async save(table: string, data: Object, idKey: string = 'id') {
        let result = await mysql.save(table, data, idKey);
        return result;
    }
}

let baseService = new BaseService();
export { baseService };