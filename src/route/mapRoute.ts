import express from 'express';
import app from '../server';
import { mapService } from '../service/mapService';
let router = express.Router();

router.post('/save', (req, res, next) => {
    let params = req.body;
    mapService.saveMap(params.option).then(res => {
        res.json(res);
    }).catch(err => {
        res.json(err);
    });
});

router.get('/index', (req, res, next) => {
    res.json({code: 1});
});


export default router;