import OSS from 'ali-oss';
/**
 *  @description 创建OSS Client，根据官网的SDK最佳实践， 每次上传的时候创建一个实例
 */
async function createClient () {
  const client = await new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAIz37oF3Eu7rCn',
    accessKeySecret: 'a0cyHQLrUIZUu4XYp0Az9OcWZlhnxA',
    bucket: 'ximeiimg'
  });

  return client;
}

export default createClient;
