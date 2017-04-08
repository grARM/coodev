//common lib
var fs = require('fs');

/**
 * 
 */
// exports.copyDirs = 
// exports.emptyDir = function(fileUrl){
var _emptyDir = function(fileUrl){
	var files = fs.readdirSync(fileUrl);//读取该文件夹
    files.forEach(function (file) {
        var stats = fs.statSync(fileUrl+'/'+file);
        if(stats.isDirectory()){
            _emptyDir(fileUrl+'/'+file);
        }else{
            fs.unlinkSync(fileUrl+'/'+file);
            console.log("删除文件"+fileUrl+'/'+file+"成功");
        }
    });
};

//删除所有的空文件夹
var _rmEmptyDir = function(fileUrl){
    var files = fs.readdirSync(fileUrl);
    if(files.length>0){
        var tempFile = 0;
        files.forEach(function(fileName)
        {
            tempFile++;
            _rmEmptyDir(fileUrl+'/'+fileName);
        });
        if(tempFile==files.length){//删除母文件夹下的所有字空文件夹后，将母文件夹也删除
            fs.rmdirSync(fileUrl);
            console.log('删除空文件夹'+fileUrl+'成功');
        }
    }else{
        fs.rmdirSync(fileUrl);
        console.log('删除空文件夹'+fileUrl+'成功');
    }
}

var _deleteFolder = function (path){
	var files = [];
    if(fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

exports.emptyDir = function(fileUrl){
	_emptyDir(fileUrl);
}

exports.rmEmptyDir = function(fileUrl){
	_emptyDir(fileUrl);
	_rmEmptyDir(fileUrl);
	// _deleteFolder(fileUrl);
}

exports.deleteFolder = function(fileUrl){
	_deleteFolder(fileUrl);
}







