
function _filter(list = [], code, filedKey, type) {
    let str = code;
    let obj = {};
    for (const item of list) {
        if (item[filedKey || `code`] === code) {
            str = item.name || item.nm || ``;
            obj = item;
            break;
        }
    }
    if (type === `object`) {
        return obj;
    }
    return str;
}

const waterQualityLevelList =  [
    {code : '1', name : 'I类'},
    {code : '2', name : 'II类'},
    {code : '3', name : 'III类'},
    {code : '4', name : 'IV类'},
    {code : '5', name : 'V类'},
    {code : '6', name : '劣V类'}
];

function formatWaterQualityLevel(code) {
    if(!code){
       return '--';
    }
    return _filter(waterQualityLevelList, code);
}

const waterQualityLevelSecList =  [
    {code : '1', name : 'I'},
    {code : '2', name : 'II'},
    {code : '3', name : 'III'},
    {code : '4', name : 'IV'},
    {code : '5', name : 'V'},
    {code : '6', name : '劣V'}
];

function formatWaterQualitySecLevel(code) {
    return _filter(waterQualityLevelSecList, code);
}

export default {
    formatWaterQualityLevel,
    formatWaterQualitySecLevel,
   
};
