/**
 * 创建实时显示时间的Utils
 */
function formateDate(time){
    if(!time) return ''
    let date = new Date(time);
    // 返回当前时间
    return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
}
exports.formateDate = formateDate; 