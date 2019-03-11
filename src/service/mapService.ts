

export interface FarmMap{
    id: number,
    row: number,
    col: number,
    name: string,
    useAtlas: string,
    bg?: {
        x: string,
        y: string,
        pic?: string
    }[],
    data?: any
}

export module mapService{
    let path = '/static/json/maps';

    export async function saveMap(options: FarmMap){
        try{
            // let result = await oss.put(`${path}/map_${options.id}_${options.name}.json`, new Buffer(JSON.stringify(options)));
            // console.log('--oss upload success:', result);
            return <Status>{
                err: null,
                code: 1,
                msg: '地图保存成功'
            };
        }catch(err){
            console.log('--oss upload failed:', err);
            let myerr = new Error('地图保存失败');
            return <Status>{
                err: myerr,
                code: -1,
                msg: myerr.message
            };
        }
    }
}