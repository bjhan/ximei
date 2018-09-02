import entryFileUpload from './entry-file-upload';
import multiPartUpload from './multi-part-upload';
const host = 'https://ximeiimg.oss-cn-beijing.aliyuncs.com';

// 采用分片上传的阀值 为 100MB
const multipartUploadThreshold = 100 * 1024 * 1024;
/**
 * @param { Integer } len
 * @param { String } dir
 * @description 获取指定位数的随机数
 */
function getRandonFileName (folder = '', filename, len = 32) {
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = chars.length;
  const ext = filename.substr(filename.lastIndexOf('.'));
  const pwd = [];
  for (let i = 0; i < len; i++) {
    pwd.push(chars.charAt(Math.floor(Math.random() * maxPos)));
  }
  // 如果 dir 是以 “/”结尾
  if (folder && !/\/$/.test(folder)) {
    folder = `${folder}/`;
  }
  return folder + pwd.join('') + ext;
}

/**
 * @parma {Blob} file
 * @parma { Object } options
 * @description 上传文件， 如果文件大于 100MB。采用分片上传， 否则不分片上传
 */
async function upload (file, folder = '', options = {}) {
  const filename = getRandonFileName(folder, file.name);
  if (file.size > multipartUploadThreshold) {
    await multiPartUpload(filename, file, options);
  } else {
    await entryFileUpload(filename, file, options);
  }
  return host + '/' + filename;
}

export default upload;
