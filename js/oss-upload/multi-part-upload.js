import createClient from './oss-client';

// 每一分片的大小为 1M
const MIN_PART_SIZE = 100 * 1024;
const MAX_PART_NUMBER = 10000;

async function initMultipartUpload (name, file, options) {
  // 分片大小
  let partSize = MIN_PART_SIZE;
  // 分片数量
  let total = MAX_PART_NUMBER;

  if (file.size > MIN_PART_SIZE * MAX_PART_NUMBER) {
    // 如果按照最小片 分片找过了 最大分片数， 调整分片大小
    partSize = Math.ceil(file.size / MAX_PART_NUMBER);
  }
  // 重新计算最大分片数量
  total = Math.floor((file.size + partSize - 1) / partSize);

  const client = await createClient();
  const { uploadId } = await client.initMultipartUpload(name, options);
  return { uploadId, partSize, total };
}

async function uploadPart (name, uploadId, partNo, file, start, end) {
  const client = await createClient();
  const result = await client.uploadPart(name, uploadId, partNo, file, start, end);
  return result.etag;
}

async function completeMultipartUpload (name, uploadId, parts) {
  const client = await createClient();
  await client.completeMultipartUpload(name, uploadId, parts);
  return uploadId;
}

async function upload (name, file, options) {
  const { uploadId, partSize, total } = await initMultipartUpload(name, file, options);
  const done = [];
  const progress = options.progress || function () {};

  for (let i = 1; i <= total; i++) {
    const etag = await uploadPart(name, uploadId, i, file, (i - 1) * partSize, Math.min(i * partSize, file.size));
    progress(Math.round((i / total) * 10000) / 100);
    done.push({ number: i, etag });
  }
  await completeMultipartUpload(name, uploadId, done);
  return name;
}

export default upload;
